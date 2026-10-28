import Image from 'next/image'
import Link from 'next/link'
import type { ReactElement } from 'react'
import UniversosIntro from './UniversosIntro'
import { IconMariscos, IconPescado, IconPollo, IconVegetales } from './PopIcons'

type Universo = {
  id: string
  num: string
  label: string
  icon: ReactElement
  variant: 'orange' | 'cream' | 'blue' | 'cream-ring'
}

const UNIVERSOS: Universo[] = [
  { id: 'pollo', num: '01', label: 'Pollo', icon: <IconPollo />, variant: 'orange' },
  { id: 'pescado', num: '02', label: 'Pescado', icon: <IconPescado />, variant: 'cream' },
  { id: 'mariscos', num: '03', label: 'Mariscos', icon: <IconMariscos />, variant: 'blue' },
  { id: 'vegetales', num: '04', label: 'Vegetales y quesos', icon: <IconVegetales />, variant: 'cream-ring' },
]

export default function Universos() {
  return (
    <section className="universos" id="productos" aria-labelledby="universos-title">
      <Image className="universos__face" src="/logos/logo-cara.png" alt="" width={150} height={150} />

      <div className="universos__head pop-wrap">
        <div>
          <p className="pop-eyebrow pop-eyebrow--orange">04 - Explorá nuestros productos</p>
          <h2 id="universos-title" className="pop-title universos__title">
            Cuatro universos.<br />
            <span className="t-orange">Muchas formas</span> de<br />comer rico.
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
          <Link key={u.id} href={`/catalogo/${u.id}`} className={`planeta planeta--${u.variant}`} data-cursor="grow">
            <span className="planeta__ring" aria-hidden="true" />
            <span className="planeta__moon" aria-hidden="true" />
            <span className="planeta__num">{u.num}</span>
            <span className="planeta__icon">{u.icon}</span>
            <span className="planeta__label">{u.label}</span>
            <span className="planeta__cta">Entrar al universo<span aria-hidden="true"> →</span></span>
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
