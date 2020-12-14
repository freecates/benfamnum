import Head from 'next/head';
import Layout from '@components/MyLayout.js';
import Link from 'next/link';
import { IntlProvider } from 'react-intl';

const OfertasPorSectores = ({ ofertasporsectores }) => (
  <Layout layout>
    <Head>
      <title>Ofertas para familias numerosas por sectores</title>
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
            <a>Ofertas para familias numerosas</a>
          </Link>
        </li>
        <li>
          <span className="show-for-sr">Actual: </span> Sectores
        </li>
      </ul>
    </nav>
    <IntlProvider defaultLocale="ca">
      <main>
        <section>
          <ul className="gallery">
            {ofertasporsectores.map((ofertasporsectore, index) => (
              <li className="item" key={index}>
                <Link
                  as={`/c/${ofertasporsectore.term_id}/${ofertasporsectore.slug}`}
                  href={`/category?sid=${ofertasporsectore.term_id}`}
                >
                  <a title={'Clica aquí para ver todas las ofertas de ' + ofertasporsectore.name}>
                    <h3>
                      <img
                        src={'/static/' + ofertasporsectore.slug + '-familias-numerosas.png'}
                        width="64"
                      />{' '}
                      <span dangerouslySetInnerHTML={{ __html: ofertasporsectore.name }} />
                    </h3>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </IntlProvider>
    <style jsx>{`
      a,
      li {
        color: #ffffff !important;
      }
      h1 {
        color: #391f92;
        text-align: center;
      }
      .align-center {
        text-align: center;
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
      a:hover {
        text-decoration: none;
      }
      p {
        margin-top: 2rem;
      }
      .item {
        width: 150px;
      }
      @media screen and (min-width: 320px) {
        .gallery {
          width: 100%;
        }
        .item {
          margin: 5px;
          width: 280px;
        }
      }
      @media screen and (min-width: 360px) {
        .gallery {
          width: 70%;
        }
      }
      @media screen and (min-width: 768px) {
        .gallery {
          width: 90%;
        }
      }
      @media screen and (min-width: 1360px) {
        .gallery {
          width: 100%;
        }
        .item {
          width: 255px;
        }
      }
    `}</style>
  </Layout>
);

export async function getStaticProps() {
  const res = await fetch(
    'https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/categoria_del_beneficio'
  );
  const ofertasporsectores = await res.json();
  return {
    props: { ofertasporsectores }
  };
}

export default OfertasPorSectores;
