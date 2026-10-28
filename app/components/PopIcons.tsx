import type { SVGProps } from 'react'

// Íconos del sistema Rebozaditos Pop, redibujados en SVG a partir del PDF de diseño.
// Usan currentColor para tomar el color del contenedor.

type IconProps = SVGProps<SVGSVGElement>

export const IconBowl = (p: IconProps) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" aria-hidden="true" {...p}>
    <path d="M8 34 h48 a24 14 0 0 1 -48 0z" />
    <path d="M14 40 q18 10 36 0" />
    <path d="M32 26 v-10 M22 28 l-5 -8 M42 28 l5 -8" />
  </svg>
)

export const IconBook = (p: IconProps) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M32 16 q-10 -6 -24 -4 v36 q14 -2 24 4 q10 -6 24 -4 v-36 q-14 -2 -24 4z" />
    <path d="M32 16 v36" />
  </svg>
)

export const IconTruck = (p: IconProps) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M18 18 h24 v26 h-24z" />
    <path d="M42 26 h9 l7 9 v9 h-16" />
    <circle cx="24" cy="46" r="5" fill="var(--icon-bg, #fff)" />
    <circle cx="49" cy="46" r="5" fill="var(--icon-bg, #fff)" />
    <path d="M4 24 h9 M2 32 h11 M6 40 h7" />
  </svg>
)

export const IconPollo = (p: IconProps) => (
  <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M10 44 c-6 -14 4 -30 20 -30 c9 0 15 5 16 11 l6 -6 a5 5 0 1 1 6 6 a5 5 0 1 1 -6 6 l-6 6 c-6 1 -11 7 -11 7 c-10 10 -25 13 -31 0z" />
  </svg>
)

export const IconPescado = (p: IconProps) => (
  <svg viewBox="0 0 64 64" aria-hidden="true" {...p}>
    <path d="M4 32 c8 -14 26 -18 38 -8 l16 -10 v36 l-16 -10 c-12 10 -30 6 -38 -8z" fill="currentColor" />
    <circle cx="16" cy="28" r="3" fill="var(--icon-bg, #fff)" />
    <path d="M14 38 q8 6 16 0" stroke="var(--icon-bg, #fff)" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
)

export const IconMariscos = (p: IconProps) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" aria-hidden="true" {...p}>
    <path d="M14 18 c10 -8 30 -6 36 10 c5 14 -6 26 -20 24 c-10 -2 -14 -12 -8 -18 c4 -4 12 -2 12 4" />
    <path d="M14 18 l-6 -10 M14 18 l-10 -2" strokeWidth="4" />
    <path d="M50 34 h8 M44 48 l6 6" strokeWidth="4" />
  </svg>
)

export const IconVegetales = (p: IconProps) => (
  <svg viewBox="0 0 64 64" aria-hidden="true" {...p}>
    <path d="M6 30 c4 -16 20 -24 36 -22 c-2 16 -16 28 -36 22z" fill="currentColor" />
    <path d="M8 30 l26 -16" stroke="var(--icon-bg, #fff)" strokeWidth="3" strokeLinecap="round" />
    <path d="M28 34 l30 12 l-30 14z" fill="var(--orange)" />
    <circle cx="38" cy="45" r="3" fill="var(--icon-bg, #fff)" />
    <circle cx="33" cy="53" r="2" fill="var(--icon-bg, #fff)" />
  </svg>
)

export const IconWhatsApp = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m.01 18.15a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24s-3.7 8.24-8.24 8.24m4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06a6.8 6.8 0 0 1-3.37-2.94c-.25-.44.25-.41.73-1.36.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.42h-.48a.92.92 0 0 0-.67.31c-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.24 3.74 1.58.68 2.19.74 2.98.62.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.17-.47-.29" />
  </svg>
)

export const IconMail = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 7 8 6 8-6" />
  </svg>
)

export const IconInstagram = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
)
