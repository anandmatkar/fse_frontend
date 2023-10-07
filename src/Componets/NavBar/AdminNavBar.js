import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, Link } from "react-router-dom";
import AuthContext from "../auth-context/auth-context";
import "./AdminNav.css";
import {useNavigate} from 'react-router-dom';

function AdminNavBar() {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    const handleLogout = () => {
      console.log("Logout SucessFull");
      authCtx.logout();
      // Cookies.remove('token');
      navigate("/adminlogin");
    }

    const navigate = useNavigate();
  return (
    <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://as1.ftcdn.net/v2/jpg/05/10/52/14/1000_F_510521444_fWxOMclSHjEf0REfGmc61uIaGoRyw2H0.jpg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            FSE Report
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">About</Nav.Link>
                <Nav.Link href="#link">Contact</Nav.Link>
                {isLoggedIn && (
                  <Nav.Link className="ms-auto float-end" onClick={handleLogout} >Logout</Nav.Link> 
                )}
                {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown> */}
              </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default AdminNavBar;
