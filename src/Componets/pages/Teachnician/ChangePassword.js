import React, { useState } from 'react';
import { Card, Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords here if needed

    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match.');
      return;
    }

    try {
      // Get the token from wherever you store it
      const token = Cookies.get("token");

      const response = await axios.put(
        'http://localhost:3003/api/v1/technician/changePassword',
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

      // Handle success response
      if (response.status === 200) {
        toast.success(response.data.message);
        console.log('Password changed successfully:');
  
        // Clear form fields
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');

        Cookies.remove('token');


        // Navigate to the login page
        navigate('/techlogin'); // Use navigate instead of history.push

      } else {
        console.error('Failed to change password');
        toast.error(response.data.message);
      }
    } catch (error) {
      // Handle error response
      console.error('Error changing password:', error);
    }
  };

  return (
    
              <div className="container d-flex flex-column">
        <div className="row align-items-center justify-content-center min-vh-100 g-0">
            <div className="col-12 col-md-8 col-lg-4 border-top border-3 border-success">
                <div className="card shadow-sm">
                    <div className="card-body">
                                              
                            <React.Fragment>
                             <h1>Change Your Password</h1>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
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
  );
}
