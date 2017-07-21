import Head from 'next/head'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import {IntlProvider, FormattedDate} from 'react-intl'

const ComunidadesPrestaciones = (props) => (
  <Layout>
    <Head>
      <title>Prestaciones - Comunidades</title>
    </Head>
    <h1>Prestaciones - Comunidades</h1>
    <IntlProvider defaultLocale='ca'>
        <ul className='gallery'>
          {props.comunidades.reduce((autonomies, comunidad) => {
            if (comunidad.comunidad_autonoma == false) {
              return autonomies
            }
            autonomies[comunidad.comunidad_autonoma.term_id] =
            (
            <span key={comunidad.comunidad_autonoma.term_id}>            
            <li className='item'>
              <Link prefetch as={`/p-m/${comunidad.comunidad_autonoma.term_id}/${comunidad.comunidad_autonoma.slug}`} href={`/prestaciones-comunidad?comunidad_autonoma=${comunidad.comunidad_autonoma.term_id}`}>
                <a><span dangerouslySetInnerHTML={ {__html: comunidad.comunidad_autonoma.name} } /></a>
              </Link>
            </li>
            </span>
            )
            return autonomies
        },[]).sort(function(a,b){
          if (a.slug < b.slug)
            return -1;
          if (a.slug > b.slug)
            return 1;
          return 0;
          })}
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

ComunidadesPrestaciones.getInitialProps = async function() {
  const res = await fetch('https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/prestaciones?_embed&nivel=Autonomico')
  const comunidades = await res.json()

  console.log(`ComunidadesPrestaciones data fetched. Count: ${comunidades.length}`)

  return { comunidades }
}

export default ComunidadesPrestaciones