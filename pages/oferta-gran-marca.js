import Head from 'next/head'
import Layout from '../components/MyLayout.js'
import IsMember from '../components/IsMember.js'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Observer from 'react-intersection-observer'
import fetch from 'isomorphic-unfetch'
import FontAwesome from 'react-fontawesome'
import {IntlProvider, FormattedDate} from 'react-intl'
import {ShareButtons, ShareCounts, generateShareIcon} from 'react-share'

const MapaDeGoogle = dynamic(
  import('../components/MapaDeGoogle'),
  {
    loading: () => (<p>cargando ...</p>)
  }
)

const {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  EmailShareButton,
} = ShareButtons

const FacebookIcon = generateShareIcon('facebook')
const TwitterIcon = generateShareIcon('twitter')
const LinkedinIcon = generateShareIcon('linkedin')
const EmailIcon = generateShareIcon('email')

const OfertaGranMarca =  (props) => (
    <Layout>
      <Head>
        {props.ofertagranmarca.acf.nombre_del_establecimiento ? <title dangerouslySetInnerHTML={ {__html: props.ofertagranmarca.acf.nombre_del_establecimiento} } /> : ''}
        {props.ofertagranmarca.acf.telefono ? <link rel="stylesheet" href="/static/custom.css" /> : '' }

        <meta property="og:url" content={`/p/${props.ofertagranmarca.id}/${props.ofertagranmarca.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={props.ofertagranmarca.acf.nombre_del_establecimiento} />
        {props.ofertagranmarca.acf.descripcion_de_la_oferta_oferta_socios ?
        <meta property="og:description" content={props.ofertagranmarca.acf.descripcion_de_la_oferta_oferta_socios} /> : ''}
        {props.ofertagranmarca.acf.descripcion_de_la_oferta_oferta_general ? 
        <meta property="og:description" content={props.ofertagranmarca.acf.descripcion_de_la_oferta_oferta_general} /> : ''}
        {props.ofertagranmarca.acf.imagen_destacada_de_la_oferta_socios_large ?
        <meta property="og:image" content={props.ofertagranmarca.acf.imagen_destacada_de_la_oferta_socios_large.sizes.large} /> : ''}
        {props.ofertagranmarca.acf.imagen_destacada_de_la_oferta_general_large ? 
        <meta property="og:image" content={props.ofertagranmarca.acf.imagen_destacada_de_la_oferta_general_large.sizes.large} /> : ''}
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="1024" />

        {props.ofertagranmarca.acf.descripcion_de_la_oferta_oferta_socios ?

        <script type="application/ld+json" dangerouslySetInnerHTML={ { __html: `
        {
          "@context": "http://schema.org",
          "@type": "Product",
          "description": "${props.ofertagranmarca.acf.descripcion_de_la_oferta_oferta_socios}",
          "name": "${props.ofertagranmarca.acf.nombre_del_establecimiento}",
          "image": "${props.ofertagranmarca.acf.imagen_destacada_de_la_oferta_socios_large.sizes.large}",
          "offers": {
            "@type": "Offer",
            "availability": "http://schema.org/InStock",
            "price": "${props.ofertagranmarca.acf.titulo_de_la_oferta_oferta_socios}",
            "priceCurrency": "EUR"
          }
        }`}} />

        : ''}

        {props.ofertagranmarca.acf.descripcion_de_la_oferta_oferta_general ?

        <script type="application/ld+json" dangerouslySetInnerHTML={ { __html: `
        {
          "@context": "http://schema.org",
          "@type": "Product",
          "description": "${props.ofertagranmarca.acf.descripcion_de_la_oferta_oferta_general}",
          "name": "${props.ofertagranmarca.acf.nombre_del_establecimiento}",
          "image": "${props.ofertagranmarca.acf.imagen_destacada_de_la_oferta_general_large.sizes.large}",
          "offers": {
            "@type": "Offer",
            "availability": "http://schema.org/InStock",
            "price": "${props.ofertagranmarca.acf.titulo_de_la_oferta_oferta_general}",
            "priceCurrency": "EUR"
          }
        }`}} />

        : ''}
        

      </Head>
      <nav aria-label="Estás aquí:" role="navigation">
        <ul className="breadcrumbs">
          <li><Link prefetch href="/"><a>Inicio</a></Link></li>
          <li><Link prefetch href="/grandes-marcas"><a>Grandes Marcas</a></Link></li>
          <li><Link prefetch as={`/mm/${props.ofertagranmarca.marca}/${props.ofertagranmarca._embedded['wp:term'][3][0].slug}`} href={`/mapa-de-la-marca?id=${props.ofertagranmarca.marca}`}><a>{props.ofertagranmarca._embedded['wp:term'][3][0].name}</a></Link></li>
          <li>
            <span className="show-for-sr">Actual: </span> <span dangerouslySetInnerHTML={ {__html: props.ofertagranmarca.acf.nombre_del_establecimiento} } />
          </li>
        </ul>
      </nav>

      <section>

        <div className='file'>
            
            <h1><img src={'/static/' + props.ofertagranmarca._embedded['wp:term'][3][0].slug +'-familias-numerosas.png'} /><br/><span dangerouslySetInnerHTML={ {__html: props.ofertagranmarca.acf.nombre_del_establecimiento} } /></h1>
           
            <h4 className='location dont-break-out'><span><span dangerouslySetInnerHTML={ {__html:props.ofertagranmarca.acf.direccion} }/>. <span>{props.ofertagranmarca.acf.codigo_postal}</span>, <span dangerouslySetInnerHTML={ {__html: props.ofertagranmarca.acf.localidad_del_beneficio.name} } /></span></h4>
            <h4 className='location dont-break-out'><span> 
            {props.ofertagranmarca.acf.telefono ? <span><a href={'tel:' + props.ofertagranmarca.acf.telefono}>{props.ofertagranmarca.acf.telefono}</a></span> : ''}
            {props.ofertagranmarca.acf.correo_electronico_del_establecimiento ?  <span>. <a href={'mailto:' + props.ofertagranmarca.acf.correo_electronico_del_establecimiento}><FontAwesome
                name='envelope'
                size='1x'
                style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color:'#666666' }}
              /></a> </span> : '' }{props.ofertagranmarca.acf.twitter_del_establecimiento ? <span>| <a href={props.ofertagranmarca.acf.twitter_del_establecimiento}><FontAwesome
                name='twitter-square'
                size='1x'
                style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color:'#666666' }}
              /></a></span> : '' } {props.ofertagranmarca.acf.facebook_del_establecimiento ? <span>| <a href={props.ofertagranmarca.acf.facebook_del_establecimiento}><FontAwesome
              name='facebook-square'
              size='1x'
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color:'#666666' }}
            /></a></span> : '' } {props.ofertagranmarca.acf.sitio_web_del_establecimiento ? <span>| <Link href={props.ofertagranmarca.acf.sitio_web_del_establecimiento}><a><FontAwesome
            name='external-link-square'
            size='1x'
            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color:'#666666' }}
          /></a></Link></span> : '' }</span></h4>

            <p className='category'><Link prefetch as={`/c/${props.ofertagranmarca.categoria_del_beneficio}/${props.ofertagranmarca._embedded['wp:term'][3][0].slug}`} href={`/mapa-de-la-marca?id=${props.ofertagranmarca.marca}`}><a title={'Ver todas las ofertas ' + props.ofertagranmarca._embedded['wp:term'][3][0].name + ' en el mapa'}> <img src='/static/icona-mapa-familias-numerosas.png' /></a></Link></p>

            {props.ofertagranmarca.acf.lat ? <MapaDeGoogle lat={props.ofertagranmarca.acf.lat.includes(',') || props.ofertagranmarca.acf.lat.includes('!') ? props.ofertagranmarca.acf.lat.replace(',', '.') : props.ofertagranmarca.acf.lat} lng={props.ofertagranmarca.acf.lon.includes(',') || props.ofertagranmarca.acf.lon.includes('!') ? props.ofertagranmarca.acf.lon.replace(',', '.') : props.ofertagranmarca.acf.lon} /> : '' }

          <div className='file-data'>

            <div className='file-img'>

              {props.ofertagranmarca.acf.imagen_destacada_de_la_oferta_socios_large ? 
              
                <Observer threshold={1} triggerOnce={true} render={() => (<p className='fade-in'><img className='img-file' width='1024' src={props.ofertagranmarca.acf.imagen_destacada_de_la_oferta_socios_large.sizes.large} alt={props.ofertagranmarca.acf.titulo_de_la_oferta_oferta_socios} /></p>)} /> : ''}   

              {props.ofertagranmarca.acf.imagen_destacada_de_la_oferta_general_large ? 
              
                <Observer threshold={1} triggerOnce={true} render={() => (<p className='fade-in'><img className='img-file' width='1024' src={props.ofertagranmarca.acf.imagen_destacada_de_la_oferta_general_large.sizes.large} alt={props.ofertagranmarca.acf.titulo_de_la_oferta_general} /></p>)} /> : ''}

              </div>

            <div className='file-content'>
              
              {props.ofertagranmarca.acf.titulo_de_la_oferta ? <h4>{props.ofertagranmarca.acf.titulo_de_la_oferta}</h4> : '' }

            <IntlProvider defaultLocale='es'>
              <p><small><FormattedDate value={props.ofertagranmarca.date} day='numeric' month='long' year='numeric' /></small></p>
            </IntlProvider>
              
              {props.ofertagranmarca.acf.descripcion_de_la_oferta ? <p className='dont-break-out' dangerouslySetInnerHTML={ {__html: props.ofertagranmarca.acf.descripcion_de_la_oferta} }/> : '' }

              <div className='social-share-icons'>

                <div className="Post__some-network"><p><small>Comparte:</small></p></div>

                <div className="Post__some-network">
                  <FacebookShareButton url={'https://beneficios.now.sh/p/' + props.ofertagranmarca.id + '/' + props.ofertagranmarca.slug} className="Post__some-network__share-button"><FacebookIcon size={32} round/></FacebookShareButton>
                </div>

                <div className="Post__some-network">
                  <TwitterShareButton url={'https://beneficios.now.sh/p/' + props.ofertagranmarca.id + '/' + props.ofertagranmarca.slug} title={props.ofertagranmarca.acf.nombre_del_establecimiento + ':' + ' ' + props.ofertagranmarca.acf.titulo_de_la_oferta_oferta_socios} hashtags={['beneficiosfamiliasnumerosas']} className="Post__some-network__share-button"><TwitterIcon size={32} round/></TwitterShareButton>
                </div>

                <div className="Post__some-network">
                  <LinkedinShareButton url={'https://beneficios.now.sh/p/' + props.ofertagranmarca.id + '/' + props.ofertagranmarca.slug} title={props.ofertagranmarca.acf.nombre_del_establecimiento + ':' + ' ' + props.ofertagranmarca.acf.titulo_de_la_oferta_oferta_socios} className="Post__some-network__share-button"><LinkedinIcon size={32} round/></LinkedinShareButton>
                </div>

                <div className="Post__some-network">
                  <EmailShareButton url={'https://beneficios.now.sh/p/' + props.ofertagranmarca.id + '/' + props.ofertagranmarca.slug} subject={props.ofertagranmarca.acf.nombre_del_establecimiento + ':' + ' ' + props.ofertagranmarca.acf.titulo_de_la_oferta_oferta_socios} body={'Échale un vistazo a esta oferta: ' + props.ofertagranmarca.acf.nombre_del_establecimiento + ':' + ' ' + props.ofertagranmarca.acf.titulo_de_la_oferta_oferta_socios + ' ' + 'https://beneficios.now.sh/p/' + props.ofertagranmarca.id + '/' + props.ofertagranmarca.slug} className="Post__some-network__share-button"><EmailIcon size={32} round/></EmailShareButton>
                </div>

              </div>

            </div>
          
          </div>

        </div>

      </section>
        
      <style jsx>{`      
        .Post__some-network {
          vertical-align: top;
          display: inline-block;
          margin-right: 20px;
          text-align: center;
        }
        .social-share-icons {
          margin-bottom:1.5rem;
        }
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
          white-space:normal;
        }
        a .file-label  {
          color:#ffffff!important;
          cursor:pointer;
        }
        a:hover .file-label {
          text-decoration:none;
        }
        .margin-invert {
          margin-bottom:2rem;
          margin-top:-1rem;
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
            align-items:stretch;

            width: 100%;
          }
          .file-img {
            width: 35%;
            margin: 5px 20px;
          }
          .file-content {
            width: 85%;
            margin: 5px 20px;
          }
        }
        @media screen and (min-width: 1024px) {
          .file-content {
            width: 95%;
          }
          #how-to-get-it, .file-label {
          max-width: 70%;
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
        .align-none {
          text-align:unset;
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

OfertaGranMarca.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await fetch(`https://gestorbeneficios.familiasnumerosas.org/wp-json/wp/v2/ofertas_grandes_marc/${id}?_embed`)
  const ofertagranmarca = await res.json()

  console.log(`Fetched ofertagranmarca: ${ofertagranmarca.title.rendered}`)

  return { ofertagranmarca }
}

export default OfertaGranMarca