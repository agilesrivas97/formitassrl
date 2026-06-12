import PeekerMascot from './PeekerMascot'

export default function About() {
  return (
    <section className="about" id="nosotros" aria-label="Quiénes somos">
      <div className="about__inner">

        <div>
          <div className="about__kicker">05 · Quiénes somos</div>
          <h2 className="about__title">Hechos con<br /><em>el mismo nivel</em><br />de exigencia.</h2>

          <p className="about__body">
            En Congelados Formitas elaboramos alimentos rebozados prefritos ultracongelados 
            desde 2014, combinando calidad premium, tradición argentina e innovación. 
            Trabajamos con materias primas de primer nivel, fabricación propia y una 
            filosofía muy clara: desarrollar productos con la misma calidad que elegiríamos 
            para nuestras propias familias.
          </p>

          <p className="about__body">
            Acompañamos a distribuidores de todo el país con atención personalizada, 
            seriedad comercial y productos pensados para destacarse por su sabor, 
            calidad y confianza.
          </p>

          <div className="about__since">
            <span>2014</span>
            Haciendo las cosas bien desde siempre
          </div>
        </div>
      </div>

      <PeekerMascot />

    </section>
  )
}
