import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ClientShell    from '../../components/ClientShell'
import TopNav         from '../../components/TopNav'
import CatalogFull    from '../../components/CatalogFull'
import Footer         from '../../components/Footer'
import WhatsAppFloat  from '../../components/WhatsAppFloat'
import { PRODUCTS } from '../../lib/products'
import { CATEGORIES, CategoryId, SITE_URL } from '../../lib/seo'

type Params = { categoria: string }

function isCategory(value: string): value is CategoryId {
  return value in CATEGORIES
}

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map(categoria => ({ categoria }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { categoria } = await params
  if (!isCategory(categoria)) return {}

  const { title, description } = CATEGORIES[categoria]
  return {
    title,
    description,
    alternates: {
      canonical: `/catalogo/${categoria}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/catalogo/${categoria}`,
    },
    twitter: {
      title,
      description,
    },
  }
}

export default async function CategoriaPage({ params }: { params: Promise<Params> }) {
  const { categoria } = await params
  if (!isCategory(categoria)) notFound()

  const categoryProducts = PRODUCTS.filter(p => p.cat === categoria)
  const { label } = CATEGORIES[categoria]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Catálogo Formitas — ${label}`,
    itemListElement: categoryProducts.map((prod, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: prod.title,
        category: prod.badge,
        ...(prod.image && { image: `${SITE_URL}${prod.image}` }),
        brand: { '@type': 'Brand', name: 'Formitas' },
      },
    })),
  }

  return (
    <>
      <ClientShell />
      <TopNav />
      <main className="catalogo-page">
        <CatalogFull initialCat={categoria} />
      </main>
      <Footer />
      <WhatsAppFloat />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
