import Head from 'next/head'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import {IntlProvider, FormattedDate} from 'react-intl'

const GRandesMarcas = (props) => (
  <Layout>
    <Head>
      <title>Ofertas nacionales</title>
    </Head>
    <IntlProvider defaultLocale='ca'>
      <main>
        <h1>Ofertas nacionales</h1>
        <section>
          <h2 className='align-center'>Selecciona la marca de tu interés</h2>
          <ul className='gallery'>
          {props.grandesmarcas.map((grandesmarca, index) => (
            <li className='item align-center' key={index}>
              <Link prefetch as={`/m-o-g-m/${grandesmarca.id}/${grandesmarca.slug}`} href={`/ofertas-de-la-marca?id=${grandesmarca.id}`}>
                <a title={'Clica aquí para ver las ofertas de ' + grandesmarca.name}><img src={'/static/' + grandesmarca.slug +'-familias-numerosas.png'} /><br/><span dangerouslySetInnerHTML={ {__html: grandesmarca.name} } /></a>
              </Link>
            </li>
            ))}
          </ul>

        </section>
      </main>
    </IntlProvider>
        <style jsx>{`
          h1 {
            color:#391f92;
            text-align:center;
          }
          .align-center {
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
          a.blue {
            color:#3f3fff;
            text-decoration:underline;
          }
          p {
            margin-top:2rem;
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
              max-width: 70%;
              width:500px;
            }
          .item {
              width: 150px;
            }
          }
        `}</style>
  </Layout>
)

GRandesMarcas.getInitialProps = async function() {
  const res = await fetch('https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/marca')
  const grandesmarcas = await res.json()

  console.log(`Ofertas On Line data fetched. Count: ${grandesmarcas.length}`)

  return { grandesmarcas }
}

export default GRandesMarcas