import ClientShell    from './components/ClientShell'
import TopNav         from './components/TopNav'
import Hero           from './components/Hero'
import Products       from './components/Products'
import Story          from './components/Story'
import About          from './components/About'
import ComingSoon     from './components/ComingSoon'
import Feed           from './components/Feed'
import Distribuidores from './components/Distribuidores'
import Footer         from './components/Footer'
import WhatsAppFloat  from './components/WhatsAppFloat'

export default function Home() {
  return (
    <>
      <ClientShell />
      <TopNav />
      <main>
        <Hero />
        <Products />
        <Story />
        <About />
        <ComingSoon />
        <Feed />
        <Distribuidores />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
