import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Update_Project_Details } from "../../../Api/Manager_Api";
import { useFormik } from "formik";
import * as Yup from "yup";

function EditProjectDetailsModal({ show, onHide, project, fetchProjectList }) {
  const validationSchema = Yup.object().shape({
    description: Yup.string().required("Description is required"),
    start_date: Yup.date().required("Start Date is required"),
    end_date: Yup.date()
      .required("End Date is required")
      .min(Yup.ref("start_date"), "End Date must be after Start Date"),
    project_type: Yup.string().required("Project Type is required"),
  });

  const formik = useFormik({
    initialValues: {
      order_id: project.order_id,
      description: project.description,
      start_date: project.start_date,
      end_date: project.end_date,
      project_type: project.project_type || "Select Project Type",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (values.project_type === "Select Project Type") {
          return toast.error("Please select a valid Project Type.");
        }
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
          description: values.description,
          startDate: values.start_date,
          endDate: values.end_date,
          projectType: values.project_type,
        };

        const response = await axios.put(
          `${Update_Project_Details}`,
          updatedData,
          config
        );

        if (response.data.status === 200) {
          fetchProjectList();
          toast.success(response.data.message);
        } else {
          fetchProjectList();
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setSubmitting(false);
        onHide();
      }
    },
  });

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Project Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>
              <b>Order ID</b>
            </Form.Label>
            <Form.Control
              type="text"
              name="order_id"
              value={formik.values.order_id}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              <b>Description</b>
            </Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.description && formik.errors.description
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.description}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              <b>Start Date</b>
            </Form.Label>
            <Form.Control
              type="date"
              name="start_date"
              value={formik.values.start_date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.start_date && formik.errors.start_date}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.start_date}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              <b>End Date</b>
            </Form.Label>
            <Form.Control
              type="date"
              name="end_date"
              value={formik.values.end_date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.end_date && formik.errors.end_date}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.end_date}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              <b>Project Type</b>
            </Form.Label>
            <Form.Select
              name="project_type"
              value={formik.values.project_type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.project_type && formik.errors.project_type
              }
            >
              <option>Select Project Type</option>
              <option>Change over part</option>
              <option>Overhaul</option>
              <option>Line installation</option>
              <option>Start up</option>
              <option>Commissioning machine</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {formik.errors.project_type}
            </Form.Control.Feedback>
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Edit Project Details
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditProjectDetailsModal;
