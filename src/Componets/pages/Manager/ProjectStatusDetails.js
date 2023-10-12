import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { BiSolidShow } from 'react-icons/bi';
import { FormControl, Container } from 'react-bootstrap';
import NavbarManagerDashboard from '../../NavBar/navbarManagerDashboard';
import { Manager_Base_Url } from '../../../Api/Manager_Api';

const ProjectStatusDetails = () => {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState([]);
  const [project, setProject] = useState(null);
  const [searchTechnician, setSearchTechnician] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { projectId } = useParams();

  useEffect(() => {
    const token = Cookies.get('token');
    fetch(
      `${Manager_Base_Url}projectDetails?projectId=${projectId}`,
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
        if (data && data.data && data.data.length > 0) {
          setProject(data.data[0]);
          setJobData(data.data);
        } else {
          console.error('API response is not in the expected format:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [projectId]);

  const handleDeleteProject = async () => {
    const token = Cookies.get('token');
    try {
      const response = await fetch(
        `${Manager_Base_Url}deleteProject?projectId=${projectId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Redirect to a different page after successful deletion, e.g., the project list page
      navigate('/projectprogress'); // Change the route accordingly
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const filteredJobData = jobData.filter((customer) =>
    customer.technician_data.some(
      (technician) =>
        technician.name
          .toLowerCase()
          .includes(searchTechnician.toLowerCase()) ||
        technician.surname
          .toLowerCase()
          .includes(searchTechnician.toLowerCase())
    )
  );

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentJobData = filteredJobData.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(filteredJobData.length / itemsPerPage);

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

  const canGoToNextPage = currentPage < totalPages;

  const renderCustomerRows = () => {
    if (currentJobData.length === 0) {
      return (
        <tr>
          <td colSpan="10" className="text-center">
            No data found
          </td>
        </tr>
      );
    }
  };

  return (
    <>
      <NavbarManagerDashboard />

      <div className="text-center wow fadeInUp my-2" data-wow-delay="0.1s">
          <h6 className="section-title bg-white text-center text-primary px-3">
            Manager's Panel
          </h6>
          <h1 className="mb-5">Project Details</h1>
        </div>

      <div className="job-progress mt-2">
        <div>
          <div className="d-flex float-end mt-2 p-2">
            <button className="btn btn-danger" onClick={handleDeleteProject}>
              Delete
            </button>
          </div>
          {project ? (
            <div className="mx-5">
              <p>
                <b>Order ID:</b> {project.order_id}
              </p>
              <p>
                <b>Customer Name:</b> {project.customer_name}
              </p>
              <p>
                <b>Customer Account ID: </b>
                {project.customer_account}
              </p>
              <p>
                <b>Description: </b>
                {project.description}
              </p>
            </div>
          ) : (
            <p>Loading project details...</p>
          )}
        </div>
        <div className="jobcontainer container mt-5">
          <div className="card p-2">
            <FormControl
              type="text"
              className="mx-4 mt-4"
              placeholder="Search Technicians"
              onChange={(e) => setSearchTechnician(e.target.value)}
              style={{
                width: '25%',
                border: '1px solid black',
                float: 'right',
              }}
            />
            <div className="card-body">
              <div className="bf-table-responsive">
                <Container fluid>
                  <h3>Technician Details</h3>
                  <Table responsive hover className="bf-table">
                    <thead>
                      <tr>
                        <th>Qualification</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Scope</th>
                        <th>Start_date</th>
                        <th>End_date</th>
                        <th>Tech Report</th>
                        <th>Time Sheet</th>
                        <th>Machine Details</th>
                      </tr>
                    </thead>

                    <tbody>
                      {currentJobData.map((job) =>
                        job.technician_data.map((technician, index) => (
                          <tr key={`${job.project_id}-${technician.id}`}>
                            <td>{technician.qualification || 'N/A'}</td>
                            <td>
                              {`${technician.name} ${technician.surname}` ||
                                'N/A'}
                            </td>
                            <td>{technician.email_address}</td>
                            <td>{technician.phone_number}</td>
                            <td>{technician.email_address}</td>
                            <td>{job.scope_of_work}</td>
                            <td>{job.start_date}</td>
                            <td>{job.end_date}</td>

                            <td className="text-center">
                              {technician.project_report_data &&
                              technician.project_report_data.length > 0 ? (
                                <Link
                                  to={`/projectreportdata/${technician.id}/${job.project_id}`}
                                >
                                  <i
                                    className="fa fa-address-book"
                                    style={{ fontSize: '20px' }}
                                  ></i>
                                </Link>
                              ) : (
                                'No Report'
                              )}
                            </td>
                            <td className="text-center">
                              {technician.timesheet_data &&
                              technician.timesheet_data.length > 0 ? (
                                <Link
                                  to={`/timesheetforapproval/${technician.id}/${job.project_id}`}
                                >
                                  <i
                                    className="fa fa-book"
                                    style={{ fontSize: '20px' }}
                                  ></i>
                                </Link>
                              ) : (
                                'No Timesheet'
                              )}
                            </td>
                            <td className="text-center">
                              {technician.machine_data.length > 0 ? (
                                <Link
                                  to={`/detailsOfMachineData/${technician.machine_data[0].id}/${job.project_id}`}
                                >
                                  <BiSolidShow
                                    color="black"
                                    className="border border-0 btn fs-1  btn-info"
                                  />
                                </Link>
                              ) : (
                                'No Details '
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                      {renderCustomerRows()}
                    </tbody>
                  </Table>
                </Container>
              </div>
            </div>
            <nav className="dt-pagination">
              <ul className="dt-pagination-ul">
                <li
                  className={`dt-item ${currentPage === 1 ? 'disabled' : ''}`}
                >
                  <button
                    className="dt-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Prev
                  </button>
                </li>
                {renderPaginationButtons()}
                <li className={`dt-item ${!canGoToNextPage ? 'disabled' : ''}`}>
                  {/* Disable the "Next" button if there's no more data */}
                  {canGoToNextPage ? (
                    <button
                      className="dt-link"
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Next
                    </button>
                  ) : (
                    <span>No data found</span>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectStatusDetails;
