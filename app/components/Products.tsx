'use client'
import { useState } from 'react'
import Link from 'next/link'
import { PRODUCTS } from '../lib/products'
import ProductCard from './ProductCard'
import CatalogFull from './CatalogFull'

const PREVIEW_CATS = ['pollo', 'pescado', 'bocaditos']
const PREVIEW_PRODUCTS = PREVIEW_CATS
  .map(cat => PRODUCTS.find(p => p.cat === cat))
  .filter((p): p is NonNullable<typeof p> => Boolean(p))

export default function Products() {
  const [openCard, setOpenCard] = useState<string | null>(null)
  const toggle = (pid: string) => setOpenCard(prev => prev === pid ? null : pid)

  return (
    <div id="productos">
      <div className="cats__full">
        <CatalogFull showHead />
      </div>

      <section className="cats cats__preview" aria-label="Categorías">
        <div className="cats__head">
          <div className="cats__kicker">02 · Catálogo</div>
          <h2 className="cats__title">Cada freezer, un mundo.</h2>
          <p className="cats__lede">Tres líneas, una sola obsesión: que cuando lo abrís, sepa a recién hecho.</p>
        </div>

        <div className="grid grid--preview">
          {PREVIEW_PRODUCTS.map(prod => (
            <ProductCard
              key={prod.id}
              prod={prod}
              open={openCard === prod.id}
              onToggle={() => toggle(prod.id)}
            />
          ))}
        </div>

        <Link href="/catalogo" className="btn btn--primary cats__more">
          Ver catálogo completo <span aria-hidden="true">→</span>
        </Link>
      </section>
    </div>
  )
}
