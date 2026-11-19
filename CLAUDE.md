# Web de Autoescola Platinum (demo)

Landing estática en Astro para **Autoescola Platinum** (autoescuela de Sabadell; web actual en WordPress:
https://platinumautoescola.com). Hoy es una **demo** publicada en GitHub Pages:
https://kasrawiiibit.github.io/platinum-autoescola-web/ (repositorio público `kAsrAWiiibit/platinum-autoescola-web`).

- **Este archivo: solo reglas.** Arquitectura actual en `SNAPSHOT.md`; pendientes, decisiones, preguntas para el
  cliente y por dónde seguir (bloque «RESUME HERE») en `BACKLOG.md`. Comandos en `README.md`. Material de la reunión
  en `docs/presentacion.md`. Al terminar una sesión, actualiza los tres primeros.
- Stack y convenciones copiados de `xbuyer-web` (Astro 7, `trailingSlash: 'always'`, i18n con `es` en la raíz,
  sistema de pendientes, despliegue con `SIN_DOMINIO`). **`xbuyer-web` y el CRM de Atlas son solo de lectura.**

Dirección visual «un motivo» (`.taste-skill/`, fuera de git): el anillo del logo (círculo abierto por la izquierda)
enorme en la portada, como diagrama de los pasos, viñeta y pie. Colores planos de su marca: marino `#111936` /
`#1C244B`, azul acero `#326287` y plata «platino» `#D9DEE6`; verde `#25D366` solo para WhatsApp. Una familia:
Archivo variable (ancha y 800 en títulos). Un radio (14px), botones en píldora, sin sombras ni degradados.
Skills: `design-taste-frontend`, `impeccable`, `emil-design-eng`.

## Reglas

- **Nada inventado.** Solo los datos que ha dado el cliente (`src/data/negocio.mjs`): sin reseñas, testimonios,
  nombres de alumnos, cifras, porcentajes, promociones ni promesas («simuladores», «apps», «garantía de éxito»).
  Si un dato del proceso de la DGT no es seguro, fuera.
- **Ningún `[pendiente]` visible.** Todo texto sale de `contenido/textos.md` (castellano), `contenido/textos.ca.md`
  (catalán, mismas etiquetas), `contenido/legal*.md` o `src/data/` (nada escrito en las plantillas). Lo que falta se
  marca con `pendiente()` (`src/data/pendientes.ts`) o `[pendiente: …]`; `npm run build` lo oculta y lo lista, y falla
  si llega al HTML. Las llaves `{…}` sin valor también hacen fallar la build.
- **Demo fuera de buscadores:** `DEMO` en `src/data/sitio.mjs` pone `noindex` en todas las páginas y `robots.txt`
  con `Disallow: /`. No quitarlo hasta publicar en su dominio (no debe competir con su web actual).
- **Contacto solo desde `src/lib/contacto.ts`:** `tel:+34937178612`, `https://wa.me/34657914509` (con `?text=`
  según el permiso) y `mailto:platinumautoescola@gmail.com` (bien escrito: su web actual tiene la errata
  `platinumautorescola`). Tras cada build: `npm run enlaces`.
- **Nunca escribir ni enviar nada real** al WhatsApp, al teléfono ni al email del cliente. Para probar el formulario,
  intercepta `window.open` en el navegador (ver BACKLOG, «Cómo se probó»).
- **El formulario no guarda nada:** sin backend, sin cookies, sin `localStorage`, sin envíos a terceros. Solo abre
  WhatsApp con el mensaje montado. La casilla de privacidad es obligatoria.
- **Sin cookies de terceros:** el mapa de Google solo se carga al pulsar «Ver el mapa» (por eso no hay banner).
- **Fotos:** solo material del cliente sacado de su web (flota y logo), preparado con `npm run fotos` (sin
  metadatos, ≤ 2400 px; Astro sirve AVIF/WebP) y siempre con `alt`. **Nunca fotos de banco** (su web usa varias de
  Freepik: no se reutilizan) **ni fotos de personas** sin autorización. Sin foto de calidad, bloque de color plano.
- **Catalán:** traducción propia pendiente de revisar por el cliente; ese aviso va en el BACKLOG, nunca en la web.
- Movimiento sutil, con alternativa para `prefers-reduced-motion`, sin tocar el LCP (la portada es solo texto).
- Lighthouse móvil ≥ 95 en las cuatro categorías (con la demo, SEO baja a 69 solo por el `noindex`: medir también
  con `DEMO=0`).
- **Trabajo:** mientras sea demo se puede trabajar en `main` (cada push despliega). Commits pequeños y en español.

## Cómo revisar

- `npm run build` (lista lo ocultado) · `npm run borradores` (con las marcas visibles, en `dist-borradores/`) ·
  `npm run enlaces` (contacto e internos de `dist/`).
- Capturas: `npm run preview` y
  `CHROME_PATH=~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell node .claude/skills/design-taste-frontend/scripts/inspect.mjs http://localhost:4321/ --out .taste-skill/<carpeta> --widths 1440,390`.
- Lighthouse: `npx lighthouse@12 <url> --chrome-flags="--headless=new" --only-categories=performance,accessibility,best-practices,seo`.
