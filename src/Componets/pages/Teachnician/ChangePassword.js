import React, { useState } from 'react';
import { Card, Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Technician_ChnagePassword } from '../../../Api/Technicians_Api';
import Layout4 from "../../Layout/Layout4";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [oldPasswordError, setOldPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');


  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetErrors(); // Reset previous errors

    // Validate passwords here
    let isValid = true;

    if (!oldPassword) {
      setOldPasswordError('Old password is required.');
      isValid = false;
    }

    if (!newPassword) {
      setNewPasswordError('New password is required.');
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Confirm password is required.');
      isValid = false;
    }

    if (newPassword !== confirmPassword) {
      setConfirmPasswordError('New password and confirm password do not match.');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    try {
      const token = Cookies.get("token");

      const response = await axios.put(
        Technician_ChnagePassword,
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        console.log('Password changed successfully:');
  
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');

        Cookies.remove('token');
        navigate('/techlogin');
      } else {
        console.error('Failed to change password');
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error('An error occurred while changing the password.');
    }
  };

  const resetErrors = () => {
    setOldPasswordError('');
    setNewPasswordError('');
    setConfirmPasswordError('');
  };

  return (
    <Layout4>
    <Container className="container-xxl py-5">
              <div className="text-center mb-5">
                  <h6 className="section-title bg-white text-center text-primary px-3">Remember your pasword!</h6>
                  <h1>password recover</h1>
              </div>
    
              <div className="container d-flex flex-column">
        <div className="row align-items-center justify-content-center mt-3 g-0">
            <div className="col-12 col-md-8 col-lg-4 border-top border-3 border-success">
                <div className="card shadow-sm">
                    <div className="card-body">
                                              
                            <React.Fragment>
                             <h1>Change Your Password</h1>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                    {!passwordsMatch && (
                    <div className="alert alert-danger" role="alert"> 
                      Passwords do not match.
                    </div>
                  )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Enter Old Password:</label>
                                        <input
                                           type="password"
                                           placeholder="Enter old password"
                                           value={oldPassword}
                                           className="form-control"
                                           onChange={(e) => setOldPassword(e.target.value)}
                                           required
                                        />
                                          <div className="text-danger">{oldPasswordError}</div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Enter New Password:</label>
                                        <input
                                           type="password"
                                           placeholder="Enter new password"
                                           value={newPassword}
                                           className="form-control"
                                           onChange={(e) => setNewPassword(e.target.value)}
                                           required
                                        />
                                        <div className="text-danger">{newPasswordError}</div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Enter Conform Password:</label>
                                        <input
                                            type="password"
                                            placeholder="Confirm new password"
                                            value={confirmPassword}
                                            className="form-control"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                        <div className="text-danger">{confirmPasswordError}</div>
                                    </div>

                                    <div className="mb-3 d-grid">
                                        <button
                                            type="submit"
                                            className="btn btn-success"
                                        >
                                            Change Password
                                        </button>
                                    </div>
                                </form>
                            </React.Fragment>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    </Container>
    </Layout4>
  );
}
