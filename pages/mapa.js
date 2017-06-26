import Head from 'next/head'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import fetch from 'isomorphic-unfetch'
import {IntlProvider, FormattedDate} from 'react-intl'

const GoogleMapReact = dynamic(
  import('google-map-react'),
  {
    loading: () => (<p>cargando ...</p>)
  }
)

const markerStyle = {
  'background-color': '#ffffff',
  width: '50px',
  'text-align': 'center',
  padding: '.5em',
  'position': 'relative',
  right: 25,
  bottom: 25,
  'border-radius': '50%'

}

const MarkerComponent = ({ text }) => <div style={markerStyle}>{text}</div>;

const CENTER = [40.1301508,-1.8518527]
const ZOOM = 6

const MapByCategory = (props) => (
  <Layout>
    <Head>
      <title>Beneficios - {props.markers[0]._embedded['wp:term'][0][0].name}</title>
    </Head>
    <nav aria-label="Estás aquí:" role="navigation">
      <ul className="breadcrumbs">
        <li><Link prefetch href="/"><a>Inicio</a></Link></li>
        <li><Link prefetch href="/categorias"><a>Categorías</a></Link></li>
        <li>
          <span className="show-for-sr">Actual: </span> {props.markers[0]._embedded['wp:term'][0][0].name} 
        </li>
      </ul>
    </nav>
    <section>
      <h1><img src={'/static/' + props.markers[0]._embedded['wp:term'][0][0].slug +'-familias-numerosas.png'} /><br/>{props.markers[0]._embedded['wp:term'][0][0].name}</h1>
      <p className='align-center'><small><Link prefetch as={`/c/${props.markers[0]._embedded['wp:term'][0][0].id}/${props.markers[0]._embedded['wp:term'][0][0].slug}`} href={`/category?id=${props.markers[0]._embedded['wp:term'][0][0].id}`}><a>ver listado</a></Link></small></p>
      <IntlProvider defaultLocale='es'>
        
        <div style={{width: '100%', height: '500px'}}>     
        <GoogleMapReact
            center={CENTER}
            zoom={ZOOM}
          >
          {props.markers.map((marker, index) => (
            
            <MarkerComponent
              key={index}
              lat={marker.acf.lat.includes(',') ? '' : marker.acf.lat}
              lng={marker.acf.lon.includes(',') ? '' : marker.acf.lon}
              text={<Link prefetch as={`/p/${marker.id}/${marker.slug}`} href={`/post?id=${marker.id}`}><a title={marker.title.rendered}><span><img src={'/static/32/' + props.markers[0]._embedded['wp:term'][0][0].slug +'-familias-numerosas.png'} /></span></a></Link>}
            />
                ))}
          </GoogleMapReact>

          </div>
        
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
        .marker {
          width:50px;
          background-color:#ffffff;
          text-align:center;
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

MapByCategory.getInitialProps = async function(context) {
  const { id } = context.query
  const res = await fetch(`https://gestorbeneficios.familiasnumerosas.org/wp-json/wp/v2/beneficios?_embed&categoria_del_beneficio=${id}&per_page=100&orderby=slug&order=asc`)
  const markers = await res.json()

  console.log(`Markers data fetched. Count: ${markers.length}`)

  return { markers }
}

export default MapByCategory