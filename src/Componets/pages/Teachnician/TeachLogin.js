import React from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../auth-context/auth-context";
import { useState, useRef, useContext } from "react";
import Layout from "../../Layout/Layout";
import Cookies from 'js-cookie';
import LayoutTech from "../../Layout/Layout3";
// import Layout from "../../Layout/Layout";
import axios from "axios";
import './Techlogin.css'

function TechnicianLogin() {
  const style = {
    // height:"100vh",
    marginTop:"90px",
    color: "#3a3e42 !important"
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
      axios
        .post("http://localhost:3003/api/v1/technician/techLogin", {
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        })
        .then((response) => {
          setIsLoading(false);
          console.log(response.data,'response data');
          if (response.data.status == 200) {
            console.log("flag 0")
            const data = response.data.data;
            console.log(data,'data')
            if (data.token ) {
              console.log('flag 1')
              const currentTime = new Date().getTime();
              //const expirationTime =
                //currentTime + parseInt(data.expiresIn) * 60 * 60 * 1000;
              // Convert to milliseconds
              // Save the token and expiration time in localStorage
              localStorage.setItem("token", data.token);
              //localStorage.setItem("tokenExpiration", expirationTime);
console.log('flag 2')
              authCtx.login(
                data.token
             
              );
              navigate("/techD");
              console.log(data.token, "token");
              console.log(response);
            } else {
              throw new Error("Invalid response from the server");
            }
          } else if (response.data.status === 401) {
            // Handle the 401 Unauthorized response here
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
                                    <a className="small text-muted" href="#!">
                                        Forgot password?
                                    </a>
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

                                                                              

//when connected to backend component should be like this
// import { useState } from 'react'
// import { useNavigate } from "react-router-dom";

// function TeachnicianLogin() {
// 	const [email, setEmail] = useState('')
// 	const [password, setPassword] = useState('')
//   //and others

//   const navigate = useNavigate()

// 	async function loginUser(event) {
// 		event.preventDefault()

// 		const response = await fetch('http://localhost:1337/api/login', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify({
// 				email,
// 				password,
// 			}),
// 		})

// 		const data = await response.json()

// 		if (data.user) {
// 			localStorage.setItem('token', data.user)
// 			alert('Login successful')
// 			navigate('/dashboard')
// 		} else {
// 			alert('Please check your username and password')
// 		}
// 	}





// {/* <section className="vh-100" style={{ backgroundColor: "white" }}>
// <div className="container py-5 h-100">
//   <div className="row d-flex justify-content-center align-items-center h-100">
//     <div className="col col-xl-10">
//       <div className="card" style={{ borderRadius: "1rem" }}>
//         <div className="row g-0">
//           <div className="col-md-6 col-lg-5 d-none d-md-block">
//             <img
//               src="https://img.freepik.com/free-vector/industrial-city-concept-with-chemical-plants_1284-11527.jpg?w=740&t=st=1686047150~exp=1686047750~hmac=76eb75f72ca4c93a1c395b6a5f440b78df6b725091b020de6723dedac1fd2ead"
//               alt="login form"
//               className="img-fluid"
//               style={{ borderRadius: "1rem 0 0 1rem" }}
//             />
//           </div>
//           <div className="col-md-6 col-lg-7 d-flex align-items-center">
//             <div className="card-body p-4 p-lg-5 text-black">
//               <form>
//                 <div className="d-flex align-items-center mb-3 pb-1">
//                   <i
//                     className="fas fa-cubes fa-2x me-3"
//                     style={{ color: "#ff6219" }}
//                   ></i>
//                   <span className="h1 fw-bold mb-0">
//                     Technician Login
//                   </span>
//                 </div>
//                 <h5
//                   className="fw-normal mb-3 pb-3"
//                   style={{ letterSpacing: "1px" }}
//                 >
//                   Sign into your account
//                 </h5>
//                 <div className="form-outline mb-4">
//                   <input
//                     type="email"
//                     id="form2Example17"
//                     className="form-control form-control-lg"
//                     ref={emailInputRef}
//                   />
//                   <label
//                     className="form-label"
//                     htmlFor="form2Example17"
//                   >
//                     Email address
//                   </label>
//                 </div>
//                 <div className="form-outline mb-4">
//                   <input
//                     type="password"
//                     id="form2Example27"
//                     className="form-control form-control-lg"
//                     ref={passwordInputRef}
//                   />
//                   <label
//                     className="form-label"
//                     htmlFor="form2Example27"
//                   >
//                     Password
//                   </label>
//                 </div>
//                 <div className="pt-1 mb-4">
//                   <button
//                     className="btn btn-dark btn-lg btn-block"
//                     type="button"
//                     onClick={submitHandler}
//                   >
//                     Login
//                   </button>
//                 </div>
//                 <a className="small text-muted" href="#!">
//                   Forgot password?
//                 </a>
//                 {/* <p
//                   className="mb-5 pb-lg-2"
//                   style={{ color: "#393f81" }}
//                 >
//                   Don't have an account?{" "}
                
//                 </p> */}
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
// </section> */}