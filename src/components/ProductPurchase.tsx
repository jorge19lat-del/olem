"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/content/site";

/** Selector de talla y botón de reserva: lleva al formulario de preventa con la camiseta y la talla ya elegidas. */
export function ProductPurchase({ product }: { product: Pick<Product, "id" | "sizes" | "fit"> }) {
  const [size, setSize] = useState<string | null>(null);
  const [missing, setMissing] = useState(false);

  const href = `/?producto=${encodeURIComponent(product.id)}${size ? `&talla=${encodeURIComponent(size)}` : ""}#preventa`;

  return (
    <div>
      <fieldset aria-describedby={missing ? "talla-aviso" : undefined}>
        <legend className="sr-only">Talla</legend>
        <div className="flex items-baseline justify-between gap-4" aria-hidden>
          <span className="eyebrow text-night">
            Talla{size && <span className="text-stone"> — {size}</span>}
          </span>
          <span className="eyebrow text-stone">{product.fit}</span>
        </div>
        <div className="mt-4 grid grid-cols-6 gap-2">
          {product.sizes.map((s) => (
            <label
              key={s}
              className={`relative flex h-12 cursor-pointer items-center justify-center border font-sans text-sm tracking-wider transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-petrol ${
                size === s ? "border-night bg-night text-shell" : "border-night/20 text-night hover:border-night"
              }`}
            >
              <input
                type="radio"
                name="talla"
                value={s}
                checked={size === s}
                onChange={() => {
                  setSize(s);
                  setMissing(false);
                }}
                className="sr-only"
              />
              {s}
            </label>
          ))}
        </div>
      </fieldset>

      <Link
        href={href}
        onClick={(e) => {
          if (!size) {
            e.preventDefault();
            setMissing(true);
          }
        }}
        className="eyebrow mt-6 flex w-full items-center justify-center gap-4 bg-petrol px-8 py-5 text-shell transition-colors hover:bg-night"
      >
        {size ? `Reservar talla ${size}` : "Reservar en preventa"}
        <span aria-hidden>⟶</span>
      </Link>
      <p id="talla-aviso" role="status" className={`mt-3 text-base italic ${missing ? "text-[#9a3b2e]" : "text-stone"}`}>
        {missing ? "Elige tu talla para reservar." : "Sin pago. Te escribimos cuando tu talla esté disponible."}
      </p>
    </div>
  );
}
