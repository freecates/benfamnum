import Head from 'next/head'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import fetch from 'isomorphic-unfetch'
import {IntlProvider, FormattedDate} from 'react-intl'

const GMap = dynamic(
  import('../components/GMap'),
  {
    loading: () => (<p>cargando ...</p>)
  }
)

const Post =  (props) => (
    <Layout>
      <Head>
        {props.post.acf.nombre_del_establecimiento ? <title dangerouslySetInnerHTML={ {__html: props.post.acf.nombre_del_establecimiento} } /> : ''}
        {props.post.acf.telefono ? <link rel="stylesheet" href="/static/custom.css" /> : '' }
        
      </Head>
      <nav aria-label="Estás aquí:" role="navigation">
        <ul className="breadcrumbs">
          <li><Link prefetch href="/"><a>Inicio</a></Link></li>
          <li><Link prefetch href="/categorias"><a>Categorías</a></Link></li>
          <li><Link prefetch as={`/c/${props.post.categoria_del_beneficio}/${props.post._embedded['wp:term'][0][0].slug}`} href={`/category?id=${props.post.categoria_del_beneficio}`}><a>{props.post._embedded['wp:term'][0][0].name}</a></Link></li>
          <li>
            <span className="show-for-sr">Actual: </span> <span dangerouslySetInnerHTML={ {__html: props.post.acf.nombre_del_establecimiento} } />
          </li>
        </ul>
      </nav>

      <section>

        <div className='file'>
            
            <h1><img src={'/static/' + props.post._embedded['wp:term'][0][0].slug +'-familias-numerosas.png'} /><br/><span dangerouslySetInnerHTML={ {__html: props.post.acf.nombre_del_establecimiento} } /> {props.post.acf.descripcion_de_la_oferta_oferta_socios ? <span className='label alert file-label'><small>EXCLUSIVO<br /> SOCIOS</small></span> : '' }</h1>
           
            <p className='location'><small><span dangerouslySetInnerHTML={ {__html:props.post.acf.direccion} }/>. <span>{props.post.acf.codigo_postal}</span>, <Link prefetch as={`/l/${props.post.acf.localidad.replace("&#039;", "%27")}`} href={`/localidad?localidad=${props.post.acf.localidad.replace("&#039;", "%27")}`}><a title={'Ver todos los beneficios de ' + props.post.acf.localidad.replace("&#039;", "%27")}><span dangerouslySetInnerHTML={ {__html: props.post.acf.localidad} } /></a></Link> - 
            {props.post.acf.telefono ? <span><a href={'tel:' + props.post.acf.telefono}>{props.post.acf.telefono}</a></span> : ''}
            {props.post.acf.correo_electronico_del_establecimiento ?  <span>. <strong>C.E.</strong>: <a href={'mailto:' + props.post.acf.correo_electronico_del_establecimiento}>{props.post.acf.correo_electronico_del_establecimiento}</a></span> : '' }{props.post.acf.twitter_del_establecimiento ? <span><a href={'https://twitter.com/' + props.post.acf.twitter_del_establecimiento}>t</a></span> : '' } {props.post.acf.facebook_del_establecimiento ? <span>| <a href={props.post.acf.facebook_del_establecimiento}>f</a></span> : '' } {props.post.acf.sitio_web_del_establecimiento ? <span>| <Link href={props.post.acf.sitio_web_del_establecimiento}><a>w</a></Link></span> : '' }</small></p>

            <p className='category'><small><strong>Categoria</strong>: <Link prefetch as={`/c/${props.post.categoria_del_beneficio}/${props.post._embedded['wp:term'][0][0].slug}`} href={`/category?id=${props.post.categoria_del_beneficio}`}><a>{props.post._embedded['wp:term'][0][0].name}</a></Link></small></p>

            {props.post.acf.lat ? <GMap lat={props.post.acf.lat} lng={props.post.acf.lon} /> : '' }

          <div className='file-data'>

            {props.post.acf.imagen_destacada_de_la_oferta_socios_large ? 
            
            <div className='file-img'><p><img className='img-file' width='1024' src={props.post.acf.imagen_destacada_de_la_oferta_socios_large.sizes.large} alt={props.post.acf.titulo_de_la_oferta_oferta_socios} /></p></div> : ''}   

            {props.post.acf.imagen_destacada_de_la_oferta_general_large ? 
            
            <div className='file-img'><p><img className='img-file' width='<1024></1024>' src={props.post.acf.imagen_destacada_de_la_oferta_general_large.sizes.large} alt={props.post.acf.titulo_de_la_oferta_general} /></p></div> : ''}

            <div className='file-content'>
              
              {props.post.acf.titulo_de_la_oferta_oferta_socios ? <h4>{props.post.acf.titulo_de_la_oferta_oferta_socios}</h4> : '' }

            <IntlProvider defaultLocale='es'>
              <p><small><FormattedDate value={props.post.date} day='numeric' month='long' year='numeric' /></small></p>
            </IntlProvider>
              
              {props.post.acf.descripcion_de_la_oferta_oferta_socios ? <p dangerouslySetInnerHTML={ {__html: props.post.acf.descripcion_de_la_oferta_oferta_socios} }/> : '' }

              {props.post.acf.como_conseguir_la_oferta_oferta_socios ? <div className="callout large alert"><p dangerouslySetInnerHTML={ {__html: props.post.acf.como_conseguir_la_oferta_oferta_socios} }/></div> : '' }
              
              {props.post.acf.titulo_de_la_oferta_oferta_general ? <h4>{props.post.acf.titulo_de_la_oferta_oferta_general}</h4> : '' }
              
              {props.post.acf.descripcion_de_la_oferta_oferta_general ? <p dangerouslySetInnerHTML={ {__html: props.post.acf.descripcion_de_la_oferta_oferta_general} }/> : '' }

            </div>
          
          </div>  

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
        }
        a {
          color:#3f3fff;
        }
        .file-label {
          background:#cc0033;
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

Post.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await fetch(`https://gestorbeneficios.familiasnumerosas.org/wp-json/wp/v2/beneficios/${id}?_embed`)
  const post = await res.json()

  console.log(`Fetched post: ${post.title.rendered}`)

  return { post }
}

export default Post
