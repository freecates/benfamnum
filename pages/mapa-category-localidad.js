import Head from 'next/head'
import Layout from '@components/MyLayout.js'
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

const ZOOM = 12


const MapByCategoryLocalidad = (props) => (
  <Layout>
    <Head>
      <title>Beneficios Familias Numerosas - {props.markers[0].categoria_de_la_prestacion.name} - {props.markers[0].localidad_del_beneficio.name}</title>
    </Head>
    <nav aria-label="Estás aquí:" role="navigation">
      <ul className="breadcrumbs">
        <li><Link  href="/"><a>Inicio</a></Link></li>
        <li><Link  href="/beneficios"><a>Ofertas para familias</a></Link></li>
        <li><Link  as={`/m/${props.markers[0].categoria_de_la_prestacion.term_id}/${props.markers[0].categoria_de_la_prestacion.slug}`} href={`/mapa?id=${props.markers[0].categoria_de_la_prestacion.term_id}`}><a>{props.markers[0].categoria_de_la_prestacion.name}</a></Link></li>
        <li>
          <span className="show-for-sr">Actual: </span> {props.markers[0].localidad_del_beneficio.name} 
        </li>
      </ul>
    </nav>
    <section>
    <h1><img src={'/static/' + props.markers[0].categoria_de_la_prestacion.slug +'-familias-numerosas.png'} /><br/>{props.markers[0].categoria_de_la_prestacion.name} - {props.markers[0].localidad_del_beneficio.name}</h1>
    <p className='align-center'><small><Link  as={`/c-l/${props.markers[0].categoria_de_la_prestacion.term_id}/${props.markers[0].categoria_de_la_prestacion.slug}/${props.markers[0].localidad_del_beneficio.term_id}/${props.markers[0].localidad_del_beneficio.slug}`} href={`/category-localidad?sid=${props.markers[0].categoria_de_la_prestacion.term_id}&localidad=${props.markers[0].localidad_del_beneficio.term_id}`}><a title={'Ver los beneficios de ' + props.markers[0].categoria_de_la_prestacion.name + ' en ' + props.markers[0].localidad_del_beneficio.name}>ver listado</a></Link></small></p>
    <IntlProvider defaultLocale='es'>
      
      <div style={{width: '100%', height: '500px'}}>     
       <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyCpb701GdEKst5BwD_bw7gzIc7vR65_f90'
          }}
          center={[props.markers[0].lat.includes(',') || props.markers[0].lat.includes('!') ? 40.1301508 : Number(props.markers[0].lat), props.markers[0].lon.includes(',') || props.markers[0].lon.includes('!') ? -1.8518527 : Number(props.markers[0].lon)]}
          zoom={ZOOM}
        >
        {props.markers.map((marker, index) => (
          
          <MarkerComponent
            key={index}
            lat={marker.lat.includes(',') || marker.lat.includes('!') ? '' : marker.lat}
            lng={marker.lon.includes(',') || marker.lon.includes('!') ? '' : marker.lon}
            text={<Link  href={`/p/${marker.ID}/${marker.slug}`}><a title={marker.name}><span><img src={'/static/32/' + props.markers[0].categoria_de_la_prestacion.slug +'-familias-numerosas.png'} /></span></a></Link>}
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
          background:#cc0033!important;
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

MapByCategoryLocalidad.getInitialProps = async function(context) {
  const { sid } = context.query
  const { localidad } = context.query
  const res = await fetch(`https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/beneficios?_embed&categoria_del_beneficio=${sid}&localidad=${localidad}`)
  const markers = await res.json()

  console.log(`Markers data fetched. Count: ${markers.length}`)

  return { markers }
}

export default MapByCategoryLocalidad