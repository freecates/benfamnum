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

const linkStyle = {
  marginRight: 15
}

const Header = () => (
  <div style={{ marginBottom: 20 }}>
    <Head>
      {/* Import CSS for nprogress */}
      <link rel='stylesheet' type='text/css' href='/static/nprogress.css' />
      <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
      <link rel="stylesheet" href="/static/foundation.min.css" />
      <script async defer src='https://maps.googleapis.com/maps/api/js?key=AIzaSyCpb701GdEKst5BwD_bw7gzIc7vR65_f90&callback=initMap'
        type="text/javascript"></script>
    </Head>
      <header>
        <Link prefetch href="/">
          <a><img src='/static/logo-familias-numerosas.png' alt='Inicio' /></a>
        </Link>
        <Link prefetch href="/categories">
          <a style={linkStyle}>Categorías</a>
        </Link>
        <Link prefetch href="/about">
          <a style={linkStyle}>About</a>
        </Link>
      </header>

      
        <style jsx>{`
          a {
            color:#ffffff;
          }
          a:hover {
            color:#ffffff;
            text-decoration:underline;
          }
          header {
            background: url('/static/bg-header-familias-numerosas.jpg');
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
