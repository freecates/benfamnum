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
  <Layout layout>
    <Head>
      <title>Ofertas</title>
    </Head>
    <div>
    <nav aria-label="Estás aquí:" role="navigation">
    <ul className="breadcrumbs">
        <li><Link prefetch href="/"><a>Inicio</a></Link></li>
        <li>
        <span className="show-for-sr">Actual: </span> Ofertas para familias numerosas 
        </li>
    </ul>
    </nav>
    <section className='call-to-action'>
        <div className='icones-prestacions'>
            <div className='icona'>
              <Link prefetch href="/ofertas-por-sectores"><a><img src='/static/icona-ofertas-por-sectores-familias-numerosas.png'/><div className='text-icona'>Ofertas por sectores</div></a></Link>
            </div>
            <div className='icona'> 
              <img src='/static/icona-ofertas-por-poblacion-familias-numerosas.png'/><div className='text-icona city-text'>Ofertas por población<br/>          
                <SelectCity
                  inputClass= 'city'
                  inputValue= 'Ver'
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
                })} /></div>
            </div>
            <div className='icona'> 
              <Link prefetch href="/ofertas-on-line"><a><img src='/static/icona-ofertas-online-familias-numerosas.png'/><div className='text-icona'>Ofertas online</div></a></Link>
            </div>
            <div className='icona'> 
              <Link prefetch href="/ofertas-en-el-mapa"><a><img src='/static/icona-ofertas-en-el-mapa-familias-numerosas.png'/><div className='text-icona'>Ofertas en el mapa</div></a></Link>
            </div>
            <br className='clear' />
        </div>
    </section>
    </div>
        <style jsx>{`
          h2 {
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
            text-decoration:none;
          }
          .button-blue {
            background:#0066ff;
            width:55%;
          }
          .button-blue:hover {
            background:#0051cb;
            text-decoration:none;
          }
          .no-margin-bottom {
            margin-bottom:0;
          }
          .margin-top {
            margin-top:1rem;
          }
          .padding {
            padding:1em;
          }
          ul {
            list-style-type:none;
            margin-lefuft:0;
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
              margin:0;
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
              width: 94%;
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
              align-items:center;

              width: 100%;
            }
            .wrapper-top {
              align-items:baseline;
            }
            .left {
              width: 50%;
              padding:0 0 0 0;
            }
            .right {
              width: 50%;
              padding:0 0 0 0;
            }
            .beneficio-localidad-blue, 
            .beneficio-online-yellow {
              margin:0 0 0 0;
            } 
            .beneficio-categoria-grey {
              margin:0 0 0 0;
              padding:2.8em 0;
            }
            .item {
                width: 140px;
              }
            }
          }
          @media screen and (min-width: 1366px) {   
            .gallery, .form-component {
              width: 86%;
            }
            .form-component-full {
              width:100%;
            }
          }
          a, li {
              color:#ffffff!important;
          }
          .breadcrumbs {
              margin:-2rem 0 1rem 0;
          }
          .call-to-action {
              text-align:center;
              margin:1em auto;
              color:#ffffff;
          }
          .call-to-action .icona {
            position:relative;
            float:left;
          }
          .clear {
            clear:both;
          }        
          .call-to-action .text-icona {
              left: 0;
              position:absolute;
              text-align:center;
              top: 65px;
              width: 100%
              font-size:1em;
          }        
          .call-to-action .text-icona.city-text {
              top: 35px;
              font-size:.9em;
          }
          @media screen and (min-width: 320px) {   
              .call-to-action {
              width: 50%;
              }
              .icones-prestacions img {
                  margin:0 0 1em 0;
              }
          }
          @media screen and (min-width: 768px) {   
              .call-to-action {
              width: 71%;
              }        
              .call-to-action .text-icona {
                  font-size:1.15em;
                  top: 100px;
              }
              .call-to-action .text-icona.city-text {
                font-size:1.1em;
                top: 85px;
              }
              .icones-prestacions img {
                  margin:2em;
              }
            }
            @media screen and (min-width: 1024px) {   
                .call-to-action {
                width: 53%;
                }
              }
            @media screen and (min-width: 1360px) {   
                .call-to-action {
                width: 95%;
                }
              }
        `}</style>
  </Layout>
)

Localidades.getInitialProps = async function() {
  const res = await fetch('https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/beneficios?sim-model=localidad-categoria')
  const beneficios = await res.json()

  console.log(`Ofertas data fetched. Count: ${beneficios.length}`)

  return { beneficios }
}

export default Localidades