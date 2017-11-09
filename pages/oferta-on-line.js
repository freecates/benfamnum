import Head from 'next/head'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import {IntlProvider, FormattedDate} from 'react-intl'

const OfertaOnLine =  (props) => (
    <Layout>
      <Head>
        {props.ofertaonline.acf.nombre_del_establecimiento ? <title dangerouslySetInnerHTML={ {__html: props.ofertaonline.acf.nombre_del_establecimiento} } /> : ''}
        {props.ofertaonline.acf.telefono ? <link rel="stylesheet" href="/static/custom.css" /> : '' }
        
      </Head>
      <nav aria-label="Estás aquí:" role="navigation">
        <ul className="breadcrumbs">
          <li><Link prefetch href="/"><a>Inicio</a></Link></li>
          <li><Link prefetch href="/ofertas-on-line"><a>Ofertas On Line</a></Link></li>
          <li><Link prefetch as={`/c-o-o/${props.ofertaonline.acf.categoria_de_la_oferta.term_id}/${props.ofertaonline._embedded['wp:term'][0][0].slug}`} href={`/category-ofertas-on-line?id=${props.ofertaonline.acf.categoria_de_la_oferta.term_id}`}><a>{props.ofertaonline._embedded['wp:term'][0][0].name}</a></Link></li>
          <li>
            <span className="show-for-sr">Actual: </span> <span dangerouslySetInnerHTML={ {__html: props.ofertaonline.acf.nombre_del_establecimiento} } />
          </li>
        </ul>
      </nav>

      <section>

        <div className='file'>
            
            <h1><img src={'/static/' + props.ofertaonline._embedded['wp:term'][0][0].slug +'-familias-numerosas.png'} /><br/><span dangerouslySetInnerHTML={ {__html: props.ofertaonline.acf.nombre_del_establecimiento} } /> {props.ofertaonline.acf.descripcion_de_la_oferta_online_exclusiva_socios ? <span className='label alert file-label'><small>EXCLUSIVO<br /> SOCIOS</small></span> : '' }</h1>
           
            <h2 className='location dont-break-out'><small>
            {props.ofertaonline.acf.url_de_la_oferta_online ? <span><Link href={props.ofertaonline.acf.url_de_la_oferta_online}><a>{props.ofertaonline.acf.url_de_la_oferta_online}</a></Link></span> : '' } {props.ofertaonline.acf.correo_electronico_del_establecimiento ?  <span>. <strong>C.E.</strong>: <a href={'mailto:' + props.ofertaonline.acf.correo_electronico_del_establecimiento}>{props.ofertaonline.acf.correo_electronico_del_establecimiento}</a></span> : '' }</small></h2>

            <p className='category'><small><strong>Categoria</strong>: <Link prefetch as={`/c-o-o/${props.ofertaonline.acf.categoria_de_la_oferta.term_id}/${props.ofertaonline._embedded['wp:term'][0][0].slug}`} href={`/category-ofertas-on-line?id=${props.ofertaonline.acf.categoria_de_la_oferta.term_id}`}><a title={'Ver todas las ofertas de la categoría ' + props.ofertaonline._embedded['wp:term'][0][0].name}>{props.ofertaonline._embedded['wp:term'][0][0].name}</a></Link></small></p>

          <div className='file-data'>

            <div className='file-img'>

            {props.ofertaonline.acf.imagen_destacada_de_la_oferta_socios_large ? 
            
              <p><img className='img-file' width='1024' src={props.ofertaonline.acf.imagen_destacada_de_la_oferta_socios_large.sizes.large} alt={props.ofertaonline.acf.titulo_de_la_oferta_online_exclusiva_socios} /></p> : ''}   

            {props.ofertaonline.acf.imagen_destacada_de_la_oferta_general_large ? 
            
              <p><img className='img-file' width='1024' src={props.ofertaonline.acf.imagen_destacada_de_la_oferta_general_large.sizes.large} alt={props.ofertaonline.acf.titulo_de_la_oferta_general} /></p> : ''}

            </div>

            <div className='file-content'>
              
              {props.ofertaonline.acf.titulo_de_la_oferta_online_exclusiva_socios ? <h4>{props.ofertaonline.acf.titulo_de_la_oferta_online_exclusiva_socios}</h4> : '' }

            <IntlProvider defaultLocale='es'>
              <p><small><FormattedDate value={props.ofertaonline.date} day='numeric' month='long' year='numeric' /></small></p>
            </IntlProvider>
              
              {props.ofertaonline.acf.descripcion_de_la_oferta_online_exclusiva_socios ? <p className='dont-break-out' dangerouslySetInnerHTML={ {__html: props.ofertaonline.acf.descripcion_de_la_oferta_online_exclusiva_socios} }/> : '' }
             
              {props.ofertaonline.acf.titulo_de_la_oferta_oferta_general ? <h4>{props.ofertaonline.acf.titulo_de_la_oferta_oferta_general}</h4> : '' }
              
              {props.ofertaonline.acf.descripcion_de_la_oferta_oferta_general ? <p className='dont-break-out' dangerouslySetInnerHTML={ {__html: props.ofertaonline.acf.descripcion_de_la_oferta_oferta_general} }/> : '' }

            </div>
          
          </div>

          {props.ofertaonline.acf.como_conseguir_la_oferta_oferta_socios ? <div className="callout large alert"><p>¡ATENCIÓN!: <span dangerouslySetInnerHTML={ {__html: props.ofertaonline.acf.como_conseguir_la_oferta_oferta_socios} }/></p></div> : '' }  

        </div>

      </section>
        
      <style jsx>{`
        .breadcrumbs {
          margin-bottom:1em;
        }
        .file {
          max-width:1024px;
          margin:0 auto;
        }
        h1 {
          color:#391f92;
        }
        h1 small {
          color:#ffffff;
          font-weight:bold;
        }
        a {
          color:#3f3fff!important;
        }
        .file-label {
          background:#cc0033!important;
        }
        .dont-break-out {          
          overflow-wrap: break-word;
          word-wrap: break-word;
          -ms-hyphens: auto;
          -moz-hyphens: auto;
          -webkit-hyphens: auto;
          hyphens: auto;
        }
        @media screen and (min-width: 768px) {              
          .file-data {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
                flex-wrap: wrap;
            align-items:center;

            width: 100%;
          }
          .file-img {
            width: 35%;
            margin: 5px 20px;
          }
          .file-content {
            width: 45%;
            margin: 5px 20px;
          }
        }
        @media screen and (min-width: 1024px) {
          .file-content {
            width: 55%;
          }
        }
        @media screen and (max-width: 480px) {              
          .img-file {
            margin-left:-21px;
            max-width:111%;
          }
        }
        @media screen and (max-width: 320px) {              
          .img-file {
            margin-left:-19px;
            max-width:114%;
          }
        }
        h1, .category, .location, .file-label {
          text-align:center;
        }
      `}</style>

    </Layout>
)

OfertaOnLine.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await fetch(`https://gestorbeneficios.familiasnumerosas.org/wp-json/wp/v2/ofertas_online/${id}?_embed`)
  const ofertaonline = await res.json()

  console.log(`Fetched ofertaonline: ${ofertaonline.title.rendered}`)

  return { ofertaonline }
}

export default OfertaOnLine
