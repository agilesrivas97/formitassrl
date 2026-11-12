import Image from 'next/image'
import Link from 'next/link'
import { Fragment, type ReactElement } from 'react'
import { IconBook, IconBowl, IconTruck } from './PopIcons'

type Acceso = {
  num: string
  tag: string
  title: string
  desc: string
  cta: string
  href: string
  icon: ReactElement
  variant: 'white' | 'orange' | 'cream'
}

const ACCESOS: Acceso[] = [
  {
    num: '01', tag: 'Productos', title: 'Explorá la variedad',
    desc: 'Líneas, presentaciones y productos en un solo catálogo.',
    cta: 'Ver catálogo', href: '/catalogo', icon: <IconBowl />, variant: 'white',
  },
  {
    num: '02', tag: 'Nosotros', title: 'Conocé nuestra historia',
    desc: 'Quiénes somos, cómo empezamos y qué hay detrás de cada producto.',
    cta: 'Conocenos', href: '#historia', icon: <IconBook />, variant: 'orange',
  },
  {
    num: '03', tag: 'Distribución', title: 'Sumalos a tu negocio',
    desc: 'Cobertura, información y apoyo para hacer crecer la marca.',
    cta: 'Quiero distribuir', href: '/distribuidores', icon: <IconTruck />, variant: 'cream',
  },
]

const BTN: Record<Acceso['variant'], string> = {
  white: 'pop-btn--orange',
  orange: 'pop-btn--outline-light',
  cream: 'pop-btn--navy',
}

export default function TresAccesos() {
  return (
    <section className="accesos" aria-labelledby="accesos-title">
      <div className="accesos__head pop-wrap">
        <div>
          <p className="pop-eyebrow pop-eyebrow--orange">Tres accesos directos</p>
          <h2 id="accesos-title" className="pop-title accesos__title">
            Todo el universo Pop,<br />
            <span className="t-orange">en tres movimientos.</span>
          </h2>
        </div>
        <Image className="accesos__face" src="/logos/logo-cara.png" alt="" width={120} height={120} />
        <p className="accesos__lede">
          Catálogo, historia y distribución.<br />Tres accesos. Una misma marca.
        </p>
      </div>

      <div className="accesos__track pop-wrap">
        <span className="confetti confetti--1" aria-hidden="true" />
        <span className="confetti confetti--2" aria-hidden="true" />
        <span className="confetti confetti--3" aria-hidden="true" />
        <span className="confetti confetti--4" aria-hidden="true" />
        <span className="confetti confetti--5" aria-hidden="true" />
        <svg className="accesos__road" viewBox="0 0 1200 200" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 140 C 200 60 380 200 600 110 S 1000 40 1200 120" stroke="var(--orange)" strokeWidth="16" fill="none" />
          <path d="M0 140 C 200 60 380 200 600 110 S 1000 40 1200 120" stroke="var(--cream)" strokeWidth="3" strokeDasharray="14 16" fill="none" />
          <path d="M0 175 C 220 110 400 220 620 150 S 1000 90 1200 160" stroke="var(--pop-blue)" strokeWidth="5" fill="none" />
        </svg>

        {ACCESOS.map((a, i) => {
          // Toda la tarjeta es el link; el "botón" es solo visual (un solo destino por tarjeta)
          const content = (
            <>
              <span className="acceso__icon">{a.icon}</span>
              <div className="acceso__body">
                <span className="acceso__tag">{a.num} - {a.tag}</span>
                <h3 className="acceso__title">{a.title}</h3>
                <p className="acceso__desc">{a.desc}</p>
                <span className={`pop-btn ${BTN[a.variant]}`} aria-hidden="true">{a.cta}</span>
              </div>
            </>
          )
          const props = {
            className: `acceso acceso--${a.variant}`,
            'aria-label': `${a.cta}: ${a.title}`,
            'data-cursor': 'grow',
          }
          return (
            <Fragment key={a.num}>
              {i > 0 && <span className="accesos__arrow" aria-hidden="true" />}
              {a.href.startsWith('/')
                ? <Link href={a.href} {...props}>{content}</Link>
                : <a href={a.href} {...props}>{content}</a>}
            </Fragment>
          )
        })}
      </div>
    </section>
  )
}
