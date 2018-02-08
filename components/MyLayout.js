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
    {props.layout || props.bgmapa !== true &&  
      <div style={layoutStyle} className='fade-in'>
        <Header withbg />
          <main style={mainStyle}>
            {props.children}
          </main>
          <style jsx>{`
            .fade-in {
              animation-name: fadeIn;
              animation-duration: 1.3s;
              animation-timing-function: cubic-bezier(0, 0, 0.4, 1);
              animation-fill-mode: forwards;
            }
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
          `}</style>
      </div>}
    {props.layout && 
      <div style={layoutStyle} className={ 'layout' in props && 'layout'} >
        <Header/>
          <main style={mainStyle}>
            {props.children}
          </main>
          <style jsx>{`
            .layout {
              background: url('/static/bg-body-familias-numerosas.jpg');
              background-size: cover;
              background-repeat: no-repeat;
              animation-name: fadeIn;
              animation-duration: 1.3s;
              animation-timing-function: cubic-bezier(0, 0, 0.4, 1);
              animation-fill-mode: forwards;
            }
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            `}</style>
    </div>}
    {props.bgmapa &&
       <div style={layoutStyle} className={ 'bgmapa' in props && 'bgmapa'} >
      <Header withbg />
        <main style={mainStyle}>
          {props.children}
        </main>
        <style jsx>{`
          .bgmapa {
            background: url(/static/bg-mapa.jpg) no-repeat center center;
            background-size: cover;
            padding:2em;
            animation-name: fadeIn;
            animation-duration: 1.3s;
            animation-timing-function: cubic-bezier(0, 0, 0.4, 1);
            animation-fill-mode: forwards;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          `}</style>
      </div>}
      <Footer />
      <ServiceWorker />
  </div>
)

export default Layout
