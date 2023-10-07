import { useContext } from "react";
// import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import { NavLink, Link } from "react-router-dom";
import AuthContext from "../auth-context/auth-context";

function TechNavigation() {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    const logoutHandler = () => {
      console.log("Logout SucessFull");
      authCtx.logout();

    }
  return (
    <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      {/* <!-- Logo --> */}
      <a class="navbar-brand" href="#">
        {/* <img src="https://preview.webpixels.io/web/img/logos/clever-light.svg" class="" alt="..."/> */}
        <h1 style={{marginBottom:"0px"}}>FSE report</h1>
      </a>
      {/* <!-- Navbar toggle --> */}
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      {/* <!-- Collapse --> */}
      <div class="collapse navbar-collapse" id="navbarCollapse">
        {/* <!-- Nav --> */}
        <div class="navbar-nav mx-lg-auto">
          <a class="nav-item nav-link active" href="#" aria-current="page">Home</a>
          <a class="nav-item nav-link" href="#">Product</a>
          {/* <a class="nav-item nav-link" href="#">Features</a>
          <a class="nav-item nav-link" href="#">Pricing</a> */}
        </div>
        {/* <!-- Right navigation --> */}
        <div class="navbar-nav ms-lg-4">
          {/* <a class="nav-item nav-link" href="#">Sign in</a> */}
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
  );
}

export default TechNavigation;