import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ClientShell from '../components/ClientShell'
import TopNav from '../components/TopNav'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'
import DistribuidoresForm from '../components/DistribuidoresForm'
import { BENEFICIOS, FAQ, PASOS } from '../lib/distribuidores'
import { CATEGORIES, DEFAULT_OG_IMAGE, SITE_URL } from '../lib/seo'
import { whatsappHref } from '../lib/contact'

const TITLE = 'Distribuidores de rebozados congelados'
const DESCRIPTION =
  'Sumate a la red de distribuidores de Rebozaditos Pop: fábrica de rebozados congelados en Mar del Plata, habilitada por SENASA, con envíos mayoristas a todo el país y exclusividad por zona. Pollo, pescado, mariscos, vegetales y quesos para mayoristas, comercios y gastronomía.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/distribuidores' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}/distribuidores`, images: [DEFAULT_OG_IMAGE] },
  twitter: { title: TITLE, description: DESCRIPTION },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default function DistribuidoresPage() {
  return (
    <>
      <ClientShell />
      <TopNav />
      <main className="dpage">
        <section className="dpage__hero" aria-labelledby="dpage-title">
          <div className="dpage__hero-inner pop-wrap">
            <div>
              <p className="pop-eyebrow">Fábrica de rebozados congelados · Mar del Plata</p>
              <h1 id="dpage-title" className="pop-title dpage__title">
                Distribuí <span className="t-navy">Rebozaditos Pop</span> en tu zona.
              </h1>
              <p className="dpage__lede">
                Buscamos distribuidores mayoristas, comercios y gastronomía en todo el país. Producción propia
                desde 2014, cuatro líneas de producto y acompañamiento comercial para hacer crecer la marca.
              </p>
              <div className="dpage__ctas">
                <a href="#formulario" className="pop-btn pop-btn--navy pop-btn--lg" data-track="distribuidores_hero_form">
                  Quiero ser distribuidor
                </a>
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="pop-btn pop-btn--outline-light pop-btn--lg">
                  Hablar por WhatsApp
                </a>
              </div>
            </div>
            <div className="dpage__hero-media">
              <Image src="/pop/mapa-argentina-hd.webp" alt="Mapa de Argentina con las rutas de distribución desde Mar del Plata" width={997} height={1578} unoptimized preload />
            </div>
          </div>
        </section>

        <section className="dpage__section" aria-labelledby="beneficios-title">
          <div className="pop-wrap">
            <p className="pop-eyebrow pop-eyebrow--orange">Por qué Rebozaditos Pop</p>
            <h2 id="beneficios-title" className="pop-title dpage__h2">Un proveedor que <span className="t-orange">te hace vender.</span></h2>
            <ul className="dpage__benefits">
              {BENEFICIOS.map((b, i) => (
                <li key={b.title}>
                  <span className="dpage__num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="dpage__section dpage__section--navy" aria-labelledby="lineas-title">
          <div className="pop-wrap">
            <p className="pop-eyebrow pop-eyebrow--orange">El catálogo</p>
            <h2 id="lineas-title" className="pop-title dpage__h2">Cuatro líneas para <span className="t-orange">toda la góndola.</span></h2>
            <ul className="dpage__lines">
              {Object.entries(CATEGORIES).map(([id, c]) => (
                <li key={id}>
                  <Link href={`/catalogo/${id}`}>
                    <strong>{c.label}</strong>
                    <span>Ver productos <span aria-hidden="true">→</span></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="dpage__section" aria-labelledby="pasos-title">
          <div className="pop-wrap">
            <p className="pop-eyebrow pop-eyebrow--orange">Cómo funciona</p>
            <h2 id="pasos-title" className="pop-title dpage__h2">Tres pasos para <span className="t-orange">empezar.</span></h2>
            <ol className="dpage__steps">
              {PASOS.map((p, i) => (
                <li key={p.title}>
                  <span className="dpage__num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="dist" id="formulario" aria-labelledby="form-title">
          <div className="dist__inner pop-wrap">
            <div className="dist__copy">
              <p className="pop-eyebrow pop-eyebrow--orange">Sumate</p>
              <h2 id="form-title" className="pop-title dist__title">
                Contanos de<br /><span className="t-orange">tu negocio.</span>
              </h2>
              <p className="dist__lede">
                Completá el formulario y el equipo comercial te contacta con condiciones, lista de precios
                y logística para tu zona.
              </p>
            </div>
            <DistribuidoresForm source="distribuidores" />
          </div>
        </section>

        <section className="dpage__section" aria-labelledby="faq-title">
          <div className="pop-wrap dpage__faq-wrap">
            <p className="pop-eyebrow pop-eyebrow--orange">Preguntas frecuentes</p>
            <h2 id="faq-title" className="pop-title dpage__h2">Lo que más <span className="t-orange">nos preguntan.</span></h2>
            <div className="dpage__faq">
              {FAQ.map(({ q, a }) => (
                <details key={q}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  )
}
