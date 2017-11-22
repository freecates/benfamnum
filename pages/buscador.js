import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/MyLayout.js'
import IsSearch from '../components/IsSearch.js'

export default () => (
    <Layout>
      <nav aria-label="Estás aquí:" role="navigation">
        <ul className="breadcrumbs">
          <li><Link prefetch href="/"><a>Inicio</a></Link></li>
          <li>
            <span className="show-for-sr">Actual: </span>Buscador
          </li>
        </ul>
      </nav>
        <h1>Buscador</h1>
        <IsSearch/>

      <style jsx>{`
      `}</style>
    </Layout>
)
