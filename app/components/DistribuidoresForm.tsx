'use client'
import { useState } from 'react'
import { track } from '../lib/analytics'
import { HONEYPOT_FIELD, LEAD_ROLES, PROVINCIAS, type LeadRole } from '../lib/leads'

const ROLE_ICONS: Record<LeadRole, React.ReactElement> = {
  distribuidor: <svg viewBox="0 0 32 32" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 20 v-8 h14 v-4 h6 l5 6 v6"/><circle cx="9" cy="22" r="3"/><circle cx="23" cy="22" r="3"/></svg>,
  comercio: <svg viewBox="0 0 32 32" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12 l2 -6 h20 l2 6"/><path d="M4 12 v14 h24 v-14"/><path d="M12 26 v-8 h8 v8"/></svg>,
  gastronomia: <svg viewBox="0 0 32 32" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 4 v10 a3 3 0 0 0 6 0 v-10 M12 14 v14"/><path d="M22 28 v-24 q-5 3 -5 11 h5"/></svg>,
}

// Etiqueta corta para el selector (una sola línea); la completa va en el mail y en aria-label.
const ROLE_SHORT: Record<LeadRole, string> = {
  distribuidor: 'Distribuidor',
  comercio: 'Comercio',
  gastronomia: 'Gastronomía',
}

const Req = () => <span className="field__req" aria-hidden="true">*</span>

const REQUIRED = ['name', 'phone', 'email', 'province'] as const

const FIELD_LABELS: Record<(typeof REQUIRED)[number], string> = {
  name: 'Nombre',
  phone: 'Teléfono',
  email: 'Email',
  province: 'Provincia',
}

export default function DistribuidoresForm({ source = 'home' }: { source?: string }) {
  const [role, setRole] = useState<LeadRole>('distribuidor')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [invalid, setInvalid] = useState<Set<string>>(new Set())

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    // currentTarget queda en null después del await: guardamos el form antes.
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>

    const missing = REQUIRED.filter(f => !data[f]?.trim())
    const emailInvalid = !missing.includes('email') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
    const phoneInvalid = !missing.includes('phone') && data.phone.replace(/\D/g, '').length < 8

    if (missing.length || emailInvalid || phoneInvalid) {
      setInvalid(new Set([...missing, ...(emailInvalid ? ['email'] : []), ...(phoneInvalid ? ['phone'] : [])]))
      const labels: string[] = missing.map(f => FIELD_LABELS[f])
      if (emailInvalid) labels.push('un email válido')
      if (phoneInvalid) labels.push('un teléfono válido')
      setError(`Completá: ${labels.join(', ')}.`)
      return
    }
    setInvalid(new Set())
    setSending(true)

    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, source, ...data }),
      })
      if (!res.ok) throw new Error()
      track('generate_lead', { role, province: data.province, source })
      setSent(true)
      form.reset()
      setRole('distribuidor')
    } catch {
      setError('No pudimos enviar tu mensaje. Probá de nuevo o escribinos por WhatsApp.')
    } finally {
      setSending(false)
    }
  }

  const field = (name: string) => `field${invalid.has(name) ? ' is-invalid' : ''}`

  return (
    <form className="dist__form" onSubmit={handleSubmit} noValidate>
      <div className="dist__roles" role="radiogroup" aria-label="Tipo de negocio">
        {(Object.keys(LEAD_ROLES) as LeadRole[]).map(value => (
          <label key={value} className={`role${role === value ? ' is-active' : ''}`} title={LEAD_ROLES[value]}>
            <input type="radio" name="role" value={value} checked={role === value} onChange={() => setRole(value)} aria-label={LEAD_ROLES[value]} />
            {ROLE_ICONS[value]}
            <span>{ROLE_SHORT[value]}</span>
          </label>
        ))}
      </div>

      <div className={`dist__grid${role === 'distribuidor' ? ' has-vol' : ''}`}>
        <div className={field('name')}>
          <label htmlFor={`${source}-name`}>Nombre y apellido<Req /></label>
          <input id={`${source}-name`} name="name" type="text" placeholder="Juan Pereyra" autoComplete="name" required />
        </div>
        <div className="field">
          <label htmlFor={`${source}-company`}>Empresa</label>
          <input id={`${source}-company`} name="company" type="text" placeholder="Distribuidora Pereyra" autoComplete="organization" />
        </div>
        <div className={field('phone')}>
          <label htmlFor={`${source}-phone`}>WhatsApp / teléfono<Req /></label>
          <input id={`${source}-phone`} name="phone" type="tel" inputMode="tel" placeholder="223 555-1234" autoComplete="tel" required />
        </div>
        <div className={field('email')}>
          <label htmlFor={`${source}-email`}>Email<Req /></label>
          <input id={`${source}-email`} name="email" type="email" placeholder="nombre@empresa.com" autoComplete="email" required />
        </div>
        <div className={field('province')}>
          <label htmlFor={`${source}-province`}>Provincia<Req /></label>
          <select id={`${source}-province`} name="province" defaultValue="" required>
            <option value="" disabled>Elegí</option>
            {PROVINCIAS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor={`${source}-city`}>Ciudad / zona</label>
          <input id={`${source}-city`} name="city" type="text" placeholder="Mar del Plata" autoComplete="address-level2" />
        </div>
        {role === 'distribuidor' && (
          <div className="field">
            <label htmlFor={`${source}-vol`}>Volumen mensual</label>
            <input id={`${source}-vol`} name="vol" type="text" placeholder="500 kg / 1 ton" />
          </div>
        )}
        <div className="field field--full">
          <label htmlFor={`${source}-msg`}>Mensaje</label>
          <textarea id={`${source}-msg`} name="msg" rows={2} placeholder="Contanos qué zona cubrís, qué productos te interesan..." />
        </div>
      </div>

      {/* Trampa para bots: fuera de pantalla y fuera del orden de tabulación */}
      <div className="dist__hp" aria-hidden="true">
        <label htmlFor={`${source}-${HONEYPOT_FIELD}`}>No completar</label>
        <input id={`${source}-${HONEYPOT_FIELD}`} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {sent
        ? <div className="dist__ok" role="status">¡Recibido! El equipo comercial se va a comunicar con vos a la brevedad.</div>
        : (
          <>
            <div className="dist__submit">
              <button type="submit" className="pop-btn pop-btn--orange pop-btn--lg" data-cursor="grow" disabled={sending}>
                {sending ? 'Enviando…' : 'Quiero distribuir'}
              </button>
              <p className="dist__note"><span className="field__req">*</span> Obligatorios · Te respondemos por WhatsApp.</p>
            </div>
            {error && <div className="dist__error" role="alert">{error}</div>}
          </>
        )
      }
    </form>
  )
}
