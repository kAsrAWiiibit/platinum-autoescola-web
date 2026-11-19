/**
 * Prepara las fotos de la web desde los originales de la web actual del cliente (contenido/originales/, fuera
 * de git): recorta cada vehículo de las tiras de tres vistas, quita el blanco sobrante, elimina los metadatos
 * (sharp no los copia) y guarda en src/fotos/ a 2400 px como máximo. Astro sirve después AVIF y WebP.
 * También crea el favicon, el icono de Apple y la imagen para compartir (public/).
 *
 *   node scripts/fotos.mjs [carpeta de originales]
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const ORIGEN = process.argv[2] ?? 'contenido/originales';
const DESTINO = 'src/fotos';
mkdirSync(DESTINO, { recursive: true });

// Tiras de 3 vistas: [archivo, desde, hasta (fracción del ancho), salida]. El Clio va en el centro, entre dos Golf.
const vehiculos = [
  ['FLOTA-COTXES-2-2.png', 0, 1 / 3, 'golf.webp'],
  ['FLOTA-COTXES-2-2.png', 0.375, 0.625, 'clio.webp'],
  ['HORNET-2.jpg', 0, 1 / 3, 'hornet.webp'],
  ['Z400.png', 0, 1 / 3, 'z400.webp'],
];

for (const [archivo, desde, hasta, salida] of vehiculos) {
  const src = join(ORIGEN, archivo);
  const { width, height } = await sharp(src).metadata();
  const left = Math.floor(width * desde);
  const recorte = await sharp(src)
    .extract({ left, top: 0, width: Math.floor(width * hasta) - left, height })
    .flatten({ background: '#ffffff' })
    .toBuffer();
  // Quita el blanco de alrededor y deja un margen igual para todos
  const limpio = await sharp(recorte).trim({ background: '#ffffff', threshold: 18 }).toBuffer();
  const m = await sharp(limpio).metadata();
  const margen = Math.round(Math.max(m.width, m.height) * 0.06);
  await sharp(limpio)
    .extend({ top: margen, bottom: margen, left: margen, right: margen, background: '#ffffff' })
    .resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 92 })
    .toFile(join(DESTINO, salida));
  const f = await sharp(join(DESTINO, salida)).metadata();
  console.log(`${salida}: ${f.width}×${f.height}`);
}

// Logo (blanco sobre transparente), sin metadatos
await sharp(join(ORIGEN, 'LOGO-PNG-NEGATIU-bold-petit.png')).png().toFile(join(DESTINO, 'logo-blanco.png'));

// Iconos: el símbolo del favicon actual (azul) sobre blanco
const simbolo = join(ORIGEN, 'FAVICON.png');
await sharp(simbolo).resize(180, 180, { fit: 'contain', background: '#ffffff' }).flatten({ background: '#ffffff' })
  .png().toFile('public/apple-touch-icon.png');
await sharp(simbolo).resize(48, 48).png().toFile('public/favicon.png');

// Imagen para compartir (1200×630): fondo marino, anillo plata, logo y precios
const logo = await sharp(join(ORIGEN, 'LOGO-PNG-NEGATIU-bold-petit.png')).resize({ height: 300 }).toBuffer();
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#121A3A"/>
  <circle cx="1070" cy="120" r="230" fill="none" stroke="#D9DEE6" stroke-width="84"/>
  <rect x="908" y="-200" width="40" height="700" fill="#121A3A"/>
  <text x="80" y="470" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="54" fill="#ffffff">Carnet de coche y moto en Sabadell</text>
  <text x="80" y="540" font-family="Helvetica, Arial, sans-serif" font-size="34" fill="#C9D3E3">B 955 € · A2 555 € · A 525,87 €</text>
</svg>`;
await sharp(Buffer.from(svg)).composite([{ input: logo, left: 80, top: 70 }]).png().toFile('public/compartir.png');
console.log('Iconos e imagen para compartir en public/');
