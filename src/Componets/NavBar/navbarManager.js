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
    <Navbar bg="light" expand="lg" className="navbar-container">
      <Container fluid>
        <Navbar.Brand>
          <img src="/assets/logo.png" style={{ width: '100px' }}></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {isLoggedIn && (
              <Nav.Link>
                <Link to={'/'}>Home</Link>
              </Nav.Link>
            )}
            {isLoggedIn && (
              <Nav.Link>
                <Link to={'/service'}>About</Link>
              </Nav.Link>
            )}
            {isLoggedIn && (
              <Nav.Link>
                <Link to={'/'}>About</Link>
              </Nav.Link>
            )}
            {!isLoggedIn && (
              <NavDropdown title="Login" id="navbarScrollingDropdown">
                <NavDropdown.Item>
                  <Link to={'/admin'}>Admin Login</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />

                <NavDropdown.Item>
                  <Link to={'/manager'}>Manager Login</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />

                <NavDropdown.Item>
                  <Link to={'/tech'}>Teachnician Login</Link>
                </NavDropdown.Item>
              </NavDropdown>
            )}

            {isLoggedIn && (
              <Nav.Link>
                <Button variant="outline-danger" onClick={logoutHandler}>
                  Logout
                </Button>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ManagerNavigation;
