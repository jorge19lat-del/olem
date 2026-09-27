# Lista de preventa

Cada envío del formulario se guarda como un JSON en **Vercel Blob** (proyecto → Storage → Blob,
conectado al proyecto `olem`; Vercel añade `BLOB_READ_WRITE_TOKEN` automáticamente).

## Descargar el Excel

Abre **https://www.olem.es/admin/preventa**, escribe la contraseña y pulsa **Descargar Excel**.
Columnas: Fecha (hora de España) · Nombre · Email o teléfono · Producto · Talla.

La contraseña no está en el repositorio; solo su hash, en `src/lib/admin.ts`. Para cambiarla,
sustituye ese hash por el SHA-256 de la nueva:

```bash
node -e "console.log(require('crypto').createHash('sha256').update(process.argv[1]).digest('hex'))" 'nueva-contraseña'
```

## Google Sheets (opcional)

Si además configuras `GOOGLE_SHEETS_WEBHOOK_URL` (ver [google-sheets.md](./google-sheets.md)),
cada lead se envía también a esa hoja.

## En local

Sin `BLOB_READ_WRITE_TOKEN` ni `GOOGLE_SHEETS_WEBHOOK_URL`, en `npm run dev` los leads se imprimen en la consola.
En producción, si falta todo, el formulario muestra un error (para que no se pierdan leads en silencio).
