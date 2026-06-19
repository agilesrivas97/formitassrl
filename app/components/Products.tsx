import Link from 'next/link'
import Image from 'next/image'
import { CAT_TINTS } from '../lib/products'

const TILES = [
  { id: 'pollo', label: 'Pollo', image: '/platos/plato-3.webp', href: '/catalogo/pollo' },
  { id: 'pescado', label: 'Pescado', image: '/platos/plato-2.webp', href: '/catalogo/pescado' },
  { id: 'especiales', label: 'Especiales', image: '/platos/plato-4.webp', href: '/catalogo/especiales' },
]

export default function Products() {
  return (
    <section className="cats" id="productos" aria-label="Categorías">
      <div className="cats__head">
        <div className="cats__kicker">02 · Catálogo</div>
        <h2 className="cats__title">Cada freezer, un mundo.</h2>
        <p className="cats__lede">Tres líneas, una sola obsesión: que cuando lo abrís, sepa a recién hecho.</p>
      </div>

      <div className="cats__tiles">
        {TILES.map(tile => (
          <Link
            key={tile.id}
            href={tile.href}
            className="cat-tile"
            data-cursor="grow"
            style={{ ['--tint' as string]: CAT_TINTS[tile.id] }}
          >
            <Image
              src={tile.image}
              alt={`Categoría ${tile.label}`}
              fill
              className="cat-tile__img"
              sizes="(max-width: 768px) 33vw, 360px"
            />
            <div className="cat-tile__overlay" />
            <span className="cat-tile__label">
              {tile.label} <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
