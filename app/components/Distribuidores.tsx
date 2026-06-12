'use client'
import { useState } from 'react'

const ROLES = [
  { value: 'distribuidor', label: 'Distribuidor', icon: <svg viewBox="0 0 32 32" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 20 v-8 h14 v-4 h6 l5 6 v6"/><circle cx="9" cy="22" r="3"/><circle cx="23" cy="22" r="3"/></svg> },
  { value: 'comerciante',  label: 'Comerciante',  icon: <svg viewBox="0 0 32 32" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12 l2 -6 h20 l2 6"/><path d="M4 12 v14 h24 v-14"/><path d="M12 26 v-8 h8 v8"/></svg> },
  { value: 'consumidor',   label: 'Consumidor',   icon: <svg viewBox="0 0 32 32" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="16" cy="11" r="5"/><path d="M5 28 q0 -9 11 -9 q11 0 11 9"/></svg> },
]

const FIELD_LABELS: Record<string, string> = {
  name:  'Nombre',
  email: 'Email',
  city:  'Ciudad',
}

export default function Distribuidores() {
  const [role, setRole]       = useState('distribuidor')
  const [sent, setSent]       = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError]     = useState<string | null>(null)
  const [invalid, setInvalid] = useState<Set<string>>(new Set())

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>

    const missing = (['name', 'email', 'city'] as const).filter(f => !data[f]?.trim())
    const emailInvalid = !missing.includes('email') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)

    if (missing.length || emailInvalid) {
      setInvalid(new Set([...missing, ...(emailInvalid ? ['email'] : [])]))
      const labels = missing.map(f => FIELD_LABELS[f])
      if (emailInvalid) labels.push('Email válido')
      setError(`Completá: ${labels.join(', ')}.`)
      return
    }
    setInvalid(new Set())
    setSending(true)

    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, ...data }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
      e.currentTarget.reset()
      setRole('distribuidor')
    } catch {
      setError('No pudimos enviar tu mensaje. Probá de nuevo o escribinos por WhatsApp.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="dist" id="distribuidores" aria-label="Distribuidores">
      <div className="dist__inner">
        <div className="dist__copy">
          <div className="dist__kicker">07 · Sumate</div>
          <h2 className="dist__title">¿Querés <em>sumarte?</em></h2>
          <p className="dist__lede">Distribuimos en toda la costa atlántica y AMBA. Si te interesa el rubro, contanos quién sos.</p>
          <ul className="dist__points">
            <li><span>+ 180</span><br />puntos de venta</li>
            <li><span>15</span><br />ciudades</li>
            <li><span>72h</span><br />entrega máxima</li>
          </ul>
        </div>

        <form className="dist__form" onSubmit={handleSubmit} noValidate>
          <div className="dist__roles" role="radiogroup" aria-label="Soy">
            {ROLES.map(r => (
              <label key={r.value} className={`role${role === r.value ? ' is-active' : ''}`}>
                <input type="radio" name="role" value={r.value} checked={role === r.value} onChange={() => setRole(r.value)} />
                {r.icon}
                <span>{r.label}</span>
              </label>
            ))}
          </div>

          <div className={`field${invalid.has('name') ? ' is-invalid' : ''}`}>
            <label htmlFor="f-name">Nombre</label>
            <input id="f-name" name="name" type="text" placeholder="Juan Pereyra" required />
          </div>
          <div className={`field${invalid.has('email') ? ' is-invalid' : ''}`}>
            <label htmlFor="f-email">Email</label>
            <input id="f-email" name="email" type="email" placeholder="info@congeladosformitas.com.ar" required />
          </div>
          <div className={`field${invalid.has('city') ? ' is-invalid' : ''}`}>
            <label htmlFor="f-city">Ciudad</label>
            <input id="f-city" name="city" type="text" placeholder="Mar del Plata, B" required />
          </div>
          {role === 'distribuidor' && (
            <div className="field">
              <label htmlFor="f-vol">Volumen mensual estimado</label>
              <input id="f-vol" name="vol" type="text" placeholder="500 kg / 1 ton" />
            </div>
          )}
          {role === 'comerciante' && (
            <div className="field">
              <label htmlFor="f-store">Nombre del local</label>
              <input id="f-store" name="store" type="text" placeholder="Almacén Don Pepe" />
            </div>
          )}
          <div className="field">
            <label htmlFor="f-msg">Mensaje <small>(opcional)</small></label>
            <textarea id="f-msg" name="msg" rows={3} placeholder="Contanos un poco..." />
          </div>

          {sent
            ? <div className="dist__ok">¡Recibido! Te escribimos en 48h. 🎉</div>
            : (
              <>
                <button type="submit" className="btn btn--ghost" data-cursor="grow" disabled={sending}>
                  {sending ? 'Enviando…' : 'Mandar'} <span aria-hidden="true">→</span>
                </button>
                {error && <div className="dist__error">{error}</div>}
              </>
            )
          }
        </form>
      </div>
    </section>
  )
}
