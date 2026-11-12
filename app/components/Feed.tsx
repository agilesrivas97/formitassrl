import Image from 'next/image'

const TILES = [
  { big: true, img: '/recetas/mesa.webp', cap: 'Toda la mesa, lista' },
  { big: false, img: '/recetas/bollitos.webp', cap: 'Bocado relleno de cheddar' },
  { big: false, img: '/recetas/palitosqueso.webp', cap: 'Palitos de muzzarella' },
  { big: false, img: '/recetas/filets.webp', cap: 'Filets recién salidos' },
  { big: false, img: '/recetas/bollitos-2.webp', cap: 'Brochettes para compartir' },
  { big: true, img: '/recetas/burguer.webp', cap: 'Burger con todo' },
]

const IGIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
  </svg>
)

export default function Feed() {
  return (
    <section className="feed" id="feed" aria-labelledby="feed-title">
      <div className="feed__inner">
        <header className="feed__head">
          <p className="pop-eyebrow pop-eyebrow--orange">@rebozaditospop</p>
          <h2 id="feed-title" className="pop-title feed__title">
            Así nos <span className="t-orange">cocinás.</span>
          </h2>
          <p className="feed__lede">Etiquetanos en tus posteos.</p>
        </header>

        <div className="feed__grid">
        {TILES.map(tile => (
          <a
            key={tile.img}
            className={`tile${tile.big ? ' tile--big' : ''}`}
            href="https://instagram.com/rebozaditospop"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${tile.cap} — ver en Instagram @rebozaditospop`}
            data-cursor="grow"
          >
            <Image
              className="tile__art"
              src={tile.img}
              alt={tile.cap}
              fill
              loading="lazy"
              sizes={tile.big ? '(max-width: 900px) 100vw, 640px' : '(max-width: 900px) 50vw, 320px'}
            />
            <div className="tile__overlay">
              <IGIcon />
              <span>Ver en Instagram</span>
            </div>
            <div className="tile__cap">{tile.cap}</div>
          </a>
        ))}
        </div>
      </div>
    </section>
  )
}
