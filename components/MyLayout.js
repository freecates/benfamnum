import Header from './Header'
import Footer from './Footer'
import ServiceWorker from '../pages/service-worker'

const layoutStyle = {
  margin: '0 auto',
  padding: 0,
  'max-width': '70rem'
}
const mainStyle = {
  padding: 20
}

const Layout = (props) => (
  <div style={layoutStyle} className='layout'>
    <Header />
      <main style={mainStyle}>
        {props.children}
      </main>
    <Footer />
    <ServiceWorker />
  </div>
)

export default Layout
