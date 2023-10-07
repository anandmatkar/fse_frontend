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
        if (Array.isArray(data.data.projectRequestedForApproval)) {
          setJobData(data.data.projectRequestedForApproval);
        } else {
          console.error('API response is not in the expected format:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="job-progress">
      <h2>Job Progress</h2>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>Order_ID</th>
            <th>customer_account</th>
            <th>customer_name</th>
            <th>country</th>
            <th>description</th>
            <th>start_date</th>
            <th>end_date</th>
            <th>More</th>
          </tr>
        </thead>
        <tbody>
          {jobData.map((job, index) => (
            <tr key={index}>
              <td>{job.order_id}</td>
              <td>{job.customer_account}</td>
              <td>{job.customer_name}</td>
              <td>{job.country}</td>
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
      </Table>
    </div>
  );
};

export default JobProgress;
