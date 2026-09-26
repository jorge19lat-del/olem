"use server";

import { allSizes, drop } from "@/content/site";
import { saveWaitlistEntry } from "@/lib/waitlist";

export type WaitlistState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: { name?: string; email?: string };
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const productIds = [...drop.products.map((p) => p.id), "ambas"];

export async function joinWaitlist(_prev: WaitlistState, formData: FormData): Promise<WaitlistState> {
  // Honeypot: los bots rellenan este campo oculto; fingimos éxito sin guardar nada.
  if (String(formData.get("company") ?? "").trim()) return { status: "success" };

  const name = String(formData.get("name") ?? "").trim().slice(0, 120);
  const email = String(formData.get("email") ?? "").trim().toLowerCase().slice(0, 200);
  const product = String(formData.get("product") ?? "");
  const size = String(formData.get("size") ?? "");

  const fieldErrors: WaitlistState["fieldErrors"] = {};
  if (!name) fieldErrors.name = "Dinos cómo te llamas.";
  if (!EMAIL_RE.test(email)) fieldErrors.email = "Revisa el email.";
  if (fieldErrors.name || fieldErrors.email) {
    return { status: "error", message: "Faltan algunos datos.", fieldErrors };
  }

  try {
    await saveWaitlistEntry({
      name,
      email,
      product: productIds.includes(product) ? product : "",
      size: allSizes.includes(size) ? size : "",
    });
    return { status: "success" };
  } catch (err) {
    console.error("[waitlist]", err);
    return { status: "error", message: "No hemos podido apuntarte. Inténtalo de nuevo en un momento." };
  }
}
