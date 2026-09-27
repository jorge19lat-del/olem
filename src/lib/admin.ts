import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";

// SHA-256 de la contraseña de /admin/preventa. La contraseña no está en el repositorio.
const PASSWORD_SHA256 = "a218741663a1dad7c27e1831946e4d86f9f99095c0d80b6e8cfbdb0482e80fbd";

export function isAdminPassword(value: string): boolean {
  const hash = createHash("sha256").update(value.trim()).digest();
  return timingSafeEqual(hash, Buffer.from(PASSWORD_SHA256, "hex"));
}
