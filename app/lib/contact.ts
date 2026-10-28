// Datos de contacto en un solo lugar: los usan nav, hero, contacto, footer y el botón flotante.
export const WHATSAPP_NUMBER = '5492236045371'
export const WHATSAPP_DISPLAY = '223 604-5371'
export const EMAIL = 'info@congeladosformitas.com.ar'
export const INSTAGRAM = 'rebozaditospop'

// Mensaje armado: la conversación llega ya calificada al equipo comercial.
export const WHATSAPP_MESSAGES = {
  distribuidor: 'Hola! Quiero ser distribuidor de Rebozaditos Pop. Mi zona es: ',
  consulta: 'Hola! Tengo una consulta sobre los productos de Rebozaditos Pop.',
  producto: (title: string) => `Hola! Quiero información comercial sobre "${title}" de Rebozaditos Pop.`,
}

export const whatsappHref = (text: string = WHATSAPP_MESSAGES.distribuidor) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
