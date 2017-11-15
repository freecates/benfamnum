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
    <div style={layoutStyle} className='layout'>
      <Header />
        <main style={mainStyle}>
          {props.children}
        </main>
    </div>
      <Footer />
      <ServiceWorker />
  </div>
)

export default Layout
