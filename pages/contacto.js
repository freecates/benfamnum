import Link from 'next/link';
import Layout from '@components/MyLayout.js';
import dynamic from 'next/dynamic';

const MapaDeGoogle = dynamic(import('@components/MapaDeGoogle'), {
  loading: () => <p>cargando ...</p>
});

const Contacto = () => (
  <Layout>
    <nav aria-label="Estás aquí:" role="navigation">
      <ul className="breadcrumbs">
        <li>
          <Link href="/">
            <a>Inicio</a>
          </Link>
        </li>
        <li>
          <span className="show-for-sr">Actual: </span>Contacto
        </li>
      </ul>
    </nav>
    <h1>Federación Española de Familias Numerosas</h1>
    <p>
      Campomanes, 6 - 4º derecha
      <br />
      28013 - Madrid
      <br />
      <Link href="mailto:info@familiasnumerosas.org">
        <a>info@familiasnumerosas.org</a>
      </Link>
    </p>
    <MapaDeGoogle lat="40.418931" lng="-3.709144" />

    <style jsx>{`
      .breadcrumbs {
        margin-bottom: 1em;
      }
      a {
        color: #3f3fff !important;
      }
    `}</style>
  </Layout>
);

export default Contacto;
