export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://congeladosformitas.com.ar').replace(/\/$/, '')

export const SITE_NAME = 'Rebozaditos Pop'

export const DEFAULT_TITLE = 'Rebozaditos Pop — Fábrica de rebozados congelados en Mar del Plata'

export const DEFAULT_DESCRIPTION =
  'Fábrica de rebozados congelados en Mar del Plata desde 2014: pollo, pescado, mariscos, vegetales y quesos. Buscamos distribuidores mayoristas en todo el país. Una marca de Congelados Formitas SRL.'

export const DEFAULT_OG_IMAGE = {
  url: '/og-image.jpg',
  width: 1200,
  height: 630,
  alt: 'Rebozaditos Pop — rebozados congelados de Mar del Plata',
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
    streetAddress: 'Ortiz de Zárate 3736',
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
  mariscos: {
    label: 'Mariscos',
    title: 'Mariscos rebozados congelados: rabas y langostinos',
    description:
      'Rabas de calamar y langostinos rebozados congelados Rebozaditos Pop. Ideales para compartir. Hechos en Mar del Plata.',
  },
  vegetales: {
    label: 'Vegetales y quesos',
    title: 'Rebozados congelados de vegetales y quesos',
    description:
      'Barritas de mozzarella, bocaditos de espinaca y medallones con vegetales rebozados congelados. Hechos en Mar del Plata.',
  },
} as const

export type CategoryId = keyof typeof CATEGORIES
