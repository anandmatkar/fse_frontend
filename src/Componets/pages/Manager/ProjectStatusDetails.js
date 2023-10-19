import React, { useState, useEffect } from 'react';
import { Table, Container, Button, FormControl, Modal } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { BiSolidShow } from 'react-icons/bi';
import { SiGooglesheets } from 'react-icons/si';
import NavbarManagerDashboard from '../../NavBar/navbarManagerDashboard';
import { Manager_Base_Url } from '../../../Api/Manager_Api';
import { toast } from 'react-toastify';

const ProjectStatusDetails = () => {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState([]);
  const [project, setProject] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [searchTechnician, setSearchTechnician] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { projectId } = useParams();

  useEffect(() => {
    const token = Cookies.get('token');
    fetch(`${Manager_Base_Url}projectDetails?projectId=${projectId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(`HTTP error! Status: ${response.status}`);
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

  const showDeleteConfirmation = (project) => {
    setCustomerToDelete(project);
    setShowDeleteModal(true);
  };

  // Function to hide the delete confirmation modal
  const hideDeleteConfirmation = () => {
    setCustomerToDelete(null);
    setShowDeleteModal(false);
  };

  const handleApprovedProject = async () => {
    const token = Cookies.get('token');

    try {
      const response = await fetch(
        `${Manager_Base_Url}completeProject?projectId=${projectId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        // Check the status of the response, not response.data.status
        const data = await response.json(); // Parse the response JSON
        if (data.success) {
          toast.success(data.message);
        } else {
          toast.error(data.message); // Handle error response
        }
      } else {
        // Handle non-200 status codes (e.g., 4xx or 5xx errors)
        console.error('Error approving project:', response.statusText);
      }

      // Navigate only if the request was successful
      if (response.status === 200) {
        navigate('/projectStatus');
      }
    } catch (error) {
      console.error('Error approving project:', error);
    }
  };

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
      const data = await response.json(); // Parse the response JSON

      if (data.status === 200) {
        toast.success(data.message);
        navigate('/projectprogress');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
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
          <div className="d-flex float-end mt-2 p-2 ">
            <div className="d-flex justify-content-end me-2">
              <div>
                <button
                  className="btn btn-success me-2"
                  onClick={handleApprovedProject}
                >
                  Approve
                </button>
              </div>
              <div>
                <button
                  className="btn btn-danger me-2"
                  onClick={() => showDeleteConfirmation(project)}
                >
                  Delete
                </button>
              </div>
            </div>
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
            <p>No project details...</p>
          )}
        </div>
        <div className="container-fluid mt-5">
          <div className="card p-2">
            <div>
              <FormControl
                type="text"
                className=" w-100 form-control p-2"
                placeholder="Search Technicians name"
                onChange={(e) => setSearchTechnician(e.target.value)}
                // style={{
                //   border: '1px solid black',
                //   float: 'right',
                // }}
              />
            </div>
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
                        {/* <th>Tech Report</th> */}
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
                              {technician.timesheet_data &&
                              technician.timesheet_data.length > 0 ? (
                                <Link
                                  to={`/timesheetforapproval/${technician.id}/${job.project_id}`}
                                >
                                  <SiGooglesheets
                                    color={
                                      technician.timesheet_data.some(
                                        (timesheet) =>
                                          timesheet.is_timesheet_requested_for_approval
                                      )
                                        ? 'red'
                                        : technician.timesheet_data.some(
                                            (timesheet) =>
                                              timesheet.is_timesheet_approved
                                          )
                                        ? 'green'
                                        : 'blue'
                                    }
                                    className="fs-3"
                                  ></SiGooglesheets>
                                </Link>
                              ) : (
                                'No Timesheet'
                              )}
                            </td>

                            <td className="text-center">
                              {technician.machine_data.length > 0 ? (
                                <Link
                                  to={`/detailsOfMachineData/${technician.id}/${job.project_id}`}
                                >
                                  <BiSolidShow className="fs-3" />
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

          {showDeleteModal && (
            <Modal show={showDeleteModal} onHide={hideDeleteConfirmation}>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete the project?
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="danger"
                  onClick={() => {
                    hideDeleteConfirmation();
                    handleDeleteProject();
                  }}
                >
                  Delete
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => hideDeleteConfirmation()}
                >
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectStatusDetails;
