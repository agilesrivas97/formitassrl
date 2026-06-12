import type { ReactElement } from 'react'
import type { Prod } from '../lib/products'

const SHAPES: Record<string, (accent: string) => ReactElement> = {
  filet: (accent) => (
    <svg className="card__img" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 115 q90 -70 180 0 q-90 55 -180 0z" fill="#FFFBF5" stroke={accent} strokeWidth="5"/>
      <path d="M30 130 q90 -50 180 0 q-90 40 -180 0z" fill="#FFFBF5" stroke={accent} strokeWidth="4" opacity="0.5"/>
      <path d="M65 108 q16 -9 28 0 M110 98 q16 -9 28 0 M155 105 q16 -9 28 0 M85 128 q14 -8 24 0 M130 122 q14 -8 24 0" stroke={accent} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  medallon: (accent) => (
    <svg className="card__img" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="90" cy="105" rx="52" ry="42" fill="#FFFBF5" stroke={accent} strokeWidth="5"/>
      <ellipse cx="158" cy="145" rx="48" ry="38" fill="#FFFBF5" stroke={accent} strokeWidth="5"/>
      <path d="M68 100 q14 -7 24 0 M96 116 q12 -6 20 0 M138 140 q14 -7 24 0 M164 158 q12 -6 20 0" stroke={accent} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  barrita: (accent) => (
    <svg className="card__img" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="78" width="170" height="24" rx="12" fill="#FFFBF5" stroke={accent} strokeWidth="5"/>
      <rect x="40" y="110" width="170" height="24" rx="12" fill="#FFFBF5" stroke={accent} strokeWidth="5"/>
      <rect x="20" y="142" width="170" height="24" rx="12" fill="#FFFBF5" stroke={accent} strokeWidth="5"/>
      <path d="M50 90 h110 M60 122 h110 M40 154 h110" stroke={accent} strokeWidth="2" strokeDasharray="6 8" strokeLinecap="round"/>
    </svg>
  ),
  raba: (accent) => (
    <svg className="card__img" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
      <circle cx="80" cy="100" r="34" fill="none" stroke={accent} strokeWidth="7"/>
      <circle cx="155" cy="120" r="32" fill="none" stroke={accent} strokeWidth="7"/>
      <circle cx="110" cy="165" r="30" fill="none" stroke={accent} strokeWidth="7"/>
      <circle cx="80" cy="100" r="16" fill={accent} opacity="0.2"/>
      <circle cx="155" cy="120" r="15" fill={accent} opacity="0.2"/>
      <circle cx="110" cy="165" r="14" fill={accent} opacity="0.2"/>
    </svg>
  ),
  langostino: (accent) => (
    <svg className="card__img" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 180 q-20 -60 20 -100 q40 -40 100 -30 q30 6 36 36" fill="none" stroke={accent} strokeWidth="14" strokeLinecap="round"/>
      <path d="M60 180 q-20 -60 20 -100 q40 -40 100 -30 q30 6 36 36" fill="none" stroke="#FFFBF5" strokeWidth="6" strokeLinecap="round" strokeDasharray="10 8"/>
      <circle cx="196" cy="86" r="10" fill={accent}/>
      <path d="M55 185 l-12 16 M65 182 l-8 18" stroke={accent} strokeWidth="4" strokeLinecap="round"/>
    </svg>
  ),
  'barrita-mozza': (accent) => (
    <svg className="card__img" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="82" width="175" height="28" rx="10" fill={accent} stroke="#1B3FA0" strokeWidth="4"/>
      <rect x="40" y="120" width="175" height="28" rx="10" fill={accent} stroke="#1B3FA0" strokeWidth="4"/>
      <rect x="25" y="158" width="175" height="28" rx="10" fill={accent} stroke="#1B3FA0" strokeWidth="4"/>
      <path d="M50 96 q20 -6 36 0 q16 6 32 0 q16 -6 32 0" stroke="#FFFBF5" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M58 134 q20 -6 36 0 q16 6 32 0 q16 -6 32 0" stroke="#FFFBF5" strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  bocadito: (accent) => (
    <svg className="card__img" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 160 l50 -80 l50 80z" fill={accent} stroke="#1B3FA0" strokeWidth="4"/>
      <path d="M130 170 l46 -72 l46 72z" fill={accent} stroke="#1B3FA0" strokeWidth="4"/>
      <path d="M75 168 l38 -60 l38 60z" fill={accent} stroke="#1B3FA0" strokeWidth="4" opacity="0.7"/>
      <circle cx="90" cy="130" r="5" fill="#FFFBF5"/>
      <circle cx="176" cy="140" r="5" fill="#FFFBF5"/>
    </svg>
  ),
  'medallon-pollo': (accent) => (
    <svg className="card__img" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="88" cy="108" rx="54" ry="44" fill={accent} stroke="#1B3FA0" strokeWidth="5"/>
      <ellipse cx="160" cy="148" rx="50" ry="40" fill={accent} stroke="#1B3FA0" strokeWidth="5"/>
      <path d="M66 102 q14 -7 24 0 M96 118 q12 -6 20 0 M140 142 q14 -7 24 0 M168 160 q12 -6 20 0" stroke="#1B3FA0" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  formita: (accent) => (
    <svg className="card__img" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 150 q10 -60 50 -70 q30 -8 50 10 q20 18 50 -10 q30 -28 50 20 q10 28 -20 50 q-60 30 -130 20 q-60 -10 -50 -20z" fill={accent} stroke="#1B3FA0" strokeWidth="5"/>
      <path d="M65 138 q16 -8 26 0 M105 120 q16 -8 26 0 M148 128 q14 -7 22 0 M85 158 q16 -8 26 0 M130 155 q14 -7 22 0" stroke="#1B3FA0" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  nugget: (accent) => (
    <svg className="card__img" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
      <path d="M44 118 q8 -46 48 -52 q28 -4 40 18 q12 22 44 10 q32 -12 44 18 q12 30 -10 54 q-28 30 -80 28 q-72 -4 -86 -76z" fill={accent} stroke="#1B3FA0" strokeWidth="5"/>
      <path d="M68 108 q14 -6 24 0 M110 96 q14 -6 24 0 M152 104 q12 -6 20 0 M88 140 q14 -6 24 0 M128 148 q12 -6 20 0" stroke="#1B3FA0" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  ),
}

function ProductImg({ prod }: { prod: Prod }) {
  if (prod.image) return <img src={prod.image} alt={prod.title} className="card__img" loading="lazy" />
  const shape = SHAPES[prod.shape] ?? SHAPES['medallon']
  return shape(prod.accent)
}

type ProductCardProps = {
  prod: Prod
  open: boolean
  onToggle: () => void
  hidden?: boolean
}

export default function ProductCard({ prod, open, onToggle, hidden }: ProductCardProps) {
  return (
    <article
      className={`card${open ? ' is-open' : ''}`}
      data-cat={prod.cat}
      style={{ ['--accent' as string]: prod.accent }}
      hidden={hidden}
      onClick={onToggle}
    >
      <div className="card__media">
        <ProductImg prod={prod} />
        <span className="card__badge">{prod.badge}</span>
      </div>
      <div className="card__body">
        <div className="card__meta">{prod.badge} · {prod.packSize}</div>
        <h3 className="card__title">{prod.title}</h3>
        <button
          className="card__open"
          aria-label="Ver detalles"
          onClick={e => { e.stopPropagation(); onToggle() }}
        >+</button>
      </div>
      <div className="card__detail">
        <span className="card__packs-label">Presentaciones</span>
        <div className="card__packs-grid">
          {prod.packs.map(pack => (
            <div key={pack} className="card__pack-box">
              <span className="card__pack-value">{pack}</span>
            </div>
          ))}
        </div>
        <div className="card__attr">{prod.attr}</div>
      </div>
    </article>
  )
}
