import React, { useState } from 'react';
import './NewCustomerScreen.css';
import axios from 'axios';

function NewAccount() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    company: '',
    emailAddress: '',
    password: '',
    position: '',
    phone: '',
    profilePic: '',
  });
  const [profilePic, setProfilePic] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    // Handle the profile picture selection
    const file = event.target.files[0]; //   allow selecting only one file
    setProfilePic(file);
    // immediately upload the profile picture upon selection
    uploadProfilePicture(file);
  };

  const uploadProfilePicture = (file) => {
    const formDataToSend = new FormData();
    formDataToSend.append('profilePic', file);

    fetch('http://localhost:3003/api/v1/manager/uploadProfilePic', {
      method: 'POST',
      body: formDataToSend,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log('Profile picture uploaded successfully', data);
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message.
        console.error('Error uploading profile picture:', error);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Send the form data to the server (API call) to insert into the 'manager' table.
    // You can use fetch or Axios to make the API request.

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('surname', formData.surname);
    formDataToSend.append('company', formData.company);
    formDataToSend.append('email', formData.emailAddress);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('position', formData.position);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('profilePic', profilePic);

    try {
      const response = await fetch(
        'http://localhost:3003/api/v1/manager/createManager',
        {
          method: 'POST',
          body: formDataToSend,
        }
      );

      if (response.ok) {
        console.log('Data submitted successfully');
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const confirmEmail = async (token) => {
    try {
      const response = await axios.get(`/api/v1/manager/confirmEmail/${token}`);
      console.log(response.data.message); // Display the confirmation message to the user
    } catch (error) {
      console.error('Error confirming email:', error);
    }
  };

  // Call the confirmEmail function with the token when the user clicks the confirmation link
  confirmEmail('your-confirmation-token');

  return (
    <div className="new-customer-screen">
      <div className="profile-section">
        {/* Your profile section content goes here */}
        {/* <img
          src="https://example.com/profile-image.jpg"
          alt="Profile"
          className="profile-image"
        /> */}
        {/* <p className="profile-name">John Doe</p> */}
      </div>
      <h2>New Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="surname">Surname:</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="company">Company:</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">EmailAddress:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="position">Position:</label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">profilePic:</label>
          <input
            type="file"
            id="profilePic"
            name="profilePic"
            accept=".jpg, .jpeg, .png"
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="form-group">
          <button type="submit" className="submit-button">
            Validate
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewAccount;
