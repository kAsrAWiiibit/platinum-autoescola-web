# SNAPSHOT: arquitectura actual (19 de noviembre de 2026)

Web estática en **Astro 7** publicada en GitHub Pages como **demo**:
**https://kasrawiiibit.github.io/platinum-autoescola-web/** (repositorio público
`kAsrAWiiibit/platinum-autoescola-web`; cada push a `main` despliega con `.github/workflows/desplegar.yml`, copiado
tal cual de `xbuyer-web`). Variable del repositorio `SIN_DOMINIO=1`. Fuera de buscadores (`DEMO`). Reglas en
`CLAUDE.md`; pendientes en `BACKLOG.md`.

## Páginas

| Ruta (es / ca) | Qué es | Archivo |
| --- | --- | --- |
| `/` · `/ca/` | Landing de una página | `src/pages/index.astro`, `src/pages/ca/index.astro` → `src/components/Landing.astro` |
| `/aviso-legal/` · `/ca/avis-legal/` | Aviso legal (borrador) | `src/layouts/Legal.astro` + `contenido/legal*.md` |
| `/privacidad/` · `/ca/privacitat/` | Privacidad (borrador) | ídem |
| `/cookies/` · `/ca/galetes/` | Cookies (borrador: la web no usa) | ídem |
| `/404` | Página no encontrada (castellano, `noindex`) | `src/pages/404.astro` |

## Landing, por secciones (`src/components/`)

1. `Cabecera.astro`: logo blanco, menú con anclas (escritorio) y enlace al otro idioma.
2. `Portada.astro`: anillo gigante plata recortado; título, entradilla («40 años…»), los tres permisos con precio
   (enlazan a su tarjeta) y botones WhatsApp (principal) y Llamar (`data-botones-portada`). Solo texto: es el LCP.
3. `Permisos.astro` (`#permisos`): tres tarjetas comparables (B azul, A2 marino, A plata): letra grande, precio,
   vehículo y nota de IVA, requisito, qué incluye (viñeta = anillo) y franja-botón a WhatsApp con
   `?text=Hola, quiero información del permiso X`.
4. `Pasos.astro` (`#como-funciona`): el anillo en cuatro cuartos (uno por paso, se completa al aparecer) y los pasos
   en tipo grande. Aviso de que el A no tiene examen.
5. `PorQue.astro`: 40 años en Sabadell, trato personal, cifras pendientes (ocultas) y la flota: Golf, Clio, 208
   (sin foto: bloque plata), Hornet y Z400. Fotos con persiana (`clip-path`) al aparecer.
6. `Resenas.astro`: enlace a Google Maps (búsqueda «Autoescola Platinum Sabadell»); nota y número, pendientes.
7. `Preguntas.astro` (`#preguntas`): `<details name>` (uno abierto cada vez); 6 preguntas + plazos (pendiente).
8. `Apuntate.astro` (`#apuntate`): cupón con perforado; formulario sin backend que valida y abre WhatsApp con el
   mensaje montado (plantillas en `textos*.md`). Sin cookies ni almacenamiento.
9. `Ubicacion.astro` (`#ubicacion`): dirección, horario (pendiente, oculto), «Cómo llegar», teléfono y mapa de
   Google que solo se carga al pulsar.
10. `Pie.astro`: anillo, logo, contacto, Instagram, dirección, legales e idioma. `BarraContacto.astro`: barra fija
    en el móvil (WhatsApp + Llamar), escondida mientras se ven los botones de la portada.

Piezas: `Anillo.astro` (el motivo), `Icono.astro` (simple-icons y lucide leídos en la build), `Pendiente`,
`SiCompleto`, `Dato` (de xbuyer-web).

## Datos (nada escrito en las plantillas)

- Textos: `contenido/textos.md` / `textos.ca.md` → `src/lib/textos.ts` (lee «- Etiqueta: valor», rellena `{llaves}`
  y falla si falta algo) → `src/data/contenido.ts` (todo montado por idioma).
- Negocio: `src/data/negocio.mjs` (contacto, dirección, 40 años, URLs de Google, precios, flota). Pendientes:
  `src/data/pendientes.ts`. Enlaces de contacto: `src/lib/contacto.ts`. Rutas por idioma: `src/lib/rutas.ts`.
- Fotos: `src/fotos/` (golf, clio, hornet, z400 en WebP limpio; `logo-blanco.png`), generadas por
  `scripts/fotos.mjs` desde `contenido/originales/` (fuera de git). También genera `public/favicon.png`,
  `public/apple-touch-icon.png` y `public/compartir.png` (Open Graph 1200×630).

## SEO

`title`/`description` por idioma, canónica, `hreflang` es/ca/x-default, Open Graph con imagen, datos estructurados
`DrivingSchool` (dirección, teléfono, email, `priceRange`, ofertas con precio, Instagram) en la portada. Mientras
sea demo: `noindex` y `robots.txt` con `Disallow: /` (`integraciones/pendientes.mjs`); sin demo, sitemap.

## Comprobaciones

- `integraciones/pendientes.mjs`: lista lo ocultado y falla si hay `[pendiente` en `dist/`.
- `scripts/enlaces.mjs` (`npm run enlaces`): `tel:`, `wa.me`, `mailto:`, anclas y enlaces internos.
- Lighthouse móvil (19/11/2026): local 100 · 100 · 100 · SEO 69; publicada 98 · 100 · 100 · SEO 66 (LCP 1,7 s, CLS 0).
  SEO solo pierde `is-crawlable` por el `noindex` de la demo; con `DEMO=0`, 100 en las cuatro.
- Capturas finales: `docs/capturas/` (`publicada-*`, `publicada-ca-*` y `local-*`, a 390 y 1440).
