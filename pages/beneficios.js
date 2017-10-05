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
        <h1>Selecciona donde o que tipo de beneficio quieres disfrutar</h1>
        <div className='wrapper'>
          <div className='left'>
            <section className='beneficio-localidad-blue'>
              <h2 className='align-center'>Escribe donde desas el beneficio</h2>
              <div className='form-component'>          
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
                      label: beneficio.localidad_del_beneficio ? `${beneficio.localidad_del_beneficio.name}` : '',
                      submit: `Buscar el mejor descuento`
                    }
                    return ciutats
              },[]).sort((a,b) => {
                if (a.slug < b.slug)
                  return -1;
                if (a.slug > b.slug)
                  return 1;
                return 0;
                })} />
              </div>
            </section>
            <section className='beneficio-online-yellow'>
              <h2 className='align-center'>Beneficios de servicios online</h2>
              <p className='align-center no-margin-bottom'><Link prefetch href='ofertas-on-line'><a className='button'>Buscar el mejor descuento</a></Link></p>
            </section>
          </div>
          <div className='right'>
            <section className='beneficio-categoria-grey'>
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
            </section>
          </div>
        </div>
        <section className='bg-mapa'>
          <div className='form-component form-component-full'>
            <h4 className='align-center'>También puedes buscar servicios cerca de tí</h4>       
            <SelectCity
              options={props.beneficios.reduce((ciutats, beneficio) => {
              if (beneficio.localidad_del_beneficio == false) {
                return ciutats
              }
                ciutats[beneficio.localidad_del_beneficio.term_id] =
                {
                  slug: beneficio.localidad_del_beneficio.slug,
                  key: beneficio.localidad_del_beneficio.term_id,
                  value: beneficio.localidad_del_beneficio ? `/mapa-localidad?localidad=${beneficio.localidad_del_beneficio.term_id}` : '',
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
          </div>
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
          .beneficio-localidad-blue {
            background:#99ffff;
          }
          .beneficio-online-yellow {
            background:#ffff00;
          }
          .beneficio-categoria-grey {
            background:#e6e6e6;
          }
          .button {
            background:#d86525;
            color:#ffffff;
            text-deocration:none;
          }
          .button:hover {
            background:#aa4e1c;
            text-deocration:none;
          }
          .no-margin-bottom {
            margin-bottom:0;
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
          .bg-mapa {
            background: url(/static/bg-mapa.jpg) no-repeat center center;
            background-size: cover;
            padding:2em;
          }
          .form-component {
            margin:0 auto;
          }
          @media screen and (min-width: 320px) {   
            .gallery, .form-component {
              width: 100%;
            }
            .form-component-full {
              width:100%;
            }              
            .item {
              margin: 5px;
            }
            .beneficio-localidad-blue, 
            .beneficio-online-yellow , 
            .beneficio-categoria-grey,
            .bg-mapa {
              margin:0 -20px;
            }
          }
          @media screen and (max-width: 375px) {              
            .item {
              width: 124px;
            }
          }
          @media screen and (min-width: 360px) {   
            .gallery, .form-component {
              width: 90%;
            }
            .form-component-full {
              width:100%;
            }
          }
          @media screen and (min-width: 768px) {   
            .gallery, .form-component {
              width: 90%;
            }
            .form-component-full {
              width:100%;
            }
          .item {
              width: 200px;
            }
          }
          @media screen and (min-width: 1024px) {                          
            .wrapper {
              display: -ms-flexbox;
              display: flex;
              -ms-flex-wrap: wrap;
                  flex-wrap: wrap;
              align-items:top;

              width: 100%;
            }
            .left {
              width: 50%;
              padding:0 5px 0 0;
            }
            .right {
              width: 50%;
              padding:0 0 0 5px;
            }
            .beneficio-localidad-blue, 
            .beneficio-online-yellow {
              margin:0 0 0 -20px;
            } 
            .beneficio-categoria-grey {
              margin:0 -20px 0 0;
            }
            .item {
                width: 150px;
              }
            }
          }
          @media screen and (min-width: 1366px) {   
            .gallery, .form-component {
              width: 82%;
            }
            .form-component-full {
              width:100%;
            }
          }
        `}</style>
  </Layout>
)

Localidades.getInitialProps = async function() {
  const res = await fetch('https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/beneficios?sim-model=localidad-categoria')
  const beneficios = await res.json()

  console.log(`Beneficios data fetched. Count: ${beneficios.length}`)

  return { beneficios }
}

export default Localidades