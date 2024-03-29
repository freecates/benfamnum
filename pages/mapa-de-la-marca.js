import Head from 'next/head';
import Layout from '@components/MyLayout.js';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { IntlProvider } from 'react-intl';

const GoogleMapReact = dynamic(import('google-map-react'), {
  loading: () => (
    <div>
      <p style={{ textAlign: 'center' }}>
        <img src="/static/rolling.gif" />
      </p>
    </div>
  )
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

const MarkerComponent = ({ text }) => <div style={markerStyle}>{text}</div>;

const CENTER = [40.1301508, -1.8518527];
const ZOOM = 6;

const MapByMarca = ({ markers, camarkers }) => (
  <Layout>
    <Head>
      <title>
        Ofertas de la Marca {markers.length >= 1 ? markers[0].marca.name : ''}
        {camarkers.length >= 1 ? camarkers[0].marca.name : ''} para familias numerosas
      </title>
    </Head>
    <nav aria-label="Estás aquí:" role="navigation">
      <ul className="breadcrumbs">
        <li>
          <Link href="/">
            <a>Inicio</a>
          </Link>
        </li>
        <li>
          <Link href="/grandes-marcas">
            <a>Grandes Marcas</a>
          </Link>
        </li>
        <li>
          <span className="show-for-sr">Actual: </span>{' '}
          {markers.length >= 1 ? markers[0].marca.name : ''}
          {camarkers.length >= 1 ? camarkers[0].marca.name : ''}
        </li>
      </ul>
    </nav>
    <section>
      {markers.length >= 1 ? (
        <div>
          <h1>
            <img src={'/static/' + markers[0].marca.slug + '-familias-numerosas.png'} />
            <br />
            {markers[0].marca.name}
          </h1>
          <p className="align-center">
            <small>
              <Link
                as={`/m-o-g-m/${markers[0].marca.term_id}/${markers[0].marca.slug}`}
                href={`/ofertas-de-la-marca?id=${markers[0].marca.term_id}`}
              >
                <a>ver listado</a>
              </Link>
            </small>
          </p>
        </div>
      ) : (
        ''
      )}
      {camarkers.length >= 1 ? (
        <div>
          <h1>
            <img src={'/static/' + camarkers[0].marca.slug + '-familias-numerosas.png'} />
            <br />
            {camarkers[0].marca.name}
          </h1>
          <p className="align-center">
            <small>
              <Link
                as={`/m-o-g-m/${camarkers[0].marca.term_id}/${camarkers[0].marca.slug}`}
                href={`/ofertas-de-la-marca?id=${camarkers[0].marca.term_id}`}
              >
                <a>ver listado</a>
              </Link>
            </small>
          </p>
        </div>
      ) : (
        ''
      )}
      <IntlProvider defaultLocale="es">
        <div style={{ width: '100%', height: '500px' }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyCpb701GdEKst5BwD_bw7gzIc7vR65_f90'
            }}
            center={CENTER}
            zoom={ZOOM}
          >
            {markers.length >= 1
              ? markers.map((marker, index) => (
                  <MarkerComponent
                    key={index}
                    lat={
                      marker.lat.includes(',') || marker.lat.includes('!')
                        ? marker.lat.replace(',', '.')
                        : marker.lat.replace(/(?<=\..*)\./g, '')
                    }
                    lng={
                      marker.lon.includes(',') || marker.lon.includes('!')
                        ? marker.lon.replace(',', '.')
                        : marker.lon.replace(/(?<=\..*)\./g, '')
                    }
                    text={
                      <a href={`/oferta-gran-marca?id=${marker.ID}`} title={marker.name}>
                          <span>
                            <img
                              src={
                                '/static/32/' + markers[0].marca.slug + '-familias-numerosas.png'
                              }
                            />
                          </span>
                      </a>
                    }
                  />
                ))
              : null}

            {camarkers.length >= 1
              ? camarkers.map((marker, index) => (
                  <MarkerComponent
                    key={index}
                    lat={
                      marker.lat.includes(',') || marker.lat.includes('!')
                        ? marker.lat.replace(',', '.')
                        : marker.lat
                    }
                    lng={
                      marker.lon.includes(',') || marker.lon.includes('!')
                        ? marker.lon.replace(',', '.')
                        : marker.lon
                    }
                    text={
                      <a href={`/oferta-gran-marca?id=${marker.ID}`} title={marker.name}>
                          <span>
                            <img
                              src={
                                '/static/32/' + camarkers[0].marca.slug + '-familias-numerosas.png'
                              }
                            />
                          </span>
                      </a>
                    }
                  />
                ))
              : null}
          </GoogleMapReact>
        </div>
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
        color: #391f92;
      }
      .gallery {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        padding: 5px;
      }
      ul {
        list-style-type: none;
        margin-left: 0;
        margin: 0 auto !important;
      }
      a {
        color: inherit;
      }
      a:hover {
        text-decoration: underline;
      }
      nav a {
        color: #3f3fff;
      }
      .benefit {
        /c-l/8/moda/talavera%20de%20la%20reinawidth: 150px;
      }
      .gallery-label {
        position: relative;
        margin-top: -45px;
        margin-right: 10px;
        float: right;
        text-align: center;
        background: #cc0033 !important;
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

MapByMarca.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(
    `https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/ofertas_grandes_marc?marca=${id}&sim-model=name-id-slug-lat-lon-marca`
  );
  const markers = await res.json();
  const res2 = await fetch(
    `https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/of_gr_m_ca?marca=${id}&sim-model=name-id-slug-lat-lon-marca`
  );
  const camarkers = await res2.json();

  console.log(`Markers data fetched. Count: ${markers.length}, ${camarkers.length}`);

  return { markers, camarkers };
};

export default MapByMarca;
