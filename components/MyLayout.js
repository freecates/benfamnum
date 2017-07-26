import Header from './Header'
import Footer from './Footer'

const layoutStyle = {
  margin: '0 auto',
  padding: 0,
  'max-width': '84rem'
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
  </div>
)

export default Layout
