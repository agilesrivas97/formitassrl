export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://congeladosformitas.com.ar').replace(/\/$/, '')

export const SITE_NAME = 'Congelados Formitas'

export const DEFAULT_TITLE = 'Congelados Formitas — Rebozados de Mar del Plata'

export const DEFAULT_DESCRIPTION =
  'Rebozados congelados premium hechos en Mar del Plata: pollo, pescado y bocaditos. Listos en 12 minutos al horno. Distribuimos en toda la costa atlántica y AMBA.'

export const DEFAULT_OG_IMAGE = {
  url: '/platos/plato-3.webp',
  width: 1024,
  height: 1024,
  alt: 'Medallones rebozados Formitas servidos en plato',
}

export const BUSINESS = {
  name: 'Congelados Formitas SRL',
  url: SITE_URL,
  logo: `${SITE_URL}/logos/rebozaditos.png`,
  telephone: '+54-9-223-604-5371',
  email: 'info@congeladosformitas.com.ar',
  foundingDate: '2014',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Camet 3500',
    addressLocality: 'Mar del Plata',
    addressRegion: 'Buenos Aires',
    postalCode: 'B7600',
    addressCountry: 'AR',
  },
  sameAs: [
    'https://instagram.com/rebozaditospop',
    'https://wa.me/5492236045371',
  ],
  openingHours: 'Mo-Fr 08:00-17:00',
} as const

export const CATEGORIES = {
  pollo: {
    label: 'Pollo',
    title: 'Rebozados de pollo congelados',
    description:
      'Medallones, formitas y nuggets de pollo rebozados congelados. Premium, listos en 12 minutos al horno. Hechos en Mar del Plata.',
  },
  pescado: {
    label: 'Pescado',
    title: 'Rebozados de pescado congelados',
    description:
      'Filets y medallones de merluza rebozados, capturados en el Atlántico Sur. Congelados, listos en 12 minutos al horno.',
  },
  bocaditos: {
    label: 'Bocaditos',
    title: 'Bocaditos congelados: rabas, langostinos y barritas',
    description:
      'Bocaditos congelados Formitas: rabas de calamar, langostinos y barritas de muzzarella rebozados. Ideales para compartir.',
  },
} as const

export type CategoryId = keyof typeof CATEGORIES
