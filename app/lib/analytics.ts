// Eventos de conversión para GA4. Si GA no está cargado (sin NEXT_PUBLIC_GA_ID) no hace nada.
//   generate_lead  → envío del formulario de distribuidores (marcarlo como conversión en GA4)
//   contact_click  → clics en WhatsApp, email o Instagram
//   cta_click      → clics en "Quiero distribuir" y similares
type GtagWindow = Window & { gtag?: (...args: unknown[]) => void }

export function track(event: string, params: Record<string, string | number | undefined> = {}) {
  if (typeof window === 'undefined') return
  ;(window as GtagWindow).gtag?.('event', event, params)
}
