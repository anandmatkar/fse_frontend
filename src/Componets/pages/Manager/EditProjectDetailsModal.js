import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import {
  Teachnician_List_Api,
  Update_Project_Details,
} from "../../../Api/Manager_Api";
import { useFormik } from "formik";
import * as Yup from "yup";
import EditProjectAddMachineModal from "./EditProjectAddMachineModal";
import "./EditProjectDetailsModal.css";
import EditProjectViewMachineModal from "./EditProjectViewMachineModal";
import { Alert, Space, Tag, Button as AntButton } from "antd";
import { NavLink } from "react-router-dom";

function EditProjectDetailsModal({ show, onHide, project, fetchProjectList }) {
  const [showAddMachineModal, setShowAddMachineModal] = useState(false);
  const [showViewMachineModal, setShowViewMachineModal] = useState(false);
  const [machineFormDataList, setMachineFormDataList] = useState([]);
  const [technicians, setTechnicians] = useState([]);

  console.log(project);

  const handleOpenAddMachineModal = () => {
    setShowAddMachineModal(true);
  };

  const handleCloseAddMachineModal = () => {
    setShowAddMachineModal(false);
  };

  const handleOpenViewMachineModal = () => {
    setShowViewMachineModal(true);
  };

  const handleCloseViewMachineModal = () => {
    setShowViewMachineModal(false);
  };

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
          machineDetails: machineFormDataList,
        };

        console.log(updatedData);
        // console.log(machineFormDataList);

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

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
    }
    // Fetch technician data
    axios
      .get(Teachnician_List_Api) // You need to replace this with your API endpoint
      .then((response) => {
        const techniciansData = response.data.data;
        const technicianNames = techniciansData.map(
          (technician) => technician.name
        );
        setTechnicians(techniciansData);
      })
      .catch((error) => {
        console.error("Error fetching technician data:", error);
      });
  }, []);

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        centered
        dialogClassName="edit-project-modal-width"
        aria-labelledby="example-custom-modal-styling-title"
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bolder">Edit Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Col>
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
              </Col>
              <Col>
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
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>
                <b>Description</b>
              </Form.Label>
              <Form.Control
                as={"textarea"}
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

            <Row>
              <Col lg={6} md={12}>
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
                    isInvalid={
                      formik.touched.start_date && formik.errors.start_date
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.start_date}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg={6} md={12}>
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
                    isInvalid={
                      formik.touched.end_date && formik.errors.end_date
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.end_date}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col lg={4} md={4} sm={4} xs={4}>
                <Button
                  onClick={handleOpenAddMachineModal}
                  size="sm"
                  className="mb-2 mx-2"
                >
                  Add Machine
                </Button>
              </Col>
              <Col lg={8} md={8} sm={8} xs={8}>
                <span>
                  <Alert
                    type="info"
                    showIcon
                    className="fw-bolder p-1"
                    // message={` Machines Attached : ${project.machine_count}`}
                    action={
                      <Space className="text-center">
                        <Row>
                          <Col lg={12} md={12}>
                            <span>{` Machines Attached : ${project.machine_count}`}</span>
                          </Col>
                          <Col lg={12} md={12}>
                            <NavLink
                              to={`/project-attached-machine-details/${project.project_id}`}
                            >
                              <AntButton
                                type="text"
                                size="small"
                                ghost
                                className="fw-bold text-primary"
                              >
                                Manage Machines
                              </AntButton>
                            </NavLink>
                          </Col>
                        </Row>
                      </Space>
                    }
                  />
                </span>
              </Col>
            </Row>

            {/* <Button
              onClick={handleOpenViewMachineModal}
              size="sm"
              className="mb-2 mx-2"
            >
              View Added Machines
            </Button> */}

            {machineFormDataList.length > 0 && (
              <>
                <Alert
                  showIcon
                  type="success"
                  className="my-2"
                  message={
                    <span className="fs-6 fw-bolder">{`New Machines Added ${machineFormDataList.length}`}</span>
                  }
                />
                <Alert
                  showIcon
                  type="warning"
                  className="my-2"
                  message={
                    <span className="fs-6 fw-bolder">{`Please Save Details to Reflect Changes. Otherwise Changes May be Lost.`}</span>
                  }
                />
              </>
            )}

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

      <EditProjectAddMachineModal
        show={showAddMachineModal}
        onHide={handleCloseAddMachineModal}
        onSubmit={(values) => {
          // console.log(values);
          setMachineFormDataList(values);
          handleCloseAddMachineModal();
        }}
        project={project}
      />

      <EditProjectViewMachineModal
        show={showViewMachineModal}
        onHide={handleCloseViewMachineModal}
        onSubmit={(values) => {
          console.log(values);
        }}
        project={project}
      />
    </>
  );
}

export default EditProjectDetailsModal;
