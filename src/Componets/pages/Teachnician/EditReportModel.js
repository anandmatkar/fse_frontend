import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Technician_Edit_Report } from "../../../Api/Technicians_Api";

function EditReportModal({ report, onEdit, onClose, fetchData }) {
  const formik = useFormik({
    initialValues: {
      description: report.description,
      comments: report.comments,
      duration: report.duration,
      date: report.date,
    },
    validationSchema: Yup.object({
      description: Yup.string().required("Description is required"),
      comments: Yup.string().required("Comments are required"),
      duration: Yup.number().required("Duration is required"),
      date: Yup.date().required("Date is required"),
    }),
    onSubmit: async (values) => {
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
          reportId: report.id,
          description: values.description,
          duration: values.duration,
          comments: values.comments,
          date: values.date,
        };

        const response = await axios.put(
          Technician_Edit_Report,
          updatedData,
          config
        );

        if (response.data.status === 200) {
          onEdit(updatedData);
          onClose();
          fetchData();
          toast.success(response.data.message);
        } else {
          onEdit(updatedData);
          onClose();
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Report</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              {...formik.getFieldProps("description")}
              isInvalid={
                formik.touched.description && formik.errors.description
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.description}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formComments">
            <Form.Label>Comments</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              {...formik.getFieldProps("comments")}
              isInvalid={formik.touched.comments && formik.errors.comments}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.comments}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="form-group">
            <label htmlFor="duration">Duration:</label>
            <select
              className="form-control"
              name="duration"
              value={formik.values.duration}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
            {formik.touched.duration && formik.errors.duration && (
              <div className="invalid-feedback">{formik.errors.duration}</div>
            )}
          </div>
          <Form.Group controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              {...formik.getFieldProps("date")}
              isInvalid={formik.touched.date && formik.errors.date}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.date}
            </Form.Control.Feedback>
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditReportModal;
