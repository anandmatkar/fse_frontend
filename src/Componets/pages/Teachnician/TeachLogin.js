import React from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../auth-context/auth-context";
import { useState, useRef, useContext } from "react";
import Layout from "../../Layout/Layout";
import Cookies from 'js-cookie';
import {CgProfile} from 'react-icons/cg'
import LayoutTech from "../../Layout/Layout3";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Base_Url } from "../../../Api/Base_Url";
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
  const authCtx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };


  const submitHandler = (event) => {
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

    setIsLoading(true);

    if (isLogin) {
        axios.post(`${Base_Url}api/v1/technician/techLogin`, {
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
        })
        .then((response) => {
            setIsLoading(false);
            if (response.data.status === 200) {
                const data = response.data.data;
                if (data.token) {
                    Cookies.set('token', data.token, { expires: 2 });
                    localStorage.setItem('Name', data.name);
                    localStorage.setItem('Profile', data.avatar);
                    authCtx.login(data.token);
                    navigate("/techD");
                    toast.success("Login successful!"); 
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
            toast.error(err.message); 
        });
    }
};

  return (
    <LayoutTech>
    <div className="container-xxl py-3 technician-login">
        <div className="row main-content text-center">
            {/* Logo & Company Info */}
            <div className="col-md-4  col-xs-12 col-sm-12 text-center company__info">
                <span className="company__logo">
                    <h2><CgProfile size={150} style={{ color: "black" }} /></h2>
                </span>
                <h5 className="company_title"><span style={{color:"black", fontSize:"30px"}}>Hello Technician!!</span><br/><br/>Enter Your Details And Start Journey With Us</h5>
            </div>
            
            {/* Login Form */}
            <div className="col-md-8 col-xs-12 col-sm-12 login_form">
                <h2 style={{ fontSize: "40px", fontWeight: "500" }}>Technician Login</h2>
                <form className="form-group">
                    <h3 className="TechnicianloginForm__heading">Sign In</h3>
                    <p className="TechnicianloginForm__text">Or Use Your Account</p>
                    <input type="email" placeholder="Email" className="form__input" ref={emailInputRef} />
                    {emailError && <p className="error-text">{emailError}</p>}
                    <input type="password" placeholder="Password" className="form__input" ref={passwordInputRef} />
                    {passwordError && <p className="error-text">{passwordError}</p>}
                    <button type="submit" className="btn" onClick={submitHandler}>Sign In</button>
                </form>
            </div>
        </div>
    </div>
</LayoutTech>
  );
}
export default TechnicianLogin;


