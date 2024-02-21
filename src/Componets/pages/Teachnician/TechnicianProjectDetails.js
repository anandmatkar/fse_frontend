import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Table,
  Nav,
  Tab,
  ListGroup,
  Modal,
} from "react-bootstrap";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import "./TechnicianProjectDetails.css";
import PageSpinner from "../Common/PageSpinner";
import { FcDocument } from "react-icons/fc";
import Layout4 from "../../Layout/Layout4";
import {
  Show_Signed_Paper_To_Tech,
  Technician_Assigned_Project_Details,
  Technician_DeleteTimesheet,
  Technician_Timesheet_Approval,
  Technician_Upload_Agreement,
} from "../../../Api/Technicians_Api";
import NavTechnicanProfile from "../../NavBar/navTechnicanProfile";
import TimeSheetModal from "./TimeSheetModal";
import { Show_Signed_Paper_Technicians } from "../../../Api/Manager_Api";
import { FaArrowLeft } from "react-icons/fa";
import { Alert, Tag } from "antd";

export default function TechnicianProjectDetails() {
  const { projectID } = useParams();
  const navigate = useNavigate();
  const fileInputRef = React.createRef();

  const tabNames = [
    "project-details",
    "customer-details",
    "reports",
    "timesheets",
  ];

  const [activeTab, setActiveTab] = useState("project-details");
  const [projectDetails, setProjectDetails] = useState({});
  const [technicianDetails, setTechnicianDetails] = useState([]);
  const [machineDetails, setMachineDetails] = useState([]);
  const [isFetchingProjectDetails, setIsFetchingProjectDetails] =
    useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showTimeSheetModal, setShowTimeSheetModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [timesheetToDelete, setTimesheetToDelete] = useState(null);
  const [documentDownloadLink, setDocumentDownloadLink] = useState(null);

  const showDeleteConfirmationDialog = (timesheet) => {
    setTimesheetToDelete(timesheet);
    setShowDeleteConfirmation(true);
  };

  const hideDeleteConfirmationDialog = () => {
    setTimesheetToDelete(null);
    setShowDeleteConfirmation(false);
  };

  const handleTimesheetDeletion = async (timesheet) => {
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

      let url = `${Technician_DeleteTimesheet}?projectId=${projectID}&timeSheetId=${timesheetToDelete.id}`;

      const response = await axios.get(url, config);

      if (response.status === 200) {
        toast.success(response.data.message);
        hideDeleteConfirmationDialog();
        setTimesheetToDelete(null);
        fetchProjectDetails();
      } else {
        toast.error(response.data.message);
        hideDeleteConfirmationDialog();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleOpenModal = () => {
    setShowTimeSheetModal(true);
  };

  const handleCloseModal = () => {
    setShowTimeSheetModal(false);
  };

  const fetchSignedDocument = async (techId) => {
    try {
      const token = Cookies.get("token");

      if (!token) {
        toast.error("Token not found in Cookies.");
        return;
      }
      const config = {
        headers: {
          Authorization: token,
        },
      };

      const response = await axios.get(
        `${Show_Signed_Paper_To_Tech}?projectId=${projectID}`,
        config
      );
      // console.log(response.data.data[0].file_path);
      if (response.data.status === 200 && response.data.data.length > 0) {
        setDocumentDownloadLink(response.data.data[0].file_path);
      } else {
        // toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchProjectDetails = async () => {
    try {
      setIsFetchingProjectDetails(true);
      let token = Cookies.get("token");
      if (!token) {
        toast.error(
          "Token not found in Cookies. Session Timeout Please Login Again."
        );
        return;
      }
      const config = {
        headers: {
          Authorization: token,
        },
      };

      let response = await axios.get(
        `${Technician_Assigned_Project_Details}?projectId=${projectID}`,
        config
      );

      if (response.data.status === 200) {
        setProjectDetails(response.data.data[0]);
        setTechnicianDetails(response.data.data[0].technician_data);
        setMachineDetails(response.data.data[0].machine_data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setIsFetchingProjectDetails(false);
    } finally {
      setIsFetchingProjectDetails(false);
    }
  };

  const handleImageUpload = async (e) => {
    try {
      const selectedTimeSheetFile = e.target.files[0];
      let token = Cookies.get("token");
      if (!token) {
        toast.error(
          "Token not found in Cookies. Session Timeout Please Login Again."
        );
        return;
      }
      const config = {
        headers: {
          Authorization: token,
        },
      };

      if (!selectedTimeSheetFile) {
        toast.error("Please Select an Timesheet Agreement to upload.");
        return;
      }

      // Create a FormData object to send the image to the API
      const formData = new FormData();
      formData.append("file", selectedTimeSheetFile);

      // Make an HTTP POST request to the upload API
      const response = await axios.post(
        `${Technician_Upload_Agreement}?projectId=${projectID}`,
        formData,
        config
      );

      if (response.data.status === 201) {
        toast.success(response.data.message);
        fetchSignedDocument();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const showConfirmationDialog = () => {
    setShowConfirmation(true);
  };

  const hideConfirmationDialog = () => {
    setShowConfirmation(false);
  };

  const handleRequestApprovalClick = async () => {
    showConfirmationDialog();
  };

  const confirmApproval = async () => {
    hideConfirmationDialog();
    try {
      let token = Cookies.get("token");

      if (!token) {
        toast.error(
          "Token not found in Cookies. Session Timeout Please Login Again."
        );
        return;
      }
      const config = {
        headers: {
          Authorization: token,
        },
      };

      let response = await axios.put(
        `${Technician_Timesheet_Approval}?projectId=${projectID}`,
        {},
        config
      );

      if (response.data.status === 200) {
        toast.success(response.data.message);
        fetchProjectDetails();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDownloadDocument = () => {
    fetchSignedDocument();
    console.log(documentDownloadLink);
    if (documentDownloadLink !== null) {
      const newTab = window.open(documentDownloadLink, "_blank");
      newTab.focus();
    }
  };

  useEffect(() => {
    fetchProjectDetails();
    fetchSignedDocument();
  }, []);

  return (
    <>
      <NavTechnicanProfile />

      <div className="text-center my-5">
        <h6 className="section-title bg-white text-center text-primary px-3">
          Technician's Dashboard
        </h6>
        <h1>Project Details</h1>
      </div>

      {isFetchingProjectDetails ? (
        <PageSpinner />
      ) : (
        <Container className="mb-5 pb-5">
          <Row>
            <Col>
              <Button
                variant="primary"
                as={NavLink}
                to={"/techD"}
                className="my-2"
              >
                <FaArrowLeft /> Back to Technicians Dashboard
              </Button>
            </Col>
          </Row>
          <Nav variant="tabs">
            {tabNames.map((tabName) => (
              <Nav.Item key={tabName}>
                <Nav.Link
                  eventKey={tabName}
                  onClick={() => setActiveTab(tabName)}
                  className={
                    activeTab === tabName ? "custom-tabs-active" : "custom-tabs"
                  }
                >
                  {tabName.replace("-", " ").toUpperCase()}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>

          {/* Render tab content based on the activeTab state */}
          {activeTab === "project-details" && (
            <>
              <Card className="w-100 my-2">
                <Card.Header className="fs-4 text-center">
                  Project Description
                </Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <b>Order ID :</b> {projectDetails.order_id}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Customer Name :</b> {projectDetails.customer_name}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Description :</b> {projectDetails.description}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Start Date :</b> {projectDetails.start_date}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>End Date :</b> {projectDetails.end_date}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Status :</b>{" "}
                    {!projectDetails.is_completed &&
                    !projectDetails.is_requested_for_approval ? (
                      <Button variant="primary" size="sm" className="mx-5">
                        In Progress
                      </Button>
                    ) : projectDetails.is_completed ? (
                      <Button variant="success" size="sm" className="mx-5">
                        Completed
                      </Button>
                    ) : projectDetails.is_requested_for_approval ? (
                      <Button variant="warning" size="sm" className="mx-5">
                        Waiting
                      </Button>
                    ) : (
                      <></>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </>
          )}
          {activeTab === "customer-details" && (
            <>
              <Card className="w-100 my-2">
                <Card.Header className="fs-4 text-center">
                  Customer Description
                </Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <b>Customer Name : </b> {projectDetails.customer_name}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Customer Contact : </b> {projectDetails.customer_contact}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Customer Account : </b> {projectDetails.customer_account}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Email : </b> {projectDetails.email_address}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Address : </b> {projectDetails.address}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Phone :</b> {projectDetails.phone_number}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Country :</b> {projectDetails.country}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>City :</b> {projectDetails.city}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </>
          )}
          {activeTab === "reports" && (
            <>
              <Card className="w-100 my-2">
                <Card.Header className="fs-4 text-center">Reports</Card.Header>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Machine Serial</th>
                      <th>Type</th>
                      <th>Reports</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {machineDetails.length > 0 &&
                      machineDetails.map((machine, index) => (
                        <tr>
                          <td>{machine.serial}</td>
                          <td>{machine.machine_type}</td>
                          <td>
                            {
                              <FcDocument
                                className="fs-3"
                                onClick={() =>
                                  navigate(
                                    `/AssignReportData/${projectID}/${machine.id}`
                                  )
                                }
                              />
                            }
                          </td>
                          <td>
                            {machine.project_report_data.length > 0 ? (
                              !machine.project_report_data[0]
                                .is_requested_for_approval &&
                              !machine.project_report_data[0].is_approved ? (
                                <Button variant="primary" size="sm">
                                  In Progress
                                </Button>
                              ) : machine.project_report_data[0]
                                  .is_requested_for_approval ? (
                                <Button variant="warning" size="sm">
                                  Waiting
                                </Button>
                              ) : machine.project_report_data[0].is_approved ? (
                                <Button variant="success" size="sm">
                                  Approved
                                </Button>
                              ) : (
                                <></>
                              )
                            ) : (
                              <Button variant="secondary" size="sm">
                                No Reports
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </Card>
            </>
          )}
          {activeTab === "timesheets" && (
            <>
              <Card className="w-100 my-2">
                <Card.Header className="fs-4 text-center">
                  TimeSheets
                </Card.Header>
                <Container>
                  <Row>
                    <Col lg={3} md={12}>
                      {technicianDetails.length > 0 &&
                        technicianDetails.map((technician) =>
                          technician.timesheet_data.length > 0 ? (
                            technician.timesheet_data.some(
                              (timesheet) =>
                                timesheet.is_timesheet_requested_for_approval ||
                                timesheet.is_timesheet_approved
                            ) ? null : (
                              <TimeSheetModal
                                showModal={showTimeSheetModal}
                                onClose={handleCloseModal}
                                projectID={projectID}
                                fetchProjectDetails={fetchProjectDetails}
                                onNewTimesheet={(newTimesheet) => {
                                  setProjectDetails((prevProject) => {
                                    const updatedTechnicianData =
                                      prevProject.technician_data.map(
                                        (tech) => {
                                          if (tech.id === technician.id) {
                                            return {
                                              ...tech,
                                              timesheet_data: [
                                                ...tech.timesheet_data,
                                                newTimesheet,
                                              ],
                                            };
                                          }
                                          return tech;
                                        }
                                      );
                                    return {
                                      ...prevProject,
                                      technician_data: updatedTechnicianData,
                                    };
                                  });
                                }}
                              />
                            )
                          ) : (
                            <TimeSheetModal
                              showModal={showTimeSheetModal}
                              onClose={handleCloseModal}
                              projectID={projectID}
                              fetchProjectDetails={fetchProjectDetails}
                              onNewTimesheet={(newTimesheet) => {
                                setProjectDetails((prevProject) => {
                                  const updatedTechnicianData =
                                    prevProject.technician_data.map((tech) => {
                                      if (tech.id === technician.id) {
                                        return {
                                          ...tech,
                                          timesheet_data: [
                                            ...tech.timesheet_data,
                                            newTimesheet,
                                          ],
                                        };
                                      }
                                      return tech;
                                    });
                                  return {
                                    ...prevProject,
                                    technician_data: updatedTechnicianData,
                                  };
                                });
                              }}
                            />
                          )
                        )}
                    </Col>
                    <Col lg={3} md={12}>
                      {technicianDetails.length > 0 ? (
                        technicianDetails.map((technician) =>
                          technician.timesheet_data.length > 0 ? (
                            technician.timesheet_data[0]
                              .is_timesheet_requested_for_approval ||
                            technician.timesheet_data[0]
                              .is_timesheet_approved ? (
                              <></>
                            ) : (
                              <Button
                                variant="primary"
                                className="w-100 my-2"
                                onClick={() => handleRequestApprovalClick()}
                              >
                                Request Timesheet For Approval
                              </Button>
                            )
                          ) : (
                            <></>
                          )
                        )
                      ) : (
                        <></>
                      )}
                    </Col>
                    {/* <Col lg={3} md={12}>
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleImageUpload}
                      />
                      <Button
                        variant="warning"
                        className="w-100 my-2"
                        onClick={() => fileInputRef.current.click()}
                      >
                        Attach Signed Paper
                      </Button>
                    </Col> */}
                    <Col lg={3} md={12}>
                      {technicianDetails.length > 0 &&
                        technicianDetails.map((technician, index) => {
                          let showAlert = true; // Flag to track if the alert has been shown for this technician
                          return (
                            technician.timesheet_data.length > 0 &&
                            technician.timesheet_data.map(
                              (timesheet, index) => {
                                if (showAlert) {
                                  // Only show alert once for each technician
                                  showAlert = false; // Set the flag to false after showing the alert once
                                  return (
                                    <span key={index}>
                                      {!timesheet.is_timesheet_approved &&
                                      !timesheet.is_timesheet_requested_for_approval ? (
                                        <Alert
                                          type="info"
                                          message={"IN PROGRESS"}
                                          className="my-2 fw-bolder text-center"
                                          showIcon
                                        />
                                      ) : timesheet.is_timesheet_approved ? (
                                        <Alert
                                          type="success"
                                          message={"APPROVED"}
                                          className="my-2 fw-bolder text-center"
                                          showIcon
                                        />
                                      ) : timesheet.is_timesheet_requested_for_approval ? (
                                        <Alert
                                          type="warning"
                                          message={"WAITING FOR APPROVAL"}
                                          className="my-2 fw-bolder text-center"
                                          showIcon
                                        />
                                      ) : (
                                        <></>
                                      )}
                                    </span>
                                  );
                                } else {
                                  return null; // Return null for subsequent iterations of timesheet_data
                                }
                              }
                            )
                          );
                        })}
                    </Col>
                    <Col lg={3} md={12}>
                      <Button
                        variant="warning"
                        as={NavLink}
                        to={`/view-signed-paper-timesheet/${projectID}`}
                        className="my-2 w-100"
                      >
                        View Signed Papers
                      </Button>
                      {/* {documentDownloadLink !== null ? (
                        <Button
                          variant="warning"
                          className="my-2 w-100"
                          onClick={handleDownloadDocument}
                        >
                          View Signed Papers
                        </Button>
                      ) : (
                        <></>
                      )} */}
                    </Col>
                  </Row>
                </Container>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Lunch Time</th>
                      {/* <th>Attachment</th> */}
                      {/* <th>Status</th> */}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {technicianDetails.length > 0 &&
                      technicianDetails.map(
                        (technician, index) =>
                          technician.timesheet_data.length > 0 &&
                          technician.timesheet_data.map((timesheet, index) => (
                            <tr>
                              <td>{timesheet.date}</td>
                              <td>{timesheet.start_time}</td>
                              <td>{timesheet.end_time}</td>
                              <td>{timesheet.lunch_time}</td>
                              {/* <td>{<FcDocument className='fs-3'/>}</td> */}
                              {/* <td>
                                {timesheet.timesheet_attach_data.length > 0 &&
                                  timesheet.timesheet_attach_data.map(
                                    (attachment, attachmentIndex) => (
                                      <a
                                        key={attachmentIndex}
                                        href={attachment.file_path} // Set the URL of the attachment
                                        target="_blank" // Open the link in a new tab
                                        rel="noopener noreferrer" // Add security attributes
                                      >
                                        <FcDocument className="fs-3" />
                                      </a>
                                    )
                                  )}
                              </td> */}
                              {/* <td>
                                {!timesheet.is_timesheet_approved &&
                                !timesheet.is_timesheet_requested_for_approval ? (
                                  <Button variant="primary" size="sm">
                                    In Progress
                                  </Button>
                                ) : timesheet.is_timesheet_approved ? (
                                  <Button variant="success" size="sm">
                                    Approved
                                  </Button>
                                ) : timesheet.is_timesheet_requested_for_approval ? (
                                  <Button variant="warning" size="sm">
                                    Waiting for Approval
                                  </Button>
                                ) : (
                                  <></>
                                )}
                              </td> */}
                              <td>
                                {timesheet.is_timesheet_requested_for_approval ||
                                timesheet.is_timesheet_approved ? (
                                  <></>
                                ) : (
                                  <>
                                    <Button
                                      variant="danger"
                                      size="sm"
                                      onClick={() =>
                                        showDeleteConfirmationDialog(timesheet)
                                      }
                                    >
                                      Delete
                                    </Button>
                                  </>
                                )}
                              </td>
                            </tr>
                          ))
                      )}
                  </tbody>
                </Table>
              </Card>
            </>
          )}
        </Container>
      )}

      {/* Confirmation Dialog */}
      <Modal show={showConfirmation} onHide={hideConfirmationDialog} centered>
        <Modal.Header closeButton>
          <Modal.Title>Request Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to request timesheet for approval?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideConfirmationDialog}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmApproval}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Dialog */}
      <Modal
        show={showDeleteConfirmation}
        onHide={hideDeleteConfirmationDialog}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          Are you sure you want to delete this timesheet <br /> Dated :{" "}
          {timesheetToDelete ? <b>{timesheetToDelete.date}</b> : ""} ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideDeleteConfirmationDialog}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => handleTimesheetDeletion(timesheetToDelete)}
          >
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
