'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { INTRO_DONE_EVENT } from './Loader'

const SLIDES = [
  { src: '/pop/hero/01-filet-sin-logo.webp', alt: 'Filets de merluza rebozados Rebozaditos Pop' },
  { src: '/pop/hero/02-barritas-muza-sin-logo.webp', alt: 'Barritas de mozzarella rebozadas' },
  { src: '/pop/hero/03-medallon-espinaca-sin-logo.webp', alt: 'Medallones de pollo rellenos de espinaca' },
  { src: '/pop/hero/04-formitas-cheddar-sin-logo.webp', alt: 'Formitas de pollo con cheddar' },
  { src: '/pop/hero/05-nuggets-cheddar-sin-logo.webp', alt: 'Nuggets de pollo con cheddar' },
]

// Cada INTERVAL_MS la cara da una vuelta completa al borde del blob azul (ORBIT_MS)
// y la foto cambia a mitad de vuelta, cuando la cara está del otro lado.
const INTERVAL_MS = 5000
const ORBIT_MS = 2600
// Duración de la entrada con giro (debe coincidir con hero-face-in en globals.css)
const ENTER_MS = 900

export default function HeroMedia() {
  const [index, setIndex] = useState(0)
  const [ready, setReady] = useState(false)
  const [entered, setEntered] = useState(false)
  const [orbiting, setOrbiting] = useState(false)
  const timers = useRef<number[]>([])

  // Arranca cuando termina el loader
  useEffect(() => {
    const onDone = () => setReady(true)
    // Si el loader ya terminó (navegación de vuelta a la home), arrancar en el próximo frame
    const raf = (window as Window & { __popIntroDone?: boolean }).__popIntroDone
      ? requestAnimationFrame(onDone)
      : 0
    window.addEventListener(INTRO_DONE_EVENT, onDone)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener(INTRO_DONE_EVENT, onDone)
    }
  }, [])

  useEffect(() => {
    if (!ready) return
    // La entrada corre una sola vez; después la cara solo flota (no se reinicia en cada vuelta)
    const enterId = window.setTimeout(() => setEntered(true), ENTER_MS)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const tick = () => {
      if (document.hidden) return
      if (reduced) { setIndex(i => (i + 1) % SLIDES.length); return }
      setOrbiting(true)
      timers.current.push(window.setTimeout(() => setIndex(i => (i + 1) % SLIDES.length), ORBIT_MS / 2))
      timers.current.push(window.setTimeout(() => setOrbiting(false), ORBIT_MS))
    }
    const id = window.setInterval(tick, INTERVAL_MS)
    const pending = timers.current
    return () => { clearTimeout(enterId); clearInterval(id); pending.forEach(clearTimeout) }
  }, [ready])

  return (
    <>
      <div className="hero__media">
      {/* Formas del diseño (PDF pág. 1) en unidades relativas: escalan con el contenedor.
          La mancha crema de fondo y el recorte de la foto son curvas distintas,
          por eso el borde blanco no es parejo. */}
      <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id="hero-cream" clipPathUnits="objectBoundingBox">
            <path d="M0.4504 0.0384 C0.7017 0.0000 0.9337 0.1822 0.9681 0.4452 C1.0000 0.6879 0.7845 0.9216 0.4868 0.9671 C0.2713 1.0000 0.0663 0.7969 0.0291 0.5135 C0.0000 0.2910 0.1885 0.0782 0.4504 0.0384Z" />
          </clipPath>
          <clipPath id="hero-photo" clipPathUnits="objectBoundingBox">
            <path d="M0.5321 0.0197 C0.7983 0.0393 1.0000 0.2702 0.9824 0.5354 C0.9645 0.8008 0.7342 1.0000 0.4679 0.9803 C0.2015 0.9609 0.0000 0.7300 0.0176 0.4646 C0.0353 0.1992 0.2656 0.0000 0.5321 0.0197Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="hero__cream" />
      <div className="hero__photo" aria-live="polite">
        {SLIDES.map((s, i) => (
          <Image
            key={s.src}
            src={s.src}
            alt={i === index ? s.alt : ''}
            aria-hidden={i !== index}
            className={i === index ? 'is-active' : undefined}
            fill
            preload={i === 0}
            sizes="(max-width: 760px) 82vw, (max-width: 1100px) 42vw, 640px"
          />
        ))}
      </div>
    </div>

    {/* Hermana de la foto: se posiciona contra .hero con la misma geometría que el blob */}
      <div className={`hero__orbit${ready && !entered ? ' is-entering' : ''}${entered ? ' is-idle' : ''}${orbiting ? ' is-orbiting' : ''}`} aria-hidden="true">
        <div className="hero__face">
          <Image src="/logos/logo-cara.png" alt="" width={160} height={160} />
        </div>
      </div>
    </>
  )
}
