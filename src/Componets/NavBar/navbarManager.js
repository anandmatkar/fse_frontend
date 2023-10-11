import React, { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Link } from 'react-router-dom';
import AuthContext from '../auth-context/auth-context';
import Cookies from 'js-cookie';
// import './ManagerNavBar.css';

function ManagerNavigation() {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    Cookies.remove('token');

    authCtx.logout();
  };

  return (
    <React.Fragment>
      <Navbar expand="lg" className="main-nav-bar">
        <Container>
          <Navbar.Brand href="#" as={NavLink} to="/">
            <img
              alt=""
              src="/assets/logofse.png"
              width={100}
              className="d-inline-block align-top me-3"
            />{' '}
            <span style={{ position: "relative", top: "7px" }} className="h1 m-0">FSE</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home" as={NavLink} to={'/'} className="nav-link-font">Home</Nav.Link>
              {/* <Nav.Link href="#About" as={NavLink} to={'/about'} className="nav-link-font">About</Nav.Link>
              <Nav.Link href="#Contact" as={NavLink} to={'/contact'} className="nav-link-font">Contact</Nav.Link> */}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  </React.Fragment>
  );
}

export default ManagerNavigation;
