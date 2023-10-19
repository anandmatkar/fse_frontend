import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Verify_Manager_Api } from '../../../Api/Manager_Api';
import Navbar from '../../NavBar/navbarManager';

const OTPVerification = () => {
  const [otp, setOTP] = useState(['', '', '', '']);
  const [otpError, setOTPError] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');
  const otpInputs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleChange = (index, value) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    // Move to the next input field if the value is not empty
    if (value !== '' && index < 3) {
      otpInputs[index + 1].current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setOTPError('');

    // Validate the OTP field
    if (!otp.join('')) {
      setOTPError('Please enter the OTP');
      return;
    }
    const otpValue = otp.join('');

    fetch(Verify_Manager_Api, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailAddress,
        otp: otpValue,
      }),
    })
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          // Check response status
          toast.success('Successfully Verified Account');
          localStorage.clear();
          navigate(`/mangerLogin`);
        } else if (response.status === 404) {
          toast.error('Please enter valid OTP');
        } else if (response.status === 403) {
          toast.error('OTP is incorrect');
        }
      })
      .catch((error) => {
        console.error('Error during OTP verification', error);
      });
  };

  useEffect(() => {
    const storedDataString = localStorage.getItem('registrationData');
    if (storedDataString) {
      const storedData = JSON.parse(storedDataString);
      setEmailAddress(storedData.emailAddress);
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div
        className="container h-100vh con1  d-flex justify-content-center"
        style={{ marginTop: '70px' }}
      >
        {/* <div className="col col-xs-12 col-sm-12 col-md-6 col-12 d-flex "> */}
        <div className="card border-0 shadow-lg p-5 mt-3 col-sm-12 col-lg-6 col-md-6">
          <div className="text-center">
            <h1 className="">Verify Account</h1>
            We've sent a one-time password (OTP) to your email address{' '}
            <h4 className="text-danger"> {emailAddress} </h4> To proceed, please
            check your email and enter the OTP in the provided field. If you
            don't receive the OTP within a few minutes, please check your spam
            folder.
          </div>
          <div className="d-flex flex-row mt-5">
            {/* Use the otp state value and handleChange function */}
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                className="form-control m-1"
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                maxLength={1}
                autoFocus={index === 0} // Auto-focus the first input
                ref={otpInputs[index]}
              />
            ))}
          </div>
          {/* Display OTP validation error message */}
          {otpError && <div className="error text-danger">{otpError}</div>}
          <div className="text-center mt-5"></div>
          <div className="text-center mt-5">
            <button
              type="submit"
              className="btn btn-success col-12"
              onClick={handleSubmit}
            >
              Verify OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
