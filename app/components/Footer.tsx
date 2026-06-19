import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <Image
            src="/logos/rebozaditos.png"
            alt="Rebozaditos Pop"
            width={791} height={395}
            className="footer__logo"
          />
          <p className="footer__tag">Rebozados de Mar del Plata. Hechos por gente que come lo que hace.</p>
        </div>
        <nav className="footer__cols">
          <div>
            <h4>Productos</h4>
            <Link href="/catalogo/pollo">Pollo</Link>
            <Link href="/catalogo/pescado">Pescado</Link>
            <Link href="/catalogo/especiales">Especiales</Link>
            <Link href="/catalogo">Catálogo completo</Link>
          </div>
          <div>
            <h4>Marca</h4>
            <Link href="/#historia">Historia</Link>
            <Link href="/#feed">Comunidad</Link>
            <Link href="/#distribuidores">Distribuidores</Link>
            <a href="mailto:info@congeladosformitas.com.ar?subject=Quiero%20trabajar%20con%20Formitas">Trabajá con nosotros</a>
          </div>
          <div>
            <h4>Contacto</h4>
            <a href="tel:+5492236045371">223-6045371</a>
            <a href="mailto:info@congeladosformitas.com.ar">info@congeladosformitas.com.ar</a>
            <span>Camet 3500, MDP</span>
            <span>Lun a Vie, 8 a 17h</span>
          </div>
        </nav>
      </div>
      <div className="footer__bottom">
        <span>© 2026 Congelados Formitas SRL · CUIT 30-71234567-8</span>
        <span className="footer__socials">
          <a href="https://instagram.com/rebozaditospop" target="_blank" rel="noopener noreferrer" data-cursor="grow">Instagram</a>
          <a href="https://wa.me/5492236045371" target="_blank" rel="noopener noreferrer" data-cursor="grow">WhatsApp</a>
        </span>
      </div>
    </footer>
  )
}
