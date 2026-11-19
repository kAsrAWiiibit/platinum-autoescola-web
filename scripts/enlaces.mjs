/**
 * Comprueba los enlaces de contacto y los internos de la build (dist/), sin abrir ninguno:
 * - tel: solo +34937178612; wa.me solo al 34657914509 (con ?text= bien codificado); mailto: solo
 *   platinumautoescola@gmail.com (y ni rastro de la errata «platinumautorescola» de la web actual).
 * - Cada enlace interno apunta a una página o archivo que existe en dist/ (con la ruta base, si la hay).
 * - Ningún «[pendiente» ni «{llave}» sin rellenar en el HTML.
 *
 *   npm run enlaces            (después de npm run build)
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

import { negocio } from '../src/data/negocio.mjs';

const DIST = 'dist';
const BASE = (process.env.BASE_PATH ?? '/').replace(/\/?$/, '/');
const TEL = `tel:${negocio.telefono.e164}`;
const WA = `https://wa.me/${negocio.whatsapp.numero}`;
const MAIL = `mailto:${negocio.email}`;

const html = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? html(p) : p.endsWith('.html') ? [p] : [];
  });

const errores = [];
const cuenta = { tel: 0, wa: 0, mail: 0, internos: 0 };
const decodifica = (s) => s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');

for (const archivo of html(DIST)) {
  const pagina = archivo.slice(DIST.length);
  const src = readFileSync(archivo, 'utf8');
  if (src.includes('[pendiente')) errores.push(`${pagina}: «[pendiente» visible`);
  if (/platinumautorescola/i.test(src)) errores.push(`${pagina}: errata «platinumautorescola»`);
  const texto = src.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');
  const llave = texto.match(/>[^<]*\{[a-zñ]+\}[^<]*</i);
  if (llave) errores.push(`${pagina}: llave sin rellenar: ${llave[0].slice(0, 80)}`);

  for (const [, crudo] of src.matchAll(/href="([^"]+)"/g)) {
    const href = decodifica(crudo);
    if (href.startsWith('tel:')) {
      cuenta.tel++;
      if (href !== TEL) errores.push(`${pagina}: teléfono mal: ${href}`);
    } else if (href.startsWith('mailto:')) {
      cuenta.mail++;
      if (href !== MAIL) errores.push(`${pagina}: email mal: ${href}`);
    } else if (/wa\.me|whatsapp\.com/.test(href)) {
      cuenta.wa++;
      const [url, query] = href.split('?');
      if (url !== WA) errores.push(`${pagina}: WhatsApp mal: ${href}`);
      if (query) {
        const p = new URLSearchParams(query);
        const t = p.get('text');
        if ([...p.keys()].join() !== 'text' || !t?.trim()) errores.push(`${pagina}: WhatsApp con parámetros raros: ${href}`);
        else if (/[{}]|undefined|null/.test(t)) errores.push(`${pagina}: mensaje de WhatsApp sin rellenar: ${t}`);
      }
    } else if (href.startsWith('/') || href.startsWith('#')) {
      cuenta.internos++;
      const [ruta, ancla] = href.split('#');
      let destino = archivo;
      if (ruta) {
        if (!ruta.startsWith(BASE)) { errores.push(`${pagina}: enlace interno sin la base ${BASE}: ${href}`); continue; }
        const rel = ruta.slice(BASE.length);
        destino = join(DIST, rel, rel === '' || rel.endsWith('/') ? 'index.html' : '');
        if (!existsSync(destino)) { errores.push(`${pagina}: enlace roto: ${href}`); continue; }
      }
      if (ancla && !readFileSync(destino, 'utf8').includes(`id="${ancla}"`)) errores.push(`${pagina}: ancla rota: ${href}`);
    }
  }
  // El formulario monta el enlace con el número de los datos
  for (const [, json] of src.matchAll(/data-apuntate="([^"]+)"/g)) {
    const d = JSON.parse(decodifica(json));
    if (d.numero !== negocio.whatsapp.numero) errores.push(`${pagina}: el formulario usa otro número: ${d.numero}`);
  }
}

console.log(`tel: ${cuenta.tel} · wa.me: ${cuenta.wa} · mailto: ${cuenta.mail} · internos: ${cuenta.internos}`);
if (errores.length) {
  console.error(`\n${errores.length} error(es):\n${errores.map((e) => `  - ${e}`).join('\n')}`);
  process.exit(1);
}
console.log('Todos los enlaces bien.');
