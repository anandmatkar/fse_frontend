import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, Link } from "react-router-dom";
import AuthContext from "../auth-context/auth-context";

function TechNavigation() {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    const logoutHandler = () => {
      console.log("Logout SucessFull");
      authCtx.logout();

    }
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand>FSE Report</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {isLoggedIn &&    <Nav.Link>
              <Link to={"/"}>Home</Link>
            </Nav.Link>}
            {isLoggedIn && <Nav.Link>
                <Link to={"/service"}>About</Link>
              </Nav.Link>}
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
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          {isLoggedIn &&  <Button onClick={logoutHandler} variant="danger">Logout</Button>}
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
    </Navbar>
  );
}

export default TechNavigation;
