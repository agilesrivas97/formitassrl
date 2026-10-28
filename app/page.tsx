import Loader         from './components/Loader'
import ClientShell    from './components/ClientShell'
import TopNav         from './components/TopNav'
import Hero           from './components/Hero'
import TresAccesos    from './components/TresAccesos'
import Story          from './components/Story'
import Universos      from './components/Universos'
import Novedades      from './components/Novedades'
import Distribuidores from './components/Distribuidores'
import Contacto       from './components/Contacto'
import Footer         from './components/Footer'
import WhatsAppFloat  from './components/WhatsAppFloat'

export default function Home() {
  return (
    <>
      <Loader />
      <ClientShell />
      <TopNav />
      <main>
        <Hero />
        <TresAccesos />
        <Story />
        <Universos />
        <Novedades />
        <Distribuidores />
        <Contacto />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
