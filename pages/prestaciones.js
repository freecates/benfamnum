import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/MyLayout.js'

export default () => (
    <Layout>
    <Head>
      <title>Prestaciones Familias Numerosas</title>
      <link rel="stylesheet" href="/static/prestaciones.css" />
    </Head>
       <section className='call-to-action'>
            <h1>¿Eres socio? ¿Quieres conseguir estos descuentos?</h1>
            <p>Ser familia numerosa te ofrece la posibilidad de muchas ventajas al asociarte. Participa y disfruta de todas ellas de una manera fácil y rápida.</p>
            <p><img src='/static/carnet-familias-numerosas.jpg'/></p>
            <p><Link prefetch href="/categorias"><a className='hollow button'>Quiero participar de estas ventajas</a></Link></p>
            <style jsx>{`
                .call-to-action {
                    text-align:center;
                    margin:0 auto;
                }
                h1 {
                    color:#391f92;
                }
                .button {
                    color:inherit;
                    text-transform:uppercase;
                    border-color:#391f92;
                }
                .button:hover {
                    color:#391f92;
                }
                @media screen and (min-width: 320px) {   
                    .call-to-action {
                    width: 100%;
                    }
                }
                @media screen and (min-width: 360px) {   
                    .call-to-action {
                    width: 90%;
                    }
                }
                @media screen and (min-width: 768px) {   
                    .call-to-action {
                    width: 70%;
                    }
                }
                @media screen and (min-width: 1366px) {   
                    .call-to-action {
                    width: 62%;
                    }
                }
            `}</style>
        </section>
    </Layout>
)
