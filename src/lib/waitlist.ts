import "server-only";

export type WaitlistEntry = {
  name: string;
  /** Email o teléfono de contacto. */
  email: string;
  product: string;
  size: string;
};

/**
 * Envía un lead al Web App de Google Apps Script, que lo añade como fila en el Google Sheet.
 * Ver docs/google-sheets.md para montar la hoja y el script.
 */
export async function saveWaitlistEntry(entry: WaitlistEntry): Promise<void> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!url) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[waitlist] GOOGLE_SHEETS_WEBHOOK_URL no configurada; lead de desarrollo:", entry);
      return;
    }
    throw new Error("GOOGLE_SHEETS_WEBHOOK_URL no está configurada");
  }

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
