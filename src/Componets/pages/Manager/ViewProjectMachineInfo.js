import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  Modal,
  Spinner,
  Table,
  Row,
  Col,
} from "react-bootstrap";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  Manager_Base_Url,
  Project_Machine_Details,
} from "../../../Api/Manager_Api";
import NavbarManagerDashboard from "../../NavBar/navbarManagerDashboard";
import PageSpinner from "../Common/PageSpinner";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";

export default function ViewProjectMachineInfo() {
  const navigate = useNavigate();

  let { projectID } = useParams();

  const [machineInfoDetails, setMachineInfoDetails] = useState([]);
  const [projectSpecificDetails, setProjectSpecificDetails] = useState([]);
  const [machineToDelete, setMachineToDelete] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeletingMachine, setIsDeletingMachine] = useState(false);

  const fetchMachineDetails = async () => {
    try {
      setIsLoading(true); // Set loading to true when fetching starts

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

      const response = await axios.get(Project_Machine_Details, config);

      console.log(response.data.data);
      setMachineInfoDetails(response.data.data);

      // Filter the machineInfoDetails array to get project-specific details
      const specificDetails = response.data.data.find(
        (machineInfo) => machineInfo.project_id === projectID
      );

      if (specificDetails) {
        setProjectSpecificDetails(specificDetails.machine_data);
      }

      // Fetch completed, set loading to false
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // Make sure to set loading to false in case of an error
    }
  };

  const handleDeleteMachineDetails = (machineID, projectID, machineSerial) => {
    setMachineToDelete({ machineID, projectID, machineSerial });
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteMachine = async () => {
    const { machineID, projectID } = machineToDelete;

    try {
      setIsDeletingMachine(true);
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
      const response = await axios.put(
        `${Manager_Base_Url}deleteMachine?machineId=${machineID}&projectId=${projectID}`,
        {},
        config
      );

      if (response.data.status === 200) {
        toast.success(response.data.message);
        fetchMachineDetails();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsDeletingMachine(false);
    }
    setShowDeleteConfirmation(false);
  };

  useEffect(() => {
    fetchMachineDetails();
  }, [projectID]);

  return (
    <>
      <NavbarManagerDashboard />

      <Container>
        <div className="text-center wow fadeInUp my-5" data-wow-delay="0.1s">
          <h6 className="section-title bg-white text-center text-primary px-3">
            Manager's Panel
          </h6>
          <h1 className="mb-5">View Project Specific Machines</h1>
        </div>

        <Row>
          <Col>
            <Button
              variant="primary"
              as={NavLink}
              to={"/managemachineinfo"}
              className="my-4"
            >
              <FaArrowLeft /> Back to Machine Info Details
            </Button>
          </Col>
        </Row>

        {isLoading ? ( // Conditional rendering based on loading state
          <div>
            <PageSpinner />
          </div> // You can replace this with a loading spinner component
        ) : (
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>Serial No.</th>
                <th>Machine Type</th>
                {/* <th>Hour Count</th> */}
                {/* <th>Nominal Speed</th> */}
                {/* <th>Actual Speed</th> */}
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projectSpecificDetails.map((machine, i) => (
                <>
                  <tr key={machine.machine_id}>
                    <td>{machine.serial}</td>
                    <td>{machine.machine_type}</td>
                    {/* <td>{machine.hour_count}</td> */}
                    {/* <td>{machine.nom_speed}</td> */}
                    {/* <td>{machine.act_speed}</td> */}
                    <td>{machine.description}</td>
                    <td>
                      <Dropdown drop="centered">
                        <Dropdown.Toggle
                          variant="success"
                          size="sm"
                          id="machine-actions-dropdown"
                        >
                          Actions
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            size="sm"
                            className="edit-machine-action"
                            onClick={() =>
                              navigate(
                                `/project-attached-machine-details/edit-machine/${projectID}/${machine.machine_id}`
                              )
                            }
                          >
                            Edit Machine
                          </Dropdown.Item>
                          <Dropdown.Item
                            size="sm"
                            className="delete-machine-action"
                            onClick={() =>
                              handleDeleteMachineDetails(
                                machine.machine_id,
                                projectID,
                                machine.serial
                              )
                            }
                          >
                            Delete Machine
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                </>
              ))}
              <tr></tr>
            </tbody>
          </Table>
        )}

        {showDeleteConfirmation && (
          <Modal
            show={showDeleteConfirmation}
            onHide={() => setShowDeleteConfirmation(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              Are you sure you want to delete this machine? <br />
              <strong>Serial No. {machineToDelete.machineSerial}</strong>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowDeleteConfirmation(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={confirmDeleteMachine}
                disabled={isDeletingMachine}
              >
                {isDeletingMachine ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Confirm"
                )}
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Container>
    </>
  );
}
