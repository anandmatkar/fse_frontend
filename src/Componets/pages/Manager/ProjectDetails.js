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
import "./ProjectDetails.css";
import NavbarManagerDashboard from "../../NavBar/navbarManagerDashboard";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Approve_Project_Api,
  Project_Details_Manager,
} from "../../../Api/Manager_Api";
import PageSpinner from "../Common/PageSpinner";
import { FcDocument } from "react-icons/fc";
import { FaArrowLeft } from "react-icons/fa";

function ProjectDetails() {
  const { projectID } = useParams();
  const navigate = useNavigate();

  const tabNames = [
    "project-details",
    "customer-details",
    "timesheets",
    "machines-details",
  ];

  const [activeTab, setActiveTab] = useState("project-details");
  const [projectDetails, setProjectDetails] = useState([]);
  const [projectMachineDetails, setProjectMachineDetails] = useState([]);
  const [technicianDetails, setTechnicianDetails] = useState([]);
  const [isFetchingProjectDetails, setIsFetchingProjectDetails] =
    useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);

  // Function to handle the approval request
  const handleProjectApproveRequest = async () => {
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
        `${Approve_Project_Api}?projectId=${projectID}`,
        {},
        config
      );

      if (response.data.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      fetchProjectDetails();
      setShowApproveModal(false);
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
        `${Project_Details_Manager}?projectId=${projectID}`,
        config
      );

      if (response.data.status === 200) {
        setProjectDetails(response.data.data[0]);
        setProjectMachineDetails(response.data.data[0].machine_data);
        setTechnicianDetails(response.data.data[0].technician_data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setIsFetchingProjectDetails(false);
    } finally {
      setIsFetchingProjectDetails(false);
    }
  };

  useEffect(() => {
    fetchProjectDetails();
  }, []);

  const navigateToShowReports = (technicianID, machineID) => {
    navigate(`/projectdata/${machineID}/${projectID}/${technicianID}`);
  };

  const navigateToShowTimeSheets = (technicianID) => {
    navigate(`/timesheetforapproval/${technicianID}/${projectID}`);
  };

  return (
    <>
      <NavbarManagerDashboard />

      <Container>
        <Tab.Container activeKey={activeTab}>
          <div className="text-center wow fadeInUp my-5" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Manager's Panel
            </h6>
            <h1 className="mb-5">Project Details</h1>
          </div>

          {isFetchingProjectDetails ? (
            <PageSpinner />
          ) : (
            <>
              <Row>
                <Col>
                  <Button
                    variant="primary"
                    as={NavLink}
                    to={"/projectStatus"}
                    className="my-4"
                  >
                    <FaArrowLeft /> Back to Project Status
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col lg={3} md={12}></Col>
                <Col lg={3} md={12}></Col>
                <Col lg={3} md={12}></Col>
                <Col lg={3} md={12}>
                  {projectDetails.is_requested_for_approval ? (
                    <Button
                      variant="success"
                      className="w-100 my-2"
                      onClick={() => setShowApproveModal(true)}
                    >
                      Approve Project
                    </Button>
                  ) : null}
                </Col>
              </Row>

              <Nav variant="tabs">
                {tabNames.map((tabName) => (
                  <Nav.Item key={tabName}>
                    <Nav.Link
                      eventKey={tabName}
                      onClick={() => setActiveTab(tabName)}
                      className={
                        activeTab === tabName
                          ? "custom-tab-active"
                          : "custom-tab"
                      }
                    >
                      {tabName.replace("-", " ").toUpperCase()}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>

              <Tab.Content>
                {tabNames.map((tabName) => (
                  <Tab.Pane key={tabName} eventKey={tabName}>
                    {activeTab === tabName && (
                      <div>
                        {tabName === "project-details" ? (
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
                                  <b>Customer Name :</b>{" "}
                                  {projectDetails.customer_name}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <b>Description :</b>{" "}
                                  {projectDetails.description}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <b>Start Date :</b>{" "}
                                  {projectDetails.start_date}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <b>End Date :</b> {projectDetails.end_date}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <b>Status :</b>{" "}
                                  {!projectDetails.is_completed &&
                                  !projectDetails.is_requested_for_approval ? (
                                    <Button
                                      variant="primary"
                                      size="sm"
                                      className="mx-5"
                                    >
                                      In Progress
                                    </Button>
                                  ) : projectDetails.is_completed ? (
                                    <Button
                                      variant="success"
                                      size="sm"
                                      className="mx-5"
                                    >
                                      Completed
                                    </Button>
                                  ) : projectDetails.is_requested_for_approval ? (
                                    <Button
                                      variant="warning"
                                      size="sm"
                                      className="mx-5"
                                    >
                                      Waiting
                                    </Button>
                                  ) : (
                                    <></>
                                  )}
                                </ListGroup.Item>
                              </ListGroup>
                            </Card>
                          </>
                        ) : tabName === "customer-details" ? (
                          <>
                            <Card className="w-100 my-2">
                              <Card.Header className="fs-4 text-center">
                                Customer Description
                              </Card.Header>
                              <ListGroup variant="flush">
                                <ListGroup.Item>
                                  <b>Customer Name : </b>{" "}
                                  {projectDetails.customer_name}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <b>Customer Contact : </b>{" "}
                                  {projectDetails.customer_contact}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <b>Customer Account : </b>{" "}
                                  {projectDetails.customer_account}
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
                        ) : tabName === "timesheets" ? (
                          <>
                            <Card className="w-100 my-2">
                              <Card.Header className="fs-4 text-center">
                                TimeSheets
                              </Card.Header>
                              <Table responsive>
                                <thead>
                                  <tr>
                                    <th>Name</th>
                                    <th>Profile</th>
                                    <th>TimeSheet</th>
                                    <th>Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {technicianDetails.length > 0 &&
                                    technicianDetails.map(
                                      (technician, index) => (
                                        <tr>
                                          <td>{technician.name}</td>
                                          <td>{technician.qualification}</td>
                                          <td>
                                            <FcDocument
                                              className="fs-3"
                                              onClick={() =>
                                                navigateToShowTimeSheets(
                                                  technician.id
                                                )
                                              }
                                            />
                                          </td>
                                          <td>
                                            {technician.timesheet_data.length >
                                            0 ? (
                                              <>
                                                {!technician.timesheet_data[0]
                                                  .is_timesheet_approved &&
                                                !technician.timesheet_data[0]
                                                  .is_timesheet_requested_for_approval ? (
                                                  <Button
                                                    variant="primary"
                                                    size="sm"
                                                  >
                                                    Open
                                                  </Button>
                                                ) : technician.timesheet_data[0]
                                                    .is_timesheet_approved ? (
                                                  <Button
                                                    variant="success"
                                                    size="sm"
                                                  >
                                                    Approved
                                                  </Button>
                                                ) : technician.timesheet_data[0]
                                                    .is_timesheet_requested_for_approval ? (
                                                  <Button
                                                    variant="warning"
                                                    size="sm"
                                                  >
                                                    Waiting for Approval
                                                  </Button>
                                                ) : (
                                                  <></>
                                                )}
                                              </>
                                            ) : (
                                              <>
                                                <Button
                                                  variant="secondary"
                                                  size="sm"
                                                  className="report-status mt-2"
                                                >
                                                  <b>No Time Sheets</b>
                                                </Button>
                                              </>
                                            )}
                                          </td>
                                        </tr>
                                      )
                                    )}
                                </tbody>
                              </Table>
                            </Card>
                          </>
                        ) : tabName === "machines-details" ? (
                          <>
                            <Card className="w-100 my-2">
                              <Card.Header className="fs-4 text-center">
                                Machine Details
                              </Card.Header>
                              <Table responsive>
                                <thead>
                                  <tr>
                                    <th>Machine</th>
                                    <th>Tech</th>
                                    <th>Report</th>
                                    <th>Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {projectMachineDetails.length > 0 &&
                                    projectMachineDetails.map(
                                      (machine, index) => (
                                        <>
                                          <tr>
                                            <td>{machine.serial}</td>
                                            <td>
                                              {machine.tech_machine_data
                                                .length > 0 &&
                                                machine.tech_machine_data.map(
                                                  (technician, techIndex) => (
                                                    <>
                                                      <span key={techIndex}>
                                                        <ListGroup variant="flush">
                                                          <ListGroup.Item>
                                                            <b>
                                                              {technician.name}
                                                            </b>
                                                          </ListGroup.Item>
                                                        </ListGroup>
                                                      </span>
                                                      {/* <span>
                                                                                        <Button onClick={() => navigateToShowReports(machine)}>Reports</Button>
                                                                                    </span> */}
                                                    </>
                                                  )
                                                )}
                                            </td>
                                            <td>
                                              {machine.tech_machine_data
                                                .length > 0 &&
                                                machine.tech_machine_data.map(
                                                  (technician, techIndex) => (
                                                    <>
                                                      <span className="my-2 report-icon">
                                                        <Button
                                                          size="sm"
                                                          onClick={() =>
                                                            navigateToShowReports(
                                                              technician.tech_id,
                                                              technician.machine_id
                                                            )
                                                          }
                                                        >
                                                          Reports
                                                        </Button>
                                                      </span>
                                                    </>
                                                  )
                                                )}
                                            </td>
                                            <td>
                                              {machine.tech_machine_data
                                                .length > 0 &&
                                                machine.tech_machine_data.map(
                                                  (technician, techIndex) => (
                                                    <div key={techIndex}>
                                                      {technician.project_report_data.some(
                                                        (report) =>
                                                          report.is_requested_for_approval
                                                      ) ? (
                                                        <Button
                                                          variant="warning"
                                                          size="sm"
                                                          className="report-status mt-2"
                                                        >
                                                          Waiting for Approval
                                                        </Button>
                                                      ) : technician.project_report_data.some(
                                                          (report) =>
                                                            report.is_approved
                                                        ) ? (
                                                        <Button
                                                          variant="success"
                                                          size="sm"
                                                          className="report-status mt-2"
                                                        >
                                                          Approved
                                                        </Button>
                                                      ) : technician.project_report_data.some(
                                                          (report) =>
                                                            !report.is_requested_for_approval &&
                                                            !report.is_approved
                                                        ) ? (
                                                        <Button
                                                          variant="primary"
                                                          size="sm"
                                                          className="report-status mt-2"
                                                        >
                                                          In Progress
                                                        </Button>
                                                      ) : (
                                                        <Button
                                                          variant="secondary"
                                                          size="sm"
                                                          className="report-status mt-2"
                                                        >
                                                          <b>No reports</b>
                                                        </Button>
                                                      )}
                                                    </div>
                                                  )
                                                )}
                                            </td>
                                          </tr>
                                        </>
                                      )
                                    )}
                                </tbody>
                              </Table>
                            </Card>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    )}
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </>
          )}
        </Tab.Container>

        {showApproveModal && (
          <Modal
            show={showApproveModal}
            onHide={() => setShowApproveModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Approval</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              Are you sure you want to approve project <br />
              <b>{`Order ID : ${projectDetails.order_id}`}</b>?
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowApproveModal(false)}
              >
                Cancel
              </Button>
              <Button variant="success" onClick={handleProjectApproveRequest}>
                Approve
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Container>
    </>
  );
}

export default ProjectDetails;
