import HeroMedia from './HeroMedia'

export default function Hero() {
  return (
    <section className="hero" aria-label="Bienvenida" id="top">
      <div className="hero__blob" aria-hidden="true" />
      <span className="pop-dot pop-dot--yellow hero__dot hero__dot--1" aria-hidden="true" />
      <span className="pop-dot pop-dot--yellow hero__dot hero__dot--2" aria-hidden="true" />
      <span className="pop-dot pop-dot--yellow hero__dot hero__dot--3" aria-hidden="true" />
      <span className="pop-dot pop-dot--yellow hero__dot hero__dot--4" aria-hidden="true" />

      <div className="hero__inner">
        <div className="hero__copy">
          {/* El eyebrow va dentro del H1: así el título que lee Google incluye
              "rebozados congelados" y "Mar del Plata", sin cambiar el diseño */}
          <h1 className="hero__title">
            <span className="pop-eyebrow hero__eyebrow">Rebozados congelados de calidad · Desde Mar del Plata al mundo</span>
            <span>Fáciles de<br /> preparar.</span>
            <span className="hero__title-alt">Difíciles de<br /> ignorar.</span>
          </h1>

          <p className="hero__desc">
            Elaborando calidad desde 2014.<br />
            Variedad para resolver las comidas de todos los días sin caer siempre en lo mismo.
          </p>

          <div className="hero__ctas">
            <a href="/distribuidores" className="pop-btn pop-btn--navy pop-btn--lg" data-cursor="grow" data-track="hero_sumalos">
              Sumalos a tu negocio
            </a>
            <a href="#productos" className="pop-btn pop-btn--outline-light pop-btn--lg" data-cursor="grow">
              Ver productos
            </a>
          </div>
        </div>

        <HeroMedia />
      </div>

      <svg className="hero__wave" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 70 C 240 10 480 10 760 60 S 1240 120 1440 50 V120 H0z" fill="var(--cream)" />
      </svg>
    </section>
  )
}
