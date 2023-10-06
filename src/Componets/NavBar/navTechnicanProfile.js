import React, {useContext} from 'react'
import AuthContext from "../auth-context/auth-context";
import { Dropdown, NavLink } from "react-bootstrap";
import {  useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const NavTechnicanProfile = () => {
    const Navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    const logoutHandler = () => {
      console.log("Logout SucessFull");
      authCtx.logout();

    }
    const handleLogout = async () => {
        const token = Cookies.get('token');
        console.log("Token from cookies:", token);
    
        try {
            const response = await fetch("http://localhost:3003/api/v1/technician/techLogout", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
    
            const responseData = await response.json(); // assuming server responds with json
            console.log("Server Response:", responseData);
    
            if (response.ok) {
                Cookies.remove('token');
                Navigate("/techlogin");
                console.log("successfully logout");
            } else {
                console.log("Logout failed.");
            }
        } catch (error) {
            console.error("There was an error logging out", error);
        }
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
    <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      {/* <!-- Logo --> */}
      <a class="navbar-brand" href="#">
        {/* <img src="https://preview.webpixels.io/web/img/logos/clever-light.svg" class="" alt="..."/> */}
        <h1 style={{marginBottom:"0px"}}>User Login</h1>
      </a>
      {/* <!-- Navbar toggle --> */}
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      {/* <!-- Collapse --> */}
      <div class="collapse navbar-collapse" id="navbarCollapse">
        {/* <!-- Nav --> */}
        <div class="navbar-nav mx-lg-auto">
          {/* <a class="nav-item nav-link active" href="#" aria-current="page">Home</a>
          <a class="nav-item nav-link" href="#">Product</a> */}
          {/* <a class="nav-item nav-link" href="#">Features</a>
          <a class="nav-item nav-link" href="#">Pricing</a> */}
        </div>
        {/* <!-- Right navigation --> */}
        <div class="navbar-nav ms-lg-4">
         {/* Add Dropdown here */}
         <Dropdown className="imgdropdown">
                                <Dropdown.Toggle as={CustomToggle}>
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpFdo7jMQ4ZhDD1zqDdGGW0HjKNbV4iiOniQ&usqp=CAU" alt="Profile" style={{ width: '60px', borderRadius: '50%' }} />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item as={NavLink} to="/updateTechnicianprofile">Show Profile</Dropdown.Item>
                                    <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
        </div>
        {/* <!-- Action --> */}
        <div class="d-flex align-items-lg-center mt-3 mt-lg-0">
          {/* <a href="#" class="btn btn-sm btn-primary">
            Logout
          </a> */}
        </div>
      </div>
    </div>
  </nav>
  </div>
  )
}

export default NavTechnicanProfile