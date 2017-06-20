import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import {IntlProvider, FormattedDate} from 'react-intl'

const Categories = (props) => (
  <Layout>
    <h1>Beneficios - Categorías</h1>
    <IntlProvider defaultLocale='ca'>
        <ul className='gallery'>
          {props.categories.map((category, index) => (
            <span key={index}>
            {category.id <=100 ?
            <li className='item'>
              <Link prefetch as={`/c/${category.id}/${category.slug}`} href={`/category?id=${category.id}`}>
                <a><img src={'/static/32/' + category.slug +'-familias-numerosas.png'} /> <span dangerouslySetInnerHTML={ {__html: category.name} } /></a>
              </Link> | <span dangerouslySetInnerHTML={ {__html: category.count} }/>
            </li>
            : ''}
            </span>
          ))}
        </ul>
    </IntlProvider>
        <style jsx>{`
          h1 {
            color:#391f92;
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
  const res = await fetch('https://gestorbeneficios.familiasnumerosas.org/wp-json/wp/v2/categoria_del_beneficio?per_page=100&hide_empty=true&orderby=slug')
  const categories = await res.json()

  console.log(`Categories data fetched. Count: ${categories.length}`)

  return { categories }
}

export default Categories