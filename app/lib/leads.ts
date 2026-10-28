// Opciones del formulario de distribuidores. Las comparten el formulario (cliente)
// y /api/contacto (servidor), así lo que se valida es exactamente lo que se ofrece.
export const LEAD_ROLES = {
  distribuidor: 'Distribuidor / mayorista',
  comercio: 'Comercio / supermercado',
  gastronomia: 'Gastronomía',
} as const

export type LeadRole = keyof typeof LEAD_ROLES

export const PROVINCIAS = [
  'Buenos Aires', 'CABA', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes', 'Entre Ríos',
  'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén', 'Río Negro',
  'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero',
  'Tierra del Fuego', 'Tucumán',
] as const

// Campo trampa: invisible para personas, los bots lo completan.
export const HONEYPOT_FIELD = 'website'
