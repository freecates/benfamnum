import Head from 'next/head'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import Observer from 'react-intersection-observer'
import {IntlProvider, FormattedDate} from 'react-intl'

const PostsByLocalidad = (props) => (
  <Layout>
    <Head>
      <title>Beneficios - {props.posts[0].localidad_del_beneficio.name}</title>
    </Head>
    <nav aria-label="Estás aquí:" role="navigation">
      <ul className="breadcrumbs">
        <li><Link prefetch href="/"><a>Inicio</a></Link></li>
        <li><Link prefetch href="/beneficios"><a>Beneficios</a></Link></li>
        <li>
          <span className="show-for-sr">Actual: </span> Localidad: {props.posts[0].localidad_del_beneficio.name} 
        </li>
      </ul>
    </nav>
    <section>
      <h1>Beneficios en {props.posts[0].localidad_del_beneficio.name}</h1>
      <p className='align-center'><small><Link prefetch as={`/m-l/${props.posts[0].localidad_del_beneficio.term_id}/${props.posts[0].localidad_del_beneficio.slug}`} href={`/mapa-localidad?localidad=${props.posts[0].localidad_del_beneficio.term_id}`}><a><img src='/static/icona-mapa-familias-numerosas.png' /> ver en el mapa</a></Link></small></p>
      <IntlProvider defaultLocale='es'>
        <section>
          <ul className='gallery national-gallery'>
            {props.marcasofertas.map((marcasoferta, index) => (
              <li className='benefit align-center' key={index}>
                <Observer threshold={1} triggerOnce={true} render={() => (<p className='fade-in'><Link prefetch as={`/ogm/${marcasoferta.ID}/${marcasoferta.slug}`} href={`/oferta-gran-marca?id=${marcasoferta.ID}`}><a><img width='96' src={'/static/' + marcasoferta.marca.slug +'-familias-numerosas.png'} alt={marcasoferta.titulo_de_la_oferta} /></a></Link></p>)} />

                <p><Link prefetch as={`/ogm/${marcasoferta.ID}/${marcasoferta.slug}`} href={`/oferta-gran-marca??id=${marcasoferta.ID}`}>
                  <a dangerouslySetInnerHTML={ {__html: marcasoferta.name} } />
                </Link><br/>
                <small>{marcasoferta.localidad_del_beneficio.name}</small><br />

                {marcasoferta.titulo_de_la_oferta ?
                <span className='titulo-oferta'>{marcasoferta.titulo_de_la_oferta}</span> : '' }

                </p>
              </li>
            ))}
          </ul>
          <ul className='gallery'>
            {props.posts.map((post, index) => (
              <li className='benefit' key={index}>
                {post.imagen_destacada_de_la_oferta_general_thumb ? <Observer threshold={1} triggerOnce={true} render={() => (<p className='fade-in'><Link prefetch as={`/p/${post.ID}/${post.slug}`} href={`/post?id=${post.ID}`}><a><img width='250' src={post.imagen_destacada_de_la_oferta_general_thumb.sizes.thumbnail} alt={post.titulo_de_la_oferta_oferta_general} /></a></Link></p>)} /> : ''}

                {post.imagen_destacada_de_la_oferta_socios_thumb ? <Observer threshold={1} triggerOnce={true} render={() => (<p className='fade-in'><Link prefetch as={`/p/${post.ID}/${post.slug}`} href={`/post?id=${post.ID}`}><a><img width='250' src={post.imagen_destacada_de_la_oferta_socios_thumb.sizes.thumbnail} alt={post.titulo_de_la_oferta_oferta_socios} /><span className='label alert gallery-label'><small>EXCLUSIVO<br/> SOCIOS</small></span></a></Link></p>)} /> : ''}

                <p><Link prefetch as={`/p/${post.ID}/${post.slug}`} href={`/post?id=${post.ID}`}>
                  <a dangerouslySetInnerHTML={ {__html: post.name} } />
                </Link><br/>
                <small>{post.localidad_del_beneficio.name}</small><br />

                {post.titulo_de_la_oferta_oferta_general ?
                <span className='titulo-oferta'>{post.titulo_de_la_oferta_oferta_general}</span> : '' }

                {post.titulo_de_la_oferta_oferta_socios ?
                <span className='titulo-oferta'>{post.titulo_de_la_oferta_oferta_socios}</span> : '' }

                </p>
              </li>
            ))}
          </ul>
        </section>

      </IntlProvider>
    </section>
        <style jsx>{`
          .national-gallery {
            background:#eeeeee;
            margin-bottom:1em!important;
            padding-top:.75em!important;
          }
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
            margin-top:-40px;
            margin-right:5px;
            float:right;
            text-align:center;
            background:#cc0033!important;
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
              margin: 7.5px;
            }
          }
          @media screen and (min-width: 1024px) {   
            .gallery {
              width: 100%;
            }
          .benefit {
              width: 220px;
              margin:0 10px;
            }
          }
          @media screen and (min-width: 1160px) {
          .benefit {
              width: 245px;
            }
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

PostsByLocalidad.getInitialProps = async function(context) {
  const { localidad } = context.query
  const res = await fetch(`https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/beneficios?_embed&localidad=${localidad}`)
  const posts = await res.json()
  const res2 = await fetch(`https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/ofertas_grandes_marc?_embed&localidad=${localidad}`)
  const marcasofertas = await res2.json()

  console.log(`Posts data fetched. Count: ${posts.length}, ${marcasofertas.length}`)

  return { posts, marcasofertas }
}

export default PostsByLocalidad