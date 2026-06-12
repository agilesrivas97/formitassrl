import rawProducts from '../../data/products.json'

export const CAT_TINTS: Record<string, string> = {
  pollo:     '#F5A623',
  pescado:   '#0B5C8F',
  bocaditos: '#E8440A',
}

export type ProdData = {
  id: string; code: string; cat: string; badge: string; shape: string
  title: string; image?: string; packSize: string; packs: string[]
  cals: number; porciones: number
  coccion: { label: string; val: string; unit: string }
  attr: string
}

export type Prod = ProdData & { accent: string }

export const PRODUCTS: Prod[] = (rawProducts as ProdData[]).map(p => ({
  ...p,
  accent: CAT_TINTS[p.cat] ?? '#888',
}))

export const PILLS = [
  { id: 'all',       label: 'Todo',      accent: undefined },
  { id: 'pollo',     label: 'Pollo',     accent: '#F5A623' },
  { id: 'pescado',   label: 'Pescado',   accent: '#0B5C8F' },
  { id: 'bocaditos', label: 'Bocaditos', accent: '#E8440A' },
]
