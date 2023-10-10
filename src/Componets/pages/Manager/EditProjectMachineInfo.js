import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Table,
  Form,
  Row,
  Col,
  InputGroup,
} from 'react-bootstrap';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Project_Machine_Details } from '../../../Api/Manager_Api';
export default function EditProjectMachineInfo() {
  const navigate = useNavigate();

  let { machineID } = useParams();

  const [machineInfoDetails, setMachineInfoDetails] = useState([]);
  const [projectSpecificDetails, setProjectSpecificDetails] = useState([]);

  const [formData, setFormData] = useState({
    machine_id: '',
    machine_type: '',
    serial: '',
    hour_count: '',
    nom_speed: '',
    act_speed: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditMachineDetails = (e) => {
    e.preventDefault();
    // You can handle the form submission logic here
    console.log(formData);
  };

  const fetchMachineDetails = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Token not found in localStorage.');
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
        (machineInfo) => machineInfo.project_id === machineID
      );

      if (specificDetails) {
        setProjectSpecificDetails(specificDetails.machine_data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Edit Project Specific Machine Details</h1>

      <Container>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Serial No.</InputGroup.Text>
          <Form.Control
            placeholder="Serial No."
            aria-label="Serial No."
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon2">Machine Type</InputGroup.Text>
          <Form.Control
            placeholder="Machine Type"
            aria-label="Machine Type"
            aria-describedby="basic-addon2"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon3">Hour Count</InputGroup.Text>
          <Form.Control
            placeholder="Hour Count"
            aria-label="Hour Count"
            aria-describedby="basic-addon3"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon4">Nominal Speed</InputGroup.Text>
          <Form.Control
            placeholder="Nominal Speed"
            aria-label="Nominal Speed"
            aria-describedby="basic-addon4"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon5">Actual Speed</InputGroup.Text>
          <Form.Control
            placeholder="Actual Speed"
            aria-label="Actual Speed"
            aria-describedby="basic-addon5"
          />
        </InputGroup>

        <InputGroup>
          <InputGroup.Text>Description</InputGroup.Text>
          <Form.Control
            as="textarea"
            aria-label="With textarea"
            placeholder="Machine Description"
          />
        </InputGroup>
      </Container>
    </>
  );
}
