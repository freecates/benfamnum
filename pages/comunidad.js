import Head from 'next/head'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import fetch from 'isomorphic-unfetch'
import Observer from 'react-intersection-observer'
import {IntlProvider, FormattedDate} from 'react-intl'

const SelectCity = dynamic(
  import('../components/SelectCity'),
  {
    loading: () => (<div><p style={{textAlign: 'center'}}><img src='/static/rolling.gif'/></p></div>)
  }
)

const PostByComunidad = (props) => (
  <section>
    {props.posts.length == 0 ? 
    <Layout>
      <Head>
      <title>Beneficios - Comunidad</title>
    </Head>
    <nav aria-label="Estás aquí:" role="navigation">
      <ul className="breadcrumbs">
        <li><Link prefetch href="/"><a>Inicio</a></Link></li>
        <li><Link prefetch href="/beneficios"><a>Ofertas para familias</a></Link></li>
        <li>
          <span className="show-for-sr">Actual: </span> Comunidad 
        </li>
      </ul>
    </nav>
    <section>
      <h1>Actualmente no existen ofertas para familias en esta Comunidad</h1>
      <p className='align-center'>Por favor, escoge <Link prefetch href='/beneficios'><a>otra</a></Link>.</p>
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
          a:hover {
            text-decoration:underline;
          }
          nav a {
            color:#3f3fff;
          }
        `}</style>

    </Layout> :
  <Layout>
    <Head>
      <title>Beneficios - {props.posts[0].comunidad_autonoma}</title>
    </Head>
    <nav aria-label="Estás aquí:" role="navigation">
      <ul className="breadcrumbs">
        <li><Link prefetch href="/"><a>Inicio</a></Link></li>
        <li><Link prefetch href="/beneficios"><a>Ofertas para familias</a></Link></li>
        <li>
          <span className="show-for-sr">Actual: </span> {props.posts[0].comunidad_autonoma} 
        </li>
      </ul>
    </nav>
    <section>
      <h1>{props.posts[0].comunidad_autonoma}</h1>

      <section id='select-city'>

        <div className='wrapper'>

          <p className='align-center'>¿Dónde quieres disfrutar del beneficio? Selecciona la localidad</p>
        
          <SelectCity
           inputClass= 'city'
           inputValue= 'Buscar el mejor descuento'
           options={props.posts.reduce((ciutats, post) => {
            if (post.localidad_del_beneficio == false) {
              return ciutats
            }
             ciutats[post.localidad_del_beneficio.term_id] =
              {
                slug: post.localidad_del_beneficio.slug,
                key: post.localidad_del_beneficio.term_id,
                value: post.localidad_del_beneficio ? `/localidad?localidad=${post.localidad_del_beneficio.term_id}` : '',
                label: post.localidad_del_beneficio ? `${post.localidad_del_beneficio.name}` : ''
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
    </section>
        <style jsx>{`
          .national-gallery {
            background:#eeeeee;
            margin-top:1em!important;
            margin-bottom:1em!important;
            padding-top:.75em!important;
          }
          @media screen and (min-width: 768px) {
              .wrapper {
              width: 80%;
              margin: 0 auto;
              }
          }
          @media screen and (min-width: 1024px) {
              .wrapper {
              width: 50%;
              }
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
              margin:7.5px;
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
  }
  </section>
)

PostByComunidad.getInitialProps = async function(context) {
  const { comunidad } = context.query
  const res = await fetch(`https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/beneficios?_embed&comunidad=${comunidad}`)
  const posts = await res.json()

  console.log(`Posts data fetched. Count: ${posts.length}`)

  return { posts }
}

export default PostByComunidad