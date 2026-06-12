import { Resend } from 'resend'

const ROLE_LABELS: Record<string, string> = {
  distribuidor: 'Distribuidor',
  comerciante:  'Comerciante',
  consumidor:   'Consumidor',
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return Response.json({ error: 'El envío de emails no está configurado.' }, { status: 503 })
  }

  const body = await request.json().catch(() => null)
  if (!body) {
    return Response.json({ error: 'Solicitud inválida.' }, { status: 400 })
  }

  const { role, name, email, city, vol, store, msg } = body as Record<string, string | undefined>

  if (!name || !email || !city) {
    return Response.json({ error: 'Faltan campos obligatorios.' }, { status: 400 })
  }

  const roleLabel = ROLE_LABELS[role ?? ''] ?? role ?? '—'

  const rows: [string, string | undefined][] = [
    ['Soy', roleLabel],
    ['Nombre', name],
    ['Email', email],
    ['Ciudad', city],
    ['Volumen mensual estimado', vol],
    ['Nombre del local', store],
    ['Mensaje', msg],
  ]

  const html = `
    <h2>Nuevo contacto desde el sitio — Sumate</h2>
    <table cellpadding="6" cellspacing="0">
      ${rows
        .filter(([, value]) => value)
        .map(([label, value]) => `<tr><td><strong>${label}</strong></td><td>${value}</td></tr>`)
        .join('')}
    </table>
  `

  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? 'Formitas <onboarding@resend.dev>',
    to: process.env.RESEND_TO_EMAIL ?? 'info@congeladosformitas.com.ar',
    replyTo: email,
    subject: `Sumate — ${roleLabel}: ${name}`,
    html,
  })

  if (error) {
    console.error('[api/contacto] Resend error:', error)
    return Response.json({ error: 'No se pudo enviar el email.' }, { status: 502 })
  }

  return Response.json({ ok: true })
}
