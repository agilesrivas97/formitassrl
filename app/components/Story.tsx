'use client'
import { useEffect, useRef, useState } from 'react'

const CHAPTERS = [
  {
    num: '01', title: 'El origen',
    paragraphs: [
      'La diferencia está en el origen.',
      'Desde 2014 elaboramos alimentos ultracongelados con producción propia y una filosofía simple: hacer productos que nosotros mismos elegiríamos para nuestras familias.',
      'Sabemos que no todas las materias primas son iguales. Tampoco todos los procesos. Por eso elegimos trabajar con ingredientes seleccionados y una elaboración consciente, porque estamos convencidos de que la calidad final depende de cada decisión que se toma mucho antes de que el producto llegue al freezer.',
    ],
    img: '/fabrica/Fabrica 3.webp',
  },
  {
    num: '02', title: 'La elaboración',
    paragraphs: [
      'No buscamos producir más. Buscamos producir mejor.',
      'Detrás de cada producto hay experiencia, dedicación y una manera de hacer las cosas que nos identifica desde el primer día.',
      'Porque sabemos que la diferencia no está en una receta, sino en la forma de llevarla adelante.',
    ],
    img: '/fabrica/proceso.webp',
  },
  {
    num: '03', title: 'El resultado',
    paragraphs: [
      'La calidad no aparece por azar. Es consecuencia de hacer las cosas bien.',
      'Por eso, lo que llega hasta tu hogar es el resultado de cientos de decisiones tomadas con un mismo criterio: no resignar calidad.',
      'Desde la selección de las materias primas hasta la elaboración final, cada etapa forma parte de un compromiso que mantenemos desde nuestros inicios.',
      'Porque creemos que la confianza se construye producto a producto, todos los días.',
    ],
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
                {ch.paragraphs.map((p, pi) => (
                  <p key={pi} className="chapter__lede">{p}</p>
                ))}
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
