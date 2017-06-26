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
        <p><Link href="https://www.facebook.com/Federaci%C3%B3n-Espa%C3%B1ola-de-Familias-Numerosas-FEFN-114691451934890/"><a target="_blank"><img src='/static/logo-facebook-familias-numerosas.png' /></a></Link> <Link href="https://twitter.com/famnumerosas?lang=es"><a target="_blank"><img src='/static/logo-twitter-familias-numerosas.png' /></a></Link></p>
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
