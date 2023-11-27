import React, { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, Link, useNavigate } from "react-router-dom";
// import AuthContext from '../auth-context/auth-context';
import Cookies from "js-cookie";
import "./AdminNav.css";

function AdminNavBar() {
  // const authCtx = useContext(AuthContext);
  // const isLoggedIn = authCtx.isLoggedIn;
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-success navbar-admin-login"
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

export default AdminNavBar;
