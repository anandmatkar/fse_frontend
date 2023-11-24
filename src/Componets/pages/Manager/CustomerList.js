import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Table, Container, Button, FormControl, Modal } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import { toast } from "react-toastify";
import NavbarManagerDashboard from "../../NavBar/navbarManagerDashboard";
import {
  Customer_List_Api,
  Manager_Base_Url,
} from "./../../../Api/Manager_Api";

function CustomerList() {
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // State for managing the confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    fetch(Customer_List_Api, axiosConfig)
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
            "API response does not contain an array of data:",
            data
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
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
    const token = Cookies.get("token");

    fetch(`${Manager_Base_Url}deleteCustomer?customerId=${customerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          // Show a success toast message
          return response.json(); // Parse the response JSON
        } else if (response.status === 409) {
          // Handle the specific message for a 409 status
          return response.json(); // Parse the response JSON
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      })
      .then((data) => {
        if (data.status === 200) {
          toast.success(data.message);

          // Remove the deleted customer from the state
          setCustomerData((prevCustomerData) =>
            prevCustomerData.filter((customer) => customer.id !== customerId)
          );
        } else if (data.status === 409) {
          toast.error(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        // Show an error toast message
        toast.error(error.message);
      });
  };

  const showDeleteConfirmation = (customer) => {
    setShowDeleteModal(true);
    setCustomerToDelete(customer);
  };

  const hideDeleteConfirmation = () => {
    setShowDeleteModal(false);
    setCustomerToDelete(null);
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
          <Button
            variant="danger"
            onClick={() => showDeleteConfirmation(customer)}
          >
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
        <li key={i} className={`dt-item ${currentPage === i ? "active" : ""}`}>
          <button className="dt-link" onClick={() => setCurrentPage(i)}>
            {i}
          </button>
        </li>
      );
    }
    return buttons;
  };

  return (
    <>
      <NavbarManagerDashboard />

      <div className="text-center wow fadeInUp my-5" data-wow-delay="0.1s">
        <h6 className="section-title bg-white text-center text-primary px-3">
          Manager's Panel
        </h6>
        <h1 className="mb-2">Customer's List</h1>
      </div>

      <div className="container-fluid mt-2">
        <div className="card">
          <div>
            <Button
              variant="primary"
              className="my-3 mx-4 float-start"
              onClick={() => navigate("/manager")}
            >
              <FaArrowLeft /> Back to Manager Dashboard
            </Button>

            <Button
              variant="success"
              as={NavLink}
              to={"/createCustomer"}
              className="my-3 mx-4 float-end"
            >
              Create Customer
            </Button>
          </div>
          <FormControl
            type="text"
            className="mb-2 mt-2 ms-4"
            placeholder="Search Customer Name"
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "25%", border: "1px solid black", float: "right" }}
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
            <li className={`dt-item ${currentPage === 1 ? "disabled" : ""}`}>
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
                currentPage === totalPages ? "disabled" : ""
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

      {showDeleteModal && (
        <Modal centered show={showDeleteModal} onHide={hideDeleteConfirmation}>
          <Modal.Header>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete the customer?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => {
                handleDelete(customerToDelete.id);
                hideDeleteConfirmation();
              }}
            >
              Delete
            </Button>
            <Button variant="secondary" onClick={hideDeleteConfirmation}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default CustomerList;
