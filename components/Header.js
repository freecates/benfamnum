import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import NProgress from 'nprogress'
import Router from 'next/router'
import GlobalHead from './GlobalHead'
import NavBarBenFamNum from './NavBarBenFamNum'

Router.onRouteChangeStart = (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

const Header = () => (
  <div style={{ marginBottom: 20 }}>
    <GlobalHead />
    <header className='fade-in'>
      <section>
        <NavBarBenFamNum />
      </section>
    </header>
        <style jsx>{`
          ul,section {
            max-width:70rem;
            margin:0 auto;
            width:100%;
          }
          header {
            background: url('/static/bg-body-familias-numerosas.jpg');
            background-size: cover;
            background-repeat: no-repeat;
          }
          .fade-in {
            animation-name: fadeIn;
            animation-duration: 1.3s;
            animation-timing-function: cubic-bezier(0, 0, 0.4, 1);
            animation-fill-mode: forwards;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
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
