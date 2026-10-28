'use client'
import { useState, useEffect } from 'react'
import { PRODUCTS, PILLS } from '../lib/products'
import ProductCard from './ProductCard'

type CatalogFullProps = {
  id?: string
  showHead?: boolean
  initialCat?: string
}

export default function CatalogFull({ id, showHead = true, initialCat = 'all' }: CatalogFullProps) {
  const [activeCat, setActiveCat] = useState(initialCat)
  const [openCard,  setOpenCard]  = useState<string | null>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.card')) setOpenCard(null)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  const toggle = (pid: string) => setOpenCard(prev => prev === pid ? null : pid)

  return (
    <section className="cats" id={id} aria-label="Categorías">
      {showHead && (
        <div className="cats__head">
          <div className="cats__kicker">Catálogo · Rebozaditos Pop</div>
          <h2 className="cats__title">Cuatro universos. <span>Muchas formas de comer rico.</span></h2>
          <p className="cats__lede">Todas las líneas, variedades y formatos en un solo lugar.</p>
        </div>
      )}

      <nav className="cats__nav" aria-label="Filtros de categoría">
        {PILLS.map(p => (
          <button
            key={p.id}
            className={`pill${activeCat === p.id ? ' is-active' : ''}`}
            style={p.accent ? { ['--accent' as string]: p.accent } : undefined}
            onClick={() => { setActiveCat(p.id); setOpenCard(null) }}
          >
            <span>{p.label}</span>
          </button>
        ))}
      </nav>

      <div className="grid" data-active={activeCat}>
        {PRODUCTS.map(prod => (
          <ProductCard
            key={prod.id}
            prod={prod}
            open={openCard === prod.id}
            hidden={activeCat !== 'all' && prod.cat !== activeCat}
            onToggle={() => toggle(prod.id)}
          />
        ))}
      </div>
    </section>
  )
}
