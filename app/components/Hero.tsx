import Image from 'next/image'

const PROD_IMAGES = [
  { src: '/platos/plato-3.webp', alt: 'Medallones rebozados servidos en plato', cls: 'hero__prod--a' },
  { src: '/platos/plato-2.webp', alt: 'Filet de merluza rebozado servido en plato', cls: 'hero__prod--b' },
  { src: '/platos/plato-1.webp', alt: 'Barritas de muzzarella servidas en plato', cls: 'hero__prod--c' },
  { src: '/platos/plato-4.webp', alt: 'Rabas de calamar servidas en plato', cls: 'hero__prod--d' },
]

export default function Hero() {
  return (
    <section className="hero" aria-label="Bienvenida" id="top">
      <div className="hero__dots" />

      <div className="hero__copy">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-dot" />
          Mar del Plata · Desde 2014
        </div>

        <h1 className="hero__final-title">
          <em>Solucionaste</em> la cena.
        </h1>

        <a href="#productos" className="btn btn--hero" data-cursor="grow">
          Ver productos <span aria-hidden="true">→</span>
        </a>
      </div>

      <div className="hero__stage">
        <div className="hero__sparks" aria-hidden="true">
          {[
            { x: '8%', y: '14%', d: '0s', t: '★' },
            { x: '88%', y: '18%', d: '.5s', t: '✦' },
            { x: '14%', y: '78%', d: '1s', t: '✦' },
            { x: '82%', y: '74%', d: '.3s', t: '★' },
          ].map((s, i) => (
            <span key={i} style={{ ['--x' as string]: s.x, ['--y' as string]: s.y, ['--d' as string]: s.d }}>{s.t}</span>
          ))}
        </div>

        <div className="hero__mascot">
          <img src="/mascot/06-point.webp" alt="Mascota Formitas señalando los productos" />
        </div>

        <div className="hero__products">
          {PROD_IMAGES.map(p => (
            <div key={p.src} className={`hero__prod ${p.cls}`}>
              <Image src={p.src} alt={p.alt} width={280} height={280} />
            </div>
          ))}
        </div>
      </div>

      <div className="hero__marquee" aria-hidden="true">
        <div className="hero__marquee-track">
          <span>· Rebozado artesanal · Sin conservantes · Pescado del Atlántico Sur · Hecho en Mar del Plata · Listo en 12 min · Rebozado artesanal · Sin conservantes · Pescado del Atlántico Sur · Hecho en Mar del Plata · Listo en 12 min</span>
        </div>
      </div>
    </section>
  )
}
