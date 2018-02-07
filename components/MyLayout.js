import Header from './Header'
import Footer from './Footer'
import ServiceWorker from '../pages/service-worker'

const layoutStyle = {
  margin: '0 auto',
  padding: 0,
  maxWidth: '100%'
}
const mainStyle = {
  padding: 20,
  maxWidth: '70rem',
  margin: '0 auto'
}

const Layout = (props) => (
  <div>
    <div style={layoutStyle} className={ 'layout' in props && 'layout'} className={ 'bg-mapa' in props && 'bg-mapa'}>
      {props.layout ? <Header/> : <Header withbg />}
        <main style={mainStyle}>
          {props.children}
        </main>
        <style jsx>{`
          .layout {
            background: url('/static/bg-body-familias-numerosas.jpg');
            background-size: cover;
            background-repeat: no-repeat;
          }
          .bg-mapa {
            background: url(/static/bg-mapa.jpg) no-repeat center center;
            background-size: cover;
            padding:2em;
          }
          `}</style>
    </div>
      <Footer />
      <ServiceWorker />
  </div>
)

export default Layout
