/**
 * Lee contenido/textos.md (castellano) y contenido/textos.ca.md (catalán), la única fuente de los textos de la
 * web. Entiende su forma: títulos (# y ##) y viñetas «- Etiqueta: valor». Si falta algo, la build falla diciendo
 * qué, en vez de inventarlo o dejar un hueco. Las llaves {…} se rellenan con rellena().
 */
import es from '../../contenido/textos.md?raw';
import ca from '../../contenido/textos.ca.md?raw';

export type Idioma = 'es' | 'ca';
export const IDIOMAS: Idioma[] = ['es', 'ca'];

interface Seccion { titulo: string; vinetas: string[] }

function leer(md: string): Seccion[] {
  const secciones: Seccion[] = [];
  for (const linea of md.split('\n')) {
    const titulo = linea.match(/^#{1,2}\s+(.+)$/);
    if (titulo) secciones.push({ titulo: titulo[1].trim(), vinetas: [] });
    else if (linea.startsWith('- ') && secciones.length) secciones.at(-1)!.vinetas.push(linea.slice(2).trim());
  }
  return secciones;
}

const fuentes: Record<Idioma, { archivo: string; secciones: Seccion[] }> = {
  es: { archivo: 'contenido/textos.md', secciones: leer(es) },
  ca: { archivo: 'contenido/textos.ca.md', secciones: leer(ca) },
};

/** Textos de un idioma */
export function textos(idioma: Idioma) {
  const { archivo, secciones } = fuentes[idioma];
  const falta = (que: string): never => {
    throw new Error(`${archivo}: no encuentro ${que}`);
  };
  const seccion = (titulo: string) => secciones.find((s) => s.titulo === titulo) ?? falta(`la sección «${titulo}»`);
  const pares = (titulo: string) =>
    seccion(titulo).vinetas.map((v) => {
      const i = v.indexOf(': ');
      return i < 0 ? { etiqueta: v, valor: '' } : { etiqueta: v.slice(0, i), valor: v.slice(i + 2) };
    });
  /** Valor de la viñeta «Etiqueta: …», con las llaves rellenas */
  const t = (titulo: string, etiqueta: string, vars: Record<string, string | number> = {}) =>
    rellena(pares(titulo).find((p) => p.etiqueta === etiqueta)?.valor ?? falta(`«${etiqueta}» en «${titulo}»`), vars, `${archivo} «${titulo}» › «${etiqueta}»`);
  /** Viñetas «Etiqueta N: a | b», en orden */
  const serie = (titulo: string, prefijo: string) =>
    pares(titulo)
      .filter((p) => p.etiqueta.startsWith(`${prefijo} `))
      .map((p) => {
        const [a, b = ''] = p.valor.split(' | ');
        return { etiqueta: p.etiqueta, a, b };
      });
  return { t, pares, serie, falta };
}

/** Rellena {clave}. Si queda alguna sin valor, falla (nunca sale «{clave}» en la web). */
export function rellena(texto: string, vars: Record<string, string | number>, donde = 'texto') {
  return texto.replace(/\{([^}]+)\}/g, (m, k) => {
    if (!(k in vars)) throw new Error(`${donde}: falta el valor de {${k}}`);
    return String(vars[k]);
  });
}

/** «a, b, c y d.» → ['a', 'b', 'c', 'd'] (también con «i» en catalán); no corta dentro de paréntesis */
export function lista(texto: string) {
  const partes = cortar(texto.replace(/\.$/, ''), ', ');
  const ultima = partes.pop()!;
  const fin = [' y ', ' i '].map((c) => cortar(ultima, c)).find((p) => p.length > 1) ?? [ultima];
  return [...partes, ...fin];
}

/** Corta por un separador fuera de paréntesis */
function cortar(texto: string, sep: string) {
  const partes: string[] = [];
  let nivel = 0, actual = '';
  for (let i = 0; i < texto.length; i++) {
    if (texto[i] === '(') nivel++;
    if (texto[i] === ')') nivel--;
    if (nivel === 0 && texto.startsWith(sep, i)) { partes.push(actual); actual = ''; i += sep.length - 1; continue; }
    actual += texto[i];
  }
  return [...partes, actual];
}

export const mayuscula = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
