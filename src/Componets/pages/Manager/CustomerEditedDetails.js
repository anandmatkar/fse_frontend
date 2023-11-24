import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import NavbarManagerDashboard from "../../NavBar/navbarManagerDashboard";
import {
  Manager_Base_Url,
  Update_Customer_Details,
} from "./../../../Api/Manager_Api";
import { FaArrowLeft } from "react-icons/fa";

function CustomerEditedDetails() {
  const navigate = useNavigate();
  const { customerID } = useParams();
  console.log(customerID); // Extract customerId from the URL
  const [customerData, setCustomerData] = useState({
    id: customerID,
    customer_name: "",
    customer_contact: "",
    email_address: "",
    customer_account: "",
    phone_number: "",
    country: "",
    city: "",
    address: "",
    scope_of_work: "",
  });

  useEffect(() => {
    const token = Cookies.get("token");
    // Fetch data from the API endpoint using the customerId
    fetch(`${Manager_Base_Url}customerDetails?customerId=${customerID}`, {
      headers: {
        "Content-Type": "application/json",
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
        setCustomerData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
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
    const token = Cookies.get("token");

    // Send a PUT request to update customer details
    fetch(Update_Customer_Details, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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
        navigate("/customerlist"); // Replace with the actual route
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        // Handle error
        toast.error(error.message);
      });
  };

  return (
    <>
      <NavbarManagerDashboard />

      <div className="text-center wow fadeInUp mt-5" data-wow-delay="0.1s">
        <h6 className="section-title bg-white text-center text-primary px-3">
          Manager's Panel
        </h6>
        <h1 className="mb-2">Edit Customer Details</h1>
      </div>

      <div className="container ">
        <div className="container border border-dark mt-2 rounded p-4">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <Button
                variant="primary"
                className="me-2 mb-2"
                onClick={() => navigate("/customerlist")}
              >
                <FaArrowLeft /> Back to Customer List
              </Button>
              <form onSubmit={handleSubmit}>
                <div className="row g-3 mt-1">
                  <div className="col-md-6">
                    <label for="your-name" className="form-label fw-bold">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="customer_name"
                      name="customer_name"
                      value={customerData.customer_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="your-surname" className="form-label fw-bold">
                      Customer Contact
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="customer_contact"
                      name="customer_contact"
                      value={customerData.customer_contact}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label for="your-subject" className="form-label fw-bold">
                      Customer Account{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="customer_account"
                      name="customer_account"
                      value={customerData.customer_account}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="your-subject" className="form-label fw-bold">
                      Email Address{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="email_address"
                      name="email_address"
                      value={customerData.email_address}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="your-subject" className="form-label fw-bold">
                      Phone Number{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone_number"
                      name="phone_number"
                      value={customerData.phone_number}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="your-subject" className="form-label fw-bold">
                      Country{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="country"
                      name="country"
                      value={customerData.country}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="your-subject" className="form-label fw-bold">
                      City{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      name="city"
                      value={customerData.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="your-subject" className="form-label fw-bold">
                      Address{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      value={customerData.address}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="your-subject" className="form-label fw-bold">
                      Scope of Work{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="scope_of_work"
                      name="scope_of_work"
                      value={customerData.scope_of_work}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12">
                    <div className="row">
                      <div className="col-md-6">
                        <button
                          type="submit"
                          className="btn btn-dark w-100 fw-bold"
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
