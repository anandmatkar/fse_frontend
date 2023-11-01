import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { Technician_Edit_Report } from "../../../Api/Technicians_Api";

function EditReportModal({ report, onEdit, onClose, fetchData }) {
  const [editedReport, setEditedReport] = useState(report);

  useEffect(() => {
    setEditedReport(report);
  }, [report]);

  const handleEdit = async () => {
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
        reportId: editedReport.id,
        description: editedReport.description,
        duration: editedReport.duration,
        comments: editedReport.comments,
        date: editedReport.date,
      };

    //   console.log(updatedData);

    const response = await axios.put(Technician_Edit_Report, updatedData, config);

    if(response.data.status === 200) {
        onEdit(editedReport);
        onClose();
        fetchData();
        toast.success(response.data.message);
    } else {
        onEdit(editedReport);
        onClose();
        toast.error(response.data.message);
    }
    } catch (error) {
      toast.error(error.message);
    }
    
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Report</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              type="text"
              value={editedReport.description}
              onChange={(e) =>
                setEditedReport({
                  ...editedReport,
                  description: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group controlId="formComments">
            <Form.Label>Comments</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={3}
              value={editedReport.comments}
              onChange={(e) =>
                setEditedReport({ ...editedReport, comments: e.target.value })
              }
            />
          </Form.Group>
          <div className="form-group">
            <label htmlFor="duration">Duration:</label>
            <select
              className="form-control"
              name="duration"
              value={editedReport.duration}
              onChange={(e) =>
                setEditedReport({ ...editedReport, duration: e.target.value })
              }
              required
            >
              <option value="" hidden>
                Select Duration
              </option>
              {[...Array(10).keys()].map((i) => (
                <option value={i + 1} key={i}>
                  {i + 1} hr
                </option>
              ))}
            </select>
          </div>
          <Form.Group controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              required
              type="date"
              value={editedReport.date}
              onChange={(e) =>
                setEditedReport({ ...editedReport, date: e.target.value })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleEdit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditReportModal;
