import Head from 'next/head'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import {IntlProvider, FormattedDate} from 'react-intl'

const PostsByCategoryLocalidad = (props) => (
  <Layout>
    <Head>
      <title>Beneficios - {props.posts[0].categoria_de_la_prestacion.name} - {props.posts[0].localidad.replace("&#039;", "'")}</title>
    </Head>
    <nav aria-label="Estás aquí:" role="navigation">
      <ul className="breadcrumbs">
        <li><Link prefetch href="/"><a>Inicio</a></Link></li>
        <li><Link prefetch href="/categorias"><a>Categorías</a></Link></li>
        <li><Link prefetch as={`/c/${props.posts[0].categoria_de_la_prestacion.term_id}/${props.posts[0].categoria_de_la_prestacion.slug}`} href={`/category?id=${props.posts[0].categoria_de_la_prestacion.term_id}`}><a>{props.posts[0].categoria_de_la_prestacion.name}</a></Link></li>
        <li>
          <span className="show-for-sr">Actual: </span> {props.posts[0].localidad.replace("&#039;", "'")} 
        </li>
      </ul>
    </nav>
    <section>
      <h1>Beneficios - {props.posts[0].categoria_de_la_prestacion.name} - {props.posts[0].localidad.replace("&#039;", "'")}</h1>
      <p className='align-center'><small><Link prefetch as={`/m-l/${props.posts[0].categoria_de_la_prestacion.term_id}/${props.posts[0].categoria_de_la_prestacion.slug}/${props.posts[0].localidad.replace("&#039;", "%27")}`} href={`/mapa-localidad?id=${props.posts[0].categoria_de_la_prestacion.term_id}&localidad=${props.posts[0].localidad.replace("&#039;", "%27")}`}><a>ver en el mapa</a></Link></small></p>
      <IntlProvider defaultLocale='es'>
          <ul className='gallery'>
            {props.posts.map((post, index) => (
              <li className='benefit' key={index}>
                {post.imagen_destacada_de_la_oferta_general_thumb ? <p><Link prefetch as={`/p/${post.ID}/${post.slug}`} href={`/post?id=${post.ID}`}><a><img width='150' src={post.imagen_destacada_de_la_oferta_general_thumb.sizes.thumbnail} alt={post.titulo_de_la_oferta_oferta_general} /></a></Link></p> : ''}

                {post.imagen_destacada_de_la_oferta_socios_thumb ? <p><Link prefetch as={`/p/${post.ID}/${post.slug}`} href={`/post?id=${post.ID}`}><a><img width='150' src={post.imagen_destacada_de_la_oferta_socios_thumb.sizes.thumbnail} alt={post.titulo_de_la_oferta_oferta_socios} /><span className='label alert gallery-label'><small>EXCLUSIVO<br/> SOCIOS</small></span></a></Link></p> : ''}

                <Link prefetch as={`/p/${post.ID}/${post.slug}`} href={`/post?id=${post.ID}`}>
                  <a dangerouslySetInnerHTML={ {__html: post.name} } />
                </Link>

                <p><small>{post.localidad}</small><br />

                {post.titulo_de_la_oferta_oferta_general ?
                <span className='titulo-oferta'>{post.titulo_de_la_oferta_oferta_general}</span> : '' }

                {post.titulo_de_la_oferta_oferta_socios ?
                <span className='titulo-oferta'>{post.titulo_de_la_oferta_oferta_socios}</span> : '' }

                </p>
              </li>
            ))}
          </ul>

      </IntlProvider>
    </section>
        <style jsx>{`
          .breadcrumbs {
            margin-bottom:1em;
          }
          h1, .align-center {
            text-align:center;
          }
          h1 {
            color:#391f92;
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
          nav a {
            color:#3f3fff;
          }
          .benefit {
            width: 150px;
          }
          .gallery-label {
            position:relative;
            margin-top:-45px;
            margin-right:10px;
            float:right;
            text-align:center;
            background:#cc0033;
          }
          .titulo-oferta {
            color:#ff0000;
          }
          @media screen and (min-width: 320px) {   
            .gallery {
              width: 100%;
            }              
            .benefit {
              margin: 5px;
            }
          }
          @media screen and (max-width: 375px) {              
            .benefit {
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
          .benefit {
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

PostsByCategoryLocalidad.getInitialProps = async function(context) {
  const { id } = context.query
  const { localidad } = context.query
  const res = await fetch(`https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/beneficios?_embed&categoria_del_beneficio=${id}&localidad=${localidad}`)
  const posts = await res.json()

  console.log(`Posts data fetched. Count: ${posts.length}`)

  return { posts }
}

export default PostsByCategoryLocalidad