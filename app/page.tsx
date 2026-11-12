import Intro          from './components/Intro'
import ClientShell    from './components/ClientShell'
import TopNav         from './components/TopNav'
import Hero           from './components/Hero'
import TrustStrip     from './components/TrustStrip'
import TresAccesos    from './components/TresAccesos'
import Story          from './components/Story'
import Universos      from './components/Universos'
import Novedades      from './components/Novedades'
import Distribuidores from './components/Distribuidores'
import Contacto       from './components/Contacto'
import Feed           from './components/Feed'
import Footer         from './components/Footer'
import WhatsAppFloat  from './components/WhatsAppFloat'

export default function Home() {
  return (
    <>
      <Intro />
      <ClientShell />
      <TopNav />
      <main>
        <Hero />
        <TrustStrip />
        <TresAccesos />
        <Story />
        <Universos />
        <Distribuidores />
        <Novedades />
        <Contacto />
        <Feed />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
