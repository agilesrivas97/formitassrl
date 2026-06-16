const QUESTIONS = [
  {
    q: '¿Cuánto tardan en cocinarse los productos Formitas?',
    a: 'Entre 10 y 12 minutos al horno, directo del freezer. No hace falta descongelar.',
  },
  {
    q: '¿Los productos Formitas tienen certificación SENASA?',
    a: 'Sí. Nuestra planta de Mar del Plata es auditada mensualmente por SENASA y trabajamos con trazabilidad por lote en cada producción.',
  },
  {
    q: '¿En qué zonas distribuyen?',
    a: 'Distribuimos en toda la costa atlántica y el AMBA, con más de 180 puntos de venta en 15 ciudades y entregas en hasta 72 horas.',
  },
  {
    q: '¿Cómo puedo ser distribuidor o comprar para mi comercio?',
    a: 'Completá el formulario "Sumate" más abajo contándonos tu ciudad y volumen estimado, o escribinos por WhatsApp. Te respondemos en menos de 48 horas.',
  },
  {
    q: '¿Tienen opciones sin gluten?',
    a: 'Sí, contamos con líneas sin TACC claramente identificadas, elaboradas sin polifosfatos y con pan rallado e ingredientes seleccionados.',
  },
  {
    q: '¿Cuánto duran los productos en el freezer?',
    a: 'Hasta 8 meses a -18°C sin perder textura ni sabor, gracias a nuestra cadena de frío continua y empaque en atmósfera modificada.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: QUESTIONS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: a,
    },
  })),
}

export default function FAQ() {
  return (
    <section className="faq" id="preguntas" aria-label="Preguntas frecuentes">
      <div className="faq__inner">
        <header className="faq__head">
          <div className="faq__kicker">08 · Preguntas frecuentes</div>
          <h2 className="faq__title">¿Dudas? <em>Resueltas.</em></h2>
        </header>

        <div className="faq__list">
          {QUESTIONS.map(({ q, a }) => (
            <details key={q} className="faq__item">
              <summary className="faq__question">{q}</summary>
              <p className="faq__answer">{a}</p>
            </details>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  )
}
