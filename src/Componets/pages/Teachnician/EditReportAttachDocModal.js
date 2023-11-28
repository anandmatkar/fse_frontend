import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const EditReportAttachDocModal = ({
  show,
  handleClose,
  handleEdit,
  documentText,
  document,
}) => {
  const [newDocument, setNewDocument] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewDocument(file);
  };

  const handleEditDocument = () => {
    if (!newDocument) {
      toast.error("Please select a New Document");
      return;
    }

    // Pass the new document to the parent component for further processing
    handleEdit(newDocument, document.id);
    setNewDocument("");
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit {documentText}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Choose a New Document:</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} required />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleEditDocument}>
          Update Document
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditReportAttachDocModal;
