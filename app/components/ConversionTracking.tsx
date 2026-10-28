'use client'
import { useEffect } from 'react'
import { track } from '../lib/analytics'

// Un solo listener para todo el sitio: no hace falta instrumentar cada botón.
// Los CTA se marcan con data-track="nombre" en el JSX.
export default function ConversionTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element).closest<HTMLElement>('a, [data-track]')
      if (!el) return
      const href = el.getAttribute('href') ?? ''
      const where = el.closest('section, header, footer')?.id || el.closest('section, header, footer')?.className.split(' ')[0]

      if (href.includes('wa.me')) track('contact_click', { method: 'whatsapp', location: where })
      else if (href.startsWith('mailto:')) track('contact_click', { method: 'email', location: where })
      else if (href.includes('instagram.com')) track('contact_click', { method: 'instagram', location: where })

      if (el.dataset.track) track('cta_click', { cta: el.dataset.track, location: where })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
  return null
}
