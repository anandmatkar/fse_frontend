import React, { useContext } from "react";
import AuthContext from "../auth-context/auth-context";
import {
  Dropdown,
  ListGroup,
  Nav,
  Navbar,
  NavLink,
  Container,
  NavDropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { MdArrowDropDown } from "react-icons/md";
import "./navTechnicanProfile.css";

const NavTechnicanProfile = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logoutBtn();
    navigate("/techLogin");
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-success technician-ui"
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/">
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
              <strong>Technician Name :</strong>
              {Cookies.get("Name").toUpperCase() || "FSE"}
            </span>
          </Nav>
          <Nav>
            <NavDropdown
              className="text-center"
              title={
                <div className="imgdropdowns">
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
                  {/* <MdArrowDropDown style={{ color: "black" }} size={20} /> */}
                </div>
              }
              id="collasible-nav-dropdown"
              drop="down"
            >
              <NavDropdown.Item
                onClick={() => navigate("/updateTechnicianprofile")}
              >
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

export default NavTechnicanProfile;
