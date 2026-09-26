# Olem — instrucciones para Claude

## Ramas y Git

- La rama principal es **`main`** y siempre se llama así. No renombrarla ni crear otras ramas "principales".
- Nunca trabajar ni hacer push directamente en `main`: cada cambio va en su propia rama y entra por pull request contra `main`.
- Las ramas se nombran según el cambio o la funcionalidad, en minúsculas, con guiones y un prefijo de tipo:
  - `feature/…` — funcionalidad nueva (p. ej. `feature/tienda-online`, `feature/formulario-preventa`)
  - `design/…` — cambios visuales o de estilo (p. ej. `design/paleta-moodboard`)
  - `fix/…` — correcciones (p. ej. `fix/envio-formulario-movil`)
  - `content/…` — textos, imágenes o precios (p. ej. `content/fotos-drop-01`)
  - `docs/…` — documentación
  - `chore/…` — dependencias, configuración, mantenimiento
- No usar nombres genéricos o autogenerados (como `claude/nombre-aleatorio`). Si la sesión asigna una rama así, crear en su lugar una con el nombre del cambio.
- Tras fusionar un PR, borrar su rama.

## Comprobaciones antes de subir cambios

```bash
npm run typecheck
npm run build
```

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
