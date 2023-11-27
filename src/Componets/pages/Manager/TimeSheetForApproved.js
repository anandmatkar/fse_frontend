import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { Table, Container, Button, Row, Col } from "react-bootstrap";
import NavbarManagerDashboard from "../../NavBar/navbarManagerDashboard";
import {
  Manager_Base_Url,
  Show_Signed_Paper_Technicians,
} from "../../../Api/Manager_Api";
import { toast } from "react-toastify";
import axios from "axios";
import { Base_Url } from "../../../Api/Base_Url";
import { FaArrowLeft } from "react-icons/fa";

const TimeSheetForApproved = () => {
  const { techId, projectId } = useParams();
  const [technicianData, setTechnicianData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [documentDownloadLink, setDocumentDownloadLink] = useState(null);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${Manager_Base_Url}timesheetDetails?techId=${techId}&projectId=${projectId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      // console.log(data);
      setTechnicianData(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const fetchSignedDocument = async () => {
    try {
      const token = Cookies.get("token");

      if (!token) {
        console.error("Token not found in localStorage.");
        return;
      }
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const response = await axios.get(
        `${Show_Signed_Paper_Technicians}?projectId=${projectId}&techId=${techId}`,
        config
      );
      console.log(response.data);
      // console.log(response.data.data[0].file_path);
      if (response.data.status === 200 && response.data.data.length > 0) {
        setDocumentDownloadLink(response.data.data[0].file_path);
      }
    } catch (error) {
      // toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
    fetchSignedDocument();
  }, [techId, projectId]);

  // Calculate the total number of pages based on the number of items and items per page
  const totalPages = Math.ceil(technicianData.length / itemsPerPage);

  const renderApprovalButton = () => {
    if (
      technicianData.some((entry) => entry.is_timesheet_requested_for_approval)
    ) {
      return (
        <Button variant="success" onClick={handleApprovedButtonClick}>
          Approve Timesheet
        </Button>
      );
    }
    return null;
  };

  const handleApprovedButtonClick = async () => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${Manager_Base_Url}acceptTimesheetRequest?projectId=${projectId}&techId=${techId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      fetchData();
      navigate("/projectStatus");
    } catch (error) {
      console.error("Error accepting timesheet request:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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

  const handleDownloadDocument = () => {
    console.log(documentDownloadLink);
    if (documentDownloadLink !== null) {
      const newTab = window.open(documentDownloadLink, "_blank");
      newTab.focus();
    }
  };

  return (
    <>
      <NavbarManagerDashboard />
      <div className="jobcontainer container mt-5">
        <div className="text-center wow fadeInUp my-5" data-wow-delay="0.1s">
          <h6 className="section-title bg-white text-center text-primary px-3">
            Manager's Panel
          </h6>
          <h1 className="mb-5">Project Technician Timesheets</h1>
        </div>

        <Row>
          <Col lg={3} md={12}>
            <Button variant="primary" as={NavLink} to={-1} className="my-4">
              <FaArrowLeft /> Back to Project Details
            </Button>
          </Col>
          <Col lg={3} md={12}></Col>
          <Col lg={3} md={12}></Col>
          <Col lg={3} md={12}>
            <Button
              variant="warning"
              as={NavLink}
              to={`/show-signed-papers-to-manager/${projectId}/${techId}`}
              className="my-4"
            >
              Show Signed Paper Attached
            </Button>
          </Col>
        </Row>

        {/* <Row>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col lg={3} md={6}>
            {documentDownloadLink !== null ? (
              <Button
                variant="warning"
                className="my-2 w-100"
                onClick={handleDownloadDocument}
              >
                Signed Copy Timesheet
              </Button>
            ) : (
              <></>
            )}
          </Col>
        </Row> */}

        <div className="card">
          {loading ? (
            <h1>Loading technician details...</h1>
          ) : technicianData.length === 0 ? (
            <h4 className="my-2 mx-2">No technician Timesheet found.</h4>
          ) : (
            <div className="card-body">
              <div className="bf-table-responsive">
                <Container fluid>
                  <Table responsive hover className="bf-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Lunch</th>
                        <th>Comments</th>
                        {/* <th>Attachments</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {technicianData
                        .slice(
                          (currentPage - 1) * itemsPerPage,
                          currentPage * itemsPerPage
                        )
                        .map((entry) => (
                          <tr key={entry.id}>
                            <td>{entry.date}</td>
                            <td>{entry.start_time}</td>
                            <td>{entry.end_time}</td>
                            <td>{entry.lunch_time}</td>
                            <td>{entry.comments}</td>
                            {/* <td>
                              {entry.timesheet_attach.length > 0
                                ? entry.timesheet_attach.map((attachment) => (
                                    <a
                                      key={attachment.id}
                                      href={attachment.file_path}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <BsFillFileEarmarkPostFill className="fs-3"></BsFillFileEarmarkPostFill>{" "}
                                    </a>
                                  ))
                                : "No attachments"}
                            </td> */}
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </Container>
              </div>
              <div className="d-flex float-end mt-3 p-2">
                {renderApprovalButton()}{" "}
              </div>
            </div>
          )}
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
      </div>
    </>
  );
};

export default TimeSheetForApproved;
