import React, { useContext } from 'react';
import { Dropdown, Navbar, Nav, Container, ListGroup } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import AuthContext from '../auth-context/auth-context';
import { MdArrowDropDownCircle, MdArrowDropDown } from 'react-icons/md';

const NavbarManagerDashboard = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logoutBtn();
    // localStorage.removeItem('Name');
    // localStorage.removeItem('Profile');
    navigate('/mangerLogin');
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
      <Navbar className="main-nav-bar">
        <Container>
          <Navbar.Brand href="#" as={NavLink} to="/">
            <img
              alt="Profile Avatar"
              src="/assets/logofse.png" // If avatar is not present, use default
              width={100}
              className="d-inline-block align-top "
            />
          </Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          {/* <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          > */}
          <div>
            <ListGroup horizontal>
              <span style={{}} className="h1 mt-3 text-dark fs-4 mx-5">
                Manager : {Cookies.get('Name').toUpperCase() || 'FSE'}
              </span>
              <ListGroup.Item
                className="border-0"
                style={{ background: 'none' }}
              >
                <Dropdown className="imgdropdowns " drop="start">
                  <Dropdown.Toggle as={CustomToggle} variant="secondary">
                    <img
                      src={
                        Cookies.get('Profile') ||
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpFdo7jMQ4ZhDD1zqDdGGW0HjKNbV4iiOniQ&usqp=CAU'
                      }
                      alt="Profile"
                      className="border border-dark"
                      style={{
                        width: '60px',
                        borderRadius: '50%',
                        height: '55px',
                      }}
                    />
                     <MdArrowDropDown style={{color:"black"}} size={20}/>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => navigate('/ShowManagerProfile')}
                    >
                      Show Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={logoutHandler}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </ListGroup.Item>
            </ListGroup>
          </div>
          {/* </Navbar.Collapse> */}
        </Container>
      </Navbar>
    </React.Fragment>
  );
};

export default NavbarManagerDashboard;
