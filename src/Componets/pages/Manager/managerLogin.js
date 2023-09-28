import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../auth-context/auth-context';
import { useState, useRef, useContext } from 'react';
import Layout from '../../Layout/Layout';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Spinner from '../Common/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

// import Layout from "../../Layout/Layout";
import { managerlogin_Api } from './../../../Api/Manager_Api';

function ManagerLogin() {
  const Navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  // const confirmpasswordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const buttonHandler = () => {
    Navigate('/register');
    Navigate('/newaccount');
  };
  const submitHandler = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    let body = {
      email: enteredEmail,
      password: enteredPassword,
    };
    try {
      const response = await axios.post(managerlogin_Api, body);

      if (response.data.status === 200) {
        setIsLoading(false);
        const token = response.data.data.token;
        Cookies.set('token', token, { expires: 1 });

        // Assume you receive an 'idToken' for authentication
        const idToken = response.data.data.token;
        console.log(idToken, 'data');

        // You can set an arbitrary expiration time (e.g., 1 hour from now)
        const expirationTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
        localStorage.setItem('token', idToken);
        console.log(idToken, 'id token');

        authCtx.login(idToken, expirationTime.toISOString());

        toast.success(response.data.message, {
          position: 'top-right',
          autoClose: 2000, // Notification will close automatically after 2 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          onClose: () => {
            setIsLoading(false);
            Navigate('/manager');
          },
        });
      } else {
        toast.error(response.data.message, {
          position: 'top-right',
          autoClose: 2000, // Notification will close automatically after 2 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          onClose: () => {
            setIsLoading(false); // Hide the spinner after the toast is closed
          },
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 2000, // Notification will close automatically after 2 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClose: () => {
          setIsLoading(false); // Hide the spinner after the toast is closed
        },
      });
    }
  };

  return (
    <Layout>
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
                      {isLoading ? (
                        <Spinner />
                      ) : (
                        <form>
                          <div className="d-flex align-items-center mb-3 pb-1">
                            <i
                              className="fas fa-cubes fa-2x me-3"
                              style={{ color: '#ff6219' }}
                            ></i>
                            <span className="h1 fw-bold mb-0">Manager</span>
                          </div>
                          <h5
                            className="fw-normal mb-3 pb-3"
                            style={{ letterSpacing: '1px' }}
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
                          <Link to={'/reset'} className="small text-muted">
                            Forgot password?
                          </Link>
                          <p
                            className="mb-5 pb-lg-2"
                            style={{ color: '#393f81' }}
                          >
                            Don't have an account?{' '}
                            <button
                              onClick={buttonHandler}
                              style={{ color: '#393f81' }}
                            >
                              Register here
                            </button>
                          </p>
                          <p
                            className="mb-5 pb-lg-2"
                            style={{ color: '#393f81' }}
                          >
                            New account?{' '}
                            <button
                              onClick={buttonHandler}
                              style={{ color: '#393f81' }}
                            >
                              New Account
                            </button>
                          </p>
                          <a href="#!" className="small text-muted">
                            Terms of use.
                          </a>
                          <a href="#!" className="small text-muted">
                            Privacy policy
                          </a>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </Layout>
  );
}

export default ManagerLogin;
