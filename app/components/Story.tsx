import Image from 'next/image'

const STEPS = ['El origen', 'La elaboración', 'El resultado'] as const

function Progress({ active }: { active: number }) {
  return (
    <ol className="story-progress" style={{ ['--step' as string]: active }} aria-label="Nuestra historia">
      {STEPS.map((label, i) => (
        <li
          key={label}
          className={i === active ? 'is-active' : i < active ? 'is-done' : undefined}
          aria-current={i === active ? 'step' : undefined}
        >
          <span className="story-progress__dot" />
          <span className="story-progress__label">{label}</span>
        </li>
      ))}
    </ol>
  )
}

export default function Story() {
  return (
    <div id="historia">
      {/* 01 · El origen */}
      <section className="chapter chapter--origen" aria-labelledby="ch1-title">
        <div className="chapter__inner pop-wrap">
          <div className="chapter__copy">
            <p className="pop-eyebrow pop-eyebrow--orange">Nuestra historia · 01 / 03</p>
            <h2 id="ch1-title" className="pop-title chapter__title">
              La diferencia<br />está en el <span className="t-orange">origen.</span>
            </h2>
            <p className="chapter__kicker">Nuestra filosofía</p>
            <p className="chapter__pill">Productos que elegiríamos para nuestras familias.</p>
            <div className="chapter__body">
              <p>
                Desde 2014 elaboramos alimentos ultracongelados con producción propia y una
                filosofía simple: hacer productos que nosotros mismos elegiríamos para nuestras familias.
              </p>
              <p>
                Sabemos que no todas las materias primas son iguales. Tampoco todos los procesos.
                Por eso elegimos trabajar con ingredientes seleccionados y una elaboración consciente.
              </p>
              <p>
                Estamos convencidos de que la calidad final depende de cada decisión tomada mucho
                antes de que el producto llegue al freezer.
              </p>
            </div>
            <Progress active={0} />
          </div>

          <figure className="chapter__media chapter__media--frame">
            <Image src="/pop/historia-origen.webp" alt="Operaria en la línea de producción de Congelados Formitas" fill sizes="(max-width: 900px) 90vw, 480px" />
            <span className="chapter__badge chapter__badge--blue">Desde<strong>2014</strong></span>
            <span className="chapter__num">01</span>
          </figure>
        </div>
      </section>

      {/* 02 · La elaboración */}
      <section className="chapter chapter--elaboracion" aria-labelledby="ch2-title">
        <svg className="chapter__waves" viewBox="0 0 1440 300" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 200 C 240 120 420 260 700 170 S 1180 40 1440 160" stroke="var(--pop-blue)" strokeWidth="10" fill="none" />
          <path d="M0 240 C 260 170 460 290 740 210 S 1200 100 1440 220" stroke="var(--orange)" strokeWidth="6" fill="none" />
        </svg>
        <div className="chapter__inner pop-wrap">
          <figure className="chapter__media chapter__media--square">
            <Image src="/pop/historia-elaboracion.webp" alt="Formitas de pollo recién rebozadas en la cinta de producción" fill sizes="(max-width: 900px) 90vw, 520px" />
            <span className="chapter__num">02</span>
            <span className="chapter__caption">Producción propia · Experiencia real</span>
          </figure>

          <div className="chapter__copy">
            <p className="pop-eyebrow pop-eyebrow--orange">Nuestra historia · 02 / 03</p>
            <p className="chapter__kicker">La elaboración</p>
            <h2 id="ch2-title" className="pop-title chapter__title">
              No producir<br />por producir.<br /><span className="t-orange">Hacer lo mejor.</span>
            </h2>
            <div className="chapter__body">
              <p>
                Detrás de cada producto hay experiencia, dedicación y una manera de hacer las cosas
                que nos identifica desde el primer día.
              </p>
            </div>
            <div className="chapter__callout">
              <strong>La diferencia está en cómo se hace</strong>
              Porque sabemos que la diferencia no está solo en una receta, sino en la forma de llevarla adelante.
            </div>
            <Progress active={1} />
          </div>
        </div>
      </section>

      {/* 03 · El resultado */}
      <section className="chapter chapter--resultado" aria-labelledby="ch3-title">
        <div className="chapter__inner pop-wrap">
          <div className="chapter__copy">
            <p className="pop-eyebrow pop-eyebrow--orange">Nuestra historia · 03 / 03</p>
            <h2 id="ch3-title" className="pop-title chapter__title">
              La calidad<br />no aparece<br /><span className="t-orange">por azar.</span>
            </h2>
            <div className="chapter__body">
              <p>Es consecuencia de hacer las cosas bien.</p>
              <p>
                Por eso, lo que llega a tu mesa es el resultado de cientos de decisiones tomadas con
                un mismo criterio: no resignar calidad.
              </p>
              <p>
                Desde la selección de las materias primas hasta el producto terminado, cada etapa forma
                parte de un compromiso que mantenemos desde nuestros inicios.
              </p>
              <p>Porque creemos que la confianza se construye producto a producto, todos los días.</p>
            </div>
            <p className="chapter__pill chapter__pill--result">
              <span>El resultado</span>
              Confianza que se construye, producto a producto.
            </p>
            <Progress active={2} />
          </div>

          <figure className="chapter__media chapter__media--circle">
            <Image src="/pop/historia-resultado.webp" alt="Medallones de pollo rebozados rellenos de jamón y queso" fill sizes="(max-width: 900px) 80vw, 520px" />
            <span className="chapter__badge chapter__badge--navy"><em>Mismo criterio</em><strong>cada día</strong></span>
            <span className="chapter__num">03</span>
          </figure>
        </div>
      </section>
    </div>
  )
}
