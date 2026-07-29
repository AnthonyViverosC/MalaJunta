// Identidad y valores por defecto del negocio.
// El nombre de marca (BRAND) es fijo y forma parte del diseño de MALA JUNTA;
// el resto de datos (contacto, redes, colores) son editables desde el panel.

// Marca fija — se usa en el wordmark del sitio y del panel.
export const BRAND = 'MALA JUNTA';
export const BRAND_TAGLINE = 'Es más que una copa';
export const BRAND_LOGO = '/logo.jpeg';

export const CONFIG_DEFAULT = {
  nombre_negocio: BRAND,
  eslogan: BRAND_TAGLINE,
  logo_url: BRAND_LOGO,
  portada_url: '/cocteles/Polvo de media noche.jpeg',
  direccion: 'Cra. 32A #19-47',
  barrio: 'Zona centro',
  telefonos: '321 679 7668',
  whatsapp: '573216797668',
  maps_url: '',
  info_contacto:
    'Bebe con cabeza: la buena noche también sabe a responsabilidad. Prohibida la venta de bebidas embriagantes a menores de edad.',
  colores: { primario: '#e5b96a', secundario: '#b8843a' },
  redes: { instagram: '', facebook: '', tiktok: '' },
};

// Construye el enlace de WhatsApp con un mensaje predeterminado.
export function construirWhatsapp(numero, nombreNegocio = BRAND) {
  const limpio = (numero || '').replace(/\D/g, '');
  const mensaje = `¡Hola! Quiero hacer una *reserva* en *${nombreNegocio}*`;
  return `https://wa.me/${limpio}?text=${encodeURIComponent(mensaje)}`;
}

// Enlace a Google Maps: usa maps_url si existe, o busca por dirección.
export function construirMapa(config) {
  if (config.maps_url) return config.maps_url;
  const q = [config.direccion, config.barrio].filter(Boolean).join(' ');
  return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);
}
