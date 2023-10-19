import React, { useState, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import AuthContext from '../../auth-context/auth-context';
import Cookies from 'js-cookie';
import Navbar from '../../NavBar/navbarManager';
import { managerlogin_Api } from './../../../Api/Manager_Api';
import Spinner from '../Common/Spinner';
import { CgProfile } from 'react-icons/cg';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
// import '../Admin/Admin.css';

function ManagerLogin() {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prevState) => !prevState);
  };

  const validateEmail = (email) => {
    const validEmail = /\S+@\S+\.\S+/;
    return validEmail.test(email);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setEmailError('');
    setPasswordError('');

    if (enteredEmail.trim() === '') {
      setEmailError('Email is required.');
    } else if (!validateEmail(enteredEmail)) {
      setEmailError('Please enter a valid email.');
    }

    if (enteredPassword.trim() === '') {
      setPasswordError('Password is required.');
    }

    if (emailError || passwordError) {
      return;
    }

    setIsLoading(true);

    const body = {
      email: enteredEmail,
      password: enteredPassword,
    };

    try {
      const response = await axios.post(managerlogin_Api, body);

      if (response.data.status === 200) {
        setIsLoading(false);
        const { token, role, name, avatar } = response.data.data;
        const currentTime = new Date().getTime();
        const expirationTime = new Date(currentTime + 1 * 60 * 60 * 1000); // 60 minutes in milliseconds

        // Convert expirationTime to milliseconds
        const expirationTimeInMilliseconds = expirationTime.getTime();

        authCtx.login(token, expirationTimeInMilliseconds, role, name, avatar);
        navigate('/manager');

        toast.success(response.data.message, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          onClose: () => {
            setIsLoading(false);
          },
        });
      } else {
        toast.error(response.data.message, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          onClose: () => {
            setIsLoading(false);
          },
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClose: () => {
          setIsLoading(false);
        },
      });
    }
  };

  return (
    <>
      <Navbar />
      {isLoading ? (
        <Spinner />
      ) : (
        <Container className="container-xxl py-3 admin-login">
          <div className="row main-content text-center">
            <div className="col-md-4 col-xs-12 col-sm-12 p-2 text-center company__info">
              <span className="company__logo">
                <h2>
                  <CgProfile size={150} style={{ color: 'black' }} />
                </h2>
              </span>
              <h5 className="company_title">
                Enter Your Details And Start Your Journey With Us
              </h5>
            </div>
            <div className="col-md-8 col-xs-12 col-sm-12 login_form">
              <h2 style={{ fontSize: '40px', fontWeight: '500' }}>
                Manager Login
              </h2>
              <form className="form-group">
                <h3 className="AdminloginForm__heading">Sign In</h3>
                <p className="AdminloginForm__text">Or Use Your Account</p>
                <div>
                  <input
                    type="email"
                    id="form2Example17"
                    className="form-control form-control-lg mt-3"
                    ref={emailInputRef}
                    placeholder="Email"
                  />
                  {emailError && (
                    <span className="error" style={{ color: 'red' }}>
                      {emailError}
                    </span>
                  )}
                  <div className="password-container">
                    <input
                      type={isPasswordVisible ? 'text' : 'password'}
                      id="form2Example27"
                      className="form-control form-control-lg mt-3"
                      ref={passwordInputRef}
                      placeholder="Password"
                    />
                    <span
                      onClick={togglePasswordVisibility}
                      className="password-icon"
                    >
                      {isPasswordVisible ? (
                        <BsFillEyeFill />
                      ) : (
                        <BsFillEyeSlashFill />
                      )}
                    </span>
                  </div>
                  {passwordError && (
                    <span className="error" style={{ color: 'red' }}>
                      {passwordError}
                    </span>
                  )}
                </div>
                <button
                  className="btn btn-dark btn-lg btn-block"
                  type="submit"
                  onClick={submitHandler}
                >
                  Sign In
                </button>
                <div className="float-start">
                  <Link to="/reset" className="float-start">
                    Forgot password?
                  </Link>
                  <br />
                  Don't have an account?{' '}
                  <Link to="/register">Create Account</Link>
                </div>
              </form>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

export default ManagerLogin;
