const TEASERS = [
  { shape: 'letra',      title: 'Letritas',   meta: 'Alfabeto completo' },
  { shape: 'pelotita',   title: 'Pelotitas',  meta: 'Bocado perfecto'   },
  { shape: 'estrellita', title: 'Estrellitas',meta: 'Pollo + zanahoria' },
]

const SHAPES: Record<string, React.ReactNode> = {
  dino: <svg viewBox="0 0 200 200"><path d="M40 130 q-20 -40 20 -60 q10 -40 50 -30 q40 -20 60 30 q30 30 -10 70 q-30 30 -80 20 q-40 0 -40 -30z" fill="#1B3FA0" stroke="#F5F0E8" strokeWidth="5"/><circle cx="120" cy="80" r="8" fill="#F5F0E8"/></svg>,
  letra: <svg viewBox="0 0 200 200"><text x="100" y="135" fontFamily="Unbounded" fontSize="120" textAnchor="middle" fill="#1B3FA0" stroke="#F5F0E8" strokeWidth="6" paintOrder="stroke">A</text></svg>,
  pelotita: <svg viewBox="0 0 200 200"><circle cx="70" cy="120" r="34" fill="#1B3FA0" stroke="#F5F0E8" strokeWidth="5"/><circle cx="130" cy="80" r="30" fill="#1B3FA0" stroke="#F5F0E8" strokeWidth="5"/><circle cx="140" cy="140" r="26" fill="#1B3FA0" stroke="#F5F0E8" strokeWidth="5"/></svg>,
  estrellita: <svg viewBox="0 0 200 200"><path d="M100 30 l24 50 l54 6 l-40 38 l10 56 l-48 -28 l-48 28 l10 -56 l-40 -38 l54 -6z" fill="#1B3FA0" stroke="#F5F0E8" strokeWidth="5"/></svg>,
}

export default function ComingSoon() {
  return (
    <section className="soon" id="proximamente" aria-label="Próximas elaboraciones">
      <div className="soon__grain" />
      <div className="soon__bg-text" aria-hidden="true">SOON</div>

      <div className="soon__head">
        <div className="soon__kicker">Lo que se viene</div>
        <h2 className="soon__title">PRÓXIMAS<br className="soon__title-break" />{' '}<span>ELABORACIONES</span></h2>
        <p className="soon__lede">Seguimos creando. Esto es un adelanto de lo que está por salir del freezer.</p>
      </div>

      <div className="soon__spotlight">
        <div className="soon__spotlight-art" data-cursor="grow">
          <span className="soon__badge">Próximamente</span>
          <div className="soon__spotlight-shape">{SHAPES.dino}</div>
        </div>
        <div className="soon__spotlight-info">
          <h3>Rebozadito Dino</h3>
          <p>La nueva forma estrella de la línea Pop: dinosaurios rebozados para que los más chicos coman pollo jugando.</p>
        </div>
      </div>

      <div className="soon__teasers">
        {TEASERS.map(card => (
          <article key={card.shape} className="teaser">
            <div className="teaser__shape">{SHAPES[card.shape]}</div>
            <div className="teaser__title">{card.title}</div>
            <div className="teaser__meta">{card.meta}</div>
          </article>
        ))}
      </div>

      <div className="soon__strip" aria-hidden="true">
        <span>PRÓXIMAMENTE · PRÓXIMAMENTE · PRÓXIMAMENTE · PRÓXIMAMENTE · PRÓXIMAMENTE · PRÓXIMAMENTE · PRÓXIMAMENTE · PRÓXIMAMENTE · </span>
      </div>
    </section>
  )
}
