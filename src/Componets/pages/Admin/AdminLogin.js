import React, { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../auth-context/auth-context";
import Layout from "../../Layout/Layout";
import axios from "axios";
import "./Admin.css"
import { Link } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();


  const style = {
    // height:"100vh",
    marginTop:"90px",
    color: "#3A3E42 !important"
  }
  const authCtx = useContext(AuthContext);

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    try {
      const response = await axios.post(
        "http://localhost:3003/api/v1/companyAdmin/adminLogin",
        {
          email: enteredEmail,
          password: enteredPassword,
        }
      );

      if (response.status !== 200) {
        throw new Error("Authentication failed");
      }

      const data = response.data;

      // Assume you receive an 'idToken' for authentication
      const idToken = data.data.token;
      console.log(data,'data')

      // You can set an arbitrary expiration time (e.g., 1 hour from now)
      const expirationTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
      localStorage.setItem('token',idToken)
      console.log(idToken,'id token')

      authCtx.login(idToken, expirationTime.toISOString());
      navigate("/AdminD");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Layout>
      {/* <section className="vh-100" style={{ backgroundColor: "white" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://img.freepik.com/free-vector/industrial-city-concept-with-chemical-plants_1284-11527.jpg?w=740&t=st=1686047150~exp=1686047750~hmac=76eb75f72ca4c93a1c395b6a5f440b78df6b725091b020de6723dedac1fd2ead"
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i
                            className="fas fa-cubes fa-2x me-3"
                            style={{ color: "#ff6219" }}
                          ></i>
                          <span className="h1 fw-bold mb-0">Admin Login</span> 
                        </div>
                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: "1px" }}
                        >
                          Sign into your account
                        </h5>
                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            ref={emailInputRef}
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example17"
                          >
                            Email address
                          </label>
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example27"
                            className="form-control form-control-lg"
                            ref={passwordInputRef}
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example27"
                          >
                            Password
                          </label>
                        </div>
                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="button"
                            onClick={submitHandler}
                          >
                            Login
                          </button>
                        </div>
                        <a className="small text-muted" href="#!">
                          Forgot password?
                        </a>
                        <p
                          className="mb-5 pb-lg-2"
                          style={{ color: "#393f81" }}
                        >
                          Don't have an account?{" "}
                          <a href="#!" style={{ color: "#393f81" }}>
                            Register here
                          </a>
                        </p>
                        <a href="#!" className="small text-muted">
                          Terms of use.
                        </a>
                        <a href="#!" className="small text-muted">
                          Privacy policy
                        </a>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
     <div style={style}>
      <div className="loginContainer go-register">
        {/* <!-- Login Form Starts --> */}
        <div className="loginForm__container loginForm__container-login">
            <h1 className="loginForm__heading">Admin Login</h1>
            <form action="" className="loginForm">
                <h3 className="loginForm__heading">Sign In</h3>
                <p className="loginForm__text">Or Use Your Account</p>
                <input type="email" placeholder="Email" className="loginForm__field" ref={emailInputRef}/>
                <input type="password" placeholder="Password" className="loginForm__field" ref={passwordInputRef}/>
                <div className="row mt-4 mb-4">
    
                    <div className="col-md-12">
                        <Link to="/TechnicianForgotPassword" className="text-muted">
                            Forgot password?
                        </Link>
                    </div>
                </div>
                <button type="submit" className="loginBtn loginBtn--main" onClick={submitHandler}>
                    Sign In
                </button>
            </form>
        </div>
        {/* <!-- Login Form Ends --> */}
        <div className="Admin-loginOverlay-container">
            {/* <!-- Right Overlay Starts --> */}
            <div className="loginOverlay loginOverlay--right">
                <img src='https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' alt='' height={250} width={200} style={{borderRadius:"50%"}}/>
                <h3 className="loginOverlay__heading"></h3>
                <p className="loginOverlay__desc"><h2>Start Your Journey With Us</h2></p>
            </div>           
        </div>
      </div>
    </div>

    </Layout>
  );
}

export default AdminLogin;