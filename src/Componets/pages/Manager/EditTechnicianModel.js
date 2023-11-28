// EditTechnicianModal.js

import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const EditTechnicianModal = ({ show, onHide, technician, onSave }) => {
  console.log(technician);
  const [editedTechnician, setEditedTechnician] = useState({
    name: technician.name,
    surname: technician.surname,
    email_address: technician.email_address,
    phone_number: technician.phone_number,
    nationality: technician.nationality,
    qualification: technician.qualification,
    level: technician.level,
  });

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    surname: Yup.string().required("Surname is required"),
    email_address: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone_number: Yup.string().required("Phone is required"),
    nationality: Yup.string().required("Nationality is required"),
    qualification: Yup.string().required("Qualification is required"),
    level: Yup.string().required("Level is required"),
  });

  const formik = useFormik({
    initialValues: editedTechnician,
    validationSchema,
    onSubmit: (values) => {
      values = { ...values, techId: technician.id, avatar: technician.avatar };
      console.log("Formik validation", values);
      onSave(values);
    },
  });

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Technician</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label className="fw-bolder">Email :</Form.Label>
            <Form.Control
              readOnly
              type="email"
              placeholder="Enter email"
              name="email_address"
              value={formik.values.email_address}
              onChange={formik.handleChange}
              isInvalid={
                formik.touched.email_address && formik.errors.email_address
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email_address}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formName">
            <Form.Label className="fw-bolder">Name :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              isInvalid={formik.touched.name && formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formSurname">
            <Form.Label className="fw-bolder">Surname :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter surname"
              name="surname"
              value={formik.values.surname}
              onChange={formik.handleChange}
              isInvalid={formik.touched.surname && formik.errors.surname}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.surname}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPhone">
            <Form.Label className="fw-bolder">Phone :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone"
              name="phone_number"
              value={formik.values.phone_number}
              onChange={formik.handleChange}
              isInvalid={
                formik.touched.phone_number && formik.errors.phone_number
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.phone_number}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formNationality">
            <Form.Label className="fw-bolder">Nationality :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter nationality"
              name="nationality"
              value={formik.values.nationality}
              onChange={formik.handleChange}
              isInvalid={
                formik.touched.nationality && formik.errors.nationality
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.nationality}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formQualification">
            <Form.Label className="fw-bolder">Qualification :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter qualification"
              name="qualification"
              value={formik.values.qualification}
              onChange={formik.handleChange}
              isInvalid={
                formik.touched.qualification && formik.errors.qualification
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.qualification}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formLevel">
            <Form.Label className="fw-bolder">Level :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter level"
              name="level"
              value={formik.values.level}
              onChange={formik.handleChange}
              isInvalid={formik.touched.level && formik.errors.level}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.level}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={formik.handleSubmit}>
          Edit Technician
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTechnicianModal;
