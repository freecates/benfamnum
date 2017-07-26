import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import NProgress from 'nprogress'
import Router from 'next/router'

Router.onRouteChangeStart = (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

const HeaderHome = () => (
  <div style={{ marginBottom: 20 }}>
    <Head>
      {/* Import CSS for nprogress */}
      <link rel='stylesheet' type='text/css' href='/static/nprogress.css' />
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
      <meta name="theme-color" content="#64bc58" />
      <link rel="icon" href="/static/favicon.ico" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="stylesheet" href="/static/foundation.min.css" />
      <link href="https://fonts.googleapis.com/css?family=Lato:300,300i,400,400i,700,700i,900,900i&amp;subset=latin-ext" rel="stylesheet" />
      <link rel="stylesheet" href="/static/global.css" />
      <script async defer src='https://maps.googleapis.com/maps/api/js?key=AIzaSyCpb701GdEKst5BwD_bw7gzIc7vR65_f90&callback=initMap'
        type="text/javascript"></script>
    </Head>
      <header>
        <ul className='vertical medium-horizontal menu align-center'>
          <li><Link prefetch href="/">
            <a><img src='/static/logo-familias-numerosas.png' alt='Inicio' /></a>
          </Link></li>
          <li><Link prefetch href="/la-federacion">
            <a>La Federación</a>
          </Link></li>
          <li><Link prefetch href="/prestaciones">
            <a>Prestaciones oficiales</a>
          </Link></li>
          <li><Link prefetch href="/categorias">
            <a>Beneficios para familias</a>
          </Link></li>
          <li><Link prefetch href="/hazte-socio">
            <a>Hazte socio</a>
          </Link></li>
        </ul>
      <section className='section-data'>
        <div className='section-a'>
          <p className='icones-prestacions align-center'>
              <Link prefetch href="/prestaciones"><a><img src='/static/icona-prestacions-publiques-familias-numerosas.png'/></a></Link>
          </p>
          <p>Desde este apartado podrás acceder a toda la información sobre las prestaciones que como familia numerosa te ofrece el gobierno central, autonónico o municipal</p>
        </div>
        <div className='section-b'>
          <p className='icones-prestacions align-center'>
              <Link prefetch href="/categorias"><a><img src='/static/icona-ofertas-familias-numerosas.png'/></a></Link>
          </p>
          <p>Ser familia numerosa te ofrece muchos descuentos y servicios exclusivos, en este apartado podrás seleccionar el tipo de servicio que necesitas y las ventajas que te ofrecen las empresas</p>
        </div>
      </section>
      </header>

      
        <style jsx>{`
          a {
            color:#ffffff;
          }
          a:hover {
            color:#ffffff;
            text-decoration:underline;
          }
          ul,section {
            max-width:84rem;
            margin:0 auto;
            width:100%;
          }
          ul.vertical.menu.align-center li {
            text-align:center;
          }
          p {
            color:#ffffff;
          }
          .align-center {
            text-align:center;
          }
          .menu>li {
            vertical-align:bottom;
          }
          header {
            background: url('/static/bg-body-familias-numerosas.jpg');
            background-size: cover;
            background-repeat: no-repeat;
          }
          @media screen and (min-width: 320px) {
          header {
              padding:.25em;
            }
            .icones-prestacions img {
                padding:0 0 1em 0;
            }
          }
          @media screen and (min-width: 768px) {
          header {
              padding:.5em;
            }
            .icones-prestacions img {
                padding:4rem 2em 1em 0;
            }              
            .section-data {
              display: -ms-flexbox;
              display: flex;
              -ms-flex-wrap: wrap;
                  flex-wrap: wrap;
              align-items:center;
              margin-left:2rem;
            }
            .section-a, .section-b {
              width: 42%;
              max-width:42rem;
              margin: 5px 20px;
            }
          }
          @media screen and (min-width: 1024px) {             
            .section-data {
              margin-left:4rem;
            }
          }
          @media screen and (min-width: 1360px) {             
            .section-data {
              margin-left:6rem;
            }
          }
        `}</style>

    </div>
)

export default HeaderHome
