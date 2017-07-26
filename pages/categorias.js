import Head from 'next/head'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import {IntlProvider, FormattedDate} from 'react-intl'

const Categories = (props) => (
  <Layout>
    <Head>
      <title>Beneficios - Categorías</title>
    </Head>
    <h1>Categorías de los Beneficios</h1>
    <h2 className='align-center'>Escoje la categoría que más te interese haciendo click</h2>
    <IntlProvider defaultLocale='ca'>
      <section>
        <ul className='gallery'>
          {props.categories.map((category, index) => (
            <span key={index}>
            {category.id <=100 ?
            <li className='item'>
              <Link prefetch as={`/c/${category.id}/${category.slug}`} href={`/category?id=${category.id}`}>
                <a title={'Clica aquí para ver todos los beneficios de ' + category.name}><img src={'/static/32/' + category.slug +'-familias-numerosas.png'} /> <span dangerouslySetInnerHTML={ {__html: category.name} } /></a>
              </Link>
            </li>
            : ''}
            </span>
          ))}
        </ul>
        <p className='align-center'>Si lo prefieres, tambíen puedes <Link href='#'><a className='blue'>ver los beneficios de servicios online</a></Link>.</p>
      </section>
    </IntlProvider>
        <style jsx>{`
          h1 {
            color:#391f92;
            text-align:center;
          }
          .align-center {
            text-align:center;
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
          a.blue {
            color:#3f3fff;
            text-decoration:underline;
          }
          p {
            margin-top:2rem;
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
            }
          }
          @media screen and (max-width: 375px) {              
            .item {
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
          .item {
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

Categories.getInitialProps = async function() {
  const res = await fetch('https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/categoria_del_beneficio')
  const categories = await res.json()

  console.log(`Categories data fetched. Count: ${categories.length}`)

  return { categories }
}

export default Categories