'use client'
import { useEffect, useRef, useState } from 'react'

const CHAPTERS = [
  {
    num: '01', title: 'El rebozado',
    lede: 'Pan rallado fresco, huevo, una pizca de orégano. La receta no cambió desde que abrimos la planta en Camet.',
    items: ['Pan rallado del día', 'Huevos pasteurizados de proximidad', 'Sin polifosfatos, sin TACC en línea veggie'],
    img: '/fabrica/rebozado.webp',
  },
  {
    num: '02', title: 'El proceso',
    lede: 'Línea fría continua: del horno al -18°C en menos de 90 minutos. Sin cortar la cadena, sin perder textura.',
    items: ['Trazabilidad por lote', 'Empaque atmósfera modificada', 'Auditoría SENASA mensual'],
    img: '/fabrica/proceso.webp',
  },
  {
    num: '03', title: 'El freezer',
    lede: 'Bolsa con zipper, no se rompe, no se pega. Sacás 4 y el resto vuelve a dormir.',
    items: ['Listo en 12 minutos al horno', 'Sin gluten en líneas marcadas', 'Hasta 8 meses de duración'],
    img: '/fabrica/freezer.webp',
  },
  {
    num: '04', title: 'Tu mesa',
    lede: 'El gol del jueves a la noche. Los chicos comen, vos te sentás. Mañana vemos.',
    items: ['Sin paciencia mínima requerida', 'Combinables entre sí', 'Aprobado por hinchadas enteras'],
    img: '/recetas/mesa.webp',
  },
]

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const tick = () => {
      const rect = section.getBoundingClientRect()
      const totalScroll = section.offsetHeight - window.innerHeight
      if (totalScroll <= 0) return
      const scrolled = -rect.top
      const p = Math.min(Math.max(scrolled / totalScroll, 0), 1)
      const chapters = CHAPTERS.length
      const offset = p * (chapters - 1) * 100
      if (railRef.current) railRef.current.style.transform = `translateX(-${offset}vw)`
      setActive(Math.round(p * (chapters - 1)))
    }

    window.addEventListener('scroll', tick, { passive: true })
    return () => window.removeEventListener('scroll', tick)
  }, [])

  return (
    <section ref={sectionRef} className="story" id="historia" aria-label="Historia de marca">
      <div className="story__stick">
        <header className="story__head">
          <div className="story__kicker">04 · La historia</div>
          <h2 className="story__title">Del pollo al freezer al plato.</h2>
        </header>

        <div ref={railRef} className="story__rail">
          {CHAPTERS.map((ch, i) => (
            <article key={ch.num} className={`chapter${i === active ? ' is-active' : ''}`}>
              <div className="chapter__num">{ch.num}</div>
              <div className="chapter__body">
                <h3 className="chapter__title">{ch.title}</h3>
                <p className="chapter__lede">{ch.lede}</p>
                <ul className="chapter__list">
                  {ch.items.map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div className="chapter__art">
                {ch.img ? (
                  <img src={ch.img} alt={ch.title} loading="lazy" />
                ) : (
                  <svg viewBox="0 0 480 480" aria-hidden="true">
                    <rect x="0" y="0" width="480" height="480" fill="#F5F0E8" />
                    <text x="240" y="260" textAnchor="middle" fontFamily="Unbounded" fontSize="80" fill="#1B3FA0" opacity=".15">{ch.num}</text>
                    <text x="240" y="270" textAnchor="middle" fontFamily="Unbounded" fontSize="28" fill="#1B3FA0" fontWeight="900">{ch.title.toUpperCase()}</text>
                  </svg>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="story__pages" aria-hidden="true">
          {CHAPTERS.map((ch, i) => (
            <span key={ch.num} className={i === active ? 'is-active' : ''} data-page={i}>{ch.num}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
