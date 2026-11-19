// Datos del negocio (los ha dado el cliente o salen de su web actual). Nada inventado: lo que falta va con
// pendiente() en src/data/pendientes.ts. Es .mjs para que también lo lean los scripts de Node.
export const negocio = {
  nombre: 'Autoescola Platinum',
  ciudad: 'Sabadell',
  direccion: { calle: 'Carrer de Font i Sagué, 14', cp: '08206', ciudad: 'Sabadell', provincia: 'Barcelona', pais: 'ES' },
  telefono: { visible: '93 717 86 12', e164: '+34937178612' },
  whatsapp: { visible: '657 914 509', numero: '34657914509' },
  email: 'platinumautoescola@gmail.com',
  instagram: { usuario: 'autoescolaplatinum', url: 'https://www.instagram.com/autoescolaplatinum/' },
  // La portada actual dice 40 y la página Nosotros, «más de 20»: se usa 40 (pregunta abierta en el BACKLOG)
  anosExperiencia: 40,
  // Ficha de Google: búsqueda por nombre en Maps (no se ha encontrado la URL directa de la ficha; ver BACKLOG)
  googleFicha: 'https://www.google.com/maps/search/?api=1&query=Autoescola+Platinum+Sabadell',
  comoLlegar: 'https://www.google.com/maps/dir/?api=1&destination=Carrer+de+Font+i+Sagu%C3%A9+14%2C+08206+Sabadell',
  mapaEmbed: 'https://www.google.com/maps?q=Carrer+de+Font+i+Sagu%C3%A9+14%2C+08206+Sabadell&output=embed',
};

/** Precios con IVA (en euros). El orden es el de las tarjetas. */
export const permisos = [
  { id: 'B', vehiculo: 'coche', precio: 955 },
  { id: 'A2', vehiculo: 'moto', precio: 555 },
  { id: 'A', vehiculo: 'moto', precio: 525.87 },
];

/** Flota: foto en src/fotos/ o null (bloque de color con el nombre) */
export const flota = [
  { id: 'golf', modelo: 'Volkswagen Golf', tipo: 'coche', permiso: 'B', foto: 'golf.webp' },
  { id: 'clio', modelo: 'Renault Clio', tipo: 'coche', permiso: 'B', foto: 'clio.webp' },
  { id: '208', modelo: 'Peugeot 208', tipo: 'coche', permiso: 'B', foto: null },
  { id: 'hornet', modelo: 'Honda CB600 Hornet', tipo: 'moto', permiso: 'A', foto: 'hornet.webp' },
  { id: 'z400', modelo: 'Kawasaki Z400', tipo: 'moto', permiso: 'A2', foto: 'z400.webp' },
];

export const precio = (n) =>
  new Intl.NumberFormat('es-ES', { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 }).format(n) + ' €';
