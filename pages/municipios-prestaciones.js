import Head from 'next/head'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import {IntlProvider, FormattedDate} from 'react-intl'

const MunicipiosPrestaciones = (props) => (
  <Layout>
    <Head>
      <title>Prestaciones - Municipios</title>
    </Head>
    <h1>Municipios con Prestaciones</h1>
    <IntlProvider defaultLocale='ca'>
        <ul className='gallery'>
          {props.municipios.sort((a,b) => {
          if (a.localidad.slug < b.localidad.slug) {
            return -1
          }
          if (a.localidad.slug > b.localidad.slug) {
            return 1
          }
          return 0
          }).reduce((ciutats, municipio) => {
            if (municipio.localidad == false) {
              return ciutats
            }
            ciutats[municipio.localidad.term_id] =
            (
            <span key={municipio.localidad.term_id}>            
            <li className='item'>
              <Link prefetch as={`/p-m/${municipio.localidad.term_id}/${municipio.localidad.slug}`} href={`/prestaciones-municipio?localidad=${municipio.localidad.term_id}`}>
                <a><span dangerouslySetInnerHTML={ {__html: municipio.localidad.name} } /></a>
              </Link>
            </li>
            </span>
            )
            return ciutats
        },[])}
        </ul>
    </IntlProvider>
        <style jsx>{`
          h1 {
            color:#391f92;
            text-align:center;
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
          .item {
            width: 150px;
          }
          @media screen and (min-width: 320px) {   
            .gallery {
              width: 100%;
            }              
            .item {
              margin: 5px;
            }
          }
          @media screen and (max-width: 375px) {              
            .item {
              width: 124px;
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
          .item {
              width: 200px;
            }
          }
          @media screen and (min-width: 1366px) {   
            .gallery {
              width: 82%;
            }
          }
        `}</style>
  </Layout>
)

MunicipiosPrestaciones.getInitialProps = async function() {
  const res = await fetch('https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/prestaciones?_embed&nivel=Municipal')
  const municipios = await res.json()

  console.log(`MunicipiosPrestaciones data fetched. Count: ${municipios.length}`)

  return { municipios }
}

export default MunicipiosPrestaciones