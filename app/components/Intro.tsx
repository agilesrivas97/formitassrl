'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

// Contrato con el resto del sitio (lo usa HeroMedia para arrancar su animación)
export const INTRO_DONE_EVENT = 'pop:intro-done'

// Solo se muestra en la primera visita (y de nuevo pasada una semana). El script inline de
// layout.tsx lee esta clave antes de pintar y agrega html.intro-seen, que oculta la intro por CSS.
export const INTRO_STORAGE_KEY = 'pop-intro-seen'

type PopWindow = Window & { __popIntroDone?: boolean }

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

// Mismos destinos que "Tres accesos" de la home.
const SHELVES: Shelf[] = [
  { x: 50, y: 23, dir: 'down', eyebrow: 'Quiénes somos', title: 'Desde 2014 elaborando calidad', href: '#historia', image: '/platos/plato-3.webp', tint: '#FF671B' },
  { x: 50, y: 47, dir: 'down', eyebrow: 'Productos', title: 'Conocé nuestro catálogo de productos', href: '/catalogo', image: '/platos/plato-1.webp', tint: '#0967BD' },
  { x: 50, y: 77, dir: 'up', eyebrow: 'Quiero ser distribuidor', title: 'Comercializá nuestros productos', href: '/distribuidores', image: '/platos/plato-4.webp', tint: '#F5BD3A' },
]

const alreadyPlayed = () => typeof window !== 'undefined' && !!(window as PopWindow).__popIntroDone

export default function Intro() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeId, setActiveId] = useState<number | null>(null)
  const [closeStage, setCloseStage] = useState<'idle' | 'closing' | 'shut' | 'opening'>('idle')
  const [dismissed, setDismissed] = useState(() => alreadyPlayed())

  const finish = () => {
    setDismissed(true)
    ;(window as PopWindow).__popIntroDone = true
    try { localStorage.setItem(INTRO_STORAGE_KEY, String(Date.now())) } catch { }
    window.dispatchEvent(new Event(INTRO_DONE_EVENT))
  }

  // Visita repetida: el CSS ya la ocultó; avisamos al hero en el próximo frame.
  useEffect(() => {
    if (alreadyPlayed()) return
    if (document.documentElement.classList.contains('intro-seen')) {
      const raf = requestAnimationFrame(() => {
        setDismissed(true)
        ;(window as PopWindow).__popIntroDone = true
        window.dispatchEvent(new Event(INTRO_DONE_EVENT))
      })
      return () => cancelAnimationFrame(raf)
    }
  }, [])

  // Mientras la intro está en pantalla, no se scrollea la página de atrás.
  useEffect(() => {
    document.documentElement.classList.toggle('is-loading', !dismissed)
    return () => document.documentElement.classList.remove('is-loading')
  }, [dismissed])

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

  // Un link del hotspot cierra la intro sin cortina: el destino ya es la página.
  const handleLink = () => finish()

  const handleSkip = () => {
    setCloseStage('closing')
    setTimeout(() => setCloseStage('shut'), 550)
    setTimeout(() => setCloseStage('opening'), 1650)
    setTimeout(finish, 2200)
  }

  if (dismissed) return null

  const active = activeId !== null ? SHELVES[activeId] : null
  const shut = closeStage === 'closing' || closeStage === 'shut'
  const contentHidden = closeStage === 'shut' || closeStage === 'opening'

  return (
    <section className="inmersiva" aria-label="Abrí tu heladera Formitas">
      {!contentHidden && (
        <div className="inmersiva__frame" data-card-open={active ? 'true' : undefined}>
          {/* preload="none": en conexión lenta no se baja el video hasta que lo tocan.
              Mientras tanto se ve el poster (webp liviano). */}
          <video
            ref={videoRef}
            className="inmersiva__video"
            muted
            playsInline
            preload="none"
            poster="/video/init_freezer.webp"
            onEnded={() => setIsOpen(true)}
          >
            <source src="/video/escena_init.mp4" type="video/mp4" />
          </video>
          {/* Se monta recién al empezar el video (no antes) para no gastar datos
              de quien salta la intro. Crossfade al terminar. */}
          {started && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="inmersiva__video inmersiva__end-img" data-visible={isOpen} src="/video/end_freezer.webp" alt="" />
          )}
          <div className="inmersiva__scrim" aria-hidden="true" />

          {!started && (
            <>
              <Image className="inmersiva__brand" src="/logos/rebozaditos.png" alt="Rebozaditos Pop" width={791} height={395} sizes="260px" preload />
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={active.image} alt="" />
                </div>
                <div className="hotspot__eyebrow">{active.eyebrow}</div>
                <p className="hotspot__title">{active.title}</p>
                <a href={active.href} className="hotspot__link" data-cursor="grow" onClick={handleLink}>
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
        <Image className="inmersiva__curtain-logo" src="/logos/rebozaditos.png" alt="" aria-hidden="true" width={791} height={395} sizes="260px" />
      </div>
    </section>
  )
}
