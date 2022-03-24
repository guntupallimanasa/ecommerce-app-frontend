import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {signout} from '../../actions';
/**
* @author
* @function Header
**/

export const Header = (props) => {

  const auth = useSelector(state => state);
  const dispatch = useDispatch();

  const logout = ()=>{
    dispatch(signout())
  }

  const renderLoggedInLinks = () => {
    return (<Nav>
      <li className="nav-item">
        <span className="nav-link" onClick = {logout}>
          Signout
        </span>
      </li>
    </Nav>)
  }
  const renderNonLoggedInLinks = () => {
    return (<Nav>
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
    </Nav>)
  }
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" fixed='top' variant="dark" style={{ zIndex: 1 }}>
        <Container fluid>
          <Link to="/" className="navbar-brand">
            Admin Dashboard
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
          </Navbar.Collapse>
{
  auth.authReducer.authenticate?renderLoggedInLinks():renderNonLoggedInLinks()
}
        </Container>

      </Navbar>
    </div>
  )

}