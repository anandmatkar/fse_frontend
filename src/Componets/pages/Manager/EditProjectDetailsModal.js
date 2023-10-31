import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { Update_Project_Details } from '../../../Api/Manager_Api';

function EditProjectDetailsModal({ show, onHide, project, fetchProjectList }) {
  const initialEditedProject = {
    order_id: project.order_id,
    description: project.description,
    start_date: project.start_date,
    end_date: project.end_date,
  };

  const [editedProject, setEditedProject] = useState(initialEditedProject);

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProject({
      ...editedProject,
      [name]: value,
    });
  }

  const updateProjectDetails = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        console.error("Token not found in Cookies.");
        return;
      }
      const config = {
        headers: {
          Authorization: token,
        },
      };

      const updatedData = {
        projectId: project.project_id,
        description: editedProject.description,
        startDate: editedProject.start_date,
        endDate: editedProject.end_date,
      };

      const response = await axios.put(
        `${Update_Project_Details}`,
        updatedData,
        config
      );

      if (response.data.status === 200) {
        console.log(response.data);
        fetchProjectList();
        toast.success(response.data.message);
      } else {
        fetchProjectList();
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
    onHide();
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Project Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label><b>Order ID</b></Form.Label>
            <Form.Control
              type="text"
              name="order_id"
              value={editedProject.order_id}
              onChange={handleEditInputChange}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label><b>Description</b></Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={editedProject.description}
              onChange={handleEditInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label><b>Start Date</b></Form.Label>
            <Form.Control
              type="date"
              name="start_date"
              value={editedProject.start_date}
              onChange={handleEditInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label><b>End Date</b></Form.Label>
            <Form.Control
              type="date"
              name="end_date"
              value={editedProject.end_date}
              onChange={handleEditInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={updateProjectDetails}>
          Edit Project Details
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditProjectDetailsModal;
