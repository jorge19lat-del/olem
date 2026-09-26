"use client";

export const RESERVE_EVENT = "olem:reserve";

/** Enlace a la preventa que además preselecciona el producto en el formulario. */
export function ReserveLink({ productId, children }: { productId: string; children: React.ReactNode }) {
  return (
    <a
      href="#preventa"
      onClick={() => window.dispatchEvent(new CustomEvent(RESERVE_EVENT, { detail: productId }))}
      className="eyebrow inline-flex items-center gap-4 border border-petrol px-6 py-3.5 text-petrol transition-colors hover:bg-petrol hover:text-shell"
    >
      {children}
      <span aria-hidden>⟶</span>
    </a>
  );
}
