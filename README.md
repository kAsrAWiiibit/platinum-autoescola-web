# Autoescola Platinum · web (demo)

Landing en Astro para Autoescola Platinum (Sabadell). Demo publicada en
https://kasrawiiibit.github.io/platinum-autoescola-web/ (fuera de buscadores).

| Comando | Qué hace |
| --- | --- |
| `npm install` | Instala dependencias (Node 22 o superior) |
| `npm run dev` | Servidor de desarrollo, con las marcas `[pendiente]` visibles |
| `npm run build` | Build de producción en `dist/`; oculta y lista lo pendiente, falla si se escapa alguno |
| `npm run borradores` | Build con las marcas visibles en `dist-borradores/` |
| `npm run enlaces` | Comprueba `tel:`, `wa.me`, `mailto:` y los enlaces internos de `dist/` |
| `npm run fotos` | Rehace `src/fotos/` y los iconos desde `contenido/originales/` (fuera de git) |
| `npm run preview` | Sirve `dist/` en http://localhost:4321/ |

- Textos: `contenido/textos.md` (castellano) y `contenido/textos.ca.md` (catalán); legales en `contenido/legal*.md`.
- Datos: `src/data/negocio.mjs` (contacto, precios, flota) y `src/data/pendientes.ts` (lo que falta).
- Despliegue: cada push a `main` (`.github/workflows/desplegar.yml`). Sin dominio, la variable del repositorio
  `SIN_DOMINIO=1` lo publica en GitHub Pages con su ruta base.
