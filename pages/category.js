import Head from 'next/head'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import {IntlProvider, FormattedDate} from 'react-intl'

const PostsByCategory = (props) => (
  <Layout>
    <Head>
      <title>Beneficios - {props.posts[0]._embedded['wp:term'][0][0].name}</title>
    </Head>
    <nav aria-label="Estás aquí:" role="navigation">
      <ul className="breadcrumbs">
        <li><Link prefetch href="/"><a>Inicio</a></Link></li>
        <li><Link prefetch href="/categorias"><a>Categorías</a></Link></li>
        <li>
          <span className="show-for-sr">Actual: </span> {props.posts[0]._embedded['wp:term'][0][0].name} 
        </li>
      </ul>
    </nav>
    <section>
      <h1><img src={'/static/' + props.posts[0]._embedded['wp:term'][0][0].slug +'-familias-numerosas.png'} /><br/>{props.posts[0]._embedded['wp:term'][0][0].name}</h1>
      <p className='align-center'><small><Link prefetch as={`/m/${props.posts[0]._embedded['wp:term'][0][0].id}/${props.posts[0]._embedded['wp:term'][0][0].slug}`} href={`/mapa?id=${props.posts[0]._embedded['wp:term'][0][0].id}`}><a>ver en el mapa</a></Link></small></p>
      <IntlProvider defaultLocale='es'>
          <ul className='gallery'>
            {props.posts.map((post, index) => (
              <li className='benefit' key={index}>
                {post.acf.imagen_destacada_de_la_oferta_general_thumb ? <p><Link prefetch as={`/p/${post.id}/${post.slug}`} href={`/post?id=${post.id}`}><a><img width='150' src={post.acf.imagen_destacada_de_la_oferta_general_thumb.sizes.thumbnail} alt={post.acf.titulo_de_la_oferta_oferta_general} /></a></Link></p> : ''}

                {post.acf.imagen_destacada_de_la_oferta_socios_thumb ? <p><Link prefetch as={`/p/${post.id}/${post.slug}`} href={`/post?id=${post.id}`}><a><img width='150' src={post.acf.imagen_destacada_de_la_oferta_socios_thumb.sizes.thumbnail} alt={post.acf.titulo_de_la_oferta_oferta_socios} /><span className='label alert gallery-label'><small>EXCLUSIVO<br/> SOCIOS</small></span></a></Link></p> : ''}

                <Link prefetch as={`/p/${post.id}/${post.slug}`} href={`/post?id=${post.id}`}>
                  <a dangerouslySetInnerHTML={ {__html: post.title.rendered} } />
                </Link>

                <p><small>{post.acf.localidad}</small><br />

                {post.acf.titulo_de_la_oferta_oferta_general ?
                <span className='titulo-oferta'>{post.acf.titulo_de_la_oferta_oferta_general}</span> : '' }

                {post.acf.titulo_de_la_oferta_oferta_socios ?
                <span className='titulo-oferta'>{post.acf.titulo_de_la_oferta_oferta_socios}</span> : '' }

                </p>
              </li>
            ))}
          </ul>

      </IntlProvider>
    </section>
      <style jsx>{`
        .breadcrumbs {
          margin-bottom:1em!important;
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

PostsByCategory.getInitialProps = async function(context) {
  const { id } = context.query
  const res = await fetch(`https://gestorbeneficios.familiasnumerosas.org/wp-json/wp/v2/beneficios?_embed&categoria_del_beneficio=${id}&per_page=100&orderby=slug&order=asc`)
  const posts = await res.json()

  console.log(`Posts data fetched. Count: ${posts.length}`)

  return { posts }
}

export default PostsByCategory