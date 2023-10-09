import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../auth-context/auth-context';
import { useState, useRef, useContext } from 'react';
import axios from 'axios';
import Spinner from '../Common/Spinner';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import Navbar from '../../NavBar/navbarManager';
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
  // const buttonHandler = () => {
  //   Navigate('/register');
  //   Navigate('/newaccount');
  // };
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
    <>
      <Navbar />
      <div
        className="container con1 rounded border  border-dark"
        style={{ marginTop: '10px' }}
      >
        <div className="row">
          <div
            className="col col-sm-12 col-md-6 col-12 text-center"
            style={{ marginTop: '75px' }}
          >
            <h1>Manager Login</h1>
            <img
              src="/assets/manager.svg"
              alt="Manager Login"
              style={{ width: '450px' }}
            />
          </div>
          <div
            className="col col-sm-12 col-md-6 col-12"
            style={{ marginTop: '30px' }}
          >
            <div className="card d-flex border-0 p-5">
              <div className="card-body">
                {isLoading ? (
                  <Spinner />
                ) : (
                  <form>
                    <h3>Manager Login</h3>
                    <hr />
                    <br />
                    <div className="form-group password-input-container">
                      <label htmlFor="form2Example17">Email</label>
                      <div className="input-group">
                        <input
                          type="email"
                          id="form2Example17"
                          className="form-control form-control-lg"
                          ref={emailInputRef}
                        />
                        <div className="input-group-append"></div>
                      </div>
                    </div>
                    <div className="form-group password-input-container">
                      <label htmlFor="form2Example27">Password:</label>
                      <div className="input-group">
                        <input
                          type="password"
                          id="form2Example27"
                          className="form-control form-control-lg"
                          ref={passwordInputRef}
                        />
                        <div className="input-group-append"></div>
                      </div>
                    </div>
                    <br />
                    <button
                      className="btn btn-dark btn-lg btn-block"
                      type="submit"
                      onClick={submitHandler}
                    >
                      Login
                    </button>{' '}
                    <br />
                    <br />
                    <Link to="/reset">Forgot password?</Link>
                    <br />
                    Don't have an account?{' '}
                    <Link to="/register">Create Account</Link>
                  </form>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </>
  );
}

export default ManagerLogin;
