import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { NavLink, Link } from "react-router-dom";
/**
* @author
* @function Header
**/

export const Header = (props) => {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Link to="/" className="navbar-brand">
            Admin Dashboard
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
          </Navbar.Collapse>
          <Nav>
            <li className="nav-item">
              <NavLink to="signin" className="nav-link">
                Signin
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="signup" className="nav-link">
                Signup
              </NavLink>
            </li>
          </Nav>
        </Container>

      </Navbar>
    </div>
  )

}