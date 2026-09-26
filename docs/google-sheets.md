# Lista de preventa → Google Sheets

Cada envío del formulario llama a un Web App de Google Apps Script que añade una fila a tu hoja.
Sin base de datos, gratis, y los leads se ven y exportan como un Excel.

## Montarlo (5 minutos)

1. Crea un Google Sheet nuevo (p. ej. "Olem — Preventa").
2. **Extensiones → Apps Script**. Borra lo que haya y pega el contenido de [`google-apps-script.gs`](./google-apps-script.gs).
3. Cambia `SECRET` por una cadena larga aleatoria. Guarda.
4. **Implementar → Nueva implementación** → tipo **Aplicación web**:
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier usuario**
   - Autoriza los permisos que pida Google.
5. Copia la URL que termina en `/exec`.
6. En Vercel → proyecto → **Settings → Environment Variables** añade:
   - `GOOGLE_SHEETS_WEBHOOK_URL` = la URL `/exec`
   - `GOOGLE_SHEETS_SECRET` = el mismo valor que pusiste en `SECRET`
7. Redeploy (Deployments → ⋯ → Redeploy) para que cojan las variables.

La primera vez que llegue un lead se crea la pestaña **Preventa** con las columnas
Fecha · Nombre · Email · Producto · Talla.

> Si cambias el código del script, tienes que hacer **Implementar → Gestionar implementaciones → Editar → Nueva versión**;
> si no, sigue corriendo la versión antigua.

## En local

Sin `GOOGLE_SHEETS_WEBHOOK_URL`, en `npm run dev` los leads se imprimen en la consola en vez de enviarse.
En producción, si falta la variable, el formulario muestra un error (para que no se pierdan leads en silencio).
