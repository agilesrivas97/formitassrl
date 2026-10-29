import Image from 'next/image'

// Posiciones (en %) de los puntos de destino dibujados en mapa-argentina-hd.webp (997×1578).
const DESTINOS: [number, number][] = [
  [38.1, 6.6], [31.4, 12.5], [54.3, 14.1], [23.8, 21.5], [40.7, 21.9], [38.5, 28.9],
  [49, 33.1], [74, 28.8], [25.6, 42.4], [79.2, 41.7], [21.7, 34.3], [15.6, 51.3],
  [27.5, 62.8], [15.5, 79.8], [48.1, 81.8], [30.9, 93.6], [89.2, 17.1],
]
// Mar del Plata, origen de todas las rutas.
const ORIGEN: [number, number] = [75.9, 48.2]

export default function MapaRutas() {
  return (
    <div className="rutas">
      <Image src="/pop/mapa-argentina-hd.webp" alt="Mapa de Argentina con las rutas de distribución desde Mar del Plata" width={997} height={1578} unoptimized preload />
      <Image
        className="rutas__face"
        src="/logos/logo-cara.png"
        alt=""
        width={64}
        height={64}
        style={{ left: `${ORIGEN[0]}%`, top: `${ORIGEN[1]}%` }}
      />
      <span className="rutas__origen" style={{ left: `${ORIGEN[0]}%`, top: `${ORIGEN[1]}%` }}>Mar del Plata</span>
      {DESTINOS.map(([x, y], i) => (
        <a
          key={i}
          className="rutas__pin"
          href="#formulario"
          style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${(i % 6) * 0.35}s` }}
          aria-label="Quiero distribuir en esta zona"
          data-track="mapa_zona"
        >
          <span>Sumá tu zona →</span>
        </a>
      ))}
    </div>
  )
}
