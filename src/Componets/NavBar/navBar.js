import { useContext } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Navigate, useNavigate } from "react-router-dom";

import AuthContext from "../auth-context/auth-context";

function MainNavigation() {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    const navigate = useNavigate();

    const logoutHandler = () => {
      console.log("Logout SucessFull");
      authCtx.logout();

    }
  return (
    <div>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
        <img
              alt=""
              src="/assets/logofse.png"
            width={75}
              className="d-inline-block align-top me-3"

            />{' '}
           <span style={{position: "relative" ,
    top: "7px"}}> FSE Project</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="my-2 mx-4" href="#home">Home</Nav.Link>
            <Nav.Link className="my-2 mx-4" href="#About">About</Nav.Link>
            <Nav.Link className="my-2 mx-4" href="#Contact">Contact</Nav.Link>

            <NavDropdown className="my-2 mx-4" title="Login" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={() => navigate("/adminLogin")}>Admin</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate("/mangerLogin")}>Manager</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate("/techLogin")}>Technician</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </div>
  );
}

export default MainNavigation;
