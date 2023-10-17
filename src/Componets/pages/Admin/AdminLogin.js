import React, { useRef, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../auth-context/auth-context";
import Layout from "../../Layout/Layout";
import axios from "axios";
import "./Admin.css"
import {CgProfile} from 'react-icons/cg'
import { Link } from "react-router-dom";
import AdminNavBar from "../../NavBar/AdminNavBar";
import { Container } from "react-bootstrap";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Base_Url } from "../../../Api/Base_Url";
import Cookies from "js-cookie";
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

function AdminLogin() {
  
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

    const togglePasswordVisibility = () => {
      setPasswordVisibility((prevState) => !prevState);
    };

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };
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
    localStorage.setItem("enteredEmail", JSON.stringify(enteredEmail));


    if (!enteredEmail) {
      setEmailError("Please provide an email.");
      return;
  }

  // 2. Validate email format
  if (!isValidEmail(enteredEmail)) {
      setEmailError("Invalid email format");
      return;
  } else {
      setEmailError(null);
  }

  // 3. Check if password is filled out
  if (!enteredPassword) {
      setPasswordError("Please provide a password.");
      return;
  } else {
      setPasswordError(null);
  }
    try {
      const response = await axios.post(
        `${Base_Url}api/v1/companyAdmin/adminLogin`,
        {
          email: enteredEmail,
          password: enteredPassword,
        }
      );

      if (response.status !== 200) {
                throw new Error("Authentication failed");
            }
            const data = response.data;
            const idToken = data.data.token;
            toast.success("Login successfull!");
            
            // Save the token in cookies
            const expirationTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
            console.log(new Date(Date.now()) ,expirationTime);
            Cookies.set('token', idToken, { expires: expirationTime });
            Cookies.set('role', data.data.role);

            authCtx.login(idToken, expirationTime.toISOString());
            navigate("/AdminD");
        } catch (error) {
            console.log(error.message);
            toast.error("Incorrect email or password. Please try again.");
        }
    };
  return (
    <React.Fragment>
    <AdminNavBar />
    <Container className="container-xxl py-3 admin-login">
        <div className="row main-content text-center">
            {/* Logo & Company Info */}
            <div className="col-md-4 col-xs-12 col-sm-12 text-center company__info">
                <span className="company__logo">
                    <h2><CgProfile size={150} style={{ color:"black"}}/></h2>
                </span>
                <h5 className="company_title">Enter Your Details And Start Journey With Us</h5>
            </div>
            {/* Login Form */}
            <div className="col-md-8 col-xs-12 col-sm-12 login_form">
                <h2 style={{fontSize:"40px" , fontWeight:"500"}}>Admin Login</h2>
                <form className="form-group">
                    <h3 className="AdminloginForm__heading">Sign In</h3>
                    <p className="AdminloginForm__text">Or Use Your Account</p>
                    <input type="email" placeholder="Email" className="form__input" ref={emailInputRef} />
                    {emailError && <p className="error-text">{emailError}</p>}
                    <div className="password-container">
                     <input   type={isPasswordVisible ? "text" : "password"}    placeholder="Password"  className="form__input" 
                     ref={passwordInputRef}  />
                    <span onClick={togglePasswordVisibility} className="password-icon">
                        {isPasswordVisible ? <BsFillEyeFill />:<BsFillEyeSlashFill />  }
                    </span>
                    </div>
                    {passwordError && <p className="error-text">{passwordError}</p>}
                   
                    <button type="submit" className="btn" onClick={submitHandler}>Sign In</button>
                  
                </form>
            </div>
        </div>
    </Container>
</React.Fragment>

  );
}

export default AdminLogin;