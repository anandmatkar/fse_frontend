import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarManagerDashboard from '../../NavBar/navbarManagerDashboard';
import { Manager_Base_Url, Update_Customer_Details } from './../../../Api/Manager_Api';

function CustomerEditedDetails() {
  const navigate = useNavigate();
  const { customerID } = useParams();
  console.log(customerID); // Extract customerId from the URL
  const [customerData, setCustomerData] = useState({
    id: customerID,
    customer_name: '',
    customer_contact: '',
    email_address: '',
    customer_account: '',
    phone_number: '',
    country: '',
    city: '',
    address: '',
    scope_of_work: '',
  });

  useEffect(() => {
    const token = Cookies.get('token');
    // Fetch data from the API endpoint using the customerId
    fetch(
      `${Manager_Base_Url}customerDetails?customerId=${customerID}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Update the input fields with the fetched data
        console.log(data);
        setCustomerData(data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [customerID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = Cookies.get('token');

    // Send a PUT request to update customer details
    fetch(Update_Customer_Details, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(customerData),
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
        navigate('/customerlist'); // Replace with the actual route
      })
      .catch((error) => {
        console.error('Error updating data:', error);
        // Handle error
        toast.error(error.message);
      });
  };

  return (
    <>
      <NavbarManagerDashboard />
      <div className="container ">
        <div class="container border border-dark mt-5 rounded p-4">
          <div class="row justify-content-center">
            <div class="col-lg-9">
              <h1 class="mb-3"> Customer Details Update</h1>

              <form onSubmit={handleSubmit}>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label for="your-name" class="form-label">
                      customer_name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="customer_name"
                      name="customer_name"
                      value={customerData.customer_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="your-surname" class="form-label">
                      customer_contact
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="customer_contact"
                      name="customer_contact"
                      value={customerData.customer_contact}
                      onChange={handleChange}
                    />
                  </div>

                  <div class="col-md-6">
                    <label for="your-subject" class="form-label">
                      customer_account{' '}
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="customer_account"
                      name="customer_account"
                      value={customerData.customer_account}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="your-subject" class="form-label">
                      email_address{' '}
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="email_address"
                      name="email_address"
                      value={customerData.email_address}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="your-subject" class="form-label">
                      phone_number{' '}
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="phone_number"
                      name="phone_number"
                      value={customerData.phone_number}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="your-subject" class="form-label">
                      country{' '}
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="country"
                      name="country"
                      value={customerData.country}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="your-subject" class="form-label">
                      city{' '}
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="city"
                      name="city"
                      value={customerData.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="your-subject" class="form-label">
                      address{' '}
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="address"
                      name="address"
                      value={customerData.address}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="your-subject" class="form-label">
                      scope_of_work{' '}
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="scope_of_work"
                      name="scope_of_work"
                      value={customerData.scope_of_work}
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
                          Save Changes
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

export default CustomerEditedDetails;
