import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Table,
  Form,
  Row,
  Col,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  Edit_Project_Machine_Details,
  Project_Machine_Details,
} from "../../../Api/Manager_Api";
import NavbarManagerDashboard from "../../NavBar/navbarManagerDashboard";
import { BsFiletypeDoc } from "react-icons/bs";
import PageSpinner from "../Common/PageSpinner";
import Cookies from "js-cookie";
import { FaArrowLeft } from "react-icons/fa";

export default function EditProjectMachineInfo() {
  const navigate = useNavigate();

  let { projectID, machineID } = useParams();

  const [machineInfoDetails, setMachineInfoDetails] = useState([]);
  const [projectSpecificDetails, setProjectSpecificDetails] = useState([]);
  const [machineAttachDetails, setMachineAttachDetails] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingMachineDetails, setIsFetchingMachineDetails] =
    useState(false);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    navigate(-1);
  };

  const handleEditMachineDetails = async (e) => {
    // e.preventDefault();
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
      setIsSubmitting(true);

      const response = await axios.put(
        Edit_Project_Machine_Details,
        formik.values,
        config
      );

      if (response.data.status === 200) {
        setEditMode(false);
        toast.success(response.data.message);
        navigate(-1);
      } else {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchMachineDetails = async () => {
    try {
      setIsFetchingMachineDetails(true);

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

      const response = await axios.get(Project_Machine_Details, config);

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
          setMachineAttachDetails(machineDetails.machine_attach);
          // Populate the form with the specific machine details
          formik.setValues({
            machine_id: machineDetails.machine_id,
            machine_type: machineDetails.machine_type,
            serial: machineDetails.serial,
            // hour_count: machineDetails.hour_count,
            // nom_speed: machineDetails.nom_speed,
            // act_speed: machineDetails.act_speed,
            description: machineDetails.description,
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetchingMachineDetails(false);
    }
  };

  const validationSchema = Yup.object().shape({
    serial: Yup.string().required("Serial No. is required"),
    machine_type: Yup.string().required("Machine Type is required"),
    // hour_count: Yup.number().required("Hour Count is required"),
    // nom_speed: Yup.number().required("Nominal Speed is required"),
    // act_speed: Yup.number().required("Actual Speed is required"),
    description: Yup.string().required("Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      machine_id: "",
      machine_type: "",
      serial: "",
      // hour_count: "",
      // nom_speed: "",
      // act_speed: "",
      description: "",
    },
    validationSchema,
    onSubmit: handleEditMachineDetails,
  });

  useEffect(() => {
    fetchMachineDetails();
  }, [projectID, machineID]);

  return (
    <>
      <NavbarManagerDashboard />

      <div className="text-center wow fadeInUp my-5" data-wow-delay="0.1s">
        <h6 className="section-title bg-white text-center text-primary px-3">
          Manager's Panel
        </h6>
        <h1 className="mb-5">Edit Project Specific Machine Details</h1>
      </div>

      <Container>
        {isFetchingMachineDetails ? (
          <>
            <PageSpinner />
          </>
        ) : (
          <>
            <Row>
              <Col>
                <Button variant="primary" as={NavLink} to={-1} className="my-4">
                  <FaArrowLeft /> Back to View Project Specific Machines
                </Button>
              </Col>
            </Row>
            {editMode ? (
              <Form onSubmit={formik.handleSubmit}>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    Serial No.
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Serial No."
                    aria-label="Serial No."
                    aria-describedby="basic-addon1"
                    name="serial"
                    value={formik.values.serial}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </InputGroup>
                {formik.touched.serial && formik.errors.serial && (
                  <div className="text-danger">{formik.errors.serial}</div>
                )}

                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon2">
                    Machine Type
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Machine Type"
                    aria-label="Machine Type"
                    aria-describedby="basic-addon2"
                    name="machine_type"
                    value={formik.values.machine_type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </InputGroup>
                {formik.touched.machine_type && formik.errors.machine_type && (
                  <div className="text-danger">
                    {formik.errors.machine_type}
                  </div>
                )}

                <InputGroup className="mb-3">
                  <InputGroup.Text>Description</InputGroup.Text>
                  <Form.Control
                    as="textarea"
                    aria-label="With textarea"
                    placeholder="Machine Description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </InputGroup>
                {formik.touched.description && formik.errors.description && (
                  <div className="text-danger">{formik.errors.description}</div>
                )}

                <InputGroup>
                  <InputGroup.Text className="me-4">
                    Attachments
                  </InputGroup.Text>
                  {machineAttachDetails === null ? (
                    <>No Attachments Found</>
                  ) : (
                    machineAttachDetails.map((document) => (
                      <>
                        <NavLink
                          as={NavLink}
                          to={document.file_path}
                          target="_blank"
                        >
                          <BsFiletypeDoc className="fs-3 mx-3">
                            Document
                          </BsFiletypeDoc>
                        </NavLink>
                      </>
                    ))
                  )}
                </InputGroup>

                <Button
                  type="submit"
                  variant="success"
                  className="my-4 mx-2"
                  disabled={isSubmitting || !formik.isValid}
                >
                  {isSubmitting ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Update Machine Details"
                  )}
                </Button>
                <Button
                  variant="danger"
                  onClick={handleCancel}
                  className="my-4 mx-2"
                >
                  Cancel
                </Button>
              </Form>
            ) : (
              // View mode with non-editable input fields
              <>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    Serial No.
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Serial No."
                    aria-label="Serial No."
                    aria-describedby="basic-addon1"
                    value={formik.values.serial}
                    onChange={formik.handleChange}
                    readOnly
                  />
                </InputGroup>
                {formik.touched.serial && formik.errors.serial && (
                  <div className="text-danger">{formik.errors.serial}</div>
                )}

                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon2">
                    Machine Type
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Machine Type"
                    aria-label="Machine Type"
                    aria-describedby="basic-addon2"
                    value={formik.values.machine_type}
                    onChange={formik.handleChange}
                    readOnly
                  />
                </InputGroup>
                {formik.touched.machine_type && formik.errors.machine_type && (
                  <div className="text-danger">
                    {formik.errors.machine_type}
                  </div>
                )}

                <InputGroup className="mb-3">
                  <InputGroup.Text>Description</InputGroup.Text>
                  <Form.Control
                    as="textarea"
                    aria-label="With textarea"
                    placeholder="Machine Description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    readOnly
                  />
                </InputGroup>
                {formik.touched.description && formik.errors.description && (
                  <div className="text-danger">{formik.errors.description}</div>
                )}

                <InputGroup>
                  <InputGroup.Text className="me-4">
                    Attachments
                  </InputGroup.Text>
                  {machineAttachDetails === null ? (
                    <>No Attachments Found</>
                  ) : (
                    machineAttachDetails.map((document) => (
                      <>
                        <NavLink
                          as={NavLink}
                          to={document.file_path}
                          target="_blank"
                        >
                          <BsFiletypeDoc className="fs-3 mx-3">
                            Document
                          </BsFiletypeDoc>
                        </NavLink>
                      </>
                    ))
                  )}
                </InputGroup>

                <Button variant="info" className="my-4" onClick={handleEdit}>
                  Edit Machine Info
                </Button>
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
}
