import Head from 'next/head'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import Observer from 'react-intersection-observer'
import fetch from 'isomorphic-unfetch'
import {IntlProvider, FormattedDate} from 'react-intl'

const PrestacionesEstatales = (props) => (
  <Layout>
    <Head>
      <title>Prestaciones - Estatales</title>
    </Head>
    <nav aria-label="Estás aquí:" role="navigation">
      <ul className="breadcrumbs">
        <li><Link prefetch href="/"><a>Inicio</a></Link></li>
        <li><Link prefetch href="/prestaciones"><a>Prestaciones</a></Link></li>
        <li>
          <span className="show-for-sr">Actual: </span> Estatales 
        </li>
      </ul>
    </nav>
    <section>
      <h1>Prestaciones públicas Estatales</h1>
      <IntlProvider defaultLocale='es'> 
        <div className='table-scroll'>
          <table>          
            <thead>
              <tr>
                <td></td>
                <td>Tipo de prestación</td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            {props.prestaciones.sort((a,b) => {
            if (a.categoria_de_la_prestacion_publica.slug < b.categoria_de_la_prestacion_publica.slug) {
              return -1
            }
            if (a.categoria_de_la_prestacion_publica.slug > b.categoria_de_la_prestacion_publica.slug) {
              return 1
            }
            return 0
            }).map((prestacion, index) => (
            <tbody key={index}>
              <tr>
                <td width='64'><img src={'/static/32/' + prestacion.categoria_de_la_prestacion_publica.slug +'-prestaciones-familias-numerosas.png'} /></td>
                <td width='200'>{ prestacion.categoria_de_la_prestacion_publica.name}</td>
                <td><span dangerouslySetInnerHTML={ {__html: prestacion.name} } />. {prestacion.nombre_de_la_prestacion ?
                  <span>{prestacion.nombre_de_la_prestacion}</span> : '' }</td>
                <td width='150'>
                  <Link prefetch as={`/pr/${prestacion.ID}/${prestacion.slug}`} href={`/prestacion?id=${prestacion.ID}`}>
                    <a title={'Acceder a la ficha de ' + prestacion.name} className='button small'>Acceder a la ficha</a>
                  </Link></td>
              </tr>
            </tbody>
            ))}
          </table>
        </div>

      </IntlProvider>
      <section>
        <Observer threshold={1} triggerOnce={true} render={() => (<figure className='fade-in'><img src='/static/girl-516341_1920.jpg' width='100%' height='324' alt='Imagen prestaciones estatales Familias Numerosas' title='Imagen prestaciones estatales Familias Numerosas'/></figure>)} />

            <h2>Título de Familia Numerosa</h2>
            
            <p className='text-left'>El Título de Familia Numerosa o carné de familia numerosa es el documento oficial que te acredita como familia numerosa para poder acceder a los beneficios de carácter público que te corresponden por Ley. Este documento lo expiden las Comunidades Autónomas y puedes solicitarlo en el momento en que te conviertas en familia numerosa, es decir, al nacer tu tercer hijo o si te encuentras en alguno de los supuestos que contempla la <Link href='http://www.familiasnumerosas.org/fileadmin/user_upload/PDF/leyFFNN2003.pdf'><a target='_blank'>Ley de Protección a las Familias Numerosas</a></Link> para ser considerado familia numerosa: dos hijos uno de ellos con discapacidad, o discapacidad de uno de los padres; viudos con dos hijos, etc.</p>

            <p className='text-left'>Existen dos categorías de familia numerosa:</p>

            <ul className='text-left'>
                <li>Familia Numerosa General: familias de hasta 4 hijos (*)</li>
                <li>Familia Numerosa Especial: familias con 5 o más hijos.</li>
            </ul>
            <p className='text-left'>Según pertenezcas a una u otra, tendrás más o menos beneficios.</p>

            <p className='text-left'>(*) Las familias de 4 hijos cuyos ingresos anuales, divididos por el número de miembros de la unidad familiar, no superen en cómputo anual el 75 por ciento del IPREM (Indicador Público de Efectos Múltiples), incluidas las pagas extraordinarias, tendrán la consideración de familias numerosas de Categoría Especial.</p>
      </section>
    </section>
        <style jsx>{`
          .breadcrumbs {
            margin-bottom:1em;
          }
          h1, .align-center {
            text-align:center;
          }
          h1, h2, h3 {
            color:#391f92;
          }
          table thead {
            background:none;
          }
          table tbody tr td {
            border-top:1px solid #000000;
          }
          table tbody tr td a {
            margin:0;
          }
          table tbody tr td a.button {
            background:#d86525;
          }
          table tbody tr td a.button:hover {
            background:#aa4e1c;
          }
          @media screen and (max-width: 768px) {
            table tbody td {
              padding:.5rem .1rem .5rem .1rem;
            }
          }
          @media screen and (min-width: 768px) {
            .table-scroll table {
              width:100%;
            }
          }
          nav a {
            color:#3f3fff;
          }
          .fade-in {
            animation-name: fadeIn;
            animation-duration: 1.3s;
            animation-timing-function: cubic-bezier(0, 0, 0.4, 1);
            animation-fill-mode: forwards;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}</style>
  </Layout>
)

PrestacionesEstatales.getInitialProps = async function(context) {
  const { comunidad } = context.query
  const res = await fetch(`https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/prestaciones?_embed&nivel=Estatal`)
  const prestaciones = await res.json()

  console.log(`Prestaciones data fetched. Count: ${prestaciones.length}`)

  return { prestaciones }
}

export default PrestacionesEstatales