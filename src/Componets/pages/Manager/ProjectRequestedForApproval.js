import React, { useState, useEffect } from 'react';
import { Table, FormControl, Pagination, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import NavbarManagerDashboard from '../../NavBar/navbarManagerDashboard';
import { Project_List_Manager } from './../../../Api/Manager_Api';

const ProjectRequestedForApprovalProgress = () => {
  const [projectRequestedForApproval, setProjectRequestedForApproval] =
    useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Fetch data from the API endpoint
    const token = Cookies.get('token');
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token, // Assuming you use Bearer token format
      },
    };

    fetch(Project_List_Manager, axiosConfig)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          // Check if the API response is successful
          const requestedForApprovalData =
            data.data.projectRequestedForApproval;
          setProjectRequestedForApproval(requestedForApprovalData);
        } else {
          console.error('API request was not successful:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const filteredCustomers = projectRequestedForApproval.filter((customer) =>
    customer.customer_name.toLowerCase().includes(search.toLowerCase())
  );

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <Pagination.Item
          key={i}
          active={currentPage === i}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    return buttons;
  };

  const renderCustomerRows = () => {
    if (currentCustomers.length === 0) {
      return (
        <tr>
          <td colSpan="9" className="text-center">
            No data found
          </td>
        </tr>
      );
    }

    return (
      <tbody>
        {currentCustomers.map((job, index) => (
          <tr key={index}>
            <td>{job.order_id}</td>
            <td>{job.customer_account}</td>
            <td>{job.customer_name}</td>
            <td>{job.country}</td>
            <td>{job.city}</td>
            <td>{job.description}</td>
            <td>{job.start_date}</td>
            <td>{job.end_date}</td>
            <td>
              <Link
                to={`/projectstatusdetails/${job.project_id}`}
                className="btn btn-primary"
              >
                Details
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <>
      <NavbarManagerDashboard />
      <div className="jobcontainer container mt-5">

        <div className="text-center wow fadeInUp my-2" data-wow-delay="0.1s">
          <h6 className="section-title bg-white text-center text-primary px-3">
            Manager's Panel
          </h6>
          <h1 className="mb-5">Project Requested For Approval</h1>
        </div>

        <div className="card">
          <FormControl
            type="text"
            placeholder="Search Projects"
            className="mx-4 my-4"
            onChange={(e) => {
              console.log('Search input:', e.target.value);
              setSearch(e.target.value);
            }}
            style={{ width: '25%', border: '1px solid black', float: 'right' }}
          />
          <div className="card-body">
            <div className="bf-table-responsive">
              <Container fluid>
                <Table responsive hover className="bf-table">
                  <thead>
                    <tr>
                      <th>Order_ID</th>
                      <th>customer_account</th>
                      <th>customer_name</th>
                      <th>country</th>
                      <th>city</th>
                      <th>description</th>
                      <th>start_date</th>
                      <th>end_date</th>
                      <th>More</th>
                    </tr>
                  </thead>
                  {renderCustomerRows()}
                </Table>
              </Container>
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
      </div>
    </>
  );
};

export default ProjectRequestedForApprovalProgress;
