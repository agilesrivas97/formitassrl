import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ClientShell from '../../components/ClientShell'
import TopNav from '../../components/TopNav'
import Footer from '../../components/Footer'
import WhatsAppFloat from '../../components/WhatsAppFloat'
import { ProductImg } from '../../components/ProductCard'
import { PRODUCTS, getProduct, productHref } from '../../lib/products'
import { CATEGORIES, DEFAULT_OG_IMAGE, SITE_URL, type CategoryId } from '../../lib/seo'
import { WHATSAPP_MESSAGES, whatsappHref } from '../../lib/contact'

// Una sola página para todo el catálogo: cada producto de data/products.json
// se genera estático en build con su propia URL /producto/[slug].
type Params = { slug: string }

export const dynamicParams = false

export function generateStaticParams() {
  return PRODUCTS.map(p => ({ slug: p.slug }))
}

const describe = (p: NonNullable<ReturnType<typeof getProduct>>) =>
  `${p.title} congelado de Rebozaditos Pop: ${p.attr.toLowerCase()}. Presentaciones de ${p.packs.join(' y ')}. ` +
  `${p.coccion.label} ${p.coccion.val} ${p.coccion.unit}. Fabricado en Mar del Plata. Consultá condiciones para distribuidores.`

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const prod = getProduct((await params).slug)
  if (!prod) return {}
  const title = `${prod.title} congelado`
  const description = describe(prod)
  const url = `${SITE_URL}${productHref(prod)}`
  return {
    title,
    description,
    alternates: { canonical: productHref(prod) },
    openGraph: {
      title,
      description,
      url,
      images: [prod.image ? { url: encodeURI(prod.image), alt: prod.title } : DEFAULT_OG_IMAGE],
    },
    twitter: { title, description },
  }
}

export default async function ProductoPage({ params }: { params: Promise<Params> }) {
  const prod = getProduct((await params).slug)
  if (!prod) notFound()

  const category = CATEGORIES[prod.cat as CategoryId]
  const related = PRODUCTS.filter(p => p.cat === prod.cat && p.slug !== prod.slug).slice(0, 4)

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: prod.title,
      sku: prod.code,
      description: describe(prod),
      category: category?.label ?? prod.badge,
      ...(prod.image && { image: `${SITE_URL}${encodeURI(prod.image)}` }),
      brand: { '@type': 'Brand', name: 'Rebozaditos Pop' },
      manufacturer: { '@type': 'Organization', name: 'Congelados Formitas SRL' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Catálogo', item: `${SITE_URL}/catalogo` },
        { '@type': 'ListItem', position: 3, name: category?.label ?? prod.badge, item: `${SITE_URL}/catalogo/${prod.cat}` },
        { '@type': 'ListItem', position: 4, name: prod.title, item: `${SITE_URL}${productHref(prod)}` },
      ],
    },
  ]

  return (
    <>
      <ClientShell />
      <TopNav />
      <main className="producto" style={{ ['--accent' as string]: prod.accent }}>
        <div className="pop-wrap">
          <nav className="producto__crumbs" aria-label="Migas de pan">
            <Link href="/">Inicio</Link>
            <span aria-hidden="true">/</span>
            <Link href="/catalogo">Catálogo</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/catalogo/${prod.cat}`}>{category?.label ?? prod.badge}</Link>
          </nav>

          <article className="producto__main">
            <div className="producto__media">
              <ProductImg prod={prod} />
            </div>

            <div className="producto__info">
              <p className="pop-eyebrow pop-eyebrow--orange">{prod.badge} · Código {prod.code}</p>
              <h1 className="pop-title producto__title">{prod.title}</h1>
              <p className="producto__attr">{prod.attr}</p>

              <dl className="producto__specs">
                <div>
                  <dt>Presentaciones</dt>
                  <dd>
                    {prod.packs.map(pack => <span key={pack} className="producto__pack">{pack}</span>)}
                  </dd>
                </div>
                <div>
                  <dt>Cocción</dt>
                  <dd>{prod.coccion.label} · {prod.coccion.val} {prod.coccion.unit}</dd>
                </div>
                <div>
                  <dt>Elaboración</dt>
                  <dd>Prefrito y ultracongelado · Mar del Plata</dd>
                </div>
              </dl>

              <div className="producto__ctas">
                <Link href="/distribuidores#formulario" className="pop-btn pop-btn--orange pop-btn--lg" data-track="producto_quiero_distribuir">
                  Quiero distribuirlo
                </Link>
                <a href={whatsappHref(WHATSAPP_MESSAGES.producto(prod.title))} target="_blank" rel="noopener noreferrer" className="pop-btn pop-btn--outline-blue pop-btn--lg">
                  Consultar por WhatsApp
                </a>
              </div>
            </div>
          </article>

          {related.length > 0 && (
            <section className="producto__related" aria-labelledby="related-title">
              <h2 id="related-title" className="producto__related-title">Más de {category?.label ?? prod.badge}</h2>
              <ul>
                {related.map(r => (
                  <li key={r.slug}>
                    <Link href={productHref(r)} className="producto__related-card">
                      <span className="producto__related-media"><ProductImg prod={r} /></span>
                      <span>{r.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={`/catalogo/${prod.cat}`} className="card__link">Ver toda la línea <span aria-hidden="true">→</span></Link>
            </section>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  )
}
