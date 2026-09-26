"use client";

export const RESERVE_EVENT = "olem:reserve";

/** Enlace a la preventa que además preselecciona el producto en el formulario. */
export function ReserveLink({ productId, children }: { productId: string; children: React.ReactNode }) {
  return (
    <a
      href="#preventa"
      onClick={() => window.dispatchEvent(new CustomEvent(RESERVE_EVENT, { detail: productId }))}
      className="eyebrow inline-flex items-center gap-3 border border-ink px-5 py-3.5 transition-colors hover:border-rust hover:bg-rust hover:text-parchment"
    >
      {children}
      <span aria-hidden>→</span>
    </a>
  );
}
