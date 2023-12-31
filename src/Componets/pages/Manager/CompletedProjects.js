import React, { useState, useEffect } from 'react';
import { Table, Container, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Project_List_Manager } from './../../../Api/Manager_Api';
import NavbarManagerDashboard from '../../NavBar/navbarManagerDashboard';

const CompletedProjects = () => {
  const [completedProjects, setCompletedProjects] = useState([]);
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
          const completedProjectsData = data.data.completedProjects;
          setCompletedProjects(completedProjectsData);
        } else {
          console.error('API request was not successful:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const filteredProjects = completedProjects.filter((project) =>
    project.customer_name.toLowerCase().includes(search.toLowerCase())
  );

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentProjects = filteredProjects.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

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

  const renderProjectRows = () => {
    if (currentProjects.length === 0) {
      return (
        <tr>
          <td colSpan="9" className="text-center">
            No data found
          </td>
        </tr>
      );
    }

    return currentProjects.map((project, index) => (
      <tr key={index}>
        <td>{project.order_id}</td>
        <td>{project.customer_account}</td>
        <td>{project.customer_name}</td>
        <td>{project.country}</td>
        <td>{project.city}</td>
        <td>{project.description}</td>
        <td>{project.start_date}</td>
        <td>{project.end_date}</td>
        <td>
          <Link
            to={`/projectstatusdetails/${project.project_id}`}
            className="bg-primary text-light border-0 border link-offset-2 link-underline link-underline-opacity-0 rounded"
          >
            Details
          </Link>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <NavbarManagerDashboard />
      <div className="container-fluid mt-5">
        <div className="text-center wow fadeInUp my-2" data-wow-delay="0.1s">
          <h6 className="section-title bg-white text-center text-primary px-3">
            Manager's Panel
          </h6>
          <h1 className="mb-5">Completed Projects</h1>
        </div>

        <div className="card">
          <div className="p-2">
            <FormControl
              type="text"
              className="w-100 my-4"
              placeholder="Search by Customer Name..."
              onChange={(e) => {
                console.log('Search input:', e.target.value);
                setSearch(e.target.value);
              }}
            />
          </div>
          <div className="card-body">
            <div className="bf-table-responsive">
              <Container fluid>
                <Table striped bordered responsive>
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
                  {renderProjectRows()}
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

export default CompletedProjects;
