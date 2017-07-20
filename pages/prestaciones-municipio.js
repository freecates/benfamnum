import Head from 'next/head'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import {IntlProvider, FormattedDate} from 'react-intl'

const PrestacionesByMunicipio = (props) => (
  <Layout>
    <Head>
      <title>Prestaciones - {props.prestaciones[0].localidad.name}</title>
    </Head>
    <nav aria-label="Estás aquí:" role="navigation">
      <ul className="breadcrumbs">
        <li><Link prefetch href="/"><a>Inicio</a></Link></li>
        <li><Link prefetch href="/prestaciones"><a>Prestaciones</a></Link></li>
        <li><Link prefetch href="/municipios-prestaciones"><a>Municipios</a></Link></li>
        <li>
          <span className="show-for-sr">Actual: </span> Municipio: {props.prestaciones[0].localidad.name} 
        </li>
      </ul>
    </nav>
    <section>
      <h1>{props.prestaciones[0].localidad.name}</h1>
      <IntlProvider defaultLocale='es'>
          <ul className='gallery'>
            {props.prestaciones.map((prestacion, index) => (
              <li className='benefit' key={index}>

                <h2 className='align-center'>{prestacion.logo_de_la_localidad ? <img src={prestacion.logo_de_la_localidad.sizes.thumbnail}/> : ''}<br/><span dangerouslySetInnerHTML={ {__html: prestacion.name} } /></h2>

                {prestacion.nombre_de_la_prestacion ?
                <h3 className='align-center'>{prestacion.nombre_de_la_prestacion}</h3> : '' }

                {prestacion.enlace_de_interes ? 
                <p><small>Más info en <Link href={prestacion.enlace_de_interes}><a target='_blank'>{prestacion.enlace_de_interes}</a></Link></small></p> : '' }

                {prestacion.nombre_de_la_prestacion ? 
                <p dangerouslySetInnerHTML={ {__html: prestacion.descripcion_de_la_prestacion} }/> : '' } 
              </li>
            ))}
          </ul>

      </IntlProvider>
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
          .gallery {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
                flex-wrap: wrap;
            padding: 5px;
          }
          ul {
            list-style-type:none;
            margin-left:0;
            margin:0 auto!important;
          }
          a {
            color:inherit;
          }
          a:hover {
            text-decoration:underline;
          }
          nav a {
            color:#3f3fff;
          }
          .benefit {
            width: 95%;
          }
          .gallery-label {
            position:relative;
            margin-top:-40px;
            margin-right:5px;
            float:right;
            text-align:center;
            background:#cc0033;
          }
          @media screen and (min-width: 320px) {   
            .gallery {
              width: 100%;
            }              
            .benefit {
              margin: 5px;
            }
          }
          @media screen and (max-width: 375px) {              
            .benefit {
              width: 100%;
            }
          }
          @media screen and (min-width: 360px) {   
            .gallery {
              width: 90%;
            }
          }
          @media screen and (min-width: 768px) {   
            .gallery {
              width: 90%;
            }
          .benefit {
              margin: 2.5%;
            }
          }
          @media screen and (min-width: 1024px) {   
            .gallery {
              width: 84%;
            }
          }
        `}</style>
  </Layout>
)

PrestacionesByMunicipio.getInitialProps = async function(context) {
  const { localidad } = context.query
  const res = await fetch(`https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/prestaciones?_embed&nivel=Municipal&localidad=${localidad}`)
  const prestaciones = await res.json()

  console.log(`Prestaciones data fetched. Count: ${prestaciones.length}`)

  return { prestaciones }
}

export default PrestacionesByMunicipio