import Head from 'next/head'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import fetch from 'isomorphic-unfetch'
import {IntlProvider, FormattedDate} from 'react-intl'

const SelectCity = dynamic(
  import('../components/SelectCity'),
  {
    loading: () => (<p>cargando ...</p>)
  }
)

const today = Date.now();
const todayISO = new Date(today).toISOString();

const Localidades = (props) => (
  <Layout layout>
    <Head>
      <title>Ofertas para familias numerosas</title>
    </Head>
    <div>
    <nav aria-label="Estás aquí:" role="navigation">
    <ul className="breadcrumbs">
        <li><Link prefetch href="/"><a>Inicio</a></Link></li>
        <li>
        <span className="show-for-sr">Actual: </span> Ofertas para familias numerosas 
        </li>
    </ul>
    </nav>
    <section className='call-to-action'>
        <div className='icones-prestacions'>
            <div className='icona'>
              <Link prefetch href="/ofertas-por-sectores"><a><img src='/static/icona-ofertas-por-sectores-familias-numerosas.png'/><div className='text-icona'>Ofertas por sectores</div></a></Link>
            </div>
            <div className='icona'> 
              <img src='/static/icona-ofertas-por-poblacion-familias-numerosas.png'/><div className='text-icona city-text'>Ofertas por población<br/>          
                <SelectCity
                  inputClass= 'comunidad'
                  inputClass2= 'green'
                  inputValue= 'Ver'
                  options={[
                    {slug:'andalucia', key:0, value:'/comunidad?comunidad=Andaluc', label:'Andalucía'},
                    {slug:'aragon', key:1, value:'/comunidad?comunidad=Aragon', label:'Aragon'},
                    {slug:'asturias', key:2, value:'/comunidad?comunidad=Asturias', label:'Principado de Asturias'},
                    {slug:'balears', key:3, value:'/comunidad?comunidad=Baleares', label:'Islas Baleares'},
                    {slug:'canarias', key:4, value:'/comunidad?comunidad=canarias', label:'Canarias'},
                    {slug:'cantabria', key:5, value:'/comunidad?comunidad=Cantabria', label:'Cantabria'},
                    {slug:'castilla-la-mancha', key:6, value:'/comunidad?comunidad=Mancha', label:'Castilla la Mancha'},
                    {slug:'castilla-y-leon', key:7, value:'/comunidad?comunidad=Leon', label:'Castilla y Leon'},
                    {slug:'catalunya', key:7, value:'/comunidad?comunidad=Catalu', label:'Cataluña'},
                    {slug:'comunidad-valenciana', key:8, value:'/comunidad?comunidad=Valenciana', label:'Comunidad Valenciana'},
                    {slug:'extremadura', key:9, value:'/comunidad?comunidad=Extremadura', label:'Extremadura'},
                    {slug:'galicia', key:10, value:'/comunidad?comunidad=Galicia', label:'Galicia'},
                    {slug:'la-rioja', key:11, value:'/comunidad?comunidad=Rioja', label:'La Rioja'},
                    {slug:'madrid', key:12, value:'/comunidad?comunidad=Madrid', label:'Comunidad de Madrid'},
                    {slug:'region-de-murcia', key:13, value:'/comunidad?comunidad=Murcia', label:'Región de Murcia'},
                    {slug:'navarra', key:14, value:'/comunidad?comunidad=Navarra', label:'Comunidad Foral de Navarra'},
                    {slug:'pais-vasco', key:15, value:'/comunidad?comunidad=Vasco', label:'País Vasco'},
                    {slug:'ceuta', key:16, value:'/comunidad?comunidad=Ceuta', label:'Ceuta'},
                    {slug:'melilla', key:17, value:'/comunidad?comunidad=Melilla', label:'Melilla'}]} /></div>
            </div>
            <div className='icona'> 
              <Link prefetch href="/ofertas-on-line"><a><img src='/static/icona-ofertas-online-familias-numerosas.png'/><div className='text-icona'>Ofertas online</div></a></Link>
            </div>
            <div className='icona'> 
              <Link prefetch href="/ofertas-en-el-mapa"><a><img src='/static/icona-ofertas-en-el-mapa-familias-numerosas.png'/><div className='text-icona'>Ofertas en el mapa</div></a></Link>
            </div>
            <br className='clear' />
            {props.promociones[0].acf.fecha_de_finalizaciion_de_la_promocion > todayISO ?
              <div className='promo'>
                <h4 className='align-center'><span className='label alert file-label'><Link prefetch href='/promociones'><a>Mira aquí promociones que te<br/>pueden interesar</a></Link></span></h4>
              </div>
              : ''}
        </div>
    </section>
    </div>
        <style jsx>{`
          h2 {
            color:#391f92;
            text-align:center;
          }
          .align-center {
            text-align:center;
          }
          a, li {
              color:#ffffff!important;
          }
          .promo {
            margin-top:2em;
          }
          .file-label {
            background:#cc0033!important;
            color:#ffffff;
            font-weight:400;
            font-size:1.25rem;
            white-space:normal;
          }
          .file-label a {
            color:#ffffff!important;
          }
          .file-label a:hover {
            text-decoration:none;
          }
          .breadcrumbs {
              margin:-2rem 0 1rem 0;
          }
          .call-to-action {
              text-align:center;
              margin:1em auto;
              color:#ffffff;
          }
          .call-to-action .icona {
            position:relative;
            float:left;
          }
          .clear {
            clear:both;
          }        
          .call-to-action .text-icona {
              left: 0;
              position:absolute;
              text-align:center;
              top: 65px;
              width: 100%
              font-size:1em;
          }        
          .call-to-action .text-icona.city-text {
              top: 35px;
              font-size:.9em;
          }
          @media screen and (min-width: 320px) {   
              .call-to-action {
              width: 69%;
              }
              .icones-prestacions img {
                  margin:0 0 1em 0;
              }
          }
          @media screen and (min-width: 360px) {   
              .call-to-action {
              width: 60%;
              }
          }
          @media screen and (min-width: 411px) {   
              .call-to-action {
              width: 52%;
              }
          }
          @media screen and (min-width: 768px) {   
              .call-to-action {
              width: 71%;
              }        
              .call-to-action .text-icona {
                  font-size:1.15em;
                  top: 100px;
              }
              .call-to-action .text-icona.city-text {
                font-size:1.1em;
                top: 85px;
              }
              .icones-prestacions img {
                  margin:2em;
              }
            }
            @media screen and (min-width: 1024px) {   
                .call-to-action {
                width: 53%;
                }
              }
            @media screen and (min-width: 1360px) {   
                .call-to-action {
                width: 95%;
                }
              }
        `}</style>
  </Layout>
)

Localidades.getInitialProps = async function() {
  const res2 = await fetch(`https://gestorbeneficios.familiasnumerosas.org/wp-json/wp/v2/promociones`)
  const promociones = await res2.json()

  console.log(`Ofertas data fetched. Count: ${promociones.length}`)

  return { promociones }
}

export default Localidades