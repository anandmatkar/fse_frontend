import React, { useState } from 'react';
import './forgetPassword.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Common/Spinner';
import { toast } from 'react-toastify';
import Navbar from '../../NavBar/navbarManager';
import {
  Manager_Forget_Password,
  Reset_Password_Api,
} from './../../../Api/Manager_Api';

function Reset() {
  const navigate = useNavigate();
  const [isForgotPassword, setIsForgotPassword] = useState(true);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [emailError, setEmailError] = useState('');
  const [otpError, setOTPTError] = useState('');
  const [password, setNewPassword] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleForm = () => {
    setIsForgotPassword(!isForgotPassword);
    setIsResetPassword(false);
    setEmail('');
    setResetEmail('');
    setOTP('');
    setNewPassword('');
    setOTPTError('');
    setEmailError('');
    setResetSuccess(false);
  };

  const sendResetEmail = async () => {
    if (!email) {
      // Email is empty, display an error message or handle it as needed
      setEmailError('Email is required');
      return; // Exit the function if email is empty
    }

    if (!isValidEmail(email)) {
      // Invalid email format, display an error message or handle it as needed
      setEmailError('Invalid email format');
      return; // Exit the function if email is invalid
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        Manager_Forget_Password,
        {
          emailAddress: email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        // Handle success, you may show a message to the user
        toast.success(response.data.message, {
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

        setSubmittedEmail(email);
        setIsResetPassword(true);
      } else {
        // Handle error, display a message to the user
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
        console.error('Error sending reset email.');
      }
    } catch (error) {
      console.error('Error:', error);
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

  const resetPassword = async () => {
    console.log(otp);
    if (!otp) {
      // Email is empty, display an error message or handle it as needed
      setEmailError('Email is required');
      return; // Exit the function if email is empty
    }
    if (!isValidOTP(otp)) {
      // Invalid OTP format, display an error message
      setOTPTError('Invalid OTP format (4 digits required)');
      return;
    }

    if (!password) {
      // Password is empty, display an error message
      toast.error('Password is required', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    try {
      const response = await axios.put(
        Reset_Password_Api,
        {
          email: email,
          otp: otp,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response);
      if (response.data.status === 200) {
        // Handle success, you may show a message to the user
        toast.success(response.data.message, {
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
        setResetSuccess(true);
      } else {
        // Handle other error cases, display a generic error message
        console.error('Error resetting password.');
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
      console.error('Error:', error);
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

  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const isValidOTP = (otp) => {
    const otpPattern = /^\d{4}$/;
    return otpPattern.test(otp);
  };

  return (
    <React.Fragment>
      <Navbar />

      <div
        className="container d-flex flex-column "
        style={{ marginTop: '90px' }}
      >
        <div className="row align-items-center justify-content-center g-0 ">
          <div className="col-12 col-md-8 col-lg-4 border-top border-3 border-success ">
            <div className="card shadow-sm">
              <div className="card-body">
                {isForgotPassword && !isResetPassword && (
                  <React.Fragment>
                    <div className="mb-4">
                      <h5>Forgot Password?</h5>
                      <p className="mb-2">
                        Enter your registered email ID to reset the password
                      </p>
                    </div>
                    <form>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                          name="email"
                          placeholder="Enter Your Email"
                        />
                        {emailError && (
                          <div className="text-danger mt-2">{emailError}</div>
                        )}
                      </div>

                      <div className="mb-3 d-grid">
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={sendResetEmail}
                        >
                          {isLoading ? <Spinner /> : 'Send Reset Email'}
                        </button>
                      </div>
                    </form>
                  </React.Fragment>
                )}

                {isResetPassword && !resetSuccess && (
                  <React.Fragment>
                    <h1>Reset Your Password</h1>
                    <form>
                      <div className="mb-4">
                        <p>
                          Email: <b>{submittedEmail}</b>
                        </p>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">
                          Enter the reset code:
                        </label>
                        <input
                          type="text"
                          id="resetCode"
                          value={otp}
                          onChange={(e) => setOTP(e.target.value)}
                          className="form-control"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">
                          Enter your new password:
                        </label>
                        <input
                          type="password"
                          id="password"
                          value={password}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="form-control"
                        />
                      </div>

                      <div className="mb-3 d-grid">
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={resetPassword}
                        >
                          Reset Password
                        </button>
                      </div>
                    </form>
                  </React.Fragment>
                )}

                {resetSuccess && (
                  <div className="text-center">
                    <p>Password reset successfully!</p> You are successfully
                    reset your password.{' '}
                    <Link to="/mangerLogin">Please Login</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Reset;
