import { CIFRAS, HABILITACIONES } from '../lib/distribuidores'

export default function TrustStrip() {
  return (
    <section className="trust" aria-label="Respaldo de la marca">
      <ul className="trust__list pop-wrap">
        {CIFRAS.map(c => (
          <li key={c.label}>
            <strong>{c.value}</strong>
            <span>{c.label}</span>
          </li>
        ))}
      </ul>
      <p className="trust__seal">{HABILITACIONES}</p>
    </section>
  )
}
