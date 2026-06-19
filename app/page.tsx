import ClientShell    from './components/ClientShell'
import TopNav         from './components/TopNav'
import Inmersiva      from './components/Inmersiva'
import Hero           from './components/Hero'
import Products       from './components/Products'
import Story          from './components/Story'
import About          from './components/About'
import ComingSoon     from './components/ComingSoon'
import Feed           from './components/Feed'
import FAQ            from './components/FAQ'
import Distribuidores from './components/Distribuidores'
import Footer         from './components/Footer'
import WhatsAppFloat  from './components/WhatsAppFloat'

export default function Home() {
  return (
    <>
      <ClientShell />
      <Inmersiva />
      <TopNav />
      <main>
        <Hero />
        <Products />
        <Story />
        <About />
        <ComingSoon />
        <Feed />
        <Distribuidores />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
