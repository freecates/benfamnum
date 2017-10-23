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
        <Navbar inverse toggleable>
          <NavbarToggler left onClick={this.toggle} />
          <Link prefetch href="/"><NavbarBrand>
            <img src='/static/logo-familias-numerosas.png' alt='Inicio' />
          </NavbarBrand></Link>
          <span className='align-nav'>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem><Link prefetch href="/la-federacion">
                  <a>La Federación</a>
                </Link></NavItem>
                <NavItem><Link prefetch href="/prestaciones">
                  <a>Prestaciones oficiales</a>
                </Link></NavItem>
                <NavItem><Link prefetch href="/beneficios">
                  <a>Beneficios para familias</a>
                </Link></NavItem>
                <NavItem><Link prefetch href="/hazte-socio">
                  <a>Hazte socio</a>
                </Link></NavItem>
                <NavItem><Link prefetch href="/mapa-proximidad">
                  <a>Hazte socio</a>
                </Link></NavItem>
              </Nav>
            </Collapse>
          </span>
        </Navbar>
        <style jsx>{`
          .align-nav {
            text-align:center;
          }
          a {
            color:#ffffff;
            margin:0 1em;
          }
          a:hover {
            color:#ffffff;
            text-decoration:underline;
          }
        `}</style>
      </div>
    );
  }
}