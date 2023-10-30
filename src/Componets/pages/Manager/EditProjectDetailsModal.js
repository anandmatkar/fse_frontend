import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

function EditProjectDetailsModal({ show, onHide, project, onUpdate }) {
  const initialEditedProject = {
    description: 'project.description',
    start_date: 'project.start_date',
    end_date: 'project.end_date',
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
        description: editedProject.description,
        start_date: editedProject.start_date,
        end_date: editedProject.end_date,
      };

      const response = await axios.put(
        `${'Update_Project_Manager'}?projectId=${project.project_id}`,
        updatedData,
        config
      );

      if (response.data.success) {
        onUpdate();
        toast.success("Project details updated successfully.");
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
        <Modal.Title>Edit Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
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
              type="text"
              name="start_date"
              value={editedProject.start_date}
              onChange={handleEditInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label><b>End Date</b></Form.Label>
            <Form.Control
              type="text"
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
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditProjectDetailsModal;
