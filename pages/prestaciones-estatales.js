import Link from 'next/link'
import Layout from '../components/MyLayout.js'

export default () => (
    <Layout>
      <nav aria-label="Estás aquí:" role="navigation">
        <ul className="breadcrumbs">
          <li><Link prefetch href="/"><a>Inicio</a></Link></li>
          <li>
            <span className="show-for-sr">Actual: </span>Prestaciones estatales
          </li>
        </ul>
      </nav>

      <section className='call-to-action'>
        <h1>Prestaciones estatales</h1>

        <figure><img src='/static/girl-516341_1920.jpg' width='100%' height='324' alt='Imagen prestaciones estatales Familias Numerosas' title='Imagen prestaciones estatales Familias Numerosas'/></figure>

        <h2>Título de Familia Numerosa</h2>
        
        <p className='text-left'>El Título de Familia Numerosa o carné de familia numerosa es el documento oficial que te acredita como familia numerosa para poder acceder a los beneficios de carácter público que te corresponden por Ley. Este documento lo expiden las Comunidades Autónomas y puedes solicitarlo en el momento en que te conviertas en familia numerosa, es decir, al nacer tu tercer hijo o si te encuentras en alguno de los supuestos que contempla la <Link href='http://www.familiasnumerosas.org/fileadmin/user_upload/PDF/leyFFNN2003.pdf'><a target='_blank'>Ley de Protección a las Familias Numerosas</a></Link> para ser considerado familia numerosa: dos hijos uno de ellos con discapacidad, o discapacidad de uno de los padres; viudos con dos hijos, etc.</p>

        <p className='text-left'>Existen dos categorías de familia numerosa:</p>

        <ul className='text-left'>
            <li>Familia Numerosa General: familias de hasta 4 hijos (*)</li>
            <li>Familia Numerosa Especial: familias con 5 o más hijos.</li>
        </ul>
        <p className='text-left'>Según pertenezcas a una u otra, tendrás más o menos beneficios.</p>

        <p className='text-left'>(*) Las familias de 4 hijos cuyos ingresos anuales, divididos por el número de miembros de la unidad familiar, no superen en cómputo anual el 75 por ciento del IPREM (Indicador Público de Efectos Múltiples), incluidas las pagas extraordinarias, tendrán la consideración de familias numerosas de Categoría Especial.</p>

        <h2>Beneficios Estatales</h2>
        
        <p className='text-left'>Son los beneficios del Estado para las familias numerosas de toda España, es decir, corresponden a todas las familias numerosas con independencia de la Comunidad Autónoma en la que residan.</p>

        <p className='text-left'>Están regulados por la Ley de Protección a las Familias Numerosas y se concretan en:</p>

        <div className='wrapper'>

            <div className='wrapped-item'>

                <p className='text-left'><strong>Transporte</strong>. 20 % ó 50 % de descuento, según categoría general o especial, en RENFE y en transporte por carretera. Acumulable a otros descuentos.</p>

            </div>

            <div className='wrapped-item'>

                <p className='text-left'><strong>Barco</strong>. Descuento del 20 % ó del 50%, según se trate de familias numerosas de categoría general o especial, en transporte marítimo de cabotaje.</p>
            
            </div>

            <div className='wrapped-item'>
                
                <p className='text-left'><strong>Vuelos</strong>. Descuento del 5 % ó del 10 %, según sea familia numerosa de categoría general o especial, en billetes de avión para vuelos nacionales.</p>

            </div>

            <div className='wrapped-item'>
                
                <p className='text-left'><strong>Empleados domésticos</strong>. Bonificación del 45 % en las cuotas a la Seguridad Social al contratar una persona para cuidado de los hijos y del hogar. El requisito es que los dos progenitores trabajen fuera de casa, salvo que se trate de familias de categoría especial.</p>

            </div>

            <div className='wrapped-item'>
                
                <p className='text-left'><strong>Permiso paternidad</strong>. Desde el 1 de enero de 2017, el permiso de paternidad es de 28 días para todos los padres, con independiencia de que sean familia numerosa o no, aunque en el caso de parto múltiple el permiso se amplía a dos días por cada hijo a partir del segundo.</p>

            </div>

            <div className='wrapped-item'>
                
                <p className='text-left'><strong>Puntuación preferente</strong>. La condición de familia numerosa se tendrá en cuenta en los procesos públicos regulados por baremos, como en becas de la administración o en la admisión de alumnos de las etapas obligatorias en centros escolares sostenidos con fondos públicos.</p>

            </div>

            <div className='wrapped-item'>
                
                <p className='text-left'><strong>Tasas educativas</strong>. Descuento del 50 % o exención total en tasas y precios públicos de ámbito educativo, como derechos de examen o matrículas universitarias.</p>

            </div>

            <div className='wrapped-item'>
                
                <p className='text-left'><strong>Centros culturales</strong>. Descuento en la entrada a museos de toda España que sean titularidad del Estado</p>

                <p className='text-left'><Link href='http://www.familiasnumerosas.org/fileadmin/user_upload/PDF/MUSEOS_ESTATALES.pdf'><a target='_blank'>Listado Museos Estatales en PDF</a></Link></p>

            </div>

            <div className='wrapped-item'>
                
                <p className='text-left'><strong>DNI y pasaporte</strong>. Exención en las tasas de expedición del DNI o pasaporte, tanto en nuevas emsiones como en caso de renovación por caducidad, robo o pérdida.</p>

            </div>

            <div className='wrapped-item-big'>
                
                <p className='text-left'><strong>Deducción fiscal</strong>. Deducción específica para familias numerosas, que puede aplicarse en la Declaración de la Renta o recibir su abono por anticipado a razón de 100 euros mensuales.</p>

                <ul className='text-left'>
                    <li>Deducción de 1.200 € por familia numerosa general</li>
                    <li>Deducción de 2.400 € para las de categoría especial</li>
                    <li>Deducción de 1.200 € para familias con hijos con discapacidad</li>
                </ul>

                <p className='text-left'>Todas las deducciones son acumulables entre sí en caso de que se den varios de estos supuestos. Para beneficiarse de ellas es necesario estar en activo en la Seguridad Social, aunque en el caso de ser familia numerosa, también se aplica a desempleados que estén cobrando subsidio y a pensionistas.</p>

                <p className='text-left'>* También existe una deducción de 1.200 € para monoparentales con dos hijos siempre que no se perciba prestación por alimentos del otro progenitor.</p>

            </div>

        </div>


        <style jsx>{`
            .call-to-action {
                text-align:center;
                margin:0 auto;
            }
            .text-left {
              text-align:left;
            }
            h1, h2 {
                color:#391f92;
            }
            @media screen and (min-width: 320px) {   
                .call-to-action {
                width: 100%;
                }
            }
            @media screen and (min-width: 360px) {   
                .call-to-action {
                width: 90%;
                }
            }
            
            @media screen and (min-width: 768px) {                          
                .wrapper {
                display: -ms-flexbox;
                display: flex;
                -ms-flex-wrap: wrap;
                    flex-wrap: wrap;
                align-items:center;

                width: 100%;
                }
                .wrapper-top {
                align-items:baseline;
                }
                .wrapped-item {
                width: 33%;
                padding:0 .5em;
                }
                .wrapped-item-big {
                width: 50%;
                padding:0 .5em;
                margin:0 auto;
                }
            }
        `}</style>

      </section>


    </Layout>
)
