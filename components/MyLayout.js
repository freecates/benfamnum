import Header from './Header'
import Footer from './Footer'
import Styles from './Styles'
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
  <div style={layoutStyle} className='layout'>
    <Header />
      <main style={mainStyle}>
        {props.children}
      </main>
    <Footer />
    <ServiceWorker />
    <Styles />
  </div>
)

export default Layout
