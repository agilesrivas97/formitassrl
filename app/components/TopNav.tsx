'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LINKS = [
  { href: '/#productos', label: 'Productos' },
  { href: '/#historia', label: 'Historia' },
  { href: '/#proximamente', label: 'Próximamente' },
  { href: '/#feed', label: 'Comunidad' },
  { href: '/#distribuidores', label: 'Distribuidores', cta: true },
]

export default function TopNav() {
  const nav = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const solid = pathname !== '/'

  useEffect(() => {
    const onScroll = () => {
      nav.current?.classList.toggle('is-stuck', window.scrollY > 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('nav-open', open)
    return () => document.body.classList.remove('nav-open')
  }, [open])

  return (
    <>
      <header ref={nav} className={`topnav${solid ? ' topnav--solid' : ''}${open ? ' is-open' : ''}`}>
        <Link href="/" className="topnav__brand" onClick={() => setOpen(false)}>
          <span className="topnav__mark" aria-hidden="true">
            <Image src="/logos/logo-cara.png" alt="" width={40} height={40} />
          </span>
          <span className="topnav__word">
            Formitas<small style={{display:'block',fontWeight:500,fontSize:'.6em',opacity:.6,letterSpacing:'.06em'}}>Mar del Plata</small>
          </span>
        </Link>

        <nav className="topnav__links">
          {LINKS.map(l => (
            <Link key={l.href} href={l.href} className={l.cta ? 'topnav__cta' : undefined} data-cursor="grow">
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          className="topnav__burger"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
      </header>

      <nav className={`topnav__mobile${open ? ' is-open' : ''}`}>
        {LINKS.map(l => (
          <Link
            key={l.href}
            href={l.href}
            className={l.cta ? 'topnav__cta' : undefined}
            data-cursor="grow"
            onClick={() => setOpen(false)}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </>
  )
}
