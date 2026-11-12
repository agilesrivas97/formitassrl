import Image from 'next/image'
import Link from 'next/link'
import type { ReactElement } from 'react'
import UniversosIntro from './UniversosIntro'
import { CAT_TINTS } from '../lib/products'
import { IconMariscos, IconPescado, IconPollo, IconVegetales } from './PopIcons'

type Universo = {
  id: string
  num: string
  label: string
  icon: ReactElement
  image: string
}

const UNIVERSOS: Universo[] = [
  { id: 'pollo', num: '01', label: 'Pollo', icon: <IconPollo />, image: '/platos/plato-3.webp' },
  { id: 'mariscos', num: '02', label: 'Mariscos', icon: <IconMariscos />, image: '/platos/plato-4.webp' },
  { id: 'pescado', num: '03', label: 'Pescado', icon: <IconPescado />, image: '/platos/plato-2.webp' },
  { id: 'vegetales', num: '04', label: 'Vegetales y quesos', icon: <IconVegetales />, image: '/platos/plato-1.webp' },
]

// Colores de fondo de los círculos: pollo y pescado vienen de la versión anterior del catálogo;
// mariscos y vegetales siguen la paleta actual. Solo afecta a esta sección (no al catálogo).
const TINTS: Record<string, string> = {
  ...CAT_TINTS,
  pollo: '#F5A623',
  pescado: '#0B5C8F',
}

export default function Universos() {
  return (
    <section className="universos" id="productos" aria-labelledby="universos-title">
      <Image className="universos__face" src="/logos/logo-cara.png" alt="" width={150} height={150} />

      <div className="universos__head pop-wrap">
        <div>
          <p className="pop-eyebrow pop-eyebrow--orange">04 - Explorá nuestros productos</p>
          <h2 id="universos-title" className="pop-title universos__title">
            Cuatro universos.<br />
            <span className="t-orange">Muchas formas</span><br />de comer rico.
          </h2>
        </div>
        <p className="universos__lede">
          Pollo, pescado, mariscos, vegetales y quesos. Cuatro recorridos para encontrar eso que
          estás buscando, en tu mesa o en tu negocio.
        </p>
      </div>

      <UniversosIntro />
      <div className="universos__orbit pop-wrap">
        <svg className="universos__rings" viewBox="0 0 1200 400" preserveAspectRatio="none" aria-hidden="true">
          <ellipse cx="600" cy="200" rx="580" ry="150" stroke="var(--cream)" strokeOpacity=".35" strokeWidth="2" strokeDasharray="10 14" fill="none" />
          <ellipse cx="600" cy="210" rx="520" ry="110" stroke="var(--pop-blue)" strokeWidth="3" fill="none" transform="rotate(-6 600 210)" />
          <path d="M60 300 C 300 380 700 360 900 220" stroke="var(--orange)" strokeWidth="4" fill="none" />
        </svg>

        {UNIVERSOS.map(u => (
          <Link key={u.id} href={`/catalogo/${u.id}`} className={`planeta planeta--${u.id}`} style={{ ['--tint' as string]: TINTS[u.id] }} data-cursor="grow">
            <span className="planeta__bg" aria-hidden="true">
              <Image src={u.image} alt="" fill sizes="(max-width: 639px) 100vw, (max-width: 1079px) 340px, 320px" />
            </span>
            <span className="planeta__ring" aria-hidden="true" />
            <span className="planeta__moon" aria-hidden="true" />
            <span className="planeta__icon">{u.icon}</span>
            <span className="planeta__label">{u.label}</span>
          </Link>
        ))}
      </div>

      <div className="respaldo pop-wrap">
        <div className="respaldo__card">
          <p className="respaldo__brand">
            <span>Congelados</span>
            <span className="t-orange">Formitas</span> <small>SRL</small>
          </p>
          <div className="respaldo__text">
            <p className="respaldo__kicker">El respaldo detrás de todo el universo</p>
            <p>Elaborando calidad desde 2014</p>
          </div>
          <a href="#historia" className="pop-btn pop-btn--outline-blue" data-cursor="grow">Conocé la empresa</a>
        </div>
      </div>
    </section>
  )
}
