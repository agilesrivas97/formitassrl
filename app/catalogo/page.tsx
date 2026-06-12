import type { Metadata } from 'next'
import ClientShell    from '../components/ClientShell'
import TopNav         from '../components/TopNav'
import CatalogFull    from '../components/CatalogFull'
import Footer         from '../components/Footer'
import WhatsAppFloat  from '../components/WhatsAppFloat'

export const metadata: Metadata = {
  title: 'Catálogo — Formitas',
  description: 'Todos los rebozados congelados Formitas: pollo, pescado y bocaditos. Filtrá por categoría y mirá las presentaciones disponibles.',
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
    </>
  )
}
