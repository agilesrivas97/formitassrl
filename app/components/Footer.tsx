import Link from 'next/link'

const LINKS = [
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/#historia', label: 'Historia' },
  { href: '/#productos', label: 'Productos' },
  { href: '/#novedades', label: 'Rebodinos' },
  { href: '/#novedades', label: 'Novedades' },
  { href: '/distribuidores', label: 'Distribuidores' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top pop-wrap">
        <div className="footer__brand">
          <p className="footer__claim">Calidad, sabor y frescura para tu mesa.</p>
          <p className="footer__name">Congelados Formitas SRL</p>
          <p className="footer__sub">Rebozados prefritos y ultracongelados · Mar del Plata</p>
        </div>

        <p className="footer__quote">
          Elaboramos productos para nuestras familias.
          <span className="t-orange">Esa es la calidad que compartimos.</span>
        </p>

        <nav className="footer__links" aria-label="Pie de página">
          {LINKS.map(l => (
            <Link key={l.label} href={l.href}>{l.label}</Link>
          ))}
        </nav>
      </div>

      <div className="footer__bottom pop-wrap">
        <span>© {new Date().getFullYear()} Rebozaditos Pop · Congelados Formitas SRL</span>
        <span>Ortiz de Zárate 3736, Mar del Plata · Lun a Vie, 8 a 17 h</span>
      </div>
    </footer>
  )
}
