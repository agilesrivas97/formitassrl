import type { Metadata } from 'next'
import Script from 'next/script'
import { Unbounded, Instrument_Sans, Lilita_One } from 'next/font/google'
import './globals.css'
import { BUSINESS, SEO_KEYWORDS, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, DEFAULT_TITLE, SITE_NAME, SITE_URL } from './lib/seo'

const unbounded = Unbounded({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-unbounded',
})

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-instrument',
})

const lilita = Lilita_One({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-lilita',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'es_AR',
    type: 'website',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  '@id': `${SITE_URL}/#organization`,
  name: BUSINESS.name,
  alternateName: ['Formitas', 'Congelados Formitas', 'Rebozaditos Pop'],
  description: DEFAULT_DESCRIPTION,
  slogan: 'Fáciles de preparar. Difíciles de ignorar.',
  knowsAbout: ['rebozados congelados', 'frigorífico', 'distribución mayorista de congelados'],
  url: BUSINESS.url,
  logo: BUSINESS.logo,
  image: `${SITE_URL}${DEFAULT_OG_IMAGE.url}`,
  telephone: BUSINESS.telephone,
  email: BUSINESS.email,
  foundingDate: BUSINESS.foundingDate,
  address: BUSINESS.address,
  openingHours: BUSINESS.openingHours,
  sameAs: BUSINESS.sameAs,
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Argentina',
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: 'es-AR',
  publisher: { '@id': `${SITE_URL}/#organization` },
}

const gaId = process.env.NEXT_PUBLIC_GA_ID

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${unbounded.variable} ${instrumentSans.variable} ${lilita.variable}`} suppressHydrationWarning>
      <head>
        {/* Antes de pintar: si ya vio la intro esta semana, html.intro-seen oculta el loader */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=+localStorage.getItem('pop-intro-seen');if(t&&Date.now()-t<6048e5)document.documentElement.classList.add('intro-seen')}catch(e){}`,
          }}
        />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        {children}
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
