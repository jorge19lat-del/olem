# Olem — landing + preventa Drop 01

Landing de marca de **Olem**, casa cultural de joyería y objetos con raíces en Annobón.
Next.js (App Router) + Tailwind CSS v4, desplegada en Vercel. Sin tienda ni checkout: el CTA lleva a una lista de preventa que guarda los leads en Google Sheets.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de producción
npm run typecheck
```

## Dónde se cambia cada cosa

| Qué | Dónde |
| --- | --- |
| Todo el copy, precios, tallas, Instagram | `src/content/site.ts` |
| Colores y tipografías (tokens) | `src/app/globals.css` (`@theme`) y `src/app/layout.tsx` |
| Secciones | `src/components/` — `Hero`, `BrandStory`, `DropSection`, `WaitlistForm`, `Footer` |
| Guardado de leads | `src/app/actions.ts` (validación) → `src/lib/waitlist.ts` (envío a Sheets) |
| Imagen para redes (og:image) | `src/app/opengraph-image.tsx` (se genera sola) |
| Title / meta description | `site.title` y `site.description` en `src/content/site.ts` |

## Imágenes

`hero.jpg` es una foto generada con IA (Canva) y `pufferfish.webp` / `baby-tee.webp` son las fotos reales de producto con fondo transparente (si cambias una, actualiza `width`/`height` en `site.ts`). La Fig. 02 de la narrativa es un collage (`IslandCollage`) que reutiliza `hero.jpg` y superpone el mapa ilustrado de Annobón (`AnnobonMap`, SVG). Todas están en `public/images/`:

| Archivo | Uso | Proporción |
| --- | --- | --- |
| `hero.jpg` | Hero a pantalla completa (texto encima) | 16:9 horizontal, mín. 2400 px de ancho; deja aire a la izquierda para el texto |
| `pufferfish.webp` | Camiseta Pufferfish | Fondo transparente, recortada al borde de la prenda |
| `baby-tee.webp` | Baby tee | Fondo transparente, recortada al borde de la prenda |

Para poner las fotos reales, sustituye cada archivo por otro **con el mismo nombre** (mín. 1200 px de ancho).
`next/image` se encarga de redimensionar y servir AVIF/WebP. Recuerda actualizar los textos `alt` en `site.ts`.

## Lista de preventa

Ver [`docs/google-sheets.md`](docs/google-sheets.md). Variables de entorno en `.env.example`.

## Tipografías

- Logotipo y titulares: **The Seasons** — la del logotipo «Olem STUDIO». Es de pago, así que no está en el repo: con la licencia web, coloca `the-seasons-regular.woff2` y `the-seasons-italic.woff2` en `public/fonts/` (ver `@font-face` en `globals.css`). Si no están, se muestra Cormorant Garamond.
- Cuerpo: **Cormorant Garamond**; etiquetas: **Jost**. Ambas vía `next/font/google` (autoalojadas, sin petición extra a Google).
