import { SITE_URL } from './seo'
import { LEAD_ROLES, type LeadRole } from './leads'

// Plantillas de email de la web. HTML con tablas y estilos en línea (los clientes de correo no
// soportan CSS moderno ni fuentes web). Los logos se piden por URL absoluta al sitio.

const C = {
  navy: '#082A54',
  orange: '#FF671B',
  cream: '#FFF5E7',
  yellow: '#F5BD3A',
  blue: '#0967BD',
  text: '#1B2B45',
  muted: '#5B6B82',
  line: '#EADFCB',
}

const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif"

// Cada tipo de contacto tiene su color, así se distingue de un vistazo en la bandeja.
const ROLE_STYLE: Record<LeadRole, { color: string; text: string }> = {
  distribuidor: { color: C.orange, text: '#FFFFFF' },
  comercio: { color: C.blue, text: '#FFFFFF' },
  gastronomia: { color: C.yellow, text: C.navy },
}

export const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

const nl2br = (value: string) => escapeHtml(value).replace(/\n/g, '<br>')

export type Lead = {
  role: LeadRole
  name: string
  company: string
  phone: string
  email: string
  province: string
  city: string
  vol: string
  msg: string
  source: string
}

const button = (href: string, label: string, bg: string, fg: string) => `
  <a href="${escapeHtml(href)}" target="_blank" style="display:inline-block;background:${bg};color:${fg};font-family:${FONT};font-size:14px;font-weight:700;letter-spacing:.04em;text-decoration:none;padding:13px 24px;border-radius:999px;margin:0 6px 10px 0;">${label}</a>`

// Marco común: preheader oculto, cabecera con el logo, tarjeta de contenido y pie.
function layout(opts: { preheader: string; body: string; footerNote: string }) {
  return `<!doctype html>
<html lang="es-AR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only">
<title>Congelados Formitas</title>
</head>
<body style="margin:0;padding:0;background:${C.cream};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(opts.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.cream};">
  <tr><td align="center" style="padding:28px 12px;">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;">
      <tr><td align="center" style="padding:0 0 20px;">
        <img src="${SITE_URL}/logos/logo-cara.png" width="84" height="85" alt="Mascota de Rebozaditos Pop" style="display:block;width:84px;height:auto;border:0;margin:0 auto 10px;">
        <div style="font-family:${FONT};font-size:22px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:${C.navy};">Congelados <span style="color:${C.orange};">Formitas</span></div>
      </td></tr>
      <tr><td style="background:#FFFFFF;border-radius:22px;overflow:hidden;box-shadow:0 8px 24px rgba(8,42,84,.10);">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="height:8px;background:${C.orange};font-size:0;line-height:0;">&nbsp;</td></tr>
          <tr><td style="padding:30px 32px 26px;font-family:${FONT};color:${C.text};">
            ${opts.body}
          </td></tr>
        </table>
      </td></tr>
      <tr><td align="center" style="padding:22px 16px 0;font-family:${FONT};font-size:12px;line-height:1.6;color:${C.muted};">
        <strong style="color:${C.navy};">Congelados Formitas SRL</strong> · Rebozaditos Pop<br>
        Ortiz de Zárate 3736, Mar del Plata · Lun a Vie, 8 a 17 h<br>
        ${opts.footerNote}
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`
}

const row = (label: string, value: string) => `
  <tr>
    <td style="padding:11px 0;border-bottom:1px solid ${C.line};font-family:${FONT};font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:${C.muted};width:38%;vertical-align:top;">${label}</td>
    <td style="padding:11px 0 11px 12px;border-bottom:1px solid ${C.line};font-family:${FONT};font-size:15px;color:${C.text};vertical-align:top;">${value}</td>
  </tr>`

