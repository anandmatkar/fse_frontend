import React, { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../auth-context/auth-context";
import Layout from "../../Layout/Layout";
import axios from "axios";
import "./Admin.css"
import { Link } from "react-router-dom";
import AdminNavBar from "../../NavBar/AdminNavBar";
import { Container } from "react-bootstrap";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        "http://3.110.86.245/api/v1/companyAdmin/adminLogin",
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
      toast.success("Login successful!");
      console.log(idToken,'id token')

      authCtx.login(idToken, expirationTime.toISOString());
      navigate("/AdminD");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <React.Fragment>
      <AdminNavBar/>
      <Container className="container-xxl py-5">
        <Container>
<div style={style}>
       <div className="AdminloginContainer go-register">
         {/* <!-- Login Form Starts --> */}
         <div className="AdminloginForm__container loginForm__container-login">
             <h1 className="AdminloginForm__heading">Admin Login</h1>
             <form action="" className="AdminloginForm">
                 <h3 className="AdminloginForm__heading">Sign In</h3>
                 <p className="AdminloginForm__text">Or Use Your Account</p>
                 <input type="email" placeholder="Email" className="AdminloginForm__field" ref={emailInputRef} />
                 <input type="password" placeholder="Password" className="AdminloginForm__field" ref={passwordInputRef} />
                 <div className="row mt-4 mb-4">
    
                     <div className="col-md-12">
                         <Link to="/TechnicianForgotPassword" className="Admintext-muted">
                             Forgot password?
                         </Link>
                     </div>
                 </div>
                 <button type="submit" className="AdminloginBtn loginBtn--main" onClick={submitHandler}>
                     Sign In
                 </button>
            </form>
         </div>
         {/* <!-- Login Form Ends --> */}
         <div className="Admin-loginOverlay-container">
             {/* <!-- Right Overlay Starts --> */}
             <div className="AdminloginOverlay loginOverlay--right">
                 <img src='https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' alt='' height={250} width={200} style={{borderRadius:"50%"}}/>
                 <h3 className="AdminloginOverlay__heading"></h3>
                 <p className="AdminloginOverlay__desc"><h2>Start Your Journey With Us</h2></p>
             </div>           
         </div>
       </div>
     </div>
        </Container>
      
      </Container>
      

    </React.Fragment>
    // <Layout>
    
    // </Layout>
  );
}

export default AdminLogin;