import Head from 'next/head'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import dynamic from 'next/dynamic'
import Observer from 'react-intersection-observer'
import {IntlProvider, FormattedDate} from 'react-intl'

const SelectCity = dynamic(
  import('../components/SelectCity'),
  {
    loading: () => (<div><p style={{textAlign: 'center'}}><img src='/static/rolling.gif'/></p></div>)
  }
)

const PostsByCategoryComunidad = (props) => (
  <section>
    {props.posts.length == 0 ?
    <Layout>
      <Head>
        <title>Beneficios - Ofertas por sectores - Comunidad</title>
      </Head>
      <nav aria-label="Estás aquí:" role="navigation">
        <ul className="breadcrumbs">
          <li><Link prefetch href="/"><a>Inicio</a></Link></li>
        <li><Link prefetch href="/beneficios"><a>Ofertas para familias</a></Link></li>
        <li><Link prefetch href="/ofertas-por-sectores"><a>Ofertas por sectores</a></Link></li>
        <li>
          <span className="show-for-sr">Actual: </span> Comunidad 
        </li>
        </ul>
      </nav>
    <section>
      <h1>Actualmente no existen ofertas para familias de este sector en esta Comunidad</h1>
      <p className='align-center'>Por favor, escoge <Link prefetch href="/ofertas-por-sectores"><a>otro</a></Link>.</p>
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

    </Layout>
    :
    <Layout>
      <Head>
        <title>Beneficios - {props.posts[0].categoria_de_la_prestacion.name} - {props.posts[0].comunidad_autonoma}</title>
      </Head>
      <nav aria-label="Estás aquí:" role="navigation">
        <ul className="breadcrumbs">
          <li><Link prefetch href="/"><a>Inicio</a></Link></li>
          <li><Link prefetch href="/beneficios"><a>Ofertas para familias</a></Link></li>
          <li><Link prefetch as={`/c/${props.posts[0].categoria_de_la_prestacion.term_id}/${props.posts[0].categoria_de_la_prestacion.slug}`} href={`/category?id=${props.posts[0].categoria_de_la_prestacion.term_id}`}><a>{props.posts[0].categoria_de_la_prestacion.name}</a></Link></li>
          <li>
            <span className="show-for-sr">Actual: </span> {props.posts[0].comunidad_autonoma} 
          </li>
        </ul>
      </nav>
      <section>
        <h1><img src={'/static/' + props.posts[0].categoria_de_la_prestacion.slug +'-familias-numerosas.png'} /><br/>Beneficios de {props.posts[0].categoria_de_la_prestacion.name} en {props.posts[0].comunidad_autonoma}</h1>

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
                  value: post.categoria_de_la_prestacion ? `/category-localidad?id=${post.categoria_de_la_prestacion.term_id}&localidad=${post.localidad_del_beneficio.term_id}` : '',
                  label: post.categoria_de_la_prestacion ?  `${post.localidad_del_beneficio.name}` : ''
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

        <IntlProvider defaultLocale='es'>

          <section>
          {props.posts[0].categoria_de_la_prestacion.term_id === 6 ? 
            <ul className='gallery national-gallery'>
              <li>
                <Observer threshold={1} triggerOnce={true} render={() => (<p className='fade-in align-center'><Link href='https://www.colectivosubica.com/familiamassegura/'><a title='Federación Española Familias Numerosas / Ubica, correduría de seguros' target='_blank'><img className='fade-in' src='/static/01-seguros-nacionales.png' alt='Logos marcas de seguros' /></a></Link></p>)} />
              </li>
              <li>
                <Observer threshold={1} triggerOnce={true} render={() => (<p className='fade-in align-center'><Link href='https://www.colectivosubica.com/familiamassegura/'><a title='Federación Española Familias Numerosas / Ubica, correduría de seguros' target='_blank'><img className='fade-in' src='/static/02-seguros-nacionales.png' alt='Logos marcas de seguros' /></a></Link></p>)} />
              </li>
            </ul>
            : ''}
          {props.marcasofertas.length >= 1 ?
          <ul className='gallery national-gallery'>
              {props.marcasofertas.reduce((marcas, marcasoferta) => {
                if (marcasoferta.marca == false) {
                  return marcas
                }
                marcas[marcasoferta.marca.term_id] =
                (
                <span key={marcasoferta.marca.term_id}>            
                <li className='benefit align-center'>
                  <Link prefetch as={`/m-o-g-m/${marcasoferta.marca.term_id}/${marcasoferta.marca.slug}`} href={`/ofertas-de-la-marca?id=${marcasoferta.marca.term_id}`}>
                    <a title={'Ver todas las ofertas de ' + marcasoferta.marca.name}><img src={'/static/' + marcasoferta.marca.slug +'-familias-numerosas.png'} /><br/> <span dangerouslySetInnerHTML={ {__html: marcasoferta.marca.name} } /></a>
                  </Link>
                </li>
                </span>
                )
                return marcas
            },[])}
            </ul> :'' }

            <p className='align-center'>... O si lo prefieres accede directamente a cualquiera de las fichas</p>

            <ul className='gallery'>
              {props.posts.map((post, index) => (
                <li className='benefit' key={index}>
                  {post.imagen_destacada_de_la_oferta_general_thumb ? <Observer threshold={1} triggerOnce={true} render={() => (<p className='fade-in'><Link prefetch as={`/p/${post.ID}/${post.slug}`} href={`/post?id=${post.ID}`}><a title={'Ver la ficha de ' + post.name}><img width='250' src={post.imagen_destacada_de_la_oferta_general_thumb.sizes.thumbnail} alt={post.titulo_de_la_oferta_oferta_general} /></a></Link></p>)} /> : ''}

                  {post.imagen_destacada_de_la_oferta_socios_thumb ? <Observer threshold={1} triggerOnce={true} render={() => (<p className='fade-in'><Link prefetch as={`/p/${post.ID}/${post.slug}`} href={`/post?id=${post.ID}`}><a title={'Ver la ficha de ' + post.name}><img width='250' src={post.imagen_destacada_de_la_oferta_socios_thumb.sizes.thumbnail} alt={post.titulo_de_la_oferta_oferta_socios} /><span className='label alert gallery-label'><small>EXCLUSIVO<br/> SOCIOS</small></span></a></Link></p>)} /> : ''}

                  <p><Link prefetch as={`/p/${post.ID}/${post.slug}`} href={`/post?id=${post.ID}`}>
                    <a title={'Ver la ficha de ' + post.name} dangerouslySetInnerHTML={ {__html: post.name} } />
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

PostsByCategoryComunidad.getInitialProps = async function(context) {
  const { id } = context.query
  const { comunidad } = context.query
  const { caid } = context.query
  const res = await fetch(`https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/beneficios?_embed&categoria_del_beneficio=${id}&comunidad=${comunidad}`)
  const posts = await res.json()
  const res2 = await fetch(`https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/ofertas_grandes_marc?_embed&categoria_de_la_oferta_grande_marc=${id}&comunidad=${caid}&sim-model=id-marca`)
  const marcasofertas = await res2.json()

  console.log(`Posts data fetched. Count: ${posts.length}, ${marcasofertas.length}`)

  return { posts, marcasofertas }
}

export default PostsByCategoryComunidad