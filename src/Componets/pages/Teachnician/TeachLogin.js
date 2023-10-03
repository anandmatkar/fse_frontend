import React from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../auth-context/auth-context";
import { useState, useRef, useContext } from "react";
import Layout from "../../Layout/Layout";
import Cookies from 'js-cookie';
import LayoutTech from "../../Layout/Layout3";
import { Link } from "react-router-dom";
import axios from "axios";
import './Techlogin.css'
function TechnicianLogin() {
  const style = {
    // height:"100vh",
    marginTop:"90px",
    color: "#3A3E42 !important"
  }
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  // const confirmpasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // const buttonLoginHandler = () => {
  //   console.log("button clicked");
  //   navigate("/register");
  // };
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    localStorage.setItem("enteredEmail", JSON.stringify(enteredEmail));
    // optional: Add validation
    setIsLoading(true);
    if (isLogin) {
      axios.post("http://localhost:3003/api/v1/technician/techLogin", {
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      })
      .then((response) => {
        setIsLoading(false);
        console.log(response.data, 'response data');
        if (response.data.status === 200) {
          const data = response.data.data;
          if (data.token) {
            // Save the token in cookies
            Cookies.set('token', data.token, { expires: 2 }); // Setting expiry to 2 days
            authCtx.login(data.token);
            navigate("/techD");
          } else {
            throw new Error("Invalid response from the server");
          }
        } else if (response.data.status === 401) {
          throw new Error("Incorrect email or password. Please try again.");
        } else {
          throw new Error("Authentication failed!");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        alert(err.message);
      });
    } else {
      axios
        .post("http://localhost:3003/api/v1/technician/techLogin", {
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            //   confirmPass: enteredConfirmPass,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setIsLoading(false);
          console.log(res);
          if (res.ok) {
            return res.json();
          } else if (res.status === 401) {
            throw new Error("Incorrect password. Please try again.");
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication failed!";
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          const expireTokentime = new Date(
            new Date().getTime() + +data.expiresIn * 60 * 60
          );
          authCtx.login(data.idToken, expireTokentime.toISOString());
          navigate("/techD");
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };
  return (
    <LayoutTech>
      <div style={style}>
      <div class="container h-100">
    <div class="row h-100 justify-content-center align-items-center">
        <form class="col-md-9">
            <div class="AppForm shadow-lg">
                <div class="row">
                    <div class="col-md-6 d-flex justify-content-center align-items-center">
                        <div class="AppFormLeft">
                            <h1>Technician Login</h1>
                            <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form2Example17">
                                    Email address
                                </label>
                                <i class="fa fa-user-o"></i>
                                <input
                                    type="email"
                                    id="form2Example17"
                                    className="form-control form-control-lg border-top-0 border-right-0 border-left-0 rounded-0 shadow-none"
                                    placeholder="Email address"
                                    ref={emailInputRef}
                                />
                            </div>
                            <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form2Example27">
                                    Password
                                </label>
                                <i class="fa fa-key"></i>
                                <input
                                    type="password"
                                    id="form2Example27"
                                    className="form-control form-control-lg border-top-0 border-right-0 border-left-0 rounded-0 shadow-none"
                                    placeholder="Password"
                                    ref={passwordInputRef}
                                />
                            </div>
                            <div class="row mt-4 mb-4">
                                <div class="col-md-6">
                                    <div class="form-check">
                                        <label class="form-check-label" for="defaultCheck1">
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-6 text-right">
                               <Link to="/TechnicianForgotPassword" className="small text-muted">
                                     Forgot password?
                               </Link>
                                </div>
                            </div>
                            <div className="pt-1 mb-4">
                                <button
                                    className="btn btn-success btn-block shadow border-0 py-2 text-uppercase"
                                    type="button"
                                    onClick={submitHandler}
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="AppFormRight position-relative d-flex justify-content-center flex-column align-items-center text-center p-5 text-white">
                            <h2 class="position-relative px-4 pb-3 mb-4">Welcome Technician</h2>
                            <p>Technology is best when it brings peoples together!</p>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
</div>
    </LayoutTech>
  );
}
export default TechnicianLogin;