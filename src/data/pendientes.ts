/** Lo que el cliente aún no ha dado. En producción no se muestra y la build lo lista (src/lib/pendiente.ts). */
import { pendiente, type Dato } from '../lib/pendiente';

export const horarioOficina: Dato<string> = pendiente('horario de oficina');
export const horarioClases: Dato<string> = pendiente('horario de clases');
export const porcentajeAprobados: Dato<string> = pendiente('porcentaje de aprobados');
export const pagoAPlazos: Dato<string> = pendiente('si hay pago a plazos y en qué condiciones');
export const notaGoogle: Dato<string> = pendiente('nota media en Google');
export const resenasGoogle: Dato<string> = pendiente('número de reseñas en Google');
export const alumnos: Dato<string> = pendiente('número de alumnos o permisos tramitados');
