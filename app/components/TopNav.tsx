'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const LINKS = [
  { href: '/#productos', label: 'Productos' },
  { href: '/#novedades', label: 'Rebodinos' },
  { href: '/#historia', label: 'Empresa' },
  { href: '/#distribucion', label: 'Distribución' },
  { href: '/#contacto', label: 'Contacto' },
]

const CTA = { href: '/distribuidores', label: 'Quiero distribuir' }

export default function TopNav() {
  const nav = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      nav.current?.classList.toggle('is-stuck', window.scrollY > 40)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('nav-open', open)
    return () => document.body.classList.remove('nav-open')
  }, [open])

  return (
    <header ref={nav} className={`topnav${open ? ' is-open' : ''}`}>
      <div className="topnav__bar">
        <Link href="/" className="topnav__brand" aria-label="Rebozaditos Pop — inicio" onClick={() => setOpen(false)}>
          <Image src="/logos/rebozaditos.png" alt="Rebozaditos Pop" width={791} height={395} preload />
        </Link>

        <nav className="topnav__links" aria-label="Principal">
          {LINKS.map(l => (
            <Link key={l.href} href={l.href} data-cursor="grow">{l.label}</Link>
          ))}
        </nav>

        <Link href={CTA.href} className="pop-btn pop-btn--navy topnav__cta" data-cursor="grow" data-track="nav_quiero_distribuir">
          {CTA.label}
        </Link>

        <button
          className="topnav__burger"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="topnav-mobile"
          onClick={() => setOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
      </div>

      <nav id="topnav-mobile" className="topnav__mobile" aria-label="Principal (móvil)">
        {[...LINKS, CTA].map(l => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
        ))}
      </nav>
    </header>
  )
}
