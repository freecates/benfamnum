import HeaderHome from './HeaderHome'
import Footer from './Footer'

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
  </div>
)

export default LayoutHome
