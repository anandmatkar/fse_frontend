import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

const ProjectStatusDetails = () => {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState([]);
  const [project, setProject] = useState(null);
  const { projectId } = useParams();

  useEffect(() => {
    const token = Cookies.get('token');
    fetch(`/api/v1/manager/projectDetails?projectId=${projectId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
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

  return (
    <div className="job-progress">
      <h2>Project Details</h2>
      <div>
        {project ? (
          <div className="">
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
      <Table striped bordered responsive>
        <thead>
          <h3>Technician Details</h3>
          <tr>
            <th>Qualification</th>
            <th> Name</th>
            <th> Email</th>
            <th> Phone</th>
            <th>Email</th>
            <th>Scope</th>
            <th>Start_date</th>
            <th>Start_end</th>
            <th>Tech Report</th>
            <th>Time Sheet</th>
            {/* <th>More</th> */}
          </tr>
        </thead>
        <tbody>
          {jobData.map((job) =>
            job.technician_data.map((technician, index) => (
              <tr key={index}>
                <td>{technician.qualification || 'N/A'}</td>
                <td>{`${technician.name} ${technician.surname}` || 'N/A'}</td>
                <td>{job.email_address}</td>
                <td>{job.phone_number}</td>
                <td>{job.email_address}</td>
                <td>{job.scope_of_work}</td>
                <td>{job.start_date}</td>
                <td>{job.end_date}</td>
                <td>
                  {job.technician_data.map((technician, techIndex) => (
                    <div key={techIndex}>
                      {technician.project_report_data &&
                      technician.project_report_data.length > 0
                        ? technician.project_report_data.map(
                            (report, reportIndex) => (
                              <i
                                key={reportIndex}
                                className="fa fa-address-book"
                                style={{ fontSize: '20px' }}
                              ></i>
                            )
                          )
                        : 'No Report'}
                    </div>
                  ))}
                </td>

                <td>
                  {technician.timesheet_data &&
                  technician.timesheet_data.length > 0
                    ? technician.timesheet_data.map(
                        (timesheet, timesheetIndex) => (
                          <i
                            key={timesheetIndex}
                            className="fa fa-book"
                            style={{ fontSize: '20px' }}
                          ></i>
                        )
                      )
                    : 'No Timesheet'}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ProjectStatusDetails;
