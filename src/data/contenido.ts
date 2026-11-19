/**
 * Todo lo que pinta la landing, ya montado para un idioma: textos (contenido/textos*.md) + datos
 * (src/data/negocio.mjs y pendientes.ts). Las plantillas no escriben texto propio.
 */
import { flota, negocio, permisos, precio } from './negocio.mjs';
import * as p from './pendientes';
import { lista, mayuscula, textos, type Idioma } from '../lib/textos';
import { whatsapp } from '../lib/contacto';

export function contenido(idioma: Idioma) {
  const { t, serie } = textos(idioma);
  const precios = Object.fromEntries(permisos.map((x) => [`precio${x.id}`, precio(x.precio)]));
  const vars = {
    ...precios,
    anos: negocio.anosExperiencia,
    telefono: negocio.telefono.visible,
    whatsapp: negocio.whatsapp.visible,
    email: negocio.email,
  };
  const incluye = (id: string) => t(`Permiso ${id}`, 'Incluye');

  const listaPermisos = permisos.map((x) => {
    const s = `Permiso ${x.id}`;
    const opcional = (etiqueta: string) => {
      try { return t(s, etiqueta); } catch { return null; }
    };
    return {
      id: x.id,
      nombre: t(s, 'Nombre'),
      vehiculo: t(s, 'Vehículo'),
      precio: precio(x.precio),
      notaPrecio: t(s, 'Nota precio'),
      requisito: t(s, 'Requisito'),
      examen: opcional('Examen'),
      incluye: lista(incluye(x.id)).map(mayuscula),
      boton: t('Permisos', 'Botón', { permiso: x.id }),
      whatsapp: whatsapp(t('WhatsApp', 'Mensaje permiso', { permiso: x.id })),
    };
  });

  return {
    idioma,
    sitio: {
      titulo: t('Sitio', 'Título'),
      descripcion: t('Sitio', 'Descripción', vars),
      saltar: t('Sitio', 'Saltar'),
      idioma: t('Sitio', 'Idioma'),
      idiomaEtiqueta: t('Sitio', 'Idioma etiqueta'),
      logo: t('Sitio', 'Logo'),
      menu: [
        { ancla: '#permisos', texto: t('Sitio', 'Menú permisos') },
        { ancla: '#como-funciona', texto: t('Sitio', 'Menú pasos') },
        { ancla: '#preguntas', texto: t('Sitio', 'Menú preguntas') },
        { ancla: '#apuntate', texto: t('Sitio', 'Menú contacto') },
      ],
    },
    portada: {
      titulo: t('Portada', 'Título'),
      titulo2: t('Portada', 'Título 2'),
      entradilla: t('Portada', 'Entradilla', vars),
      whatsapp: t('Portada', 'WhatsApp'),
      whatsappUrl: whatsapp(t('Portada', 'Mensaje')),
      llamar: t('Portada', 'Llamar'),
      llamarEtiqueta: t('Portada', 'Llamar etiqueta', vars),
      preciosEtiqueta: t('Portada', 'Precios etiqueta'),
    },
    barra: {
      whatsapp: t('WhatsApp', 'Barra WhatsApp'),
      llamar: t('WhatsApp', 'Barra llamar'),
      abre: t('WhatsApp', 'Abre'),
    },
    permisos: {
      titulo: t('Permisos', 'Título'),
      entradilla: t('Permisos', 'Entradilla'),
      incluyeTitulo: t('Permisos', 'Incluye'),
      requisitoTitulo: t('Permisos', 'Requisito'),
      precioEtiqueta: t('Permisos', 'Precio etiqueta'),
      lista: listaPermisos,
    },
    pasos: {
      titulo: t('Cómo funciona', 'Título'),
      entradilla: t('Cómo funciona', 'Entradilla'),
      lista: serie('Cómo funciona', 'Paso').map((s) => ({ nombre: s.a, texto: s.b })),
    },
    porque: {
      titulo: t('Por qué Platinum', 'Título', vars),
      experiencia: t('Por qué Platinum', 'Experiencia', vars),
      tratoTitulo: t('Por qué Platinum', 'Trato título'),
      trato: t('Por qué Platinum', 'Trato'),
      flotaTitulo: t('Por qué Platinum', 'Flota título'),
      flota: t('Por qué Platinum', 'Flota'),
      aprobados: p.porcentajeAprobados,
      aprobadosTexto: (porcentaje: string) => t('Por qué Platinum', 'Aprobados', { porcentaje }),
      alumnos: p.alumnos,
      alumnosTexto: (numero: string) => t('Por qué Platinum', 'Alumnos', { numero }),
      vehiculos: flota.map((v) => ({
        ...v,
        etiqueta: t('Por qué Platinum', v.tipo === 'coche' ? 'Coche' : `Moto ${v.permiso}`),
        alt: t('Por qué Platinum', 'Alt', { modelo: v.modelo }),
      })),
    },
    resenas: {
      titulo: t('Reseñas', 'Título'),
      texto: t('Reseñas', 'Texto'),
      boton: t('Reseñas', 'Botón'),
      url: negocio.googleFicha,
      nota: p.notaGoogle,
      numero: p.resenasGoogle,
      notaTexto: (nota: string) => t('Reseñas', 'Nota', { nota }),
      numeroTexto: (numero: string) => t('Reseñas', 'Número', { numero }),
    },
    preguntas: {
      titulo: t('Preguntas', 'Título'),
      lista: serie('Preguntas', 'Pregunta').map((s) => ({
        pregunta: s.a,
        respuesta: s.b.replace(/\{(\w+)\}/g, (m, k) => {
          if (k.startsWith('incluye')) return incluye(k.slice(7));
          if (k in vars) return String(vars[k as keyof typeof vars]);
          throw new Error(`Pregunta «${s.a}»: falta {${k}}`);
        }),
      })),
    },
    plazos: (() => {
      const [pregunta] = t('Preguntas', 'Plazos', { plazos: '' }).split(' | ');
      return { pregunta, respuesta: p.pagoAPlazos };
    })(),
    apuntate: {
      titulo: t('Apúntate', 'Título'),
      entradilla: t('Apúntate', 'Entradilla'),
      nombre: t('Apúntate', 'Nombre'),
      telefono: t('Apúntate', 'Teléfono'),
      permiso: t('Apúntate', 'Permiso'),
      permisoElige: t('Apúntate', 'Permiso elige'),
      permisoDuda: t('Apúntate', 'Permiso duda'),
      opciones: listaPermisos.map((x) => ({ valor: x.id, texto: `${x.nombre} · ${x.precio}` })),
      mensaje: t('Apúntate', 'Mensaje'),
      mensajeAyuda: t('Apúntate', 'Mensaje ayuda'),
      privacidad: t('Apúntate', 'Privacidad'),
      privacidadEnlace: t('Apúntate', 'Privacidad enlace'),
      boton: t('Apúntate', 'Botón'),
      aviso: t('Apúntate', 'Aviso'),
      errores: {
        nombre: t('Apúntate', 'Error nombre'),
        telefono: t('Apúntate', 'Error teléfono'),
        permiso: t('Apúntate', 'Error permiso'),
        privacidad: t('Apúntate', 'Error privacidad'),
      },
      // Las plantillas conservan sus llaves: las rellena el navegador con lo que escribe la persona
      plantilla: textos(idioma).pares('Apúntate').find((x) => x.etiqueta === 'Mensaje plantilla')!.valor,
      plantillaDuda: textos(idioma).pares('Apúntate').find((x) => x.etiqueta === 'Mensaje plantilla duda')!.valor,
      otros: t('Apúntate', 'Otros', vars),
      numeroWhatsapp: negocio.whatsapp.numero,
    },
    ubicacion: {
      titulo: t('Ubicación', 'Título'),
      direccionTitulo: t('Ubicación', 'Dirección título'),
      horarioTitulo: t('Ubicación', 'Horario título'),
      comoLlegar: t('Ubicación', 'Cómo llegar'),
      mapaBoton: t('Ubicación', 'Mapa botón'),
      mapaAviso: t('Ubicación', 'Mapa aviso'),
      mapaTitulo: t('Ubicación', 'Mapa título'),
      horarioOficina: p.horarioOficina,
      horarioClases: p.horarioClases,
      oficinaTexto: (horario: string) => t('Ubicación', 'Horario oficina', { horario }),
      clasesTexto: (horario: string) => t('Ubicación', 'Horario clases', { horario }),
    },
    pie: {
      contacto: t('Pie', 'Contacto'),
      siguenos: t('Pie', 'Síguenos'),
      legal: t('Pie', 'Legal'),
      avisoLegal: t('Pie', 'Aviso legal'),
      privacidad: t('Pie', 'Privacidad'),
      cookies: t('Pie', 'Cookies'),
      copyright: t('Pie', 'Copyright', { año: new Date().getFullYear() }),
      telefono: t('Pie', 'Teléfono'),
      email: t('Pie', 'Email'),
      volver: t('Pie', 'Volver'),
    },
    error404: { titulo: t('404', 'Título'), texto: t('404', 'Texto'), boton: t('404', 'Botón') },
  };
}

export type Contenido = ReturnType<typeof contenido>;
