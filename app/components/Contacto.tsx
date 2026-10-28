import Image from 'next/image'
import { IconInstagram, IconMail, IconWhatsApp } from './PopIcons'
import { EMAIL, INSTAGRAM, WHATSAPP_DISPLAY, WHATSAPP_MESSAGES, whatsappHref } from '../lib/contact'

const CANALES = [
  {
    id: 'whatsapp',
    label: 'WhatsApp comercial',
    value: WHATSAPP_DISPLAY,
    desc: 'Para consultas rápidas de productos, puntos de venta y distribución.',
    href: whatsappHref(WHATSAPP_MESSAGES.consulta),
    icon: <IconWhatsApp />,
  },
  {
    id: 'mail',
    label: 'Correo electrónico',
    value: EMAIL,
    desc: 'Para información comercial, presentaciones y propuestas.',
    href: `mailto:${EMAIL}?subject=${encodeURIComponent('Consulta comercial — Rebozaditos Pop')}`,
    icon: <IconMail />,
  },
  {
    id: 'redes',
    label: 'Redes sociales',
    value: `@${INSTAGRAM}`,
    desc: 'Para conocer novedades, lanzamientos y nuestra comunidad.',
    href: `https://instagram.com/${INSTAGRAM}`,
    icon: <IconInstagram />,
  },
]

export default function Contacto() {
  return (
    <section className="contacto" id="contacto" aria-labelledby="contacto-title">
      <div className="contacto__circle" aria-hidden="true" />

      <div className="contacto__head pop-wrap">
        <p className="pop-eyebrow pop-eyebrow--blue">08 · Contacto</p>
        <Image className="contacto__logo" src="/logos/rebozaditos.png" alt="Rebozaditos Pop" width={791} height={395} />
        <h2 id="contacto-title" className="contacto__title">Contactanos</h2>
        <p className="contacto__lede">
          Consultas sobre productos, ventas y distribución.<br />
          Escribinos y te conectamos con el equipo indicado.
        </p>
        <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="pop-btn pop-btn--orange pop-btn--xl" data-cursor="grow">
          Escribinos
        </a>
        <Image className="contacto__mascot" src="/pop/mascota-caminando.webp" alt="" width={626} height={626} loading="eager" />
      </div>

      <ul className="contacto__cards pop-wrap">
        {CANALES.map(c => (
          <li key={c.id} className={`canal canal--${c.id}`}>
            <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" data-cursor="grow">
              <span className="canal__icon">{c.icon}</span>
              <span className="canal__label">{c.label}</span>
              <span className="canal__value">{c.value}</span>
              <span className="canal__desc">{c.desc}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
