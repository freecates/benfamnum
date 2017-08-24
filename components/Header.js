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
      <meta name="apple-mobile-web-app-capable" content="yes"/>
      <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
      <meta name="apple-mobile-web-app-title" content="Beneficios Familias Numerosas"/>
      <link rel="apple-touch-icon" href="/static/icons/android-chrome-192x192.png"/>
      <meta name="msapplication-TileImage" content="/static/icons/android-chrome-192x192.png"/>
      <meta name="msapplication-TileColor" content="#64bc58"/>
      <link rel="stylesheet" href="/static/foundation.min.css" />
      <link href="https://fonts.googleapis.com/css?family=Lato:300,300i,400,400i,700,700i,900,900i&amp;subset=latin-ext" rel="stylesheet" />
      <link rel="stylesheet" href="/static/global.css" />
      <script async="true" defer="true" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCpb701GdEKst5BwD_bw7gzIc7vR65_f90&callback=initMap"
        type="text/javascript"></script>
      <script async="true" defer="true" src="/static/intersection-observer.js"
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
          <li><Link prefetch href="/beneficios">
            <a>Beneficios para familias</a>
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
