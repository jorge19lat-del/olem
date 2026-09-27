import "server-only";
import { get, list, put, type BlobAccessType } from "@vercel/blob";

export type WaitlistEntry = {
  name: string;
  /** Email o teléfono de contacto. */
  email: string;
  product: string;
  size: string;
};

export type StoredWaitlistEntry = WaitlistEntry & { createdAt: string };

const PREFIX = "preventa/";

/** El token lo añade Vercel al conectar un Blob store al proyecto (Storage → Blob). */
export const isBlobConfigured = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

// Un store de Blob es público o privado según se creó; probamos privado y, si no, público.
async function withAccess<T>(fn: (access: BlobAccessType) => Promise<T>): Promise<T> {
  try {
    return await fn("private");
  } catch (err) {
    try {
      return await fn("public");
    } catch {
      throw err;
    }
  }
}

/**
 * Guarda un lead de la preventa: un JSON por lead en Vercel Blob (se descarga como Excel en
 * /admin/preventa) y, si está configurado, también en el Google Sheet (docs/google-sheets.md).
 */
export async function saveWaitlistEntry(entry: WaitlistEntry): Promise<void> {
  const sheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!isBlobConfigured() && !sheetsUrl) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[waitlist] Sin almacenamiento configurado; lead de desarrollo:", entry);
      return;
    }
    throw new Error("Ni BLOB_READ_WRITE_TOKEN ni GOOGLE_SHEETS_WEBHOOK_URL están configuradas");
  }

  if (isBlobConfigured()) {
    const createdAt = new Date().toISOString();
    const body = JSON.stringify({ ...entry, createdAt } satisfies StoredWaitlistEntry);
    // El sufijo aleatorio hace la URL imposible de adivinar aunque el store sea público.
    await withAccess((access) =>
      put(`${PREFIX}${createdAt}.json`, body, { access, addRandomSuffix: true, contentType: "application/json" }),
    );
  }

  if (sheetsUrl) await sendToGoogleSheets(sheetsUrl, entry);
}

async function sendToGoogleSheets(url: string, entry: WaitlistEntry): Promise<void> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ ...entry, secret: process.env.GOOGLE_SHEETS_SECRET ?? "" }),
    cache: "no-store",
  });

  const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
  if (!res.ok || !data?.ok) {
    throw new Error(`Google Sheets respondió ${res.status}: ${data?.error ?? "respuesta inválida"}`);
  }
}

/** Todos los leads guardados en Blob, del más antiguo al más reciente. */
export async function listWaitlistEntries(): Promise<StoredWaitlistEntry[]> {
  const urls: string[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: PREFIX, cursor, limit: 1000 });
    urls.push(...page.blobs.map((b) => b.url));
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  const entries = await Promise.all(
    urls.map(async (url) => {
      const res = await withAccess(async (access) => {
        const r = await get(url, { access, useCache: false });
        if (!r || r.statusCode !== 200) throw new Error(`No se pudo leer ${url}`);
        return r;
      });
      return (await new Response(res.stream).json()) as StoredWaitlistEntry;
    }),
  );

  return entries.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}
