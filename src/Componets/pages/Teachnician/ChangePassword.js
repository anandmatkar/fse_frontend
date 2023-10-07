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
    <React.Fragment>
      <Container as={Card.Header} className="py-5">
        <h1 className='text-center'>Change Password</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="oldPassword">
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="newPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" style={{width:"20%"}}>
            Change Password
          </Button>
        </Form>
      </Container>
    </React.Fragment>
  );
}
