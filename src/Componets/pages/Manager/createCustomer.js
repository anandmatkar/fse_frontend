import React, { useState } from 'react';
import './NewCustomerScreen.css';
import { toast } from 'react-toastify';
import Spinner from '../Common/Spinner';
import axios from 'axios';
import { Create_Customer_Api } from '../../../Api/Manager_Api';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import NavbarManagerDashboard from '../../NavBar/navbarManagerDashboard';
import './CreateCustomer.css';

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
    console.log('Submit button clicked');

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
        Authorization: token,
      },
    };

    console.log(axiosConfig, 'data to send');
    try {
      const response = await axios.post(
        Create_Customer_Api, // Updated API endpoint
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

  // const validateForm = (data) => {
  //   const errors = {};

  //   if (!data.customerName) {
  //     errors.customerName = 'Please enter customer name';
  //   }
  //   if (!data.customerContactName) {
  //     errors.customerContactName = 'Please enter customer contact name';
  //   }
  //   if (!data.customerAccount) {
  //     errors.customerAccount = 'Please enter customer account number';
  //   }
  //   if (!data.email) {
  //     errors.email = 'Please enter your email';
  //   } else if (!validateEmail(data.email)) {
  //     errors.email = 'Please enter a valid email address';
  //   }
  //   if (!data.phone) {
  //     errors.phone = 'Please enter your phone number';
  //   } else if (!validatePhone(data.phone)) {
  //     errors.phone = 'Please enter a valid phone number';
  //   }
  //   if (!data.country) {
  //     errors.country = 'Please enter country';
  //   }
  //   if (!data.city) {
  //     errors.city = 'Please enter city';
  //   }
  //   if (!data.address) {
  //     errors.address = 'Please enter address';
  //   }
  //   if (!data.scopeOfWork) {
  //     errors.scopeOfWork = 'Please enter scope of work';
  //   }

  //   return errors;
  // };

  const validateForm = (data) => {
    const errors = {};

    if (!data.customerName.trim()) {
      errors.customerName = 'Please enter customer name';
    }
    if (!data.customerContactName.trim()) {
      errors.customerContactName = 'Please enter customer contact name';
    }
    if (!data.customerAccount.trim()) {
      errors.customerAccount = 'Please enter customer account number';
    }
    if (!data.email.trim()) {
      errors.email = 'Please enter your email';
    } else if (!validateEmail(data.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }
    if (!data.phone.trim()) {
      errors.phone = 'Please enter your phone number';
    } else if (!validatePhone(data.phone.trim())) {
      errors.phone = 'Please enter a valid phone number';
    }
    if (!data.country.trim()) {
      errors.country = 'Please enter country';
    }
    if (!data.city.trim()) {
      errors.city = 'Please enter city';
    }
    if (!data.address.trim()) {
      errors.address = 'Please enter address';
    }
    if (!data.scopeOfWork.trim()) {
      errors.scopeOfWork = 'Please enter scope of work';
    }

    return errors;
  };

  const validateEmail = (emailAddress) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
  };
  const validatePhone = (phone) => {
    const tenDigitRegex = /^\d{10}$/;
    return tenDigitRegex.test(phone);
  };

  return (
    <>
      <NavbarManagerDashboard />
      <div>
        {isLoading && (
          <div className="loading-spinner">
            <Spinner />
          </div>
        )}
        <div class="container newCustomerContainer">

        <div className="text-center wow fadeInUp my-2" data-wow-delay="0.1s">
          <h6 className="section-title bg-white text-center text-primary px-3">
            Manager's Panel
          </h6>
          <h1 className="mb-5">Create Customer</h1>
        </div>
        
          <div class="wrapper animated_bounceInLeft shadow-lg border border-1">
            <div class="company-info text-center ">
              <h3>Add new customer details</h3>
              <img src="/assets/newcustomer.svg" className="mt-3"></img>
            </div>
            <div class="contact">
              <form className="newCustomerForm">
                <p>
                  <label className="newCustomerLabel" htmlFor="customerName">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    className="newCustomerInput w-100 p-2 border border-1"
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
                </p>
                <p>
                  <label className="newCustomerLabel" htmlFor="customerName">
                    Customer Contact Name
                  </label>
                  <input
                    type="text"
                    className="newCustomerInput w-100 p-2 border border-1"
                    id="customerContactName"
                    name="customerContactName"
                    value={formData.customerContactName}
                    onChange={handleChange}
                  />
                  {errors.customerName && (
                    <span className="error" style={{ color: 'red' }}>
                      {errors.customerName}
                    </span>
                  )}
                </p>
                <p>
                  <label className="newCustomerLabel" htmlFor="customerAccount">
                    Customer Account
                  </label>
                  <input
                    type="text"
                    className="newCustomerInput w-100 p-2 border border-1"
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
                </p>
                <p>
                  <label className="newCustomerLabel" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    className="newCustomerInput w-100 p-2 border border-1"
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
                </p>
                <p>
                  <label className="newCustomerLabel" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    type="text"
                    className="newCustomerInput w-100 p-2 border border-1"
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
                </p>
                <p>
                  <label className="newCustomerLabel" htmlFor="country">
                    Country
                  </label>
                  <select
                    id="country"
                    className="newCustomerInput  w-100 p-2 border border-1"
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
                    <option value="India">India</option>
                    {/* Add more country options as needed */}
                  </select>
                  {errors.country && (
                    <span className="error" style={{ color: 'red' }}>
                      {errors.country}
                    </span>
                  )}
                </p>
                <p class="">
                  <label className="newCustomerLabel" htmlFor="city">
                    City
                  </label>
                  <input
                    type="text"
                    className="newCustomerInput  w-100 p-2 border border-1"
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
                </p>
                <p class="">
                  <label className="newCustomerLabel" htmlFor="address">
                    Address
                  </label>
                  <input
                    type="text"
                    className="newCustomerInput  w-100 p-2 border border-1"
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
                </p>

                <p className="full">
                  <label className="newCustomerLabel" htmlFor="scopeOfWork">
                    Scope of Work
                  </label>
                  <textarea
                    id="scopeOfWork"
                    className="newCustomerInput  w-100 p-2 border border-1 "
                    name="scopeOfWork"
                    value={formData.scopeOfWork}
                    onChange={handleChange}
                  ></textarea>
                  {errors.scopeOfWork && (
                    <span className="error" style={{ color: 'red' }}>
                      {errors.scopeOfWork}
                    </span>
                  )}
                </p>
                <div className="full">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="submit-button btn btn-success  border border-0 "
                  >
                    CREATE
                  </button>
                </div>
              </form>
            </div>
          </div>
          {showPopup && <div className="popup">New customer created!</div>}
        </div>
      </div>
    </>
  );
}

export default NewCustomerScreen;
