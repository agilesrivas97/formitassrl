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
  tint: string
}

// Mismos colores que CAT_TINTS (app/lib/products.ts) usados en la sección de catálogo.
const SHELVES: Shelf[] = [
  { x: 50, y: 23, dir: 'down', eyebrow: 'Quiénes somos', title: 'Desde 2014 elaborando calidad', href: '/#historia', image: '/platos/plato-3.webp', tint: '#E8440A' },
  { x: 50, y: 47, dir: 'down', eyebrow: 'Productos', title: 'Conocé nuestro catálogo de productos', href: '/catalogo', image: '/platos/plato-1.webp', tint: '#0B5C8F' },
  { x: 50, y: 77, dir: 'up', eyebrow: 'Quiero ser distribuidor', title: 'Comercializá nuestros productos', href: '/#distribuidores', image: '/platos/plato-4.webp', tint: '#F5A623' },
]

export default function Inmersiva() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeId, setActiveId] = useState<number | null>(null)
  const [closeStage, setCloseStage] = useState<'idle' | 'closing' | 'shut' | 'opening'>('idle')
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    let alreadySeen = false
    try { alreadySeen = !!sessionStorage.getItem(INTRO_KEY) } catch { }
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
    try { sessionStorage.setItem(INTRO_KEY, '1') } catch { }
    document.body.style.overflow = ''
    setDismissed(true)
  }

  const handleSkip = () => {
    try { sessionStorage.setItem(INTRO_KEY, '1') } catch { }
    setCloseStage('closing')
    setTimeout(() => setCloseStage('shut'), 550)
    setTimeout(() => setCloseStage('opening'), 1650)
    setTimeout(() => { document.body.style.overflow = ''; setDismissed(true) }, 2200)
  }

  if (dismissed) return null

  const active = activeId !== null ? SHELVES[activeId] : null
  const shut = closeStage === 'closing' || closeStage === 'shut'
  const contentHidden = closeStage === 'shut' || closeStage === 'opening'

  return (
    <section className="inmersiva" aria-label="Abrí tu heladera Formitas">
      {!contentHidden && (
        <div className="inmersiva__frame" data-card-open={active ? 'true' : undefined}>
          <video
            ref={videoRef}
            className="inmersiva__video"
            muted
            playsInline
            preload="metadata"
            poster="/video/init_freezer.png"
            onEnded={handleEnded}
          >
            <source src="/video/escena_init.mp4" type="video/mp4" />
          </video>
          {/* Montada desde el arranque (oculta) para que el navegador la precargue
              mientras corre el video — así al terminar hace un crossfade en vez de
              un parpadeo esperando a que la imagen recién empiece a bajar. */}
          <img className="inmersiva__video inmersiva__end-img" data-visible={isOpen} src="/video/end_freezer.png" alt="" />
          <div className="inmersiva__scrim" aria-hidden="true" />

          {!started && (
            <>
              <img className="inmersiva__brand" src="/logos/rebozaditos.png" alt="Rebozaditos Pop" />
              <button className="inmersiva__cta" onClick={handleOpen}>
                <p className="inmersiva__tagline">
                  Cada heladera cuenta una historia.
                  <span className="inmersiva__tagline-sub">Nosotros queremos estar en la tuya.</span>
                </p>
                <span className="inmersiva__cta-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22">
                    <path d="M8 5v14l11-7z" fill="currentColor" />
                  </svg>
                </span>
                Conocé la nuestra
              </button>
            </>
          )}

          <div className="inmersiva__hotspots" data-visible={isOpen}>
            <p className="inmersiva__story">Nosotros te contamos la nuestra en cada estante y queremos acompañarte.</p>
            {SHELVES.map((shelf, i) => (
              <button
                key={shelf.eyebrow}
                className={`hotspot${activeId === i ? ' is-active' : ''}`}
                style={{ left: `${shelf.x}%`, top: `${shelf.y}%`, ['--tint' as string]: shelf.tint }}
                data-label-dir={shelf.dir}
                aria-expanded={activeId === i}
                aria-label={shelf.eyebrow}
                onClick={() => setActiveId(activeId === i ? null : i)}
              >
                <span className="hotspot__ring" aria-hidden="true" />
                <div className="hotspot__dot" aria-hidden="true" />
                <span className="hotspot__label" aria-hidden="true">{shelf.eyebrow}</span>
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
            <button className="inmersiva__enter" onClick={handleSkip} data-cursor="grow">
              Entrar al sitio <span aria-hidden="true">→</span>
            </button>
          )}

          <button className="inmersiva__skip" onClick={handleSkip} data-cursor="grow">
            Saltar <span aria-hidden="true">→</span>
          </button>
        </div>
      )}

      <div className={`inmersiva__curtain${shut ? ' is-shut' : ''}${closeStage === 'shut' ? ' show-logo' : ''}`}>
        <span className="inmersiva__curtain-circle" aria-hidden="true" />
        <img className="inmersiva__curtain-logo" src="/logos/rebozaditos.png" alt="" aria-hidden="true" />
      </div>
    </section>
  )
}
