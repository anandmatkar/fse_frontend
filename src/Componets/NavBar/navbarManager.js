import React, { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, Link } from "react-router-dom";
import AuthContext from "../auth-context/auth-context";
import "./ManagerNavBar.css";

function ManagerNavigation() {
  
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isIconClicked, setIconClicked] = useState(false);
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  useEffect(() => {
    const storedProfilePhoto = localStorage.getItem("profilePhoto");
    if (storedProfilePhoto) {
      setProfilePhoto(storedProfilePhoto);
    }
  }, [profilePhoto]);

  const onChangePhotoClickHandler = () => {
    setIconClicked(true);
  };

  const onChangeProfilePhotoUpLoad = (event) => {
    const file = event.target.files[0];
    setProfilePhoto(URL.createObjectURL(file));
    setIconClicked(false);
    localStorage.setItem("profilePhoto", URL.createObjectURL(file));
  };

  const logoutHandler = () => {
    console.log("Logout SucessFull");
    authCtx.logout();
  };

  return (
    <Navbar bg="light" expand="lg" className="navbar-container">
      <Container fluid>
        <Navbar.Brand>FSE Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {isLoggedIn && (
              <Nav.Link>
                <Link to={"/"}>Home</Link>
              </Nav.Link>
            )}
            {isLoggedIn && (
              <Nav.Link>
                <Link to={"/service"}>About</Link>
              </Nav.Link>
            )}
            {isLoggedIn && (
              <Nav.Link>
                <Link to={"/"}>About</Link>
              </Nav.Link>
            )}
            {!isLoggedIn && (
              <NavDropdown title="Login" id="navbarScrollingDropdown">
                <NavDropdown.Item>
                  <Link to={"/admin"}>Admin Login</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />

                <NavDropdown.Item>
                  <Link to={"/manager"}>Manager Login</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />

                <NavDropdown.Item>
                  <Link to={"/tech"}>Teachnician Login</Link>
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <Nav.Link >
              Link
            </Nav.Link>
          </Nav>
          {isLoggedIn && (
            <Button
            onClick={logoutHandler}
            variant="danger"
            className="navba"
            style={{ margin: "10px" }}
          >
            Logout
          </Button>
          
          )}
          {isLoggedIn && (
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          )}
        </Navbar.Collapse>
      </Container>
      <Nav className="navbar-right">
        <Navbar.Text>
          Signed in as: <span>Shubham Goswami</span>
        </Navbar.Text>
        <div className="profile-photo-container">
          {isIconClicked && (
            <input
              type="file"
              accept="image/*"
              onChange={onChangeProfilePhotoUpLoad}
            />
            )} 
        </div>
      </Nav>
    </Navbar>
  );
}

export default ManagerNavigation;

