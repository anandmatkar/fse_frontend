import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import AuthContext from "../../auth-context/auth-context";
// import Form from "react-bootstrap/Form";
// import FormLabel from "react-bootstrap/esm/FormLabel";
// import FormControl from "react-bootstrap/FormControl";
// import FormGroup from "react-bootstrap/esm/FormGroup";
// import Button from "react-bootstrap/Button";
// import classes from './Registration.module.css'
import LayoutTech from "../../Layout/Layout3";
import { Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import axios from 'axios'
import { managerlogin_Api } from "../../../Api/Manager_Api";

const RegistrationPage = () => {
  const authCtx = useContext(AuthContext);
  const Navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const firstnameRef = useRef();
  const lastNameRef = useRef();
  const comapanyRef = useRef();
  const qualificationRef = useRef();
  const experienceRef = useRef();
  // const mobileNumberRef = useRef();
  const Position = useRef();
  const confirmPasswordRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // const [data,setData] = useState([])

  // const switchAuthModeHandler = () => {
  //   setIsLogin((prevState) => !prevState);
  // };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredPassword = passwordInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;

    // const firstnames = firstnameRef.current.value;
    // const enteredFirstname = firstnameRef.current.value;
    const confirmPasswords = confirmPasswordRef.current.value;
    const selectedPosition = Position.current.value;
    const enteredFirstname = firstnameRef.current.value;
    const enteredLastname = lastNameRef.current.value;
    const enterComapny = comapanyRef.current.value;
    const entereQualification = qualificationRef.current.value;
    const enteredExperience = experienceRef.current.value;
    // const enteredMobile = mobileNumberRef.current.value;
    console.log(selectedPosition);

    // const confirmPasswords = confirmPassword.current.value;
    localStorage.setItem("enteredEmail", JSON.stringify(enteredEmail));
    localStorage.setItem("enteredFirstname", JSON.stringify(enteredFirstname));
    localStorage.setItem("enteredLastname", JSON.stringify(enteredLastname));
    // localStorage.setItem("enteredMobile", JSON.stringify(enteredMobile));
    const RegistrationData = {
      email: enteredEmail,
      password: enteredPassword,
      confirmPass: confirmPasswords,
      returnSecureToken: true,
    }

   
    try {
  const registrationResponse = await axios.post(
   managerlogin_Api,
    RegistrationData
  )
     // Assuming your API returns a token, use it for authentication
     const token = registrationResponse.data.token;

       // Create the manager data
       const managerResponse = await axios.post(
        "http://localhost:3003/api/v1/manager/createManager",
       
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the headers
          },
        }

        );

        
      // Handle success of both registration and manager creation
      const expireTokenTime = new Date(
        new Date().getTime() + +registrationResponse.data.expiresIn * 60 * 60
      );

      authCtx.login(token, expireTokenTime.toISOString());
      Navigate("/manager");
  
} catch (error) {
  // Handle errors here
  console.error("API Error:", error);
  // You can show an error message to the user if needed.
<error>Alert!</error>
}
}
   

  return(
  <LayoutTech>
  <section className="vh-100" style={{ backgroundColor: 'white' }}>
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col col-xl-10">
          <div className="card" style={{ borderRadius: '1rem' }}>
            <div className="row g-0">
              <div className="col-md-6 col-lg-5 d-none d-md-block">
                <img
                  src="https://img.freepik.com/free-vector/industrial-city-concept-with-chemical-plants_1284-11527.jpg?w=740&t=st=1686047150~exp=1686047750~hmac=76eb75f72ca4c93a1c395b6a5f440b78df6b725091b020de6723dedac1fd2ead"
                  alt="login form"
                  className="img-fluid"
                  style={{ borderRadius: '1rem 0 0 1rem' }}
                />
              </div>
              <div className="col-md-6 col-lg-7 d-flex align-items-center">
                <div className="card-body p-4 p-lg-5 text-black">
                  <form>
                    <div className="d-flex align-items-center mb-3 pb-1">
                      <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                      <span className="h1 fw-bold mb-0">Logo</span>
                    </div>
                    <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                      Register an account
                    </h5>
                    <div className="row mb-4">
                      <div className="col">
                        <div className="form-outline">
                          <input type="text" id="firstName" className="form-control form-control-lg" ref={firstnameRef} />
                          <label className="form-label" htmlFor="firstName">
                            First Name
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-outline">
                          <input type="text" id="lastName" className="form-control form-control-lg" ref={lastNameRef} />
                          <label className="form-label" htmlFor="lastName">
                            Last Name
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="form-outline mb-4">
                      <input type="text" id="company" className="form-control form-control-lg" ref={comapanyRef} />
                      <label className="form-label" htmlFor="company">
                        Company
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <input type="text" id="company" className="form-control form-control-lg" ref={qualificationRef} />
                      <label className="form-label" htmlFor="company">
                        Qualification
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <input type="text" id="company" className="form-control form-control-lg" ref={experienceRef} />
                      <label className="form-label" htmlFor="company">
                        Experience
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <select id="position" className="form-select form-select-lg" defaultValue="" ref={Position}>
                        <option value="" disabled>Select Position</option>
                        <option value="position1">Admin</option>
                        <option value="position3">Manager</option>
                        <option value="position2">Technician</option>
                      </select>
                      <label className="form-label" htmlFor="position">
                        Position
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <input type="email" id="email" className="form-control form-control-lg" ref={emailInputRef} />
                      <label className="form-label" htmlFor="email">
                        Email address
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <input type="password" id="password" className="form-control form-control-lg" ref={passwordInputRef}/>
                      <label className="form-label" htmlFor="password">
                        Password
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <input type="password" id="confirmPassword" className="form-control form-control-lg" ref={confirmPasswordRef} />
                      <label className="form-label" htmlFor="confirmPassword">
                        Confirm Password
                      </label>
                    </div>
                    <div className="pt-1 mb-4">
                      <button className="btn btn-dark btn-lg btn-block" type="button" onClick={submitHandler}>
                        Register
                      </button>
                    </div>
                    <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                      Already have an account? <Link to={"/mangerLogin"} style={{ color: '#393f81' }}>
                        Sign in here
                      </Link>
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
  </section>
</LayoutTech>
  );
};
export default RegistrationPage;
