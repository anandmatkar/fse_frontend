import React, {useContext} from 'react'
import AuthContext from "../auth-context/auth-context";
import { Dropdown, ListGroup, ListGroupItem, NavLink } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import {  useNavigate , Navigate} from "react-router-dom";
import Cookies from "js-cookie";
import { MdArrowDropDownCircle , MdArrowDropDown} from 'react-icons/md';

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
            <Navbar.Brand href="#" as={NavLink} to="/">
                {/* Get avatar from localStorage and set as src */}
                {/* <img
                    alt="Profile Avatar"
                    src={localStorage.getItem('Profile') || "/assets/logofse.png"} // If avatar is not present, use default
                    width={100}
                    className="d-inline-block align-top me-3"
                />{' '} */}
                 <img
              alt="Profile Avatar"
              src="/assets/logofse.png"   width={100} className="d-inline-block align-top " />
               
            </Navbar.Brand>
            <div>
                <ListGroup horizontal>
 <span style={{ }} className="h1 mt-3 text-light fs-3">
                    {localStorage.getItem('Name') || "FSE"} 
                </span>
                <ListGroup.Item className="border-0"
                style={{ background: 'none' }}
              >
                 <Dropdown className="imgdropdowns " drop="start">
                    <Dropdown.Toggle as={CustomToggle}  variant="secondary">
                        {/* Get avatar from localStorage and set as src */}
                        <img src={localStorage.getItem('Profile') || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpFdo7jMQ4ZhDD1zqDdGGW0HjKNbV4iiOniQ&usqp=CAU"} 
                             alt="Profile" 
                             style={{ width: '60px', borderRadius: '50%' , height:"50px"}} />
                             <MdArrowDropDown style={{color:"black"}} size={20}/>
                              {/* <MdArrowDropDownCircle
                      color="white"
                      className="border border-0 fs-4"
                    /> */}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => navigate("/updateTechnicianprofile")}>Show Profile</Dropdown.Item>
                        <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                    </ListGroup.Item>
                    </ListGroup>
                    </div>
        </Container>
    </Navbar>
</React.Fragment>


  )
}

export default NavTechnicanProfile