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

const PostsByCategory = (props) => (
  <Layout>
    <Head>
      <title>Beneficios Familias Numerosas - {props.posts[0].categoria_de_la_prestacion.name}</title>
    </Head>
    <nav aria-label="Estás aquí:" role="navigation">
      <ul className="breadcrumbs">
        <li><Link prefetch href="/"><a>Inicio</a></Link></li>
        <li><Link prefetch href="/beneficios"><a>Ofertas para familias</a></Link></li>
        <li>
          <span className="show-for-sr">Actual: </span> {props.posts[0].categoria_de_la_prestacion.name} 
        </li>
      </ul>
    </nav>
    <section>
      <h1><img src={'/static/' + props.posts[0].categoria_de_la_prestacion.slug +'-familias-numerosas.png'} /><br/>{props.posts[0].categoria_de_la_prestacion.name}</h1>
      <p className='align-center'><small><Link prefetch as={`/m/${props.posts[0].categoria_de_la_prestacion.term_id}/${props.posts[0].categoria_de_la_prestacion.slug}`} href={`/mapa?id=${props.posts[0].categoria_de_la_prestacion.term_id}`}><a><img src='/static/icona-mapa-familias-numerosas.png' /> ver en el mapa</a></Link></small></p>

      <section id='select-city'>

        <div className='wrapper'>

          <p className='align-center'>¿Dónde quieres disfrutar del beneficio? Selecciona la CA</p>
        
          <SelectCity
           inputClass= 'comunidad'
           inputValue= 'Buscar el mejor descuento'
           options={[
             {slug:'andalucia', key:8135, value:`/category-comunidad?id=${props.posts[0].categoria_de_la_prestacion.term_id}&comunidad=Andaluc&caid=8135`, label:'Andalucía'},
             {slug:'aragon', key:8136, value:`/category-comunidad?id=${props.posts[0].categoria_de_la_prestacion.term_id}&comunidad=Aragon&caid=8136`, label:'Aragon'},
             {slug:'asturias', key:8137, value:`/category-comunidad?id=${props.posts[0].categoria_de_la_prestacion.term_id}&comunidad=Asturias&caid=8137`, label:'Principado de Asturias'},
             {slug:'balears', key:9107, value:`/category-comunidad?id=${props.posts[0].categoria_de_la_prestacion.term_id}&comunidad=Baleares&caid=9107`, label:'Islas Baleares'},
             {slug:'canarias', key:8139, value:`/category-comunidad?id=${props.posts[0].categoria_de_la_prestacion.term_id}&comunidad=canarias&caid=8139`, label:'Canarias'},
             {slug:'cantabria', key:8140, value:`/category-comunidad?id=${props.posts[0].categoria_de_la_prestacion.term_id}&comunidad=Cantabria&caid=8140`, label:'Cantabria'},
             {slug:'castilla-la-mancha', key:8141, value:`/category-comunidad?id=${props.posts[0].categoria_de_la_prestacion.term_id}&comunidad=Mancha&caid=8141`, label:'Castilla la Mancha'},
             {slug:'castilla-y-leon', key:8142, value:`/category-comunidad?id=${props.posts[0].categoria_de_la_prestacion.term_id}&comunidad=Leon&caid=8142`, label:'Castilla y Leon'},
             {slug:'catalunya', key:8143, value:`/category-comunidad?id=${props.posts[0].categoria_de_la_prestacion.term_id}&comunidad=Catalu&caid=8143`, label:'Cataluña'},
             {slug:'comunidad-valenciana', key:8151, value:`/category-comunidad?id=${props.posts[0].categoria_de_la_prestacion.term_id}&comunidad=Valenciana&caid=8151`, label:'Comunidad Valenciana'},
             {slug:'extremadura', key:8144, value:`/category-comunidad?id=${props.posts[0].categoria_de_la_prestacion.term_id}&comunidad=Extremadura&caid=8144`, label:'Extremadura'},
             {slug:'galicia', key:8145, value:`/category-comunidad?id=${props.posts[0].categoria_de_la_prestacion.term_id}&comunidad=Galicia&caid=8145`, label:'Galicia'},
             {slug:'la-rioja', key:8146, value:`/category-comunidad?id=${props.posts[0].categoria_de_la_prestacion.term_id}&comunidad=Rioja&caid=8146`, label:'La Rioja'},
             {slug:'madrid', key:8147, value:`/category-comunidad?id=${props.posts[0].categoria_de_la_prestacion.term_id}&comunidad=Madrid&caid=8147`, label:'Comunidad de Madrid'},
             {slug:'region-de-murcia', key:8148, value:`/category-comunidad?id=${props.posts[0].categoria_de_la_prestacion.term_id}&comunidad=Murcia&caid=8148`, label:'Región de Murcia'},
             {slug:'navarra', key:8149, value:`/category-comunidad?id=${props.posts[0].categoria_de_la_prestacion.term_id}&comunidad=Navarra&caid=8149`, label:'Comunidad Foral de Navarra'},
             {slug:'pais-vasco', key:8150, value:`/category-comunidad?id=${props.posts[0].categoria_de_la_prestacion.term_id}&comunidad=Vasco&caid=8150`, label:'País Vasco'},
             {slug:'ceuta', key:8152, value:`/category-comunidad?id=${props.posts[0].categoria_de_la_prestacion.term_id}&comunidad=Ceuta&ciad=8152`, label:'Ceuta'},
             {slug:'melilla', key:8153, value:`/category-comunidad?id=${props.posts[0].categoria_de_la_prestacion.term_id}&comunidad=Melilla&caid=8153`, label:'Melilla'}]} />
        </div>
      </section>

      <IntlProvider defaultLocale='es'>
        <section>
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
                {post.imagen_destacada_de_la_oferta_general_thumb ? <Observer threshold={1} triggerOnce={true} render={() => (<p className='fade-in'><Link prefetch as={`/p/${post.ID}/${post.slug}`} href={`/post?id=${post.ID}`}><a title={'Ver la ficha de ' + post.name}><img className='fade-in' width='250' src={post.imagen_destacada_de_la_oferta_general_thumb.sizes.thumbnail} alt={post.titulo_de_la_oferta_oferta_general} /></a></Link></p>)} /> : ''}

                {post.imagen_destacada_de_la_oferta_socios_thumb ? <Observer threshold={1} triggerOnce={true} render={() => (<p className='fade-in'><Link prefetch as={`/p/${post.ID}/${post.slug}`} href={`/post?id=${post.ID}`}><a title={'Ver la ficha de ' + post.name}><img className='fade-in' width='250' src={post.imagen_destacada_de_la_oferta_socios_thumb.sizes.thumbnail} alt={post.titulo_de_la_oferta_oferta_socios} /><span className='label alert gallery-label'><small>EXCLUSIVO<br/> SOCIOS</small></span></a></Link></p>)} /> : ''}

                <p><Link prefetch as={`/p/${post.ID}/${post.slug}`} href={`/post?id=${post.ID}`}>
                  <a title={'Ver la ficha de ' + post.name} dangerouslySetInnerHTML={ {__html: post.name} } />
                </Link><br/>
                {post.categoria_de_la_prestacion ?<small><Link prefetch as={`/c-l/${post.categoria_de_la_prestacion.term_id}/${post.categoria_de_la_prestacion.slug}/${post.localidad_del_beneficio.term_id}/${post.localidad_del_beneficio.slug}`} href={`/category-localidad?id=${post.categoria_de_la_prestacion.term_id}&localidad=${post.localidad_del_beneficio.term_id}`}><a title={'Ver todos los beneficios de ' + post.categoria_de_la_prestacion.name + ' en ' + post.localidad_del_beneficio.name}><span dangerouslySetInnerHTML={ {__html: post.localidad_del_beneficio.name} } /></a></Link></small> : <small>{post.localidad_del_beneficio.name}</small>} <br/>

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
)

PostsByCategory.getInitialProps = async function(context) {
  const { id } = context.query
  const res = await fetch(`https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/beneficios?_embed&categoria_del_beneficio=${id}`)
  const posts = await res.json()
  const res2 = await fetch(`https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/ofertas_grandes_marc?_embed&categoria_de_la_oferta_grande_marc=${id}&sim-model=id-marca`)
  const marcasofertas = await res2.json()

  console.log(`Posts data fetched. Count: ${posts.length}, ${marcasofertas.length}`)

  return { posts, marcasofertas }
}

export default PostsByCategory