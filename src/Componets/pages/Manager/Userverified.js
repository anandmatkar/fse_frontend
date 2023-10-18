import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Verify_Manager_Api } from '../../../Api/Manager_Api';

const OTPVerification = () => {
  const [otp, setOTP] = useState(['', '', '', '']);
  const [otpError, setOTPError] = useState('');
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
    const storedDataString = localStorage.getItem('registrationData');

    const storedData = JSON.parse(storedDataString);

    const emailAddress = storedData.emailAddress;

    console.log('Email Address:', emailAddress);

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
  return (
    <div>
      <div className="container h-100vh con1" style={{ marginTop: '70px' }}>
        <div className="row">
          {/* <div className="col col-sm-12 col-md-6 col-12 text-center">
            <h1 className="">Account Verification</h1>
            <img
              src="/assets/otp.png"
              alt="Forget Password"
              style={{ width: '450px' }}
            />{' '}
            
          </div> */}
          <div className="col col-xs-12 col-sm-12 col-md-6 col-12 d-flex ">
            <div className="card border-0 shadow-lg p-5 mt-3">
              <h5 className="">OTP verification</h5>
              {/* <span className="mobile-text">
                Enter the code we just sent to your Email{' '}
                <b className="text-danger">{email}</b>
              </span> */}
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
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Verify OTP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
