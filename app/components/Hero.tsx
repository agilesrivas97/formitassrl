'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

const FRAMES = [
  '/mascot/01-idle.webp',
  '/mascot/02-surprise.webp',
  '/mascot/03-grab.webp',
  '/mascot/04-open.webp',
  '/mascot/05-steam.webp',
  '/mascot/06-point.webp',
]

const PROD_IMAGES = [
  { src: '/platos/plato-3.webp', alt: 'Medallones rebozados servidos en plato' },
  { src: '/platos/plato-2.webp', alt: 'Filet de merluza rebozado servido en plato' },
  { src: '/platos/plato-1.webp', alt: 'Barritas de muzzarella servidas en plato' },
  { src: '/platos/plato-4.webp', alt: 'Rabas de calamar servidas en plato' },
]

const PROD_TARGETS = [
  { tx: '-45vw', ty: '-18vh', rot: '-12deg' },
  { tx: '-20vw', ty: '-25vh', rot: '6deg' },
  { tx: '-48vw', ty: '9vh', rot: '-8deg' },
  { tx: '-25vw', ty: '-5vh', rot: '10deg' },
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const fogRef = useRef<HTMLDivElement>(null)
  const sparksRef = useRef<HTMLDivElement>(null)
  const prodsRef = useRef<HTMLDivElement>(null)
  const steamPuffRef = useRef<HTMLDivElement>(null)
  const finalRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const mascotRef = useRef<HTMLDivElement>(null)
  const frameRefs = useRef<(HTMLImageElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const clamp01 = (v: number) => Math.max(0, Math.min(1, v))
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
    const easeOutBack = (t: number) => {
      const c1 = 1.70158
      const c3 = c1 + 1
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
    }

    let curFrame = 0
    function setFrame(i: number) {
      if (i === curFrame) return
      frameRefs.current.forEach((img, idx) => {
        if (img) img.style.opacity = idx === i ? '1' : '0'
      })
      curFrame = i
    }

    function tick() {
      const rect = section!.getBoundingClientRect()
      const total = section!.offsetHeight - window.innerHeight
      if (total <= 0) return
      const p = clamp01(-rect.top / total)

      // Frame index
      let f = 0
      if (p < 0.06) f = 0
      else if (p < 0.16) f = 1
      else if (p < 0.28) f = 2
      else if (p < 0.44) f = 3
      else if (p < 0.62) f = 4
      else f = 5
      setFrame(f)

      // Title + eyebrow fade
      const m1to2 = clamp01((p - 0.18) / 0.12)
      if (eyebrowRef.current) eyebrowRef.current.style.opacity = String(0.82 * (1 - m1to2 * 0.6))
      if (titleRef.current) {
        titleRef.current.style.opacity = String(1 - m1to2)
        titleRef.current.style.transform = `translateY(calc(-50% + ${-m1to2 * 30}px))`
      }

      // Hint fades early
      if (hintRef.current) hintRef.current.style.opacity = String(clamp01(1 - p * 6))

      // Mascot scale + drift
      const mascotScale = 1 + Math.sin(p * Math.PI) * 0.06
      const mascotShift = lerp(0, 30, easeOut(clamp01((p - 0.35) / 0.4)))
      if (mascotRef.current) mascotRef.current.style.transform = `translateX(${mascotShift}px) scale(${mascotScale})`

      // Fog blobs
      const fogStart = 0.28, fogPeak = 0.6
      if (fogRef.current) {
        const fogBlobs = [...fogRef.current.children] as HTMLElement[]
        fogBlobs.forEach((b, i) => {
          const localP = clamp01((p - fogStart - i * 0.05) / (fogPeak - fogStart))
          b.style.opacity = String(easeOut(localP) * 0.95)
          const drift = lerp(0, -40 - i * 8, easeOut(localP))
          const scale = lerp(0.6, 1.1 + i * 0.05, easeOut(localP))
          b.style.transform = `translate(${drift}px, ${drift / 2}px) scale(${scale})`
        })
      }

      // Products CSS variable animation
      let puffIntensity = 0
      if (prodsRef.current) {
        const prods = [...prodsRef.current.children] as HTMLElement[]
        prods.forEach((el, i) => {
          const lp = clamp01((p - 0.24 - i * 0.07) / 0.42)
          const eased = easeOut(lp)
          const easedS = easeOutBack(lp)
          const t = PROD_TARGETS[i]
          el.style.setProperty('--tx', `calc(${t.tx} * ${eased})`)
          el.style.setProperty('--ty', `calc(${t.ty} * ${eased})`)
          el.style.setProperty('--rot', `calc(${t.rot} * ${easedS})`)
          el.style.setProperty('--o', String(eased))
          el.style.setProperty('--s', String(lerp(0.3, 1, easedS)))

          const pulse = (lp > 0 && lp < 0.45) ? Math.sin((lp / 0.45) * Math.PI) : 0
          if (pulse > puffIntensity) puffIntensity = pulse
        })
      }

      // Steam puff at the freezer door, synced with product emergence
      if (steamPuffRef.current) {
        steamPuffRef.current.style.opacity = String(puffIntensity * 0.8)
        steamPuffRef.current.style.transform = `translate(-50%, -50%) scale(${0.5 + puffIntensity * 1.2})`
      }

      // Sparks + celebrating state
      sparksRef.current?.classList.toggle('is-on', p > 0.68)
      section!.classList.toggle('is-celebrating', p > 0.72)

      // Final headline
      const finalP = clamp01((p - 0.66) / 0.16)
      if (finalRef.current) {
        finalRef.current.style.opacity = String(finalP)
        finalRef.current.style.transform = `translate(-50%, ${lerp(40, 0, easeOut(finalP))}px)`
        finalRef.current.classList.toggle('is-on', finalP > 0.9)
      }

      // Marquee fades at end
      if (marqueeRef.current) marqueeRef.current.style.opacity = String(clamp01(1 - (p - 0.85) * 6))
    }

    window.addEventListener('scroll', tick, { passive: true })
    window.addEventListener('resize', tick)
    tick()
    return () => {
      window.removeEventListener('scroll', tick)
      window.removeEventListener('resize', tick)
    }
  }, [])

  return (
    <section ref={sectionRef} className="hero" aria-label="Bienvenida" id="top">
      <div className="hero__stick">
        <div className="hero__dots" />

        <div ref={eyebrowRef} className="hero__eyebrow" data-hero="eyebrow">
          <span className="hero__eyebrow-dot" />
          Mar del Plata · Desde 2024
        </div>

        <h1 ref={titleRef} className="hero__title" data-hero="title">
          <span className="hero__title-row hero__title-row--white">Abrí</span>
          <span className="hero__title-row hero__title-row--stroke">el freezer</span>
        </h1>

        <div className="hero__stage" data-hero="stage">
          <div ref={fogRef} className="hero__fog">
            <span className="hero__fog-blob hero__fog-blob--a" />
            <span className="hero__fog-blob hero__fog-blob--b" />
            <span className="hero__fog-blob hero__fog-blob--c" />
            <span className="hero__fog-blob hero__fog-blob--d" />
          </div>

          <div ref={steamPuffRef} className="hero__steam-puff" aria-hidden="true" />

          <div ref={prodsRef} className="hero__products">
            {PROD_IMAGES.map((p, i) => (
              <div key={i} className="hero__prod">
                <Image src={p.src} alt={p.alt} width={280} height={280} />
              </div>
            ))}
          </div>

          <div ref={sparksRef} className="hero__sparks" aria-hidden="true">
            {[
              { x: '8%', y: '14%', d: '0s', t: '★' },
              { x: '88%', y: '18%', d: '.2s', t: '✦' },
              { x: '14%', y: '78%', d: '.4s', t: '✦' },
              { x: '82%', y: '74%', d: '.1s', t: '★' },
              { x: '50%', y: '6%', d: '.3s', t: '✦' },
            ].map((s, i) => (
              <span key={i} style={{ ['--x' as string]: s.x, ['--y' as string]: s.y, ['--d' as string]: s.d }}>{s.t}</span>
            ))}
          </div>

          <div ref={mascotRef} className="hero__mascot">
            {FRAMES.map((src, i) => (
              <img
                key={src}
                ref={el => { frameRefs.current[i] = el }}
                src={src}
                alt={i === 0 ? 'Mascota Formitas' : ''}
                aria-hidden={i > 0 ? true : undefined}
                data-frame={i}
                style={{ opacity: i === 0 ? 1 : 0 }}
              />
            ))}
          </div>
        </div>

        <div ref={finalRef} className="hero__final" data-hero="final">
          <h2 className="hero__final-title">
            <em>Solucionaste</em> la cena.
          </h2>
          <a href="#productos" className="btn btn--hero" data-cursor="grow">
            Ver productos <span aria-hidden="true">→</span>
          </a>
        </div>

        <div ref={hintRef} className="hero__hint" data-hero="hint" aria-hidden="true">
          <span>Scrolleá</span>
          <svg viewBox="0 0 14 22" width="14" height="22">
            <rect x="1" y="1" width="12" height="20" rx="6" fill="none" stroke="#F5F0E8" strokeWidth="2" />
            <circle cx="7" cy="7" r="2" fill="#F5F0E8">
              <animate attributeName="cy" values="7;14;7" dur="1.8s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        <div ref={marqueeRef} className="hero__marquee" data-hero="marquee" aria-hidden="true">
          <div className="hero__marquee-track">
            <span>· Rebozado artesanal · Sin conservantes · Pescado del Atlántico Sur · Hecho en Mar del Plata · Listo en 12 min · Rebozado artesanal · Sin conservantes · Pescado del Atlántico Sur · Hecho en Mar del Plata · Listo en 12 min</span>
          </div>
        </div>
      </div>
    </section>
  )
}
