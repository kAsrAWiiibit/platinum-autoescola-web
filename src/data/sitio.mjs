// Dominio propio de la web (sin https://). Con él, la build escribe el CNAME para GitHub Pages y lo usa en las
// URL canónicas, hreflang y la imagen para compartir.
// Mientras el DNS no apunte a GitHub Pages, el despliegue se hace con SIN_DOMINIO=1 (variable del repositorio):
// la web se sirve en https://<usuario>.github.io/<repositorio>/ con esa ruta base.
export const DOMINIO_PROPIO = 'platinumautoescola.com';
// Vista previa (VISTA_PREVIA=1 con SITE_URL y BASE_PATH): build fuera de buscadores para publicarla aparte
export const VISTA_PREVIA = process.env.VISTA_PREVIA === '1';
// Demo para el cliente: fuera de buscadores (noindex en cada página y robots.txt con Disallow) para no competir
// con su web actual. Quitar (DEMO = false) antes de publicar en su dominio.
export const DEMO = process.env.DEMO !== '0';
export const DOMINIO = process.env.SIN_DOMINIO === '1' || VISTA_PREVIA ? null : DOMINIO_PROPIO;
/** Sin indexar: demo o vista previa */
export const SIN_INDEXAR = DEMO || VISTA_PREVIA;
