import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import NavbarManagerDashboard from '../../NavBar/navbarManagerDashboard';
import {
  Upload_Manager_Profile,
  Show_Manager_Profile,
  Update_Manager_Profile,
} from '../../../Api/Manager_Api';

function ShowManagerProfile() {
  const navigate = useNavigate();
  const { customerID } = useParams();
  console.log(customerID); // Extract customerId from the URL
  const [profilePicURL, setProfilePicURL] = useState('');
  const [managerData, setManagerData] = useState({
    // id: customerID,
    name: '',
    customer_contact: '',
    surname: '',
    company: '',
    email_address: '',
    phone_number: '',
  });
  useEffect(() => {
    const token = Cookies.get('token');
    // Fetch data from the API endpoint using the customerId
    fetch(Show_Manager_Profile, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Update the input fields with the fetched data
        console.log(data);
        setManagerData(data.data);
        setProfilePicURL(data.data.avatar);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setManagerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleProfilePicChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      try {
        const response = await axios.post(Upload_Manager_Profile, formData);
        if (response.data.status === 201) {
          const uploadedURL = response.data.data;
          console.log(uploadedURL);
          setProfilePicURL(uploadedURL);
        } else {
          console.error(
            'Profile Picture Upload Failed. Status Code:',
            response.status
          );
        }
      } catch (error) {
        console.error('API Error:', error);
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = Cookies.get('token');
    // Send a PUT request to update customer details
    fetch(Update_Manager_Profile, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        name: managerData.name,
        surname: managerData.surname,
        email_address: managerData.email_address,
        phone_number: managerData.phone_number,
        company: managerData.company,
        profilePic: profilePicURL,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Handle success
        toast.success(data.message);
        // Redirect to another page after a successful update
        navigate('/manager'); // Replace with the actual route
      })
      .catch((error) => {
        console.error('Error updating data:', error);
        // Handle error
        toast.error(error.message);
      });
  };

  useEffect(() => {
    // Check if token exists in localStorage
    const token = Cookies.get('token');
    if (!token) {
      // Perform any additional token validation if needed
      // Then navigate to the dashboard
      navigate('/mangerLogin');
    }
  }, []);
  return (
    <>
      <NavbarManagerDashboard />
      <div className="container ">
        <Link to="/manager" className="">
          <button className="btn btn-primary">
            <i className="fa fa-home"></i> Back
          </button>
        </Link>
        <div class="container border border-dark mt-5 rounded p-4">
          <div class="row justify-content-center">
            <div class="col-lg-9">
              <h1 class="mb-3"> Customer Details Update</h1>
              <form onSubmit={handleSubmit}>
                <div>
                  {(profilePicURL || managerData.avatar) && (
                    <img
                      src={profilePicURL || managerData.avatar}
                      alt="Profile Picture"
                      className="img-fluid mb-3"
                      style={{ maxWidth: '150px' }}
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                  />
                </div>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label for="your-name" class="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="name"
                      name="name"
                      value={managerData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="your-surname" class="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="surname"
                      name="surname"
                      value={managerData.surname}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="your-subject" class="form-label">
                      Company
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="company"
                      name="company"
                      value={managerData.company}
                      // onChange={handleChange}
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="your-subject" class="form-label">
                      Email{' '}
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="email_address"
                      name="email_address"
                      value={managerData.email_address}
                      // onChange={handleChange}
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="your-subject" class="form-label">
                      Phone
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="phone_number"
                      name="phone_number"
                      value={managerData.phone_number}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="col-12">
                    <div class="row">
                      <div class="col-md-6">
                        <button
                          type="submit"
                          class="btn btn-dark w-100 fw-bold"
                        >
                          Update & Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
export default ShowManagerProfile;
