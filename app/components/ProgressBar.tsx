'use client'
import { useEffect, useRef } from 'react'

export default function ProgressBar() {
  const bar = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const pct   = Math.min((window.scrollY / total) * 100, 100)
      if (bar.current) bar.current.style.width = pct + '%'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="progress" aria-hidden="true">
      <span ref={bar} className="progress__bar" />
    </div>
  )
}
