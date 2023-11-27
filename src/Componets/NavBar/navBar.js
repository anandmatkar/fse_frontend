import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import "./navBar.css";

import AuthContext from "../auth-context/auth-context";

function MainNavigation() {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-success main-home-navbar"
      >
        <Container>
          <Navbar.Brand href="#" as={NavLink} to="/">
            <img
              alt=""
              src="/assets/logofse.png"
              width={100}
              className="d-inline-block align-top me-3"
            />{" "}
            <span
              style={{ position: "relative", top: "7px" }}
              className="h1 m-0"
            >
              FSE
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              {" "}
              {/* Add ms-auto class here */}
              <Nav.Link
                href="#"
                as={NavLink}
                to={"/"}
                className="nav-link-font"
              >
                Home
              </Nav.Link>
              {/* <NavDropdown
                title="Login"
                id="collasible-nav-dropdown"
                className="nav-link-font"
              >
                <NavDropdown.Item onClick={() => navigate("/adminLogin")}>
                  Admin
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/mangerLogin")}>
                  Manager
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/techLogin")}>
                  Technician
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
}

export default MainNavigation;
