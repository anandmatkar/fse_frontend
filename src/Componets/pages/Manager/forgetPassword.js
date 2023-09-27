import React, { useRef, useState } from 'react';
import classes from './forgetPassword.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Common/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Reset() {
  const NewPassRef = useRef();
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
        'http://localhost:3003/api/v1/manager/forgotPassword',
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
        // console.log('Password reset email sent successfully!');
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
        'http://localhost:3003/api/v1/manager/resetPassword',
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
      <div className={classes.h1}>
        <h1>FSE Report</h1>
      </div>
      <div className={classes.auth}>
        {isForgotPassword && !isResetPassword && (
          <form>
            <div className={classes.control}>
              <label>Enter the email you have registered with:</label>
            </div>
            <div className={classes.control}>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={classes.input}
              />
              {emailError && (
                <p className={classes.error} style={{ color: 'red' }}>
                  {emailError}
                </p>
              )}{' '}
            </div>
            <div className={classes.actions}>
              <button
                type="button"
                className={classes.actions}
                onClick={sendResetEmail}
              >
                {isLoading ? <Spinner /> : 'Send Reset Email'}
              </button>
            </div>
          </form>
        )}

        {isResetPassword && !resetSuccess && (
          <form>
            <div className={classes.control}>
              <p>
                Email : <b>{submittedEmail}</b>
              </p>
            </div>
            {/* <p>Reset email: {resetEmail}</p> */}
            <div className="m-2">Please check your mail to find reset code</div>
            <div className={classes.control}>
              <label>Enter the reset code:</label>
            </div>
            <div className={classes.control}>
              <input
                type="text"
                id="resetCode"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                className={classes.input}
              />
            </div>

            <div className={classes.control}>
              <label>Enter your new password:</label>
            </div>
            <div className={classes.control}>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setNewPassword(e.target.value)}
                className={classes.input}
              />
            </div>
            <div className={classes.actions}>
              <button
                type="button"
                className={classes.actions}
                onClick={resetPassword}
              >
                Reset Password
              </button>
            </div>
          </form>
        )}

        {resetSuccess && (
          <div>
            <p>Password reset successfully!</p>
          </div>
        )}
        <ToastContainer />
      </div>
    </React.Fragment>
  );
}

export default Reset;
