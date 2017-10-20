import HeaderHome from './HeaderHome'
import Footer from './Footer'
import ServiceWorker from '../pages/service-worker'

const layoutStyle = {
  margin: '0 auto',
  padding: 0,
  'max-width': '70rem'
}

const LayoutHome = (props) => (
  <div style={layoutStyle}>
    <HeaderHome />
      <main>
        {props.children}
      </main>
    <Footer />
    <ServiceWorker />
  </div>
)

export default LayoutHome
