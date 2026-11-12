'use client'
import { useEffect } from 'react'

// Solo desktop: la primera vez que la sección entra en pantalla, los planetas
// salen chiquitos del centro del universo, giran en espiral creciendo y se
// acomodan en su lugar. Sin JS, en mobile/tablet o con movimiento reducido
// quedan quietos (la clase is-armed nunca se agrega).
export default function UniversosIntro() {
  useEffect(() => {
    const orbit = document.querySelector<HTMLElement>('.universos__orbit')
    if (!orbit) return
    if (!window.matchMedia('(min-width: 1080px)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    orbit.classList.add('is-armed')
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      orbit.classList.add('is-arrived')
      io.disconnect()
    }, { threshold: 0.55 })
    io.observe(orbit)

    return () => io.disconnect()
  }, [])

  return null
}
