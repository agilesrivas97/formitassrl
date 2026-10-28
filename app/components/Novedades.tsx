'use client'
import { useState } from 'react'
import Image from 'next/image'
import { whatsappHref } from '../lib/contact'

type Slide = {
  id: string
  name: string
  tag: string
  theme: 'photo' | 'cream'
  title: React.ReactNode
  subtitle: string
  desc: string
  cta: string
  ctaHref?: string
  chips?: string[]
  image: { src: string; alt: string }
  background?: string
}

const SLIDES: Slide[] = [
  {
    id: 'rebodinos',
    name: 'Rebodinos',
    tag: 'Nuevo',
    theme: 'photo',
    title: <>Rebo<span className="t-blue">dinos</span></>,
    subtitle: 'Una aventura en cada bocado.',
    desc: 'La línea infantil de Rebozaditos Pop: formitas a base de pollo con siluetas de dinosaurios.',
    cta: 'Conocé el lanzamiento',
    image: { src: '/pop/rebodinos-nene.webp', alt: 'Nene comiendo Rebodinos con forma de dinosaurio' },
    background: '/pop/rebodinos-plato.webp',
  },
  {
    id: 'merch',
    name: 'Merch Pop',
    tag: 'Merch',
    theme: 'cream',
    title: <>Merch <span className="t-orange">Pop</span></>,
    subtitle: 'Llevate la marca a tu punto de venta.',
    desc: 'Remeras, gorras y folletería de Rebozaditos Pop para que tu local se vea y venda mejor. No están a la venta: los entregamos como obsequio a nuestros clientes. Consultanos por disponibilidad.',
    cta: 'Pedí el tuyo',
    ctaHref: whatsappHref('Hola! Quiero consultar por el merch de Rebozaditos Pop (remeras, gorras, folletería) para mi local.'),
    chips: ['Obsequio para clientes', 'Consultá disponibilidad'],
    image: { src: '/pop/merch.webp', alt: 'Remeras, gorra y folletería de Rebozaditos Pop' },
  },
]

export default function Novedades() {
  const [index, setIndex] = useState(0)
  const go = (dir: 1 | -1) => setIndex(i => (i + dir + SLIDES.length) % SLIDES.length)
  const slide = SLIDES[index]
  const prev = SLIDES[(index - 1 + SLIDES.length) % SLIDES.length]
  const next = SLIDES[(index + 1) % SLIDES.length]

  return (
    <section className="novedades" id="novedades" aria-labelledby="novedades-title" aria-roledescription="carrusel">
      <div className="novedades__head pop-wrap">
        <div>
          <p className="pop-eyebrow pop-eyebrow--blue">05 · Novedades</p>
          <h2 id="novedades-title" className="novedades__title">
            Descubrí qué hay de <span className="t-orange">nuevo.</span>
          </h2>
        </div>
        <p className="novedades__lede">
          Lanzamientos y nuevas propuestas. Todo lo que se suma a la familia Rebozaditos Pop.
        </p>
      </div>

      <div className="novedades__stage">
        <button className="novedades__peek novedades__peek--prev" onClick={() => go(-1)} tabIndex={-1} aria-hidden="true">
          <span>{prev.name}</span>
        </button>

        <article
          key={slide.id}
          className={`nov-card nov-card--${slide.theme}`}
          aria-roledescription="diapositiva"
          aria-label={`${index + 1} de ${SLIDES.length}: ${slide.name}`}
        >
          {slide.background && (
            <Image className="nov-card__bg" src={slide.background} alt="" fill sizes="(max-width: 900px) 100vw, 1000px" />
          )}
          <div className="nov-card__media">
            <Image src={slide.image.src} alt={slide.image.alt} fill sizes="(max-width: 900px) 90vw, 420px" />
          </div>
          <div className="nov-card__body">
            <span className="nov-card__tag">{slide.tag}</span>
            <h3 className="nov-card__title" data-text={slide.name}>{slide.title}</h3>
            <p className="nov-card__subtitle">{slide.subtitle}</p>
            <p className="nov-card__desc">{slide.desc}</p>
            {slide.chips && (
              <ul className="nov-card__chips">
                {slide.chips.map(c => <li key={c}>{c}</li>)}
              </ul>
            )}
            {slide.ctaHref ? (
              <a className="nov-card__cta" href={slide.ctaHref} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                {slide.cta}
                <small>WhatsApp</small>
                <Image src="/logos/logo-cara.png" alt="" width={36} height={36} />
              </a>
            ) : (
              // Sin destino definido todavía: el botón se muestra como "Próximamente".
              <span className="nov-card__cta" aria-disabled="true">
                {slide.cta}
                <small>Próximamente</small>
                <Image src="/logos/logo-cara.png" alt="" width={36} height={36} />
              </span>
            )}
          </div>
        </article>

        <button className="novedades__peek novedades__peek--next" onClick={() => go(1)} tabIndex={-1} aria-hidden="true">
          <span>{next.name}</span>
        </button>
      </div>

      <div className="novedades__nav">
        <button onClick={() => go(-1)} aria-label="Novedad anterior">←</button>
        <span aria-live="polite">{String(index + 1).padStart(2, '0')} · {slide.name}</span>
        <button onClick={() => go(1)} aria-label="Novedad siguiente">→</button>
      </div>
    </section>
  )
}
