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

const Header = () => (
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
      <script async defer src='https://maps.googleapis.com/maps/api/js?key=AIzaSyCpb701GdEKst5BwD_bw7gzIc7vR65_f90&callback=initMap'
        type="text/javascript"></script>
    </Head>
      <header>
        <ul className='vertical medium-horizontal menu align-center'>
          <li><Link prefetch href="/">
            <a><img src='/static/logo-familias-numerosas.png' alt='Inicio' /></a>
          </Link></li>
          <li><Link prefetch href="/categorias">
            <a>Beneficios</a>
          </Link></li>
          <li><Link prefetch href="/prestaciones">
            <a>Prestaciones</a>
          </Link></li>
          <li><Link prefetch href="/la-federacion">
            <a>La Federación</a>
          </Link></li>
          <li><Link prefetch href="/hazte-socio">
            <a>Hazte socio</a>
          </Link></li>
        </ul>
      </header>

      
        <style jsx>{`
          a {
            color:#ffffff;
          }
          a:hover {
            color:#ffffff;
            text-decoration:underline;
          }
          ul.vertical.menu.align-center li {
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
          }
          @media screen and (min-width: 768px) {
          header {
              padding:.5em;
            }
          }
        `}</style>

    </div>
)

export default Header
