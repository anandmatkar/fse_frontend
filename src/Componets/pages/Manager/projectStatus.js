import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Table,
  Modal,
  Spinner,
} from "react-bootstrap";
import NavbarManagerDashboard from "../../NavBar/navbarManagerDashboard";
import Cookies from "js-cookie";
import {
  Delete_Project_Manager,
  Project_List_Manager,
} from "./../../../Api/Manager_Api";
import axios from "axios";
import { toast } from "react-toastify";
import PageSpinner from "../Common/PageSpinner";
import EditProjectDetailsModal from "./EditProjectDetailsModal";
import { FaArrowLeft } from "react-icons/fa";

function ProjectStatus() {
  const navigate = useNavigate();

  const tableHeads = [
    "Order ID",
    "Customer Name",
    "Country",
    "Start Date",
    "End Date",
    "View",
    "Edit",
    "Delete",
    "Status",
  ];

  const [projectList, setProjectList] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [isFetchingProject, setIsFetchingProject] = useState(false);

  const openDeleteModal = (project) => {
    setProjectToDelete(project);
    setShowDeleteModal(true);
  };

  // Open the edit modal and populate it with project data
  const openEditModal = (project) => {
    setProjectToEdit(project);
    setShowEditModal(true);
  };

  const handleDeleteConfirmation = async () => {
    if (projectToDelete) {
      // Make an API call to delete the project
      try {
        let token = Cookies.get("token");
        if (!token) {
          console.error("Token not found in Cookies.");
          return;
        }
        const config = {
          headers: {
            Authorization: token,
          },
        };

        let response = await axios.put(
          `${Delete_Project_Manager}?projectId=${projectToDelete.project_id}`,
          {},
          config
        );
        // console.log(response.data);
        if (response.data.success) {
          fetchProjectList();
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }

      setProjectToDelete(null);
      setShowDeleteModal(false);
    }
  };

  const fetchProjectList = async () => {
    try {
      setIsFetchingProject(true);

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

      let response = await axios.get(Project_List_Manager, config);

      if (response.data.status === 200) {
        setProjectList(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
      setIsFetchingProject(false);
    } finally {
      setIsFetchingProject(false);
    }
  };

  // Function to navigate to ProjectStatusDetails component
  const navigateToProjectDetails = (projectID) => {
    // You can add any necessary data or parameters to the navigate function if needed
    navigate(`/projectDetails/${projectID}`);
  };

  useEffect(() => {
    fetchProjectList();
  }, []);

  return (
    <>
      <NavbarManagerDashboard />

      <div className="text-center wow fadeInUp my-5" data-wow-delay="0.1s">
        <h6 className="section-title bg-white text-center text-primary px-3">
          Manager's Panel
        </h6>
        <h1 className="mb-5">Project Status</h1>
      </div>

      {isFetchingProject ? (
        <>
          <PageSpinner />
        </>
      ) : (
        <Container className="container-xxl py-4">
          <Container>
            <Row>
              <Col lg={3}>
                <Button
                  variant="primary"
                  as={NavLink}
                  to={"/manager"}
                  className="my-2"
                >
                  <FaArrowLeft /> Back to Manager Dashboard
                </Button>
              </Col>
            </Row>
            <Row>
              <Col lg={3}>
                <Button
                  variant="warning"
                  as={NavLink}
                  to={"/createP"}
                  className="my-2 w-100"
                >
                  Create Project
                </Button>
              </Col>
            </Row>
            <Row>
              <Table responsive hover>
                <thead>
                  <tr>
                    {tableHeads.map((heading) => (
                      <th>{heading}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {projectList.length > 0 ? (
                    <>
                      {projectList.map((project, index) => (
                        <tr key={index}>
                          <td>{project.order_id}</td>
                          <td>{project.customer_name}</td>
                          <td>{project.country}</td>
                          <td>{project.start_date}</td>
                          <td>{project.end_date}</td>
                          <td>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() =>
                                navigateToProjectDetails(project.project_id)
                              }
                            >
                              Details
                            </Button>
                          </td>
                          <td>
                            <Button
                              variant="warning"
                              size="sm"
                              onClick={() => openEditModal(project)}
                            >
                              Edit
                            </Button>
                            {/* <Button
                              variant="warning"
                              size="sm"
                              as={NavLink}
                              to={"/edit-project-details"}
                            >
                              Edit Page
                            </Button> */}
                          </td>
                          <td>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => openDeleteModal(project)}
                            >
                              Delete
                            </Button>
                          </td>
                          <td>
                            {!project.is_requested_for_approval &&
                            !project.is_completed ? (
                              <Button
                                variant="primary"
                                size="sm"
                                className="w-100"
                              >
                                In Progress
                              </Button>
                            ) : project.is_requested_for_approval ? (
                              <Button
                                variant="warning"
                                size="sm"
                                className="w-100"
                              >
                                Waiting
                              </Button>
                            ) : (
                              <Button
                                variant="success"
                                size="sm"
                                className="w-100"
                              >
                                Approved
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <>
                      <tr>
                        <td colSpan={"9"} className="text-center">
                          No Project Data to Show
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </Table>
            </Row>
          </Container>
        </Container>
      )}

      {showEditModal && (
        <EditProjectDetailsModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          project={projectToEdit}
          fetchProjectList={fetchProjectList}
        />
      )}

      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {projectToDelete && (
            <p className="text-center">
              Are you sure you want to delete the project with <br />
              <b>Order ID: {projectToDelete.order_id}?</b>
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirmation}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProjectStatus;
