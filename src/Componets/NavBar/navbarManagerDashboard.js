import React, { useContext } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AuthContext from "../auth-context/auth-context";
import "./navbarManagerDashboard.css";
import { MdArrowDropDown } from "react-icons/md";

const NavbarManagerDashboard = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logoutBtn();
    navigate("/mangerLogin");
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-success manager-ui">
      <Container>
        <Navbar.Brand as={NavLink} to="/manager">
          <img
            alt="Profile Avatar"
            src="/assets/logofse.png"
            width={100}
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto fs-3">
            <span className="text-center">
              <strong>Manager Name :</strong>{" "}
              {Cookies.get("Name").toUpperCase() || "FSE"}
            </span>
          </Nav>
          <Nav>
            <NavDropdown
              className="text-center"
              title={
                <img
                  src={
                    Cookies.get("Profile") ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpFdo7jMQ4ZhDD1zqDdGGW0HjKNbV4iiOniQ&usqp=CAU"
                  }
                  alt="Profile_Picture"
                  className="border border-dark"
                  style={{
                    width: "60px",
                    borderRadius: "50%",
                    height: "50px",
                  }}
                />
              }
              id="collasible-nav-dropdown"
              drop="down"
            >
              <NavDropdown.Item onClick={() => navigate("/ShowManagerProfile")}>
                Show Profile
              </NavDropdown.Item>
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarManagerDashboard;
