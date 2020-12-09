import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { IntlProvider } from 'react-intl';
import Layout from '@components/MyLayout.js';

const GoogleMapReact = dynamic(import('google-map-react'), {
  loading: () => <p>cargando ...</p>
});

const markerStyle = {
  backgroundColor: '#ffffff',
  width: '50px',
  textAlign: 'center',
  padding: '.5em',
  position: 'relative',
  right: 25,
  bottom: 25,
  borderRadius: '50%'
};

let centerLatLng = new Promise(function(resolve, reject) {
  if (typeof window === 'undefined') {
    console.log('pastanaga');
    resolve([40.4381311, -3.8196197]);
  } else {
    if (!window.navigator.geolocation) {
      console.log(`Not: ${window.navigator.geolocation}`);
      resolve([40.4381311, -3.8196197]);
    }

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(pos) {
      var crd = pos.coords;

      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      resolve([crd.latitude, crd.longitude]);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      resolve([40.4381311, -3.8196197]);
    }

    window.navigator.geolocation.getCurrentPosition(success, error, options);
  }
});

const MarkerComponent = ({ text }) => <div style={markerStyle}>{text}</div>;
const ZOOM = 14;

const MapByCategory = props => (
  <Layout>
    <Head>
      <title>Beneficios para familias numerosas cerca de tí</title>
    </Head>
    <nav aria-label="Estás aquí:" role="navigation">
      <ul className="breadcrumbs">
        <li>
          <Link href="/">
            <a>Inicio</a>
          </Link>
        </li>
        <li>
          <Link href="/beneficios">
            <a>Ofertas para familias</a>
          </Link>
        </li>
        <li>
          <span className="show-for-sr">Actual: </span> Beneficios cerca de tí
        </li>
      </ul>
    </nav>
    <section>
      <h1>Beneficios cerca de tí</h1>

      <IntlProvider defaultLocale="es">
        {props.CENTER != '40.4381311,-3.8196197' ? (
          <section>
            <div style={{ width: '100%', height: '500px' }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: 'AIzaSyCpb701GdEKst5BwD_bw7gzIc7vR65_f90'
                }}
                center={props.CENTER}
                zoom={ZOOM}
              >
                {props.markers.map((marker, index) => (
                  <MarkerComponent
                    key={index}
                    lat={
                      marker.lat.includes(',') ||
                      marker.lat.includes('!') ||
                      marker.lat.includes('No disponible') ||
                      marker.lat.includes('-')
                        ? null
                        : marker.lat
                    }
                    lng={
                      marker.lon.includes(',') ||
                      marker.lon.includes('!') ||
                      marker.lat.includes('No disponible') ||
                      marker.lon.includes('-')
                        ? null
                        : marker.lon
                    }
                    text={
                      <a href={`/p/${marker.ID}/${marker.slug}`} title={marker.name}>
                        <span>
                          <img
                            src={
                              'https://benfamcanumpics.famnum.now.sh/static/32/' +
                              marker.categoria_de_la_prestacion.slug +
                              '-familias-numerosas.png'
                            }
                            height={'32'}
                            width={'32'}
                            loading={'lazy'}
                          />
                        </span>
                      </a>
                    }
                  />
                ))}
              </GoogleMapReact>
            </div>
            <p className="text-center">
              Si no tienes Beneficios cerca de tí,
              <strong>prueba de hacer menos zoom en el mapa</strong> hasta encontarlos. O vuelve a
              probar haciendo clic{' '}
              <Link href="/mapa-proximidad">
                <a className="blue-underline">
                  <strong>aquí</strong>
                </a>
              </Link>
            </p>
          </section>
        ) : (
          <section>
            <p className="text-center">
              <Link href="/mapa-proximidad">
                <a className="button">Localízate</a>
              </Link>
            </p>
          </section>
        )}
      </IntlProvider>
    </section>
    <style jsx>{`
      .breadcrumbs {
        margin-bottom: 1em !important;
      }
      h1,
      .align-center {
        text-align: center;
      }
      h1 {
        color: #cb5599;
      }
      .gallery {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        padding: 5px;
      }
      ul {
        list-style-type: none !important;
        margin-left: 0;
        margin: 0 auto !important;
      }
      a {
        color: inherit !important;
      }
      a:hover {
        text-decoration: underline;
      }
      a.blue-underline {
        color: blue;
        text-decoration: underline;
      }
      a.blue-underline:hover {
        text-decoration: none;
      }
      .button {
        background: #0066ff;
        color: #ffffff !important;
        text-deocration: none;
      }
      .button:hover {
        background: #0051cb;
        text-decoration: none;
      }
      nav a {
        color: #00add9;
      }
      .benefit {
        width: 150px;
      }
      .gallery-label {
        position: relative;
        margin-top: -45px;
        margin-right: 10px;
        float: right;
        text-align: center;
        background: #f18903 !important;
      }
      .titulo-oferta {
        color: #ff0000;
      }
      .marker {
        width: 50px;
        background-color: #ffffff;
        text-align: center;
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
);

MapByCategory.getInitialProps = async function() {
  const res = await fetch(
    `https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/beneficios?sim-model=name-id-slug-lat-lon-categoria`
  );
  const markers = await res.json();
  const CENTER = await centerLatLng;
  console.log('CENTER ', CENTER);

  console.log(`Markers data fetched. Count: ${markers.length}`, `${CENTER}`);

  return { markers, CENTER };
};

export default MapByCategory;
