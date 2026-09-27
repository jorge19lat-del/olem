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

`hero.jpg` es una foto generada con IA (Canva) y `pufferfish.webp` / `baby-tee.webp` son las fotos reales de producto con fondo transparente (si cambias una, actualiza `width`/`height` en `site.ts`). La sección Origen gira en torno a un mapa de Annobón en curvas de nivel (`annobon-topo.svg`, componente `TopoMap`), con la costa calcada de un mapa dibujado de la isla y generado con `scripts/generate-annobon-topo.py`. Todas están en `public/images/`:

| Archivo | Uso | Proporción |
| --- | --- | --- |
| `hero.jpg` | Hero a pantalla completa (texto encima) | 16:9 horizontal, mín. 3200 px de ancho (pantallas Retina); deja aire a la izquierda para el texto |
| `pufferfish.webp` | Camiseta Pufferfish | Fondo transparente, recortada al borde de la prenda |
| `baby-tee.webp` | Baby tee | Fondo transparente, recortada al borde de la prenda |

Para poner las fotos reales, sustituye cada archivo por otro **con el mismo nombre** (mín. 1200 px de ancho).
`next/image` se encarga de redimensionar y servir AVIF/WebP. Recuerda actualizar los textos `alt` en `site.ts`.

## Lista de preventa

Se guarda en Vercel Blob y se descarga como Excel en `/admin/preventa`. Ver [`docs/preventa.md`](docs/preventa.md). Variables de entorno en `.env.example`.

## Tipografías

- Logotipo y titulares: **Playfair Display** — alternativa gratuita a The Seasons (la tipografía del logotipo, de pago): serif de alto contraste con cursiva curva.
- Cuerpo: **Cormorant Garamond**; etiquetas: **Jost**. Todas vía `next/font/google` (autoalojadas, sin petición extra a Google).
