"use client";

import { useActionState, useEffect, useState } from "react";
import { joinWaitlist, type WaitlistState } from "@/app/actions";
import { allSizes, drop, waitlist } from "@/content/site";
import { RESERVE_EVENT } from "./ReserveLink";

const initialState: WaitlistState = { status: "idle" };

const fieldClass =
  "mt-2 block w-full border-0 border-b border-night/25 bg-transparent px-0 py-3 text-xl text-night placeholder:italic placeholder:text-stone/60 focus:border-petrol focus:ring-0 focus:outline-none";
const labelClass = "eyebrow text-stone";

export function WaitlistForm() {
  const [state, formAction, pending] = useActionState(joinWaitlist, initialState);
  const [product, setProduct] = useState("");

  useEffect(() => {
    const onReserve = (e: Event) => setProduct((e as CustomEvent<string>).detail);
    window.addEventListener(RESERVE_EVENT, onReserve);
    return () => window.removeEventListener(RESERVE_EVENT, onReserve);
  }, []);

  return (
    <section id="preventa" className="grid grid-cols-12 scroll-mt-4" aria-labelledby="preventa-titulo">
      <div className="col-span-12 bg-petrol px-4 py-20 text-shell md:col-span-5 md:px-10 md:py-32">
        <p className="eyebrow text-sky">{waitlist.eyebrow}</p>
        <h2 id="preventa-titulo" className="display mt-8 text-[16vw] md:text-[6vw]">
          {waitlist.heading}
        </h2>
        <p className="mt-8 max-w-md text-xl leading-relaxed text-shell/85 md:text-[1.375rem]">{waitlist.body}</p>
        <ul className="mt-10 space-y-3">
          {waitlist.notes.map((note) => (
            <li key={note} className="eyebrow flex items-center gap-3 text-shell">
              <span className="inline-block h-px w-6 bg-sky" aria-hidden />
              {note}
            </li>
          ))}
        </ul>
      </div>

      <div className="col-span-12 px-4 py-20 md:col-span-6 md:col-start-7 md:px-0 md:py-32 md:pr-10">
        {state.status === "success" ? (
          <div role="status" className="md:pt-16">
            <p className="display text-7xl italic text-petrol md:text-8xl">{waitlist.success.title}</p>
            <p className="mt-6 max-w-md text-2xl leading-relaxed text-night/80">{waitlist.success.body}</p>
          </div>
        ) : (
          <form action={formAction} noValidate className="space-y-10">
            <div>
              <label htmlFor="name" className={labelClass}>
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Tu nombre"
                aria-invalid={!!state.fieldErrors?.name}
                aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
                className={fieldClass}
              />
              {state.fieldErrors?.name && (
                <p id="name-error" className="mt-2 text-sm text-[#9a3b2e]">
                  {state.fieldErrors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                placeholder="tu@email.com"
                aria-invalid={!!state.fieldErrors?.email}
                aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
                className={fieldClass}
              />
              {state.fieldErrors?.email && (
                <p id="email-error" className="mt-2 text-sm text-[#9a3b2e]">
                  {state.fieldErrors.email}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="product" className={labelClass}>
                  Me interesa <span className="normal-case tracking-normal">(opcional)</span>
                </label>
                <select
                  id="product"
                  name="product"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className={fieldClass}
                >
                  <option value="">—</option>
                  {drop.products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                  <option value="ambas">Las dos</option>
                </select>
              </div>
              <div>
                <label htmlFor="size" className={labelClass}>
                  Talla <span className="normal-case tracking-normal">(opcional)</span>
                </label>
                <select id="size" name="size" defaultValue="" className={fieldClass}>
                  <option value="">—</option>
                  {allSizes.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Honeypot anti-spam: invisible para personas. */}
            <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="company">No rellenar</label>
              <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={pending}
                className="eyebrow inline-flex items-center justify-center gap-4 bg-petrol px-8 py-5 text-shell transition-colors hover:bg-night disabled:opacity-60"
              >
                {pending ? "Enviando…" : "Apuntarme a la lista"}
                <span aria-hidden>⟶</span>
              </button>
              <p className="text-base italic text-stone">Sin pago. Solo te escribimos para el drop.</p>
            </div>

            {state.status === "error" && state.message && (
              <p role="alert" className="text-[#9a3b2e]">
                {state.message}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
