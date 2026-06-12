import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Congelados Formitas — Mar del Plata',
  description: 'Rebozados congelados de Mar del Plata. Abrí el freezer, solucionaste la cena.',
  keywords: 'congelados, rebozados, mar del plata, formitas, nuggets, milanesas',
  openGraph: {
    title: 'Congelados Formitas',
    description: 'Rebozados artesanales de Mar del Plata',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;800;900&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap"
        />

        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>{children}</body>
    </html>
  )
}
