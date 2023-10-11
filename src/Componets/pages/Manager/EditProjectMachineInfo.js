import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Table, Form, Row, Col, InputGroup } from "react-bootstrap";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Edit_Project_Machine_Details, Project_Machine_Details } from "../../../Api/Manager_Api";
import NavbarManagerDashboard from "../../NavBar/navbarManagerDashboard";

export default function EditProjectMachineInfo() {

    const navigate = useNavigate();

    let { projectID, machineID } = useParams();

    // console.log(projectID, machineID);

  const [machineInfoDetails, setMachineInfoDetails] = useState([]);
  const [projectSpecificDetails, setProjectSpecificDetails] = useState([]);
  const [machineAttachDetails, setMachineAttachDetails] = useState([]);
  const [editMode, setEditMode] = useState(false);


  const [formData, setFormData] = useState({
    machine_id: "",
    machine_type: "",
    serial: "",
    hour_count: "",
    nom_speed: "",
    act_speed: "",
    description: "",
  });

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditMachineDetails = async (e) => {
    e.preventDefault();
    // You can handle the form submission logic here
    console.log(formData);

    try {
        const token = localStorage.getItem("token");
  
        if (!token) {
          console.error("Token not found in localStorage.");
          return;
        }
  
        const config = {
          headers: {
            Authorization: token,
          },
        };
  
        // Make a PUT request to update the machine data
        const response = await axios.put(
          Edit_Project_Machine_Details,
          formData,
          config
        );
  
        if (response.status === 200) {
          // Update was successful, exit edit mode
          setEditMode(false);
          toast.success(response.data.message);

          // Navigate back to the previous page
            navigate(-1);
        }
      } catch (error) {
        console.log(error);
      }

  };

  const fetchMachineDetails = async () => {
    try {
      const token = localStorage.getItem("token");

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
        Project_Machine_Details,
        config
      );

      console.log(response.data.data);
      setMachineInfoDetails(response.data.data);

      // Find the project details based on projectID
      const projectDetails = response.data.data.find(
        (project) => project.project_id === projectID
      );

      if (projectDetails) {
        // Find the machine details based on machineID within the project
        const machineDetails = projectDetails.machine_data.find(
          (machine) => machine.machine_id === machineID
        );

        if (machineDetails) {
            setMachineAttachDetails(machineDetails.machine_attach)
          // Populate the form with the specific machine details
          setFormData({
            machine_id: machineDetails.machine_id,
            machine_type: machineDetails.machine_type,
            serial: machineDetails.serial,
            hour_count: machineDetails.hour_count,
            nom_speed: machineDetails.nom_speed,
            act_speed: machineDetails.act_speed,
            description: machineDetails.description,
          });
        }
        console.log(projectDetails);
        console.log(machineDetails);
        console.log(machineAttachDetails);
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMachineDetails();
  }, [projectID, machineID]);
  

  return (
    <>
    <NavbarManagerDashboard/>

      <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
        <h6 className="section-title bg-white text-center text-primary px-3">
          Manager's Panel
        </h6>
        <h1 className="mb-5">Edit Project Specific Machine Details</h1>
      </div>

      <Container>
      {editMode ? (
          <Form onSubmit={handleEditMachineDetails}>
            {/* Editable input fields */}
            <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Serial No.</InputGroup.Text>
            <Form.Control
            placeholder="Serial No."
            aria-label="Serial No."
            aria-describedby="basic-addon1"
            name="serial" // Ensure that the name matches the state property
            value={formData.serial}
            onChange={handleChange}
            />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon2">Machine Type</InputGroup.Text>
                <Form.Control
                placeholder="Machine Type"
                aria-label="Machine Type"
                aria-describedby="basic-addon2"
                name="machine_type"
                value={formData.machine_type}
                onChange={handleChange}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon3">Hour Count</InputGroup.Text>
                <Form.Control
                placeholder="Hour Count"
                aria-label="Hour Count"
                aria-describedby="basic-addon3"
                name="hour_count"
                value={formData.hour_count}
                onChange={handleChange}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon4">Nominal Speed</InputGroup.Text>
                <Form.Control
                placeholder="Nominal Speed"
                aria-label="Nominal Speed"
                aria-describedby="basic-addon4"
                name="nom_speed"
                value={formData.nom_speed}
                onChange={handleChange}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon5">Actual Speed</InputGroup.Text>
                <Form.Control
                placeholder="Actual Speed"
                aria-label="Actual Speed"
                aria-describedby="basic-addon5"
                name="act_speed"
                value={formData.act_speed}
                onChange={handleChange}
                />
            </InputGroup>

            <InputGroup>
                <InputGroup.Text>Description</InputGroup.Text>
                <Form.Control 
                as="textarea" 
                aria-label="With textarea" 
                placeholder="Machine Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                />
            </InputGroup>
            <Button type="submit" variant="success" className="my-4 mx-2">
              Update Machine Details
            </Button>
            <Button variant="danger" onClick={handleCancel} className="my-4 mx-2">
              Cancel
            </Button>
          </Form>
        ) : (
          // View mode with non-editable input fields
          <>
            <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Serial No.</InputGroup.Text>
            <Form.Control
            placeholder="Serial No."
            aria-label="Serial No."
            aria-describedby="basic-addon1"
            value={formData.serial}
            onChange={handleChange}
            />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon2">Machine Type</InputGroup.Text>
                <Form.Control
                placeholder="Machine Type"
                aria-label="Machine Type"
                aria-describedby="basic-addon2"
                value={formData.machine_type}
                onChange={handleChange}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon3">Hour Count</InputGroup.Text>
                <Form.Control
                placeholder="Hour Count"
                aria-label="Hour Count"
                aria-describedby="basic-addon3"
                value={formData.hour_count}
                onChange={handleChange}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon4">Nominal Speed</InputGroup.Text>
                <Form.Control
                placeholder="Nominal Speed"
                aria-label="Nominal Speed"
                aria-describedby="basic-addon4"
                value={formData.nom_speed}
                onChange={handleChange}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon5">Actual Speed</InputGroup.Text>
                <Form.Control
                placeholder="Actual Speed"
                aria-label="Actual Speed"
                aria-describedby="basic-addon5"
                value={formData.act_speed}
                onChange={handleChange}
                />
            </InputGroup>

            <InputGroup>
                <InputGroup.Text>Description</InputGroup.Text>
                <Form.Control 
                as="textarea" 
                aria-label="With textarea" 
                placeholder="Machine Description"
                value={formData.description}
                onChange={handleChange}
                />
            </InputGroup>
            {/* Add more input fields here */}
            <Button variant="info" className="my-4" onClick={handleEdit}>Edit Machine Info</Button>
          </>
        )}
      
      </Container>
    </>
  );
}
