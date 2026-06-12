'use client'
import { useState, useEffect } from 'react'
import { PRODUCTS, CAT_TINTS, PILLS } from '../lib/products'
import ProductCard from './ProductCard'

type CatalogFullProps = {
  id?: string
  showHead?: boolean
}

export default function CatalogFull({ id, showHead = true }: CatalogFullProps) {
  const [activeCat, setActiveCat] = useState('all')
  const [openCard,  setOpenCard]  = useState<string | null>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.card')) setOpenCard(null)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  const sectionBg = activeCat === 'all'
    ? 'var(--bg)'
    : `color-mix(in oklab, ${CAT_TINTS[activeCat]} 10%, var(--bg))`

  const toggle = (pid: string) => setOpenCard(prev => prev === pid ? null : pid)

  return (
    <section className="cats" id={id} aria-label="Categorías" style={{ background: sectionBg }}>
      {showHead && (
        <div className="cats__head">
          <div className="cats__kicker">02 · Catálogo</div>
          <h2 className="cats__title">Cada freezer, un mundo.</h2>
          <p className="cats__lede">Tres líneas, una sola obsesión: que cuando lo abrís, sepa a recién hecho.</p>
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
