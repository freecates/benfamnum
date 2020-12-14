import Link from 'next/link';
import slug from 'limax';
import Layout from './MyLayout';

const Fallback = ({ notFound, breadCrumb }) => {
  const slugFromBreadCrumb = slug(breadCrumb);
  return (
    <Layout>
      <nav aria-label="Estás aquí:" role="navigation">
        <ul className="breadcrumbs">
          <li>
            <Link href="/">
              <a>Inicio</a>
            </Link>
          </li>
          <li>
            <Link href={`/${slugFromBreadCrumb}`}>
              <a>{breadCrumb}</a>
            </Link>
          </li>
        </ul>
      </nav>
      <section>
        <div className={`file${notFound ? '' : ' loading'}`}>
          <h1>{notFound ? 'Oferta no encontrada' : '... Loading'}</h1>
        </div>
        <style jsx>{`
          .loading {
            height: 100vh;
          }
        `}</style>
      </section>
    </Layout>
  );
};

export default Fallback;
