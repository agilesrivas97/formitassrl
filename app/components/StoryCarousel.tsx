'use client'
import { useEffect, useRef, type ReactNode } from 'react'

// Desktop: los 3 capítulos son un carrusel horizontal "pegado" a la pantalla; el scroll
// vertical lo desplaza. En mobile, con movimiento reducido o sin JS, queda la versión
// apilada (la clase is-carousel nunca se agrega).
const QUERY = '(min-width: 901px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)'

export default function StoryCarousel({ children, labels }: { children: ReactNode; labels: readonly string[] }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const count = labels.length

  useEffect(() => {
    const section = sectionRef.current
    const rail = railRef.current
    if (!section || !rail) return

    const mq = window.matchMedia(QUERY)
    const steps = section.querySelectorAll<HTMLElement>('.story-live__step')
    let raf = 0

    const update = () => {
      raf = 0
      const total = section.offsetHeight - window.innerHeight
      if (total <= 0) return
      const p = Math.min(Math.max(-section.getBoundingClientRect().top / total, 0), 1)
      rail.style.transform = `translate3d(${-p * ((count - 1) / count) * 100}%,0,0)`
      // La barra se llena de forma continua con el scroll (avanza y retrocede)
      section.style.setProperty('--p', p.toFixed(4))
      const current = Math.round(p * (count - 1))
      steps.forEach((el, i) => {
        el.classList.toggle('is-active', i === current)
        el.classList.toggle('is-done', i < current)
        if (i === current) el.setAttribute('aria-current', 'step')
        else el.removeAttribute('aria-current')
      })
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }

    const apply = () => {
      if (mq.matches) {
        section.classList.add('is-carousel')
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll)
        update()
      } else {
        section.classList.remove('is-carousel')
        rail.style.transform = ''
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onScroll)
      }
    }

    apply()
    mq.addEventListener('change', apply)
    return () => {
      mq.removeEventListener('change', apply)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [count])

  // Click en un paso: scrollea hasta ese capítulo
  const goTo = (i: number) => {
    const section = sectionRef.current
    if (!section) return
    const total = section.offsetHeight - window.innerHeight
    const top = section.getBoundingClientRect().top + window.scrollY + (i / (count - 1)) * total
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <div ref={sectionRef} id="historia" className="story" style={{ ['--chapters' as string]: count, ['--p' as string]: 0 }}>
      <div className="story__stick">
        <div ref={railRef} className="story__rail">{children}</div>

        <nav className="story-live" aria-label="Nuestra historia">
          <ol>
            {labels.map((label, i) => (
              <li key={label}>
                <button type="button" className={`story-live__step${i === 0 ? ' is-active' : ''}`} onClick={() => goTo(i)} data-cursor="grow">
                  <span className="story-live__dot" />
                  <span className="story-live__label">{label}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  )
}
