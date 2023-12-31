import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import NavbarManagerDashboard from "../../NavBar/navbarManagerDashboard";
import { Row, Col, Button, Table, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { Manager_Base_Url } from "../../../Api/Manager_Api";
import { FaArrowLeft } from "react-icons/fa";
import { AiFillProfile } from "react-icons/ai";

function ProjectData() {
  const { techID, projectId, machineId } = useParams();
  const [projectData, setProjectData] = useState([]);
  const [showApprovedButton, setShowApprovedButton] = useState(false);

  async function handleApproveClick() {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${Manager_Base_Url}validateReport?techId=${techID}&projectId=${projectId}&machineId=${machineId}`,
        {
          method: "PUT", // Adjust the method as needed (POST, PUT, etc.)
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
      console.error("Error approving report:", error);

      // Show an error toast message
      toast.error("Error approving report");
    }
  }

  useEffect(() => {
    async function fetchProjectData() {
      try {
        const token = Cookies.get("token");
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
        console.error("Error fetching project data:", error);
      }
    }

    fetchProjectData();
  }, [machineId, techID, projectId]);

  return (
    <div>
      <NavbarManagerDashboard />

      <div className="text-center wow fadeInUp my-5" data-wow-delay="0.1s">
        <h6 className="section-title bg-white text-center text-primary px-3">
          Manager's Panel
        </h6>
        <h1 className="mb-5">Project Technician Report Details</h1>
      </div>
      <div className="container-fluid mt-5">
        <Row>
          <Col>
            <Button variant="primary" as={NavLink} to={-1} className="my-4">
              <FaArrowLeft /> Back to Project Details
            </Button>
          </Col>
        </Row>
        <div>
          <div className="card p-2">
            <div className="d-flex justify-content-end mx-2">
              {showApprovedButton && (
                <button
                  className="btn btn-success border border-0"
                  onClick={handleApproveClick}
                >
                  Approve
                </button>
              )}
            </div>
            <div className="card-body">
              <div className="bf-table-responsive rounded">
                <Container fluid>
                  <Table responsive hover className="bf-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Comments</th>
                        <th>Documents</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projectData.length > 0 ? (
                        projectData.map((report) => (
                          <tr key={report.id}>
                            {/* {console.log(report)} */}
                            <td>{report.date}</td>
                            <td>{report.description}</td>
                            <td>{report.duration}</td>
                            <td>{report.comments}</td>
                            <td>
                              {report.project_documents.length > 0 ? (
                                <>
                                  {report.project_documents.map((document) => (
                                    <a
                                      key={document.id}
                                      href={document.file_path}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      <AiFillProfile
                                        size="30px"
                                        color="black"
                                      />
                                    </a>
                                  ))}
                                </>
                              ) : (
                                <span>No Attachment Found</span>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No project technician report data found...
                          </td>
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
