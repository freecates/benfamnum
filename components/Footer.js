import React from 'react'
import Link from 'next/link'

const linkStyle = {
  marginLeft: 15
}

const footerStyle = {
  margin: '20px auto',
  textAlign: 'center',
  maxWidth: '70rem'
}

const Footer = () => (
  <footer style={footerStyle}>
        <p><Link href="https://www.facebook.com/Federaci%C3%B3n-Espa%C3%B1ola-de-Familias-Numerosas-FEFN-114691451934890/"><a target="_blank"><img src='/static/logo-facebook-familias-numerosas.png' /></a></Link> <Link href="https://twitter.com/famnumerosas?lang=es"><a target="_blank"><img src='/static/logo-twitter-familias-numerosas.png' /></a></Link></p>

        <section>
          <div className='wrapper'>
              <div className='first'>
                <p className='purple'>Mienbross de:<br/><Link href="http://www.elfac.org/"><a target="_blank"><img src='/static/logo-european-large-families-confederation-familias-numerosas.jpg' /></a></Link></p>
              </div>
              <div className='second'>
                 <p className='purple'>Con el apoyo de:<br/><Link href="https://www.msssi.gob.es/"><a target="_blank"><img src='/static/logo-ministerio-familias-numerosas.png' /></a></Link></p>
              </div>
              <div className='third'>
                 <p className='purple'>Certificación<br/><Link href="http://www.masfamilia.org/que-es-2"><a target="_blank"><img src='/static/logo-familiarmente-responsable-familias-numerosas.png' /></a></Link>
                </p>
              </div>
          </div>
          <p className='grey'>Federación Española de Familias Numerosas &#169; 2017
          <Link prefetch href="/aviso-legal">
            <a style={linkStyle}>Aviso Legal</a>
          </Link>
          <Link prefetch href="/politica-de-cookies">
            <a style={linkStyle}>Política de Cookies</a>
          </Link>
          <Link prefetch href="/creditos">
            <a style={linkStyle}>Creditos</a>
          </Link>         
          </p>
          
          <style jsx>{`
            .purple {
              color:#3a2092;
            }
            a {
              color:inherit;
            }
            a:hover {
              text-decoration:underline;
            }
            .grey {
              background-color:#e0e4e8;
            }
            section {
              background:#ffffff;
              }
            
          @media screen and (min-width: 768px) {                          
            .wrapper {
              display: -ms-flexbox;
              display: flex;
              -ms-flex-wrap: wrap;
                  flex-wrap: wrap;
              align-items:center;

              width: 100%;
            }
            .wrapper-top {
              align-items:baseline;
            }
            .first {
              width: 33%;
              padding:0 0 0 0;
            }
            .second {
              width: 33%;
              padding:0 0 0 0;
            }
            .third {
              width: 33%;
              padding:0 0 0 0;
            }
          }
          `}</style>

        </section>
        
        

    </footer>
)

export default Footer
