import React, { useState } from 'react';
import './NewCustomerScreen.css';
import { toast } from 'react-toastify';
import Spinner from '../Common/Spinner';
import axios from 'axios';
import { Create_Customer_Api } from '../../../Api/Manager_Api';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

function NewCustomerScreen() {
  const [formData, setFormData] = useState({
    customerName: '',
    customerContactName: '',
    customerAccount: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    address: '',
    scopeOfWork: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm(formData);
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return; // Don't submit if there are validation errors
    }
    setIsLoading(true);

    let token = Cookies.get('token');
    console.log(token);

    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'), // Assuming you store the token in localStorage
      },
    };

    console.log(axiosConfig, 'data to send');
    try {
      const response = await axios.post(
        Create_Customer_Api,
        formData,
        axiosConfig
      );

      if (response.data.status === 201) {
        // Reset form fields
        setFormData({
          customerName: '',
          customerContactName: '',
          customerAccount: '',
          email: '',
          phone: '',
          country: '',
          city: '',
          address: '',
          scopeOfWork: '',
        });
        setShowPopup(true);
        // Show success toast message
        toast.success(response.data.message);
        console.log('Response Data:', response);
        navigate('/manager');
      } else {
        // Show error toast message
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error.message);
      // Show error toast message
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  const validateForm = (data) => {
    const errors = {};

    if (!data.customerName) {
      errors.customerName = 'Please enter customer name';
    }
    if (!data.customerContactName) {
      errors.customerContactName = 'Please enter customer contact name';
    }
    if (!data.customerAccount) {
      errors.customerAccount = 'Please enter customer account number';
    }
    if (!data.email) {
      errors.email = 'Please enter your email';
    } else if (!validateEmail(data.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!data.phone) {
      errors.phone = 'Please enter your phone number';
    } else if (!validatePhone(data.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    if (!data.country) {
      errors.country = 'Please enter country';
    }
    if (!data.city) {
      errors.city = 'Please enter city';
    }
    if (!data.address) {
      errors.address = 'Please enter address';
    }
    if (!data.scopeOfWork) {
      errors.scopeOfWork = 'Please enter scope of work';
    }

    return errors;
  };

  const validateEmail = (emailAddress) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
  };

  const validatePhone = (phone) => {
    const indianMobileRegex = /^[6789]\d{9}$/;
    return indianMobileRegex.test(phone);
  };

  return (
    <div className="new-customer-screen">
      <h2>New Customer</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customerName">Customer Name</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
          />
          {errors.customerName && (
            <span className="error" style={{ color: 'red' }}>
              {errors.customerName}
            </span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="customerContact">Customer Contact</label>
          <input
            type="text"
            id="customerContact"
            name="customerContactName"
            value={formData.customerContactName}
            onChange={handleChange}
          />
          {errors.customerContact && (
            <span className="error" style={{ color: 'red' }}>
              {errors.customerContact}
            </span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="customerAccount">Customer Account</label>
          <input
            type="text"
            id="customerAccount"
            name="customerAccount"
            value={formData.customerAccount}
            onChange={handleChange}
          />
          {errors.customerAccount && (
            <span className="error" style={{ color: 'red' }}>
              {errors.customerAccount}
            </span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <span className="error" style={{ color: 'red' }}>
              {errors.email}
            </span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <span className="error" style={{ color: 'red' }}>
              {errors.phone}
            </span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Country
            </option>
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
            <option value="UK">UK</option>
            <option value="Algeria">Algeria</option>
            {/* Add more country options as needed */}
          </select>
          {errors.country && (
            <span className="error" style={{ color: 'red' }}>
              {errors.country}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          {errors.city && (
            <span className="error" style={{ color: 'red' }}>
              {errors.city}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && (
            <span className="error" style={{ color: 'red' }}>
              {errors.address}
            </span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="scopeOfWork">Scope of Work</label>
          <textarea
            id="scopeOfWork"
            name="scopeOfWork"
            value={formData.scopeOfWork}
            onChange={handleChange}
          ></textarea>
          {errors.scopeOfWork && (
            <span className="error" style={{ color: 'red' }}>
              {errors.scopeOfWork}
            </span>
          )}
        </div>
        <button type="submit" className="submit-button">
          Validate
        </button>
      </form>
      {showPopup && <div className="popup">New customer created!</div>}
    </div>
  );
}

export default NewCustomerScreen;
