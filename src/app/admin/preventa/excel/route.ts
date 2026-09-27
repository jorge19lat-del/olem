import ExcelJS from "exceljs";
import { isAdminPassword } from "@/lib/admin";
import { isBlobConfigured, listWaitlistEntries } from "@/lib/waitlist";

const madridDate = new Intl.DateTimeFormat("es-ES", {
  timeZone: "Europe/Madrid",
  dateStyle: "short",
  timeStyle: "short",
});

const back = (request: Request, error: string) =>
  Response.redirect(new URL(`/admin/preventa?error=${error}`, request.url), 303);

export async function POST(request: Request) {
  const form = await request.formData();
  if (!isAdminPassword(String(form.get("clave") ?? ""))) return back(request, "clave");
  if (!isBlobConfigured()) return back(request, "blob");

  const entries = await listWaitlistEntries();

  const book = new ExcelJS.Workbook();
  const sheet = book.addWorksheet("Preventa");
  sheet.columns = [
    { header: "Fecha", key: "date", width: 20 },
    { header: "Nombre", key: "name", width: 28 },
    { header: "Email o teléfono", key: "email", width: 32 },
    { header: "Producto", key: "product", width: 36 },
    { header: "Talla", key: "size", width: 36 },
  ];
  sheet.getRow(1).font = { bold: true };
  sheet.views = [{ state: "frozen", ySplit: 1 }];
  for (const e of entries) {
    sheet.addRow({ date: madridDate.format(new Date(e.createdAt)), name: e.name, email: e.email, product: e.product, size: e.size });
  }

  const buffer = await book.xlsx.writeBuffer();
  const today = new Date().toISOString().slice(0, 10);
  return new Response(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="olem-preventa-${today}.xlsx"`,
      "Cache-Control": "no-store",
    },
  });
}
