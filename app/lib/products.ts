import rawProducts from '../../data/products.json'

export const CAT_TINTS: Record<string, string> = {
  pollo:     '#FF671B',
  pescado:   '#0967BD',
  mariscos:  '#082A54',
  vegetales: '#2E7D4F',
}

export type ProdData = {
  id: string; code: string; cat: string; badge: string; shape: string
  title: string; image?: string; packSize: string; packs: string[]
  cals: number; porciones: number
  coccion: { label: string; val: string; unit: string }
  attr: string
}

export type Prod = ProdData & { accent: string; slug: string }

// "Medallón de pollo con jamón y mozzarella" → "medallon-de-pollo-con-jamon-y-mozzarella"
export const slugify = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export const PRODUCTS: Prod[] = (rawProducts as ProdData[]).map(p => ({
  ...p,
  accent: CAT_TINTS[p.cat] ?? '#888',
  slug: slugify(p.title),
}))

export const getProduct = (slug: string) => PRODUCTS.find(p => p.slug === slug)

export const productHref = (p: Pick<Prod, 'slug'>) => `/producto/${p.slug}`

export const PILLS = [
  { id: 'all',        label: 'Todo',       accent: undefined },
  { id: 'pollo',      label: 'Pollo',              accent: CAT_TINTS.pollo },
  { id: 'pescado',    label: 'Pescado',            accent: CAT_TINTS.pescado },
  { id: 'mariscos',   label: 'Mariscos',           accent: CAT_TINTS.mariscos },
  { id: 'vegetales',  label: 'Vegetales y quesos', accent: CAT_TINTS.vegetales },
]
