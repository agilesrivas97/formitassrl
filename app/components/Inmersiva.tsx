'use client'
import { useEffect, useRef, useState } from 'react'

const INTRO_KEY = 'formitas-intro-seen'

type Shelf = {
  x: number
  y: number
  dir: 'up' | 'down'
  eyebrow: string
  title: string
  href: string
  image: string
}

const SHELVES: Shelf[] = [
  { x: 50, y: 18, dir: 'down', eyebrow: 'Quiénes somos', title: 'Desde 2014 elaborando calidad', href: '/#historia', image: '/platos/plato-3.webp' },
  { x: 50, y: 50, dir: 'down', eyebrow: 'Productos', title: 'Conocé nuestro catálogo de productos', href: '/catalogo', image: '/platos/plato-1.webp' },
  { x: 50, y: 84, dir: 'up', eyebrow: 'Quiero ser distribuidor', title: 'Comercializá nuestros productos', href: '/#distribuidores', image: '/platos/plato-4.webp' },
]

export default function Inmersiva() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeId, setActiveId] = useState<number | null>(null)
  const [leaving, setLeaving] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    let alreadySeen = false
    try { alreadySeen = !!sessionStorage.getItem(INTRO_KEY) } catch {}
    if (alreadySeen) {
      setDismissed(true)
      return
    }
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.hotspot')) setActiveId(null)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  const handleOpen = () => {
    setStarted(true)
    const video = videoRef.current
    if (!video) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      video.currentTime = video.duration || 0
      setIsOpen(true)
      return
    }

    video.play()
  }

  const handleEnded = () => setIsOpen(true)

  const handleDismiss = () => {
    try { sessionStorage.setItem(INTRO_KEY, '1') } catch {}
    document.body.style.overflow = ''
    setLeaving(true)
    setTimeout(() => setDismissed(true), 500)
  }

  if (dismissed) return null

  const active = activeId !== null ? SHELVES[activeId] : null

  return (
    <section className={`inmersiva${leaving ? ' is-leaving' : ''}`} aria-label="Abrí tu heladera Formitas">
      <div className="inmersiva__frame" data-card-open={active ? 'true' : undefined}>
        <video
          ref={videoRef}
          className="inmersiva__video"
          muted
          playsInline
          preload="metadata"
          poster="/video/heladera-open-poster.webp"
          onEnded={handleEnded}
        >
          <source src="/video/heladera-open.mp4" type="video/mp4" />
        </video>

        {!started && (
          <button className="inmersiva__cta" onClick={handleOpen}>
            <span className="inmersiva__cta-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22">
                <path d="M8 5v14l11-7z" fill="currentColor" />
              </svg>
            </span>
            Tocá para abrir tu heladera
          </button>
        )}

        <div className="inmersiva__hotspots" data-visible={isOpen}>
          {SHELVES.map((shelf, i) => (
            <button
              key={shelf.eyebrow}
              className={`hotspot${activeId === i ? ' is-active' : ''}`}
              style={{ left: `${shelf.x}%`, top: `${shelf.y}%` }}
              aria-expanded={activeId === i}
              aria-label={shelf.eyebrow}
              onClick={() => setActiveId(activeId === i ? null : i)}
            >
              <span className="hotspot__ring" aria-hidden="true" />
              <span className="hotspot__dot" aria-hidden="true" />
            </button>
          ))}

          {active && (
            <div
              className={`hotspot__card hotspot__card--${active.dir}`}
              style={{ ['--hx' as string]: `${active.x}%`, ['--hy' as string]: `${active.y}%` }}
              role="dialog"
            >
              <div className="hotspot__glass" aria-hidden="true">
                <img src={active.image} alt="" />
              </div>
              <div className="hotspot__eyebrow">{active.eyebrow}</div>
              <p className="hotspot__title">{active.title}</p>
              <a href={active.href} className="hotspot__link" data-cursor="grow" onClick={handleDismiss}>
                Ver más <span aria-hidden="true">→</span>
              </a>
            </div>
          )}
        </div>

        {isOpen && (
          <button className="inmersiva__enter" onClick={handleDismiss} data-cursor="grow">
            Entrar al sitio <span aria-hidden="true">→</span>
          </button>
        )}

        <button className="inmersiva__skip" onClick={handleDismiss} data-cursor="grow">
          Saltar <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  )
}
