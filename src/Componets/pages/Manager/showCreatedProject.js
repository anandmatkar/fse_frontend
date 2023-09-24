
import React, { useState, useEffect } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Modal from 'react-modal';
import axios from 'axios'; // Import Axios

export default function ShowCreatedProject({ customerId }) {
  const [customerData, setCustomerData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [machineDetails, setMachineDetails] = useState([]);

  useEffect(() => {
    // Fetch data from API using Axios
    axios.get(`http://localhost:3003/api/v1/manager/customerDetails?customerId=${ customerId }`)
      .then((response) => {
        // Convert the response data into an array of customer objects
        const customers = Object.keys(response.data).map((key) => ({
          id: key,
          ...response.data[key],
        }));
        setCustomerData(customers);
      })
      .catch((error) => {
        console.error('Error fetching customer data:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once

  const handleDeleteCustomer = (id) => {
    // Delete the customer from API using Axios
    axios.delete(`http://localhost:3003/api/v1/manager/deleteCustomer?customerId=${ customerId }`)
      .then(() => {
        // Update the local state by removing the deleted customer
        const updatedCustomers = customerData.filter((customer) => customer.id !== id);
        setCustomerData(updatedCustomers);
      })
      .catch((error) => {
        console.error('Error deleting customer:', error);
      });
  };

  const handleMachineDetails = (id) => {
    // Fetch machine details from Firebase API using Axios
    axios.get(`https://testproject-e9582-default-rtdb.firebaseio.com/projectnew/${id}.json`)
      .then((response) => {
        // Set the machine details and open the modal
        setMachineDetails(response.data);
        setIsModalOpen(true);
      })
      .catch((error) => {
        console.error('Error fetching machine details:', error);
      });
  };

  const closeModal = () => {
    // Close the modal
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <MDBTable bordered>
        <MDBTableHead dark>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Customer Name</th>
            <th scope='col'>Customer Account</th>
            <th scope='col'>Country</th>
            <th scope='col'>Customer Contact</th>
            <th scope='col'>Phone</th>
            <th scope='col'>Email</th>
            <th scope='col'>Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {customerData.map((customer, index) => (
            <tr key={customer.id}>
              <th scope='row'>{index + 1}</th>
              <td>{customer.name}</td>
              <td>{customer.account}</td>
              <td>{customer.country}</td>
              <td>{customer.account}</td>
              <td>{customer.phone}</td>
              <td>{customer.email}</td>
              <td>{customer.scopeOfWork}</td>
              <td>
                <button onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
                <button onClick={() => handleMachineDetails(customer.id)}>Machine Details</button>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>

      {/* Modal for showing machine details */}
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        {machineDetails ? (
          <div>
            <h2>Machine Details</h2>
            <p>Machine Name: {machineDetails.machineName}</p>
            <p>Machine Type: {machineDetails.machineType}</p>
            {/* Add more machine details as needed */}
            <button onClick={closeModal}>Close</button>
          </div>
        ) : (
          <div>
            <h2>No Machine Details Available</h2>
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
}
