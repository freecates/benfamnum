import Head from 'next/head'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import fetch from 'isomorphic-unfetch'
import {IntlProvider, FormattedDate} from 'react-intl'

const SelectCity = dynamic(
  import('../components/SelectCity'),
  {
    loading: () => (<p>cargando ...</p>)
  }
)

const Localidades = (props) => (
  <Layout>
    <Head>
      <title>Beneficios</title>
    </Head>
    <IntlProvider defaultLocale='ca'>
      <main>
        <h1>Beneficios</h1>
        <section>
          <h2>Por localidad</h2>
          <h3>¿Dónde quieres disfrutar de los beneficios? Selecciona la localidad</h3>          
          <SelectCity
            options={props.beneficios.reduce((ciutats, beneficio) => {
            if (beneficio.localidad_del_beneficio == false) {
              return ciutats
            }
              ciutats[beneficio.localidad_del_beneficio.term_id] =
              {
                slug: beneficio.localidad_del_beneficio.slug,
                key: beneficio.localidad_del_beneficio.term_id,
                value: beneficio.localidad_del_beneficio ? `/localidad?localidad=${beneficio.localidad_del_beneficio.term_id}` : '',
                label: beneficio.localidad_del_beneficio ? `${beneficio.localidad_del_beneficio.name}` : ''
              }
              return ciutats
        },[]).sort((a,b) => {
          if (a.slug < b.slug)
            return -1;
          if (a.slug > b.slug)
            return 1;
          return 0;
          })} />
        </section>
        <section>
          <h2>Por categoría</h2>
          <h3>Escoje la categoría que más te interese haciendo click</h3>
          <ul className='gallery'>
          {props.beneficios.reduce((categories, beneficio) => {
            if (beneficio.categoria_de_la_prestacion == false) {
              return categories
            }
            categories[beneficio.categoria_de_la_prestacion.term_id] =
            (
            <span key={beneficio.categoria_de_la_prestacion.term_id}>            
            <li className='item'>
              <Link prefetch as={`/c/${beneficio.categoria_de_la_prestacion.term_id}/${beneficio.categoria_de_la_prestacion.slug}`} href={`/category?id=${beneficio.categoria_de_la_prestacion.term_id}`}>
                <a title={'Clica aquí para ver todos los beneficios de ' + beneficio.categoria_de_la_prestacion.name}><img src={'/static/32/' + beneficio.categoria_de_la_prestacion.slug +'-familias-numerosas.png'} /> <span dangerouslySetInnerHTML={ {__html: beneficio.categoria_de_la_prestacion.name} } /></a>
              </Link>
            </li>
            </span>
            )
            return categories
        },[])}
        </ul>

        <p className='align-center'>Si lo prefieres, tambíen puedes <Link href='#'><a className='blue'>ver los beneficios de servicios online</a></Link>.</p>

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

Localidades.getInitialProps = async function() {
  const res = await fetch('https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/beneficios')
  const beneficios = await res.json()

  console.log(`Beneficios data fetched. Count: ${beneficios.length}`)

  return { beneficios }
}

export default Localidades