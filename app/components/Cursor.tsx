'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null)
  const dot  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    const onMove = (e: MouseEvent) => {
      if (ring.current) {
        ring.current.style.left = e.clientX + 'px'
        ring.current.style.top  = e.clientY + 'px'
      }
      if (dot.current) {
        dot.current.style.left = e.clientX + 'px'
        dot.current.style.top  = e.clientY + 'px'
      }
    }

    const onEnter = (e: Event) => {
      const t = e.currentTarget as HTMLElement
      if (t.dataset.cursor === 'grow') ring.current?.classList.add('is-grow')
    }
    const onLeave = () => ring.current?.classList.remove('is-grow')

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('[data-cursor="grow"]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <>
      <div ref={ring} className="cursor" aria-hidden="true" />
      <div ref={dot}  className="cursor cursor--dot" aria-hidden="true" />
    </>
  )
}
