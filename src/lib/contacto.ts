/** Enlaces de contacto: los únicos sitios donde se montan tel:, wa.me y mailto: */
import { negocio } from '../data/negocio.mjs';

export const tel = `tel:${negocio.telefono.e164}`;
export const mailto = `mailto:${negocio.email}`;
export const whatsapp = (mensaje?: string) =>
  `https://wa.me/${negocio.whatsapp.numero}${mensaje ? `?text=${encodeURIComponent(mensaje)}` : ''}`;
