import { FAQ } from '../lib/distribuidores'
import { SITE_URL } from '../lib/seo'

// Preguntas que la gente busca en Google antes de pedir un presupuesto. Las respuestas salen de
// lib/distribuidores.ts (una sola fuente de verdad); acá solo se reformula la pregunta con el
// lenguaje de búsqueda ("rebozados congelados", "por mayor", "Mar del Plata").
const ITEMS: { q: string; from: string }[] = [
  { q: '¿Qué rebozados congelados fabrican en Mar del Plata?', from: '¿Qué productos fabrican?' },
  { q: '¿Venden congelados por mayor? ¿Cuál es el pedido mínimo?', from: '¿Cuál es el pedido mínimo?' },
  { q: '¿Hacen envíos de congelados a todo el país?', from: '¿Llegan a mi provincia?' },
  { q: '¿Quiénes pueden comprar y distribuir Rebozaditos Pop?', from: '¿Quiénes pueden vender Rebozaditos Pop?' },
  { q: '¿La fábrica está habilitada por SENASA?', from: '¿Los productos están habilitados?' },
  { q: '¿Cómo se conservan y se cocinan los rebozados congelados?', from: '¿Cómo se conservan y se cocinan?' },
]

const faqs = ITEMS.flatMap(({ q, from }) => {
  const a = FAQ.find(f => f.q === from)?.a
  return a ? [{ q, a }] : []
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/#faq`,
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default function FaqHome() {
  return (
    <section className="faqhome" aria-labelledby="faqhome-title">
      <div className="faqhome__inner pop-wrap">
        <div className="faqhome__intro">
          <p className="pop-eyebrow pop-eyebrow--orange">Preguntas frecuentes</p>
          <h2 id="faqhome-title" className="pop-title faqhome__title">
            Frigorífico y fábrica de <span className="t-orange">rebozados congelados</span> en Mar del Plata.
          </h2>
          <p className="faqhome__lede">
            Congelados Formitas SRL elabora Rebozaditos Pop desde 2014: pollo, pescado, mariscos, vegetales y
            quesos, para distribuidores, comercios y gastronomía de todo el país.
          </p>
        </div>

        <div className="faqhome__list">
          {faqs.map(({ q, a }) => (
            <details key={q} className="faqhome__item">
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  )
}