// 1) Aviso interno: le llega a la empresa cada vez que alguien completa el formulario.
export function leadNotification(lead: Lead) {
  const roleLabel = LEAD_ROLES[lead.role]
  const style = ROLE_STYLE[lead.role]
  const digits = lead.phone.replace(/\D/g, '').replace(/^0/, '')
  const wa = `https://wa.me/${digits.startsWith('54') ? digits : `549${digits}`}`
  const where = [lead.city, lead.province].filter(Boolean).join(', ')

  const rows = [
    row('Nombre', `<strong>${escapeHtml(lead.name)}</strong>`),
    lead.company && row('Empresa', escapeHtml(lead.company)),
    row('Teléfono', `<a href="tel:${escapeHtml(lead.phone)}" style="color:${C.blue};text-decoration:none;">${escapeHtml(lead.phone)}</a>`),
    row('Email', `<a href="mailto:${escapeHtml(lead.email)}" style="color:${C.blue};text-decoration:none;">${escapeHtml(lead.email)}</a>`),
    row('Zona', escapeHtml(where)),
    lead.vol && row('Volumen mensual', escapeHtml(lead.vol)),
  ].filter(Boolean).join('')

  const message = lead.msg
    ? `<div style="margin:22px 0 0;padding:16px 18px;background:${C.cream};border-left:4px solid ${C.orange};border-radius:10px;font-family:${FONT};font-size:15px;line-height:1.6;color:${C.text};">
         <div style="font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${C.muted};margin-bottom:6px;">Mensaje</div>
         ${nl2br(lead.msg)}
       </div>`
    : ''

  const body = `
    <span style="display:inline-block;background:${style.color};color:${style.text};font-family:${FONT};font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;padding:6px 14px;border-radius:999px;">${escapeHtml(roleLabel)}</span>
    <h1 style="margin:14px 0 6px;font-family:${FONT};font-size:26px;line-height:1.2;color:${C.navy};">Nuevo contacto desde la web</h1>
    <p style="margin:0 0 20px;font-family:${FONT};font-size:15px;line-height:1.55;color:${C.muted};">
      <strong style="color:${C.text};">${escapeHtml(lead.name)}</strong> escribió desde ${escapeHtml(where || 'la web')}. Conviene responder rápido.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${C.line};">${rows}</table>
    ${message}
    <div style="margin:26px 0 0;">
      ${button(wa, 'Responder por WhatsApp', '#25A244', '#FFFFFF')}
      ${button(`mailto:${lead.email}`, 'Responder por mail', C.navy, '#FFFFFF')}
    </div>`

  const text = [
    `Nuevo contacto — ${roleLabel}`,
    '',
    `Nombre: ${lead.name}`,
    lead.company && `Empresa: ${lead.company}`,
    `Teléfono: ${lead.phone}`,
    `Email: ${lead.email}`,
    `Zona: ${where}`,
    lead.vol && `Volumen mensual: ${lead.vol}`,
    lead.msg && `\nMensaje:\n${lead.msg}`,
    '',
    `WhatsApp: ${wa}`,
  ].filter((v): v is string => typeof v === 'string').join('\n')

  return {
    subject: `Nuevo ${roleLabel.toLowerCase()}: ${lead.name} (${lead.province})`,
    html: layout({
      preheader: `${lead.name} · ${roleLabel} · ${where}`,
      body,
      footerNote: 'Aviso automático del formulario de congeladosformitas.com.ar',
    }),
    text,
  }
}

const STEPS = [
  ['Revisamos tu consulta', 'La revisa nuestro equipo comercial.'],
  ['Te contactamos', 'Te pasamos precios, condiciones y cómo te llega el pedido a tu zona.'],
  ['Arrancás a vender', 'Armamos juntos tu primer pedido y te acompañamos en el lanzamiento.'],
]

// 2) Confirmación automática para quien completó el formulario.
export function leadConfirmation(lead: Pick<Lead, 'name' | 'role' | 'province'>, waHref: string) {
  const firstName = lead.name.split(' ')[0]

  const steps = STEPS.map(([title, text], i) => `
    <tr>
      <td width="44" valign="top" style="padding:0 0 16px;">
        <div style="width:34px;height:34px;line-height:34px;border-radius:50%;background:${C.orange};color:#FFFFFF;font-family:${FONT};font-size:15px;font-weight:800;text-align:center;">${i + 1}</div>
      </td>
      <td valign="top" style="padding:0 0 16px;font-family:${FONT};">
        <div style="font-size:15px;font-weight:700;color:${C.navy};">${title}</div>
        <div style="font-size:14px;line-height:1.5;color:${C.muted};">${text}</div>
      </td>
    </tr>`).join('')

  const body = `
    <h1 style="margin:0 0 10px;font-family:${FONT};font-size:26px;line-height:1.2;color:${C.navy};">¡Gracias, ${escapeHtml(firstName)}! Recibimos tu consulta.</h1>
    <p style="margin:0 0 22px;font-family:${FONT};font-size:15px;line-height:1.6;color:${C.text};">
      Ya tenemos tus datos. En breve te escribe alguien de nuestro equipo para ver cómo llevar
      <strong>Rebozaditos Pop</strong> a tu zona. Esto es lo que sigue:
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${steps}</table>
    <div style="margin:8px 0 0;padding:16px 18px;background:${C.cream};border-radius:12px;font-family:${FONT};font-size:14px;line-height:1.6;color:${C.text};">
      <strong style="color:${C.navy};">¿Querés avanzar más rápido?</strong> Escribinos por WhatsApp y te respondemos en el momento.
    </div>
    <div style="margin:20px 0 0;">
      ${button(waHref, 'Escribir por WhatsApp', '#25A244', '#FFFFFF')}
      ${button(`${SITE_URL}/catalogo`, 'Ver el catálogo', C.navy, '#FFFFFF')}
    </div>`

  const text = [
    `¡Gracias, ${firstName}! Recibimos tu consulta.`,
    '',
    'En breve te escribe alguien de nuestro equipo.',
    '1. Revisamos tu consulta.',
    '2. Te contactamos con precios, condiciones y envío a tu zona.',
    '3. Arrancás a vender.',
    '',
    `WhatsApp: ${waHref}`,
    `Catálogo: ${SITE_URL}/catalogo`,
    '',
    'Congelados Formitas SRL · Rebozaditos Pop',
  ].join('\n')

  return {
    subject: 'Recibimos tu consulta · Rebozaditos Pop',
    html: layout({
      preheader: 'Ya tenemos tus datos. En breve te contactamos.',
      body,
      footerNote: 'Recibís este mail porque completaste el formulario en congeladosformitas.com.ar',
    }),
    text,
  }
}
