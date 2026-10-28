'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

// Tiempo mínimo en pantalla (para que la caminata se llegue a ver) y máximo (si la carga se cuelga).
const MIN_MS = 900
const MAX_MS = 3000
const EXIT_MS = 750

export const INTRO_DONE_EVENT = 'pop:intro-done'

// Solo se muestra en la primera visita (y de nuevo pasada una semana). El script inline de
// layout.tsx lee esta clave antes de pintar y agrega html.intro-seen, que oculta el loader por CSS.
export const INTRO_STORAGE_KEY = 'pop-intro-seen'
export const INTRO_TTL_MS = 7 * 24 * 60 * 60 * 1000

type PopWindow = Window & { __popIntroDone?: boolean }

// En la carga inicial el flag no existe (coincide con el HTML del servidor);
// en navegaciones internas de vuelta a la home ya está en true y el loader no se repite.
const alreadyPlayed = () => typeof window !== 'undefined' && !!(window as PopWindow).__popIntroDone

export default function Loader() {
  const [stage, setStage] = useState<'walking' | 'leaving' | 'gone'>(() => alreadyPlayed() ? 'gone' : 'walking')

  useEffect(() => {
    if (alreadyPlayed()) return

    const finish = () => {
      setStage('gone')
      ;(window as PopWindow).__popIntroDone = true
      window.dispatchEvent(new Event(INTRO_DONE_EVENT))
    }

    // Visita repetida: el CSS ya lo ocultó; avisamos al hero en el próximo frame.
    if (document.documentElement.classList.contains('intro-seen')) {
      const raf = requestAnimationFrame(finish)
      return () => cancelAnimationFrame(raf)
    }

    const start = performance.now()
    let done = false
    const timers: number[] = []

    const leave = () => {
      if (done) return
      done = true
      const wait = Math.max(0, MIN_MS - (performance.now() - start))
      timers.push(window.setTimeout(() => {
        setStage('leaving')
        timers.push(window.setTimeout(() => {
          finish()
          try { localStorage.setItem(INTRO_STORAGE_KEY, String(Date.now())) } catch { }
        }, EXIT_MS))
      }, wait))
    }

    if (document.readyState === 'complete') leave()
    else window.addEventListener('load', leave, { once: true })
    timers.push(window.setTimeout(leave, MAX_MS))

    return () => {
      window.removeEventListener('load', leave)
      timers.forEach(clearTimeout)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('is-loading', stage !== 'gone')
  }, [stage])

  if (stage === 'gone') return null

  return (
    <div className={`loader${stage === 'leaving' ? ' is-leaving' : ''}`} role="status" aria-label="Cargando Rebozaditos Pop">
      <div className="loader__walker" aria-hidden="true">
        <div className="loader__dust">
          <span /><span /><span /><span />
        </div>
        <div className="loader__mascot">
          <Image className="loader__leg loader__leg--l" src="/pop/mascota/pierna-izq.webp" alt="" fill sizes="220px" preload />
          <Image className="loader__leg loader__leg--r" src="/pop/mascota/pierna-der.webp" alt="" fill sizes="220px" preload />
          <Image className="loader__body" src="/pop/mascota/cuerpo.webp" alt="" fill sizes="220px" preload />
        </div>
        <div className="loader__ground" />
      </div>
      <p className="loader__text" aria-hidden="true">Preparando algo rico<span>.</span><span>.</span><span>.</span></p>
    </div>
  )
}
