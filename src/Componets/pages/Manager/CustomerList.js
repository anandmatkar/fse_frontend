import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Table, Container, Button, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CustomerList() {
  const [customerData, setCustomerData] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const token = Cookies.get('token');
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
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

  const filteredCustomers = customerData.filter((customer) =>
    customer.customer_name.toLowerCase().includes(search.toLowerCase())
  );

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  const handleDelete = (customerId) => {
    const token = Cookies.get('token');

    fetch(`/api/v1/manager/deleteCustomer?customerId=${customerId}`, {
      method: 'DELETE',
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
          prevCustomerData.filter((customer) => customer.id !== customerId)
        );
      })
      .catch((error) => {
        console.error('Error deleting customer:', error);
      });
  };

  const renderCustomerRows = () => {
    if (currentCustomers.length === 0) {
      return (
        <tr>
          <td colSpan="11" className="text-center">
            No data found
          </td>
        </tr>
      );
    }

    return currentCustomers.map((customer, index) => (
      <tr key={index}>
        <td>{customer.customer_name}</td>
        <td>{customer.customer_contact}</td>
        <td>{customer.customer_account}</td>
        <td>{customer.email_address}</td>
        <td>{customer.phone_number}</td>
        <td>{customer.country}</td>
        <td>{customer.city}</td>
        <td>{customer.address}</td>
        <td>{customer.scope_of_work}</td>
        <td>
          <Link
            to={`/customerediteddetails/${customer.id}`}
            className="btn btn-success"
          >
            Edit
          </Link>
        </td>
        <td>
          <Button variant="danger" onClick={() => handleDelete(customer.id)}>
            Delete
          </Button>
        </td>
      </tr>
    ));
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <li key={i} className={`dt-item ${currentPage === i ? 'active' : ''}`}>
          <button className="dt-link" onClick={() => setCurrentPage(i)}>
            {i}
          </button>
        </li>
      );
    }
    return buttons;
  };

  return (
    <div className="jobcontainer container mt-5">
      <h1 className="jobassigntext mb-4">Customer List</h1>

      <Link to={'/createCustomer'} className="float-end p-2 btn btn-primary">
        Create Customer
      </Link>

      <div className="card">
        <FormControl
          type="text"
          className="mb-4"
          placeholder="Search by Customer Name..."
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: '25%', border: '1px solid black', float: 'right' }}
        />
        <div className="card-body">
          <div className="bf-table-responsive">
            <Container fluid>
              <Table responsive hover className="bf-table">
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Customer Contact</th>
                    <th>Customer Account</th>
                    <th>Email Address</th>
                    <th>Phone Number</th>
                    <th>Country</th>
                    <th>City</th>
                    <th>Address</th>
                    <th>Scope of Work</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>{renderCustomerRows()}</tbody>
              </Table>
            </Container>
          </div>
        </div>
      </div>
      <nav className="dt-pagination">
        <ul className="dt-pagination-ul">
          <li className={`dt-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="dt-link"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>
          </li>
          {renderPaginationButtons()}
          <li
            className={`dt-item ${
              currentPage === totalPages ? 'disabled' : ''
            }`}
          >
            <button
              className="dt-link"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default CustomerList;
