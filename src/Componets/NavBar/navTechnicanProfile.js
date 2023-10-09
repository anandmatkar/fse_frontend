import React, {useContext} from 'react'
import AuthContext from "../auth-context/auth-context";
import { Dropdown, NavLink } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import {  useNavigate , Navigate} from "react-router-dom";
import Cookies from "js-cookie";

const NavTechnicanProfile = () => {
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

const token = Cookies.get('token')
// console.log(token,"token")
    const logoutHandler = () => {
      Cookies.remove('token')
      localStorage.removeItem('Name');
      localStorage.removeItem('Profile');
      navigate('/techLogin')
      console.log("Logout SucessFull");
    }
    
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {children}
        </a>
    ));
  return (
    <React.Fragment>
    <Navbar expand="lg" className="main-nav-bar">
        <Container>
            <Navbar.Brand href="#home">
                {/* Get avatar from localStorage and set as src */}
                {/* <img
                    alt="Profile Avatar"
                    src={localStorage.getItem('Profile') || "/assets/logofse.png"} // If avatar is not present, use default
                    width={100}
                    className="d-inline-block align-top me-3"
                />{' '} */}
                <span style={{ position: "relative", top: "7px" }} className="h3 m-0">
                    {/* Get user name from localStorage */}
                    {localStorage.getItem('Name') || "FSE"} 
                </span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                <Dropdown className="imgdropdown">
                    <Dropdown.Toggle as={CustomToggle}>
                        {/* Get avatar from localStorage and set as src */}
                        <img src={localStorage.getItem('Profile') || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpFdo7jMQ4ZhDD1zqDdGGW0HjKNbV4iiOniQ&usqp=CAU"} 
                             alt="Profile" 
                             style={{ width: '60px', borderRadius: '50%' }} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => navigate("/updateTechnicianprofile")}>Show Profile</Dropdown.Item>
                        <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
</React.Fragment>


  )
}

export default NavTechnicanProfile