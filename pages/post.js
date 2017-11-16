import Head from 'next/head'
import Layout from '../components/MyLayout.js'
import IsMember from '../components/IsMember.js'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Observer from 'react-intersection-observer'
import fetch from 'isomorphic-unfetch'
import FontAwesome from 'react-fontawesome'
import {IntlProvider, FormattedDate} from 'react-intl'

const MapaDeGoogle = dynamic(
  import('../components/MapaDeGoogle'),
  {
    loading: () => (<p>cargando ...</p>)
  }
)

const Post =  (props) => (
    <Layout>
      <Head>
        {props.post.acf.nombre_del_establecimiento ? <title dangerouslySetInnerHTML={ {__html: props.post.acf.nombre_del_establecimiento} } /> : ''}
        {props.post.acf.telefono ? <link rel="stylesheet" href="/static/custom.css" /> : '' }

        <meta property="og:url" content={`/p/${props.post.id}/${props.post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={props.post.acf.nombre_del_establecimiento} />
        {props.post.acf.descripcion_de_la_oferta_oferta_socios ?
        <meta property="og:description" content={props.post.acf.descripcion_de_la_oferta_oferta_socios} /> : ''}
        {props.post.acf.descripcion_de_la_oferta_oferta_general ? 
        <meta property="og:description" content={props.post.acf.descripcion_de_la_oferta_oferta_general} /> : ''}
        {props.post.acf.imagen_destacada_de_la_oferta_socios_large ?
        <meta property="og:image" content={props.post.acf.imagen_destacada_de_la_oferta_socios_large.sizes.large} /> : ''}
        {props.post.acf.imagen_destacada_de_la_oferta_general_large ? 
        <meta property="og:image" content={props.post.acf.imagen_destacada_de_la_oferta_general_large.sizes.large} /> : ''}
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="1024" />

        {props.post.acf.descripcion_de_la_oferta_oferta_socios ?

        <script type="application/ld+json" dangerouslySetInnerHTML={ { __html: `
        {
          "@context": "http://schema.org",
          "@type": "Product",
          "description": "${props.post.acf.descripcion_de_la_oferta_oferta_socios}",
          "name": "${props.post.acf.nombre_del_establecimiento}",
          "image": "${props.post.acf.imagen_destacada_de_la_oferta_socios_large.sizes.large}",
          "offers": {
            "@type": "Offer",
            "availability": "http://schema.org/InStock",
            "price": "${props.post.acf.titulo_de_la_oferta_oferta_socios}",
            "priceCurrency": "EUR"
          }
        }`}} />

        : ''}

        {props.post.acf.descripcion_de_la_oferta_oferta_general ?

        <script type="application/ld+json" dangerouslySetInnerHTML={ { __html: `
        {
          "@context": "http://schema.org",
          "@type": "Product",
          "description": "${props.post.acf.descripcion_de_la_oferta_oferta_general}",
          "name": "${props.post.acf.nombre_del_establecimiento}",
          "image": "${props.post.acf.imagen_destacada_de_la_oferta_general_large.sizes.large}",
          "offers": {
            "@type": "Offer",
            "availability": "http://schema.org/InStock",
            "price": "${props.post.acf.titulo_de_la_oferta_oferta_general}",
            "priceCurrency": "EUR"
          }
        }`}} />

        : ''}
        

      </Head>
      <nav aria-label="Estás aquí:" role="navigation">
        <ul className="breadcrumbs">
          <li><Link prefetch href="/"><a>Inicio</a></Link></li>
          <li><Link prefetch href="/beneficios"><a>Beneficios</a></Link></li>
          <li><Link prefetch as={`/c/${props.post.categoria_del_beneficio}/${props.post._embedded['wp:term'][0][0].slug}`} href={`/category?id=${props.post.categoria_del_beneficio}`}><a>{props.post._embedded['wp:term'][0][0].name}</a></Link></li>
          <li>
            <span className="show-for-sr">Actual: </span> <span dangerouslySetInnerHTML={ {__html: props.post.acf.nombre_del_establecimiento} } />
          </li>
        </ul>
      </nav>

      <section>

        <div className='file'>
            
            <h1><img src={'/static/' + props.post._embedded['wp:term'][0][0].slug +'-familias-numerosas.png'} /><br/><span dangerouslySetInnerHTML={ {__html: props.post.acf.nombre_del_establecimiento} } /> {props.post.acf.descripcion_de_la_oferta_oferta_socios ? <span className='label alert file-label'><small>EXCLUSIVO<br /> SOCIOS</small></span> : '' }</h1>
           
            <h4 className='location dont-break-out'><span><span dangerouslySetInnerHTML={ {__html:props.post.acf.direccion} }/>. <span>{props.post.acf.codigo_postal}</span>, <Link prefetch as={`/l/${props.post.acf.localidad_del_beneficio.term_id}/${props.post.acf.localidad_del_beneficio.slug}`} href={`/localidad?localidad=${props.post.acf.localidad_del_beneficio.term_id}`}><a title={'Ver todos los beneficios de ' + props.post.acf.localidad_del_beneficio.name}><span dangerouslySetInnerHTML={ {__html: props.post.acf.localidad_del_beneficio.name} } /></a></Link> - 
            {props.post.acf.telefono ? <span><a href={'tel:' + props.post.acf.telefono}>{props.post.acf.telefono}</a></span> : ''}
            {props.post.acf.correo_electronico_del_establecimiento ?  <span>. <strong>C.E.</strong>: <a href={'mailto:' + props.post.acf.correo_electronico_del_establecimiento}>{props.post.acf.correo_electronico_del_establecimiento}</a></span> : '' }{props.post.acf.twitter_del_establecimiento ? <span><a href={'https://twitter.com/' + props.post.acf.twitter_del_establecimiento}>t</a></span> : '' } {props.post.acf.facebook_del_establecimiento ? <span>| <a href={props.post.acf.facebook_del_establecimiento}>f</a></span> : '' } {props.post.acf.sitio_web_del_establecimiento ? <span>| <Link href={props.post.acf.sitio_web_del_establecimiento}><a>w</a></Link></span> : '' }</span></h4>

            <p className='category'><small><strong>Categoria</strong>: <Link prefetch as={`/c/${props.post.categoria_del_beneficio}/${props.post._embedded['wp:term'][0][0].slug}`} href={`/category?id=${props.post.categoria_del_beneficio}`}><a title={'Ver todos los beneficios de la categoría ' + props.post._embedded['wp:term'][0][0].name}>{props.post._embedded['wp:term'][0][0].name}</a></Link></small></p>

            {props.post.acf.lat ? <MapaDeGoogle lat={props.post.acf.lat} lng={props.post.acf.lon} /> : '' }

          <div className='file-data'>

            <div className='file-img'>

              {props.post.acf.imagen_destacada_de_la_oferta_socios_large ? 
              
                <Observer threshold={1} triggerOnce={true} render={() => (<p className='fade-in'><img className='img-file' width='1024' src={props.post.acf.imagen_destacada_de_la_oferta_socios_large.sizes.large} alt={props.post.acf.titulo_de_la_oferta_oferta_socios} /></p>)} /> : ''}   

              {props.post.acf.imagen_destacada_de_la_oferta_general_large ? 
              
                <Observer threshold={1} triggerOnce={true} render={() => (<p className='fade-in'><img className='img-file' width='1024' src={props.post.acf.imagen_destacada_de_la_oferta_general_large.sizes.large} alt={props.post.acf.titulo_de_la_oferta_general} /></p>)} /> : ''}

              </div>

            <div className='file-content'>

              
              {props.post.acf.como_conseguir_la_oferta_oferta_socios ?
                  
                <h1><span className='label alert file-label'><Link href="#how-to-get-it"><a>EXCLUSIVO SOCIOS.<br/>MIRA COMO CONSEGUIR ESTA OFERTA</a></Link><br/><FontAwesome
                name='check-circle-o'
                size='2x'
                style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
              /></span></h1> : ''}
              
              {props.post.acf.titulo_de_la_oferta_oferta_socios ? <h4>{props.post.acf.titulo_de_la_oferta_oferta_socios}</h4> : '' }

            <IntlProvider defaultLocale='es'>
              <p><small><FormattedDate value={props.post.date} day='numeric' month='long' year='numeric' /></small></p>
            </IntlProvider>
              
              {props.post.acf.descripcion_de_la_oferta_oferta_socios ? <p className='dont-break-out' dangerouslySetInnerHTML={ {__html: props.post.acf.descripcion_de_la_oferta_oferta_socios} }/> : '' }
             
              {props.post.acf.titulo_de_la_oferta_oferta_general ? <h4>{props.post.acf.titulo_de_la_oferta_oferta_general}</h4> : '' }
              
              {props.post.acf.descripcion_de_la_oferta_oferta_general ? <p className='dont-break-out' dangerouslySetInnerHTML={ {__html: props.post.acf.descripcion_de_la_oferta_oferta_general} }/> : '' }

            </div>
          
          </div>

          {props.post.acf.como_conseguir_la_oferta_oferta_socios ?
            <div id='how-to-get-it'>
            <IsMember 
              dataOK={<div dangerouslySetInnerHTML={ {__html: props.post.acf.como_conseguir_la_oferta_oferta_socios} } />}
              ID={props.post.slug + '-' + props.post.id}
              Title={props.post.title.rendered}
              URL={'p/' + props.post.id + '/' + props.post.slug}
            />
            </div> : ''}

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
          color:#ffffff;
          font-weight:bold;
          font-size:1rem;
        }
        .file-label a {
          color:#ffffff!important;
        }
        .file-label a:hover {
          text-decoration:none;
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

Post.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await fetch(`https://gestorbeneficios.familiasnumerosas.org/wp-json/wp/v2/beneficios/${id}?_embed`)
  const post = await res.json()

  console.log(`Fetched post: ${post.title.rendered}`)

  return { post }
}

export default Post
