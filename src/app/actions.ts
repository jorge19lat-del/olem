"use server";

import { drop } from "@/content/site";
import { saveWaitlistEntry } from "@/lib/waitlist";

export type WaitlistState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: { name?: string; contact?: string; products?: string };
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Teléfono: dígitos con +, espacios, guiones, puntos o paréntesis; entre 7 y 15 dígitos.
const PHONE_RE = /^\+?[\d\s().-]+$/;
const isPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").length;
  return PHONE_RE.test(value) && digits >= 7 && digits <= 15;
};

export async function joinWaitlist(_prev: WaitlistState, formData: FormData): Promise<WaitlistState> {
  // Honeypot: los bots rellenan este campo oculto; fingimos éxito sin guardar nada.
  if (String(formData.get("company") ?? "").trim()) return { status: "success" };

  const name = String(formData.get("name") ?? "").trim().slice(0, 120);
  const rawContact = String(formData.get("contact") ?? "").trim().slice(0, 200);
  const contact = rawContact.includes("@") ? rawContact.toLowerCase() : rawContact;
  const chosen = new Set(formData.getAll("product").map(String));

  // Cada camiseta marcada necesita una talla válida para ese modelo.
  const picks = drop.products
    .filter((p) => chosen.has(p.id))
    .map((p) => ({ product: p, size: String(formData.get(`size-${p.id}`) ?? "") }));

  const fieldErrors: WaitlistState["fieldErrors"] = {};
  if (!name) fieldErrors.name = "Dinos cómo te llamas.";
  if (!EMAIL_RE.test(contact) && !isPhone(contact)) fieldErrors.contact = "Revisa el email o el teléfono.";
  if (picks.length === 0) fieldErrors.products = "Elige al menos una camiseta.";
  else if (picks.some(({ product, size }) => !product.sizes.includes(size)))
    fieldErrors.products = "Elige la talla de cada camiseta.";
  if (fieldErrors.name || fieldErrors.contact || fieldErrors.products) {
    return { status: "error", message: "Faltan algunos datos.", fieldErrors };
  }

  try {
    await saveWaitlistEntry({
      name,
      email: contact,
      product: picks.map(({ product }) => product.name).join(", "),
      size: picks.map(({ product, size }) => `${product.name}: ${size}`).join(", "),
    });
    return { status: "success" };
  } catch (err) {
    console.error("[waitlist]", err);
    return { status: "error", message: "No hemos podido apuntarte. Inténtalo de nuevo en un momento." };
  }
}
