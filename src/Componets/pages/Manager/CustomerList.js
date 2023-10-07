import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

function CustomerList() {
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    // Fetch data from the API endpoint
    const token = Cookies.get('token');
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token, // Assuming you use Bearer token format
      },
    };

    fetch('/api/v1/manager/customerList', axiosConfig)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data.data)) {
          setCustomerData(data.data);
        } else {
          console.error(
            'API response does not contain an array of data:',
            data
          );
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDelete = (customerID) => {
    const token = Cookies.get('token');

    // Send a DELETE request to delete the customer
    fetch(`/api/v1/manager/deleteCustomer?customerId=${customerID}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Remove the deleted customer from the state
        setCustomerData((prevCustomerData) =>
          prevCustomerData.filter((customer) => customer.id !== customerID)
        );
      })
      .catch((error) => {
        console.error('Error deleting customer:', error);
      });
  };

  return (
    <div className="p-2">
      <Link className="float-end p-2 btn btn-primary" to={'/createCustomer'}>
        Create Customer
      </Link>
      <div className="">
        <h1 className="text-center p-3">Customer List</h1>
        <div className="">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">customer_name</th>
                <th scope="col">customer_contact</th>
                <th scope="col">customer_account</th>
                <th scope="col">email_address</th>
                <th scope="col">phone_number</th>
                <th scope="col">country</th>
                <th scope="col">city</th>
                <th scope="col">address</th>
                <th scope="col">scope_of_work</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(customerData) &&
                customerData.map((customer, index) => (
                  <tr key={index}>
                    <td scope="row">{customer.customer_name}</td>
                    <td scope="row">{customer.customer_contact}</td>
                    <td scope="row">{customer.customer_account}</td>
                    <td scope="row">{customer.email_address}</td>
                    <td scope="row">{customer.phone_number}</td>
                    <td scope="row">{customer.country}</td>
                    <td scope="row">{customer.city}</td>
                    <td scope="row">{customer.address}</td>
                    <td scope="row">{customer.scope_of_work}</td>
                    <td>
                      <Link
                        to={`/customerediteddetails/${customer.id}`}
                        className="btn btn-success"
                      >
                        Edit
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(customer.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CustomerList;
