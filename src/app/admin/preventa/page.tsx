import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preventa — descarga",
  robots: { index: false, follow: false },
};

export default async function PreventaAdminPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;

  return (
    <main className="mx-auto flex min-h-svh max-w-md flex-col justify-center px-4 py-20">
      <p className="eyebrow text-stone">Olem · Preventa</p>
      <h1 className="display mt-6 text-5xl text-petrol">Descargar la lista</h1>
      <form action="/admin/preventa/excel" method="post" className="mt-10 space-y-8">
        <label className="block">
          <span className="eyebrow text-stone">Contraseña</span>
          <input
            type="password"
            name="clave"
            required
            autoComplete="current-password"
            className="mt-2 block w-full border-0 border-b border-night/25 bg-transparent px-0 py-3 text-xl text-night focus:border-petrol focus:ring-0 focus:outline-none"
          />
        </label>
        {error === "clave" && <p className="text-sm text-[#9a3b2e]">Contraseña incorrecta.</p>}
        {error === "blob" && (
          <p className="text-sm text-[#9a3b2e]">
            El almacenamiento de Vercel (Blob) no está conectado a este proyecto.
          </p>
        )}
        <button type="submit" className="bg-petrol px-8 py-4 text-shell transition-colors hover:bg-petrol-deep">
          Descargar Excel
        </button>
      </form>
    </main>
  );
}
