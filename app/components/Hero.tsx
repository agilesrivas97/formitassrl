export default function Hero() {
  return (
    <section className="hero" aria-label="Bienvenida" id="top">
      <div className="hero__half hero__half--text">
        <div className="hero__dots" />

        <div className="hero__copy">
          <div className="hero__eyebrow">
            <span className="hero__eyebrow-dot" />
            Mar del Plata · Desde 2014
          </div>

          <h1 className="hero__final-title">
            <em>Solucionaste</em> la cena.
          </h1>

          <p className="hero__desc">
            Rebozados artesanales, sin conservantes, con pescado del Atlántico Sur — hechos en Mar
            del Plata desde 2014. Del freezer a la mesa en minutos, con el sabor de la cocina de siempre.
          </p>

          <div className="hero__ctas">
            <a href="#productos" className="btn btn--hero" data-cursor="grow">
              Ver productos <span aria-hidden="true">→</span>
            </a>
            <a href="#distribuidores" className="btn btn--ghost" data-cursor="grow">
              Quiero ser distribuidor <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>

      <div className="hero__half hero__half--media">
        <video
          className="hero__media-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/camion-poster.jpg"
        >
          <source src="/camion.mp4" type="video/mp4" />
        </video>
        <div className="hero__nav-scrim" aria-hidden="true" />
        <div className="hero__media-scrim" aria-hidden="true" />
      </div>

      <div className="hero__marquee" aria-hidden="true">
        <div className="hero__marquee-track">
          <span>· Rebozado artesanal · Sin conservantes · Pescado del Atlántico Sur · Hecho en Mar del Plata · Listo en 12 min · Rebozado artesanal · Sin conservantes · Pescado del Atlántico Sur · Hecho en Mar del Plata · Listo en 12 min</span>
        </div>
      </div>
    </section>
  )
}
