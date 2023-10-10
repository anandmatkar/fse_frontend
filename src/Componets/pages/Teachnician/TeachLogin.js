import React from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../auth-context/auth-context";
import { useState, useRef, useContext } from "react";
import Layout from "../../Layout/Layout";
import Cookies from 'js-cookie';
import LayoutTech from "../../Layout/Layout3";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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


  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    localStorage.setItem("enteredEmail", JSON.stringify(enteredEmail));

    setIsLoading(true);

    if (isLogin) {
        axios.post("http://3.110.86.245/api/v1/technician/techLogin", {
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
            toast.error(err.message); // Toast notification for errors
        });
    }
};

  return (
    <LayoutTech>
     <div style={style}>
      <div className="loginContainer go-register">
        {/* <!-- Login Form Starts --> */}
        <div className="loginForm__container loginForm__container-login">
            <h1 className="loginForm__heading">Technician Login</h1>
            <form action="" className="loginForm">
                <h3 className="loginForm__heading">Sign In</h3>
                <p className="loginForm__text">Or Use Your Account</p>
                <input type="Email" placeholder="Email" className="loginForm__field" ref={emailInputRef}/>
                <input type="Password" placeholder="Password" className="loginForm__field" ref={passwordInputRef}/>
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
        <div className="loginOverlay-container">
            {/* <!-- Right Overlay Starts --> */}
            <div className="loginOverlay loginOverlay--right">
                <img src='https://img.freepik.com/premium-photo/cute-happy-male-teacher-white-background-ai-generated_971652-235.jpg?size=626&ext=jpg&ga=GA1.1.1085728591.1696533906&semt=ais' alt='' height={250} width={200} style={{borderRadius:"50%"}}/>
                <h3 className="loginOverlay__heading">Hello Technician</h3>
                <p className="loginOverlay__desc">Enter Your Details And Start Journey With Us</p>
            </div>           
        </div>
      </div>
    </div>
    </LayoutTech>
  );
}
export default TechnicianLogin;


