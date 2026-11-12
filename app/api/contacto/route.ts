import { Resend } from 'resend'
import { HONEYPOT_FIELD, LEAD_ROLES, PROVINCIAS, type LeadRole } from '../../lib/leads'

// Límite simple por IP: 5 envíos cada 10 minutos. Vive en memoria de cada instancia,
// alcanza para frenar spam básico; para algo más fuerte usar Vercel Firewall / KV.
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter(t => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > MAX_PER_WINDOW
}

// Los datos del formulario van dentro de HTML: hay que escaparlos.
const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

const clean = (value: unknown, max = 200) =>
  typeof value === 'string' ? value.trim().slice(0, max) : ''

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return Response.json({ error: 'El envío de emails no está configurado.' }, { status: 503 })
  }

  const body = await request.json().catch(() => null) as Record<string, unknown> | null
  if (!body) {
    return Response.json({ error: 'Solicitud inválida.' }, { status: 400 })
  }

  // Bot: respondemos ok para no darle pistas, pero no enviamos nada.
  if (clean(body[HONEYPOT_FIELD])) return Response.json({ ok: true })

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local'
  if (rateLimited(ip)) {
    return Response.json({ error: 'Demasiados envíos. Probá de nuevo en unos minutos.' }, { status: 429 })
  }

  const role = clean(body.role) as LeadRole
  const name = clean(body.name, 120)
  const email = clean(body.email, 160)
  const phone = clean(body.phone, 40)
  const province = clean(body.province, 60)

  if (!name || !email || !phone || !province) {
    return Response.json({ error: 'Faltan campos obligatorios.' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || phone.replace(/\D/g, '').length < 8) {
    return Response.json({ error: 'Email o teléfono inválido.' }, { status: 400 })
  }
  if (!(role in LEAD_ROLES) || !(PROVINCIAS as readonly string[]).includes(province)) {
    return Response.json({ error: 'Solicitud inválida.' }, { status: 400 })
  }

  const roleLabel = LEAD_ROLES[role]
  const rows: [string, string][] = [
    ['Tipo de negocio', roleLabel],
    ['Nombre', name],
    ['Empresa', clean(body.company, 120)],
    ['Teléfono', phone],
    ['Email', email],
    ['Provincia', province],
    ['Ciudad / zona', clean(body.city, 120)],
    ['Volumen mensual estimado', clean(body.vol, 80)],
    ['Mensaje', clean(body.msg, 2000)],
    ['Origen', clean(body.source, 40)],
  ]

  // Números argentinos cargados sin código de país ("223 555-1234") → 549 + número para wa.me
  const digits = phone.replace(/\D/g, '').replace(/^0/, '')
  const waNumber = digits.startsWith('54') ? digits : `549${digits}`
  const html = `
    <h2>Nuevo contacto comercial — ${escapeHtml(roleLabel)}</h2>
    <table cellpadding="6" cellspacing="0">
      ${rows
        .filter(([, value]) => value)
        .map(([label, value]) => `<tr><td><strong>${label}</strong></td><td>${escapeHtml(value).replace(/\n/g, '<br>')}</td></tr>`)
        .join('')}
    </table>
    <p><a href="https://wa.me/${waNumber}">Responder por WhatsApp</a></p>
  `

  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? 'Formitas <onboarding@resend.dev>',
    to: process.env.RESEND_TO_EMAIL ?? 'info@congeladosformitas.com.ar',
    replyTo: email,
    subject: `Nuevo ${roleLabel.toLowerCase()} — ${name} (${province})`,
    html,
  })

  if (error) {
    console.error('[api/contacto] Resend error:', error)
    return Response.json({ error: 'No se pudo enviar el email.' }, { status: 502 })
  }

  return Response.json({ ok: true })
}
