// Olem — lista de preventa → Google Sheets
// Pega este código en Extensiones → Apps Script de tu Google Sheet (ver docs/google-sheets.md).

const SECRET = "CAMBIA-ESTE-SECRETO"; // mismo valor que GOOGLE_SHEETS_SECRET en Vercel
const SHEET_NAME = "Preventa";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.secret !== SECRET) return json({ ok: false, error: "unauthorized" });

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Fecha", "Nombre", "Email", "Producto", "Talla"]);
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      sheet.appendRow([new Date(), clean(data.name), clean(data.email), clean(data.product), clean(data.size)]);
    } finally {
      lock.releaseLock();
    }
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

// Evita que un valor como "=HYPERLINK(...)" se interprete como fórmula.
function clean(value) {
  const s = String(value || "").slice(0, 200);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
