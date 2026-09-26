"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import { joinWaitlist, type WaitlistState } from "@/app/actions";
import { drop, waitlist } from "@/content/site";
import { RESERVE_EVENT } from "./ReserveLink";

const initialState: WaitlistState = { status: "idle" };

const fieldClass =
  "mt-2 block w-full border-0 border-b border-night/25 bg-transparent px-0 py-3 text-xl text-night placeholder:italic placeholder:text-stone/60 focus:border-petrol focus:ring-0 focus:outline-none";
const labelClass = "eyebrow text-stone";

export function WaitlistForm() {
  const [state, formAction, pending] = useActionState(joinWaitlist, initialState);
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string, checked: boolean) =>
    setSelected((prev) => (checked ? [...new Set([...prev, id])] : prev.filter((p) => p !== id)));

  useEffect(() => {
    const onReserve = (e: Event) => toggle((e as CustomEvent<string>).detail, true);
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
      </div>

      <div className="col-span-12 px-4 py-20 md:col-span-6 md:col-start-7 md:px-0 md:py-32 md:pr-10">
        {state.status === "success" ? (
          <div role="status" className="md:pt-16">
            <p className="display text-7xl italic text-petrol md:text-8xl">{waitlist.success.title}</p>
            <p className="mt-6 max-w-md text-2xl leading-relaxed text-night/80">{waitlist.success.body}</p>
          </div>
        ) : (
          <form
            noValidate
            className="space-y-10"
            onSubmit={(e) => {
              // Enviamos a mano para que React no vacíe el formulario si vuelve con errores.
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              startTransition(() => formAction(data));
            }}
          >
            <div>
              <label htmlFor="name" className={labelClass}>
                Nombre y apellidos
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Tu nombre y apellidos"
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
              <label htmlFor="contact" className={labelClass}>
                Email o número de teléfono
              </label>
              <input
                id="contact"
                name="contact"
                type="text"
                autoComplete="email"
                required
                placeholder="tu@email.com · +34 600 000 000"
                aria-invalid={!!state.fieldErrors?.contact}
                aria-describedby={state.fieldErrors?.contact ? "contact-error" : undefined}
                className={fieldClass}
              />
              {state.fieldErrors?.contact && (
                <p id="contact-error" className="mt-2 text-sm text-[#9a3b2e]">
                  {state.fieldErrors.contact}
                </p>
              )}
            </div>

            <fieldset aria-describedby={state.fieldErrors?.products ? "products-error" : undefined}>
              <legend className={labelClass}>Me interesa</legend>
              <div className="mt-2">
                {drop.products.map((p) => {
                  const checked = selected.includes(p.id);
                  return (
                    <div
                      key={p.id}
                      className="flex min-h-[4.25rem] flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-night/25 py-3"
                    >
                      <label className="flex cursor-pointer items-center gap-4 text-xl text-night">
                        <input
                          type="checkbox"
                          name="product"
                          value={p.id}
                          checked={checked}
                          onChange={(e) => toggle(p.id, e.target.checked)}
                          className="size-5 accent-petrol"
                        />
                        {p.name}
                      </label>
                      {checked && (
                        <label className="flex items-center gap-3">
                          <span className={labelClass}>Talla</span>
                          <select
                            name={`size-${p.id}`}
                            defaultValue=""
                            required
                            aria-label={`Talla de ${p.name}`}
                            className="border-0 border-b border-night/25 bg-transparent py-1 pr-8 pl-1 text-xl text-night focus:border-petrol focus:ring-0 focus:outline-none"
                          >
                            <option value="" disabled>
                              —
                            </option>
                            {p.sizes.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </label>
                      )}
                    </div>
                  );
                })}
              </div>
              {state.fieldErrors?.products && (
                <p id="products-error" className="mt-2 text-sm text-[#9a3b2e]">
                  {state.fieldErrors.products}
                </p>
              )}
            </fieldset>

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
