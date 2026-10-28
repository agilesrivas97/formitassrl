import Image from 'next/image'
import DistribuidoresForm from './DistribuidoresForm'

export default function Distribuidores() {
  return (
    <>
      <section className="mapa" id="distribucion" aria-labelledby="mapa-title">
        <div className="mapa__media" aria-hidden="true">
          <Image src="/pop/distribucion-deposito.webp" alt="" fill sizes="100vw" />
          <div className="mapa__map">
            <Image src="/pop/mapa-argentina-hd.webp" alt="" width={997} height={1578} unoptimized />
            <Image className="mapa__face" src="/logos/logo-cara.png" alt="" width={64} height={64} />
          </div>
        </div>
        <div className="mapa__copy">
          <h2 id="mapa-title" className="mapa__title">
            Llevá
            <span><span className="t-orange">Rebozaditos</span> <span className="t-blue">Pop</span></span>
            a tu zona.
          </h2>
          <p className="mapa__sub">De Mar del Plata a todo el país</p>
          <p className="mapa__item">01 · Buscamos distribuidores mayoristas</p>
          <p className="mapa__item">Sumate a nuestra red de distribuidores</p>
          <a href="#sumate" className="pop-btn pop-btn--orange pop-btn--xl" data-cursor="grow" data-track="quiero_distribuir_mapa">Quiero ser distribuidor</a>
        </div>
      </section>

      <section className="dist" id="sumate" aria-labelledby="dist-title">
        <div className="dist__inner pop-wrap">
          <div className="dist__copy">
            <p className="pop-eyebrow pop-eyebrow--orange">Sumate</p>
            <h2 id="dist-title" className="pop-title dist__title">
              Del origen al mostrador,<br /><span className="t-orange">con todo el Pop.</span>
            </h2>
            <p className="dist__lede">
              Producción propia, variedad y acompañamiento comercial para distribuidores de alimentos
              congelados. Contanos quién sos y te conectamos con el equipo indicado.
            </p>
            <ol className="dist__steps">
              <li><span>01</span>Fabricamos</li>
              <li><span>02</span>Distribuimos</li>
              <li><span>03</span>Vos hacés crecer la marca</li>
            </ol>
          </div>

          <DistribuidoresForm source="home" />
        </div>
      </section>
    </>
  )
}
