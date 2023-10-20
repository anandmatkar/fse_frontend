import React, { useContext } from 'react';
import AuthContext from '../auth-context/auth-context';
import { Dropdown, ListGroup, NavLink } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { MdArrowDropDown } from 'react-icons/md';

const NavTechnicanProfile = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const token = Cookies.get('token');

  const logoutHandler = () => {
    authCtx.logoutBtn();
    navigate('/techLogin');
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
          <Navbar.Brand href="#" as={NavLink} to="/">
            <img
              alt="Profile Avatar"
              src="/assets/logofse.png"
              width={100}
              className="d-inline-block align-top "
            />
          </Navbar.Brand>
          <div>
            <ListGroup horizontal>
              <span style={{}} className="h1 mt-3 text-dark fs-3">
                Technician : {Cookies.get('Name') || 'FSE'}
              </span>
              <ListGroup.Item
                className="border border-0 "
                style={{ background: 'none' }}
              >
                <Dropdown className="imgdropdowns " drop="start">
                  <Dropdown.Toggle as={CustomToggle} variant="secondary">
                    {/* Get avatar from localStorage and set as src */}
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
                        height: '50px',
                      }}
                    />
                    <MdArrowDropDown style={{ color: 'black' }} size={20} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => navigate('/updateTechnicianprofile')}
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
        </Container>
      </Navbar>
    </React.Fragment>
  );
};

export default NavTechnicanProfile;
