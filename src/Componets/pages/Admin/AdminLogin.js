import React, { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../auth-context/auth-context";
import Layout from "../../Layout/Layout";
import axios from "axios";
import "./Admin.css"
import { Link } from "react-router-dom";
import AdminNavBar from "../../NavBar/AdminNavBar";
import { Container } from "react-bootstrap";
import { Card ,Row} from "react-bootstrap";

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
    <React.Fragment>
      <AdminNavBar/>
      <Container className="container-xxl py-5">
        <Container>
        <Row xs={1} lg={3} className="g-4">

        </Row>
          <Card className="service-item rounded pt-3">
            <Card.Body>
            <h1 className="AdminloginForm__heading">Admin Login</h1>
             <form action="" className="AdminloginForm">
                 <h3 className="AdminloginForm__heading">Sign In</h3>
                 <p className="AdminloginForm__text">Or Use Your Account</p>
                 <input type="email" placeholder="Email" className="AdminloginForm__field" ref={emailInputRef} />
                 <input type="password" placeholder="Password" className="AdminloginForm__field" ref={passwordInputRef} />
                 </form>
         {/* <!-- Login Form Starts --> */}
            
    
                         <Link to="/TechnicianForgotPassword" className="Admintext-muted">
                             Forgot password?
                         </Link>
                 <button type="submit" className="AdminloginBtn loginBtn--main" onClick={submitHandler}>
                     Sign In
                 </button>
         {/* <!-- Login Form Ends --> */}
             {/* <!-- Right Overlay Starts --> */}
                 <img src='https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' alt='' height={250} width={200} style={{borderRadius:"50%"}}/>
                 <h3 className="AdminloginOverlay__heading"></h3>
                 <p className="AdminloginOverlay__desc"><h2>Start Your Journey With Us</h2></p>
            </Card.Body>

          </Card>
       
        </Container>
      
      </Container>
      

    </React.Fragment>
    // <Layout>
    
    // </Layout>
  );
}

export default AdminLogin;