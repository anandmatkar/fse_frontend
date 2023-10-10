import React, { useContext } from 'react';
import { Dropdown, Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import AuthContext from '../auth-context/auth-context';

const NavbarManagerDashboard = () => {
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);

    const logoutHandler = () => {
        Cookies.remove('token');
        navigate('/mangerLogin');
        authCtx.logout();
    };

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
                        <img
                            alt=""
                            src="/assets/logofse.png"
                            width={100}
                            className="d-inline-block align-top me-3"
                        />
                        <span style={{ position: 'relative', top: '7px' }} className="h1 m-0">
                            FSE
                        </span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Dropdown className="imgdropdown">
                                <Dropdown.Toggle as={CustomToggle}>
                                    {/* Replace with manager profile picture if available */}
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpFdo7jMQ4ZhDD1zqDdGGW0HjKNbV4iiOniQ&usqp=CAU"
                                        alt="Profile"
                                        style={{ width: '60px', borderRadius: '50%', height: '50px' }}
                                    />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {/* Adjust navigation path as per requirement */}
                                    <Dropdown.Item onClick={() => navigate("/ShowManagerProfile")}>Show Profile</Dropdown.Item>
                                    <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </React.Fragment>
    );
}

export default NavbarManagerDashboard;
