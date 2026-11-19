# BACKLOG

> **RESUME HERE** (19 de noviembre de 2026): demo completa y publicada en
> https://kasrawiiibit.github.io/platinum-autoescola-web/ (es) y `/ca/` (ca). Landing con portada, permisos B/A2/A,
> cómo funciona, por qué Platinum con la flota, reseñas (enlace a Google), preguntas, formulario «Apúntate» que abre
> WhatsApp, ubicación con mapa bajo demanda y legales en borrador. Lighthouse móvil 100/100/100 y SEO 69 solo por el
> `noindex` de la demo (100 con `DEMO=0`). `npm run build` y `npm run enlaces` sin errores.
> **Siguiente:** reunión con el cliente (`docs/presentacion.md`). Con sus respuestas: rellenar los `pendiente()` de
> `src/data/pendientes.ts`, los `[pendiente]` de `contenido/legal*.md`, revisar el catalán y pasar a su dominio
> (ver «Pasar a platinumautoescola.com»).

## Preguntas para el cliente

1. **¿40 o más de 20 años?** Su portada dice «40 años de experiencia en Sabadell» y la página Nosotros, «más de 20
   años». La demo usa 40 (`anosExperiencia` en `src/data/negocio.mjs`).
2. **Horario** de oficina y de clases (prácticas).
3. **Porcentaje de aprobados** (si quieren publicarlo y de dónde sale: la DGT publica datos por autoescuela).
4. **Número de alumnos o permisos tramitados** (los contadores de su web actual salen a 0).
5. **¿Pago a plazos?** ¿En qué condiciones?
6. **Ficha de Google:** URL exacta de su ficha (la demo enlaza a la búsqueda «Autoescola Platinum Sabadell» en
   Google Maps), nota media y número de reseñas.
7. **Datos legales:** razón social y NIF del titular para el aviso legal y la privacidad. ¿Tienen DPO o textos
   legales revisados por su gestoría?
8. **Fotos propias:** ¿tienen fotos de calidad de la oficina, de los coches con el rótulo o de las motos en pistas?
   ¿Y autorización de los alumnos que salen en las fotos de su web? (no se han usado).
9. **Peugeot 208:** ¿tienen foto? Ahora sale como bloque de color.
10. **Catalán:** ¿quién revisa la traducción? ¿Prefieren el catalán como idioma principal?
11. **Requisito de edad (18 años) en B y A2:** es el general de la DGT; confirmar que quieren mostrarlo.
12. ¿Les interesa algo más allá de la web? Reservas de prácticas, recordatorios por WhatsApp, panel de alumnos.

## Pendiente (oculto en producción, lo lista la build)

- `src/data/pendientes.ts`: horario de oficina y de clases, porcentaje de aprobados, número de alumnos o permisos,
  pago a plazos, nota y número de reseñas de Google.
- `contenido/legal.md` y `legal.ca.md`: razón social y NIF del titular.

## Borradores

- **Textos legales** (aviso legal, privacidad, cookies; es y ca): plantillas básicas sin revisar por el cliente ni
  por un abogado. No publicar en su dominio sin revisarlos.
- **Traducción catalana pendiente de revisar** (`contenido/textos.ca.md`, `contenido/legal.ca.md`): la ha hecho
  Claude. Nunca se avisa en la web.

## Pasar a platinumautoescola.com

1. Quitar la demo: `DEMO = false` en `src/data/sitio.mjs` (quita el `noindex` y abre `robots.txt` con sitemap).
2. DNS del dominio a GitHub Pages (registros A/AAAA del apex y CNAME de `www`); lo hace quien gestione el dominio.
3. `gh variable set SIN_DOMINIO --body 0 -R kAsrAWiiibit/platinum-autoescola-web` y relanzar el flujo (la build
   escribe el CNAME). Activar «Enforce HTTPS» en Pages.
4. Redirecciones de las URL viejas de WordPress (`/permiso-b/`, `/permiso-a2/`, `/permiso-a/`, `/nosotros/`,
   `/contacto/`, `/ca/…`) a las anclas nuevas: GitHub Pages no tiene redirecciones de servidor; hacer páginas con
   `meta refresh` + canónica, o servir desde otro hosting.
5. Lighthouse otra vez (SEO debe dar 100) y alta en Search Console.

## Decisiones tomadas sin consultar

- **Repositorio del CRM:** es `atlas-solutions-web` (Next.js 16 + Prisma + Railway). No aplica a una web estática:
  solo se ha tomado su forma de BACKLOG/SNAPSHOT (que ya es la de xbuyer-web). Todo lo demás, de `xbuyer-web`.
- **Colores:** la marca real es azul acero `#326287` y marino `#1C244B` (favicon y Elementor); el rojo `#f2382c`
  del CSS es el del tema Astra por defecto, no se ha usado. Se añade el plata «platino» por el nombre.
- **Tipografía:** Archivo variable (con anchura) por `@fontsource-variable`, en vez de la Stack Sans que proponía
  el skill: tenía que ir autoalojada como en xbuyer-web, y su ancho recuerda las letras anchas del logo.
- **Fotos descartadas:** las de banco de su web (Freepik: `woman-sitting-car…`, `man-choosed-motorcycles…`, `A.jpg`)
  y todas las de personas (alumnos o personal reconocibles, 449 px y sin autorización conocida). Solo flota y logo.
- **Peugeot 208** sin foto en su web: bloque de color con el nombre.
- **Requisito «Tener 18 años»** en B y A2: dato general de la DGT, comprobable (pregunta 11).
- **Pasos:** solo hechos generales (matrícula y expediente, examen teórico tipo test de la DGT, prácticas, examen
  de circulación con examinador de la DGT; pistas antes en el A2). Nada de número de preguntas ni de fallos.
- **Mapa:** fachada con botón; el iframe de Google solo se carga al pulsar (sin cookies de terceros ni banner).
- **Formulario:** teléfono español de 9 cifras (6, 7, 8 o 9 al principio; acepta +34); «Aún no lo sé» como permiso.
  Abre `wa.me` en una pestaña (o en la misma si el navegador la bloquea).
- **Barra fija del móvil:** se esconde mientras se ven los botones de la portada para no duplicarlos.
- **Títulos:** «40 años en Sabadell» y «Ven a vernos» (más cortos para que no pasen de dos líneas).
- **Lighthouse SEO 69** con la demo: lo baja solo `is-crawlable` (el `noindex` exigido). `DEMO=0` lo deja en 100.
- **Imagen para compartir** generada con sharp (texto en Helvetica del sistema): sustituir por una diseñada si se
  quiere más fina.
- **404** solo en castellano (GitHub Pages sirve una única 404).

## Cómo se probó

- Formulario: Playwright (`playwright-core` en el scratchpad, con el Chrome headless de `~/Library/Caches`),
  `window.open` interceptado y peticiones a `wa.me` y `google.com` bloqueadas: errores con los campos vacíos, foco en
  el primero, mensaje bien montado en es y ca, «Aún no lo sé», mapa bajo demanda, 0 cookies y 0 `localStorage`.
- `npm run enlaces`: 24 `tel:`, 26 `wa.me`, 11 `mailto:`, 144 internos, sin errores.

## Ideas

- Páginas propias por permiso (`/permiso-b/`…) para SEO local cuando se pase al dominio (y para las redirecciones).
- Reservas de prácticas, recordatorios por WhatsApp, panel de alumnos (ver `docs/presentacion.md`).
- Foto o vídeo corto propio en la portada (coche con rótulo, Font i Sagué) si el cliente lo tiene.
- Contadores reales (alumnos, aprobados) solo con datos del cliente.
