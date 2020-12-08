import HeaderHome from './HeaderHome';
import Footer from './Footer';
import Styles from './Styles';

const layoutStyle = {
  margin: '0 auto',
  padding: 0,
  maxWidth: '100%'
};

const LayoutHome = props => (
  <div style={layoutStyle}>
    <HeaderHome />
    <main>{props.children}</main>
    <Footer />
    <Styles />
  </div>
);

export default LayoutHome;
