import Head from 'next/head'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import {IntlProvider, FormattedDate} from 'react-intl'

const OfertasGrandesMarcasByMarca = (props) => (
  <Layout>
    <Head>
      <title>Ofertas de la Marca - {props.granmarcaofertas[0].marca.name}</title>
    </Head>
    <nav aria-label="Estás aquí:" role="navigation">
      <ul className="breadcrumbs">
        <li><Link prefetch href="/"><a>Inicio</a></Link></li>
        <li><Link prefetch href="/grandes-marcas"><a>Ofertas nacionales</a></Link></li>
        <li>
          <span className="show-for-sr">Actual: </span> {props.granmarcaofertas[0].marca.name} 
        </li>
      </ul>
    </nav>
    <section>
      <h1>Ofertas de {props.granmarcaofertas[0].marca.name}</h1>
      <IntlProvider defaultLocale='es'>
        <div className='table-scroll'>
          <table>          
            <thead>
              <tr>
                <td></td>
                <td></td>
                <td>Oferta</td>
                <td></td>
              </tr>
            </thead>
            {props.granmarcaofertas.slice(0, 1).map((granmarcaoferta, index) => (
            <tbody key={index}>
              <tr>
                <td width='64'><img src={'/static/32/' + granmarcaoferta.marca.slug +'-familias-numerosas.png'} /></td>
                <td width='200'>{ granmarcaoferta.marca.name}</td>
                <td className='description'><span dangerouslySetInnerHTML={ {__html: granmarcaoferta.descripcion_de_la_oferta} } /></td>
                <td width='150'>
                  <Link prefetch as={`/mm/${granmarcaoferta.marca.term_id}/${granmarcaoferta.marca.slug}`} href={`/mapa-de-la-marca?id=${granmarcaoferta.marca.term_id}`}>
                    <a title={'Ver ' + granmarcaoferta.marca.name + ' en el mapa'} className='button small'>{'Ver ' + granmarcaoferta.marca.name + ' en el mapa'}</a>
                  </Link></td>
              </tr>
            </tbody>
            ))}
          </table>
        </div>

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
          .description {
            width:75%;
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
          @media screen and (min-width: 1024px) {
            .description {
              width:65%;
            }
          }
          nav a {
            color:#3f3fff;
          }
        `}</style>
  </Layout>
)

OfertasGrandesMarcasByMarca.getInitialProps = async function(context) {
  const { id } = context.query
  const res = await fetch(`https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/ofertas_grandes_marc?marca=${id}&sim-model=name-id-slug-descripcion_de_la_oferta-marca`)
  const granmarcaofertas = await res.json()

  console.log(`Ofertas de la Marca data fetched. Count: ${granmarcaofertas.length}`)

  return { granmarcaofertas }
}

export default OfertasGrandesMarcasByMarca