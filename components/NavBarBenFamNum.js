import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Link from 'next/link';

export default class NavBarBenFamNum extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar inverse toggleable expand='lg'>
          <NavbarToggler className='ml-2' onClick={this.toggle} />
          <Link prefetch href="/"><NavbarBrand className='ml-auto'>
            <img src='/static/logo-familias-numerosas.png' alt='Inicio' />
          </NavbarBrand></Link>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem><Link href="http://www.familiasnumerosas.org/conocenos/quienes-somos/">
                  <a target='_blank'>La Federación</a>
                </Link></NavItem>
                <NavItem><Link href="http://www.familiasnumerosas.org/conocenos/nuestras-asociaciones/">
                  <a target='_blank'>Las Asociaciones</a>
                </Link></NavItem>
                <NavItem><Link prefetch href="/prestaciones">
                  <a>Prestaciones oficiales</a>
                </Link></NavItem>
                <NavItem><Link prefetch href="/beneficios">
                  <a>Beneficios para familias</a>
                </Link></NavItem>
                <NavItem><Link href="http://www.familiasnumerosas.org/hazte-socio/">
                  <a target='_blank'>Hazte socio</a>
                </Link></NavItem>
                <NavItem><Link prefetch href="/contacto">
                  <a>Contacto</a>
                </Link></NavItem>
              </Nav>
            </Collapse>
        </Navbar>
        <style jsx>{`
          a {
            color:#ffffff;
            margin:0 1em;
          }
          a:hover {
            color:#ffffff;
            text-decoration:underline;
          }
          @media screen and (min-width: 768px) {
            .align-nav {
            }
          }
          @media screen and (min-width: 1024px) {
            .align-nav {
              margin-top:5em;
            }
          }
        `}</style>
      </div>
    );
  }
}