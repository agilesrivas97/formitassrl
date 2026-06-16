const TILES = [
  { cls: 'tile--big', img: '/recetas/mesa.webp', cap: 'Toda la mesa, lista' },
  { cls: '', img: '/recetas/bollitos.webp', cap: 'Bocado relleno de cheddar' },
  { cls: '', img: '/recetas/palitosqueso.webp', cap: 'Palitos de muzzarella' },
  { cls: '', img: '/recetas/filets.webp', cap: 'Filets recién salidos' },
  { cls: '', img: '/recetas/bollitos-2.webp', cap: 'Brochettes para compartir' },
  { cls: 'tile--big', img: '/recetas/burguer.webp', cap: 'Burger con todo' },
]

const IGIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#FFFBF5" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="4"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1.2" fill="#FFFBF5"/>
  </svg>
)

export default function Feed() {
  return (
    <section className="feed" id="feed" aria-label="Comunidad">
      <header className="feed__head">
        <div className="feed__kicker">06 · @rebozaditospop</div>
        <h2 className="feed__title">Así nos cocinás.</h2>
        <p className="feed__lede">Etiquetanos en tus posteos.</p>
      </header>
      <div className="feed__grid">
        {TILES.map(tile => (
          <a
            key={tile.img}
            className={`tile ${tile.cls}`}
            href="https://instagram.com/rebozaditospop"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${tile.cap} — ver en Instagram @rebozaditospop`}
            data-cursor="grow"
          >
            <div className="tile__art" style={{ backgroundImage: `url(${tile.img})` }} role="img" aria-label={tile.cap} />
            <div className="tile__overlay">
              <IGIcon />
              <span>Ver en Instagram</span>
            </div>
            <div className="tile__cap">{tile.cap}</div>
          </a>
        ))}
      </div>
    </section>
  )
}
