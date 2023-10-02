import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faClipboard } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';

const JobProgress = () => {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    // Fetch data from the API endpoint
    const token = Cookies.get('token');
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token, // Assuming you use Bearer token format
      },
    };
    fetch('/api/v1/manager/projectList', axiosConfig)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data.data.projectInProgress)) {
          setJobData(data.data.projectInProgress);
        } else {
          console.error('API response is not in the expected format:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const [showTimeSheetModal, setShowTimeSheetModal] = useState(false);

  const [showReportModaal, setShoeReportModal] = useState(false);

  const handleShowModal = (jobIndex) => {
    const selectedProject = jobData[jobIndex];
    setSelectedJob(selectedProject);
    navigate(`/projectstatusdetails/${selectedProject.project_id}`);
  };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  //   // setShowTimeSheetModal(false);
  // };

  // const handleShowTimeSheetModal = () => {
  //   setShowTimeSheetModal(true);
  // };

  // const handleCloseTimeSheetModal = () => {
  //   setShowTimeSheetModal(false);
  // };
  // const handleShowReportModal = () => {
  //   setShoeReportModal(true);
  // };
  // const handleCloseReportModal = () => {
  //   setShoeReportModal(false);
  // };

  return (
    <div className="job-progress">
      <h2>Job Progress</h2>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>Order_ID</th>
            <th>project_type</th>
            <th>description</th>
            <th>start_date</th>
            <th>end_date</th>
            <th>customer_name</th>
            <th>customer_contact</th>
            <th>customer_account</th>
            <th>email_address</th>
            <th>phone_number</th>
            <th>country</th>
            <th>city</th>
            <th>address</th>
            <th>scope_of_work</th>
            <th>More</th>
          </tr>
        </thead>
        <tbody>
          {jobData.map((job, index) => (
            <tr key={index}>
              <td>{job.order_id}</td>
              <td>{job.project_type}</td>
              <td>{job.description}</td>
              <td>{job.start_date}</td>
              <td>{job.end_date}</td>
              <td>{job.customer_name}</td>
              <td>{job.customer_contact}</td>
              <td>{job.customer_account}</td>
              <td>{job.email_address}</td>
              <td>{job.phone_number}</td>
              <td>{job.country}</td>
              <td>{job.city}</td>
              <td>{job.address}</td>
              <td>{job.scope_of_work}</td>
              <td>
                <Link
                  to={`/projectprogress/${job.project_id}`} // Use the project_id to create the link
                  className="btn btn-primary"
                  onClick={() => handleShowModal(index)}
                >
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default JobProgress;
