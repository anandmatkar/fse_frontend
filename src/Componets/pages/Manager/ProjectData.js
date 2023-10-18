import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import NavbarManagerDashboard from '../../NavBar/navbarManagerDashboard';
import { Table, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Manager_Base_Url } from '../../../Api/Manager_Api';

function ProjectData() {
  const { techID, projectId, machineId } = useParams();
  const [projectData, setProjectData] = useState([]);
  const [showApprovedButton, setShowApprovedButton] = useState(false);

  async function handleApproveClick() {
    try {
      const token = Cookies.get('token');
      const response = await fetch(
        `${Manager_Base_Url}validateReport?techId=${techID}&projectId=${projectId}&machineId=${machineId}`,
        {
          method: 'PUT', // Adjust the method as needed (POST, PUT, etc.)
          headers: {
            Authorization: token,
          },
        }
      );

      if (!response.ok) {
        throw Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const approvalMessage = data.message;

      // Update the UI after the report is approved
      setShowApprovedButton(false);

      // Show a success toast message with the approval message
      toast.success(approvalMessage);
    } catch (error) {
      console.error('Error approving report:', error);

      // Show an error toast message
      toast.error('Error approving report');
    }
  }

  useEffect(() => {
    async function fetchProjectData() {
      try {
        const token = Cookies.get('token');
        const response = await fetch(
          `${Manager_Base_Url}reportDetails?techId=${techID}&projectId=${projectId}&machineId=${machineId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (!response.ok) {
          throw Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProjectData(data.data);
        const hasReportForApproval = data.data.some(
          (report) => report.is_requested_for_approval
        );
        setShowApprovedButton(hasReportForApproval);
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    }

    fetchProjectData();
  }, [machineId, techID, projectId]);

  return (
    <div>
      <NavbarManagerDashboard />
      <div className="jobcontainer container mt-5">
        <div>
          <div className="card p-2">
            <div className="d-flex justify-content-end mx-2">
              {showApprovedButton && (
                <button
                  className="btn btn-success border border-0"
                  onClick={handleApproveClick}
                >
                  Approved
                </button>
              )}
            </div>
            <div className="card-body">
              <div className="bf-table-responsive rounded">
                <Container fluid>
                  <h1 className="jobassigntext mb-4">Project Data Details</h1>
                  <Table responsive hover className="bf-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Comments</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projectData.length > 0 ? (
                        projectData.map((report) => (
                          <tr key={report.id}>
                            <td>{report.date}</td>
                            <td>{report.description}</td>
                            <td>{report.duration}</td>
                            <td>{report.comments}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4">Loading project data...</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </Container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectData;
