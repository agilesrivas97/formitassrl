import type { Metadata } from 'next'
import ClientShell    from '../components/ClientShell'
import TopNav         from '../components/TopNav'
import CatalogFull    from '../components/CatalogFull'
import Footer         from '../components/Footer'
import WhatsAppFloat  from '../components/WhatsAppFloat'
import { PRODUCTS } from '../lib/products'
import { SITE_URL } from '../lib/seo'

const TITLE = 'Catálogo de rebozados congelados'
const DESCRIPTION = 'Todos los rebozados congelados Formitas: pollo, pescado y bocaditos. Filtrá por categoría y mirá las presentaciones disponibles.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: '/catalogo',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/catalogo`,
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
  },
}

const catalogJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Catálogo Formitas',
  itemListElement: PRODUCTS.map((prod, i) => ({
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

export default function CatalogoPage() {
  return (
    <>
      <ClientShell />
      <TopNav />
      <main className="catalogo-page">
        <CatalogFull />
      </main>
      <Footer />
      <WhatsAppFloat />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogJsonLd) }}
      />
    </>
  )
}
