/** Rutas de cada página en los dos idiomas (con la base del sitio: GitHub Pages sin dominio la sirve en /repo/) */
import type { Idioma } from './textos';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
export const ruta = (path: string) => `${BASE}${path}`;

export const PAGINAS = {
  inicio: { es: '/', ca: '/ca/' },
  avisoLegal: { es: '/aviso-legal/', ca: '/ca/avis-legal/' },
  privacidad: { es: '/privacidad/', ca: '/ca/privacitat/' },
  cookies: { es: '/cookies/', ca: '/ca/galetes/' },
} as const;
export type Pagina = keyof typeof PAGINAS;

export const enlace = (pagina: Pagina, idioma: Idioma, ancla = '') => ruta(PAGINAS[pagina][idioma]) + ancla;
