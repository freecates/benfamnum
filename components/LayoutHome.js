import HeaderHome from './HeaderHome'
import Footer from './Footer'
import ServiceWorker from '../pages/service-worker'

const layoutStyle = {
  margin: '0 auto',
  padding: 0,
  'max-width': '100%'
}

const LayoutHome = (props) => (
  <div style={layoutStyle}>
    <HeaderHome />
      <main>
        {props.children}
      </main>
    <Footer />
    <ServiceWorker />
    <script src="/static/jquery.min.js" 
      type="text/javascript"></script>
    <script src="/static/foundation.min.js" 
      type="text/javascript"></script>
    <script src="/static/foundation-init.js" 
      type="text/javascript"></script>
  </div>
)

export default LayoutHome
