import React from 'react'
import Link from 'next/link'

const linkStyle = {
  marginLeft: 15
}

const footerStyle = {
  margin: '20px auto',
  'text-align': 'center'
}

const Footer = () => (
  <div style={footerStyle}>
        <p><a href='#'><img src='/static/logo-facebook-familias-numerosas.png' /></a> <a href='#'><img src='/static/logo-twitter-familias-numerosas.png' /></a></p>
        <Link prefetch href="/aviso-legal">
          <a style={linkStyle}>Aviso Legal</a>
        </Link>
        <Link prefetch href="/politica-de-cookies">
          <a style={linkStyle}>Política de Cookies</a>
        </Link>
        <Link prefetch href="/creditos">
          <a style={linkStyle}>Creditos</a>
        </Link>
      
        <style jsx>{`
          a {
            color:inherit;
          }
          a:hover {
            text-decoration:underline;
          }
        `}</style>

    </div>
)

export default Footer
