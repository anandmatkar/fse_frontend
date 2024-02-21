import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, Card } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";
import "./EditProjectAddMachineModal.css";
import axios from "axios";
import {
  Teachnician_List_Api,
  Upload_Machine_Files,
} from "../../../Api/Manager_Api";

function EditProjectAddMachineModal({ show, onHide, project, onSubmit }) {
  const [machineFormDataList, setMachineFormDataList] = useState([
    {
      MachineType: "",
      MachineSerial: "",
      hourCount: "",
      nomSpeed: "",
      actSpeed: "",
      techIds: "",
      machineAttach: "",
    },
  ]);
  const [technicians, setTechnicians] = useState([]);

  // console.log(project);
  const { machine_count } = project;
  console.log(machine_count);

  const handleChange = async (e, index) => {
    const { name, value, files } = e.target;
    const list = [...machineFormDataList];

    // Handle machineAttachments separately
    if (name === "machineAttach") {
      const attachments = [];
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        formData.append("files", file);
      }

      try {
        const response = await axios.post(Upload_Machine_Files, formData);
        const attachmentPath = response.data.data;
        console.log(attachmentPath);
        // Update the machineAttachments field in machineFormDataList
        list[index][name] = attachmentPath;
        setMachineFormDataList(list);
        // attachments.push(attachmentPath);
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error(error.message);
      }
    } else if (name === "techIds") {
      // For the technician field, extract the technician ID and name from the selected options
      const selectedTechnicians = value.map((option) => ({
        id: option.value,
        name: option.label,
      }));
      list[index][name] = selectedTechnicians;
      setMachineFormDataList(list);
    } else {
      // For other fields, update as before
      list[index][name] = value;
      setMachineFormDataList(list);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const machineFormData = new FormData();
      machineFormDataList.forEach((item, index) => {
        machineFormData.append(`MachineType${index}`, item.MachineType);
        machineFormData.append(`MachineSerial${index}`, item.MachineSerial);
        machineFormData.append(`hourCount${index}`, item.hourCount);
        machineFormData.append(`nomSpeed${index}`, item.nomSpeed);
        machineFormData.append(`actSpeed${index}`, item.actSpeed);
        machineFormData.append(`techIds${index}`, JSON.stringify(item.techIds));
        machineFormData.append(`machineAttach${index}`, item.machineAttach);
      });

      const token = Cookies.get("token");
      if (!token) {
        console.error("Token not found in Cookies.");
        return;
      }

      const config = {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      };

      // console.log(machineFormDataList);

      onSubmit(machineFormDataList);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAddFields = () => {
    if (machineFormDataList.length < 10 - parseInt(machine_count)) {
      setMachineFormDataList([
        ...machineFormDataList,
        {
          MachineType: "",
          MachineSerial: "",
          hourCount: "",
          nomSpeed: "",
          actSpeed: "",
          techIds: "",
          machineAttach: "",
        },
      ]);
    } else {
      toast.error("Maximum limit reached.");
    }
  };

  const handleRemoveFields = (index) => {
    const list = [...machineFormDataList];
    list.splice(index, 1);
    setMachineFormDataList(list);
  };

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

  const customStyles = {
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    // Add more custom styles here if needed
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        centered
        dialogClassName="edit-project-add-machine-modal"
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bolder">
            Edit Project : Add Machine
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Render machine fields only when machineFormDataList has items */}
          {machineFormDataList.map((item, index) => (
            <>
              <label className="fs-6 fw-bold">{`Machine ${index + 1}`}</label>
              <Card key={index} className="mb-3 border-2" border="dark">
                {/* <Card.Body className="fs-5 fw-bolder">
                  Machine {index + 1}
                </Card.Body> */}
                <Card.Header>
                  <Row>
                    <Col lg={4} md={6} sm={12}>
                      <Form.Group
                        controlId={`MachineType${index}`}
                        className="mb-3"
                      >
                        <Form.Label className="fw-bold">
                          Machine Type
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="MachineType"
                          value={item.MachineType}
                          size="sm"
                          onChange={(e) => handleChange(e, index)}
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <Form.Group
                        controlId={`MachineSerial${index}`}
                        className="mb-3"
                      >
                        <Form.Label className="fw-bold">
                          Serial Number
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="MachineSerial"
                          size="sm"
                          value={item.MachineSerial}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <Form.Group
                        controlId={`techIds${index}`}
                        className="mb-3"
                      >
                        <Form.Label className="fw-bold">Technician</Form.Label>
                        <Select
                          placeholder="Select Technicians"
                          menuPortalTarget={document.body}
                          styles={customStyles}
                          options={technicians.map((tech) => ({
                            label: tech.name,
                            value: tech.id,
                          }))}
                          isMulti
                          onChange={(selectedOptions) => {
                            // Map selected options to technician field
                            const selectedTechnicians = selectedOptions.map(
                              (option) => option.value
                            );
                            const list = [...machineFormDataList];
                            list[index].techIds = selectedTechnicians;
                            setMachineFormDataList(list);
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      {" "}
                      <Form.Group
                        controlId={`hourCount${index}`}
                        className="mb-3"
                      >
                        <Form.Label className="fw-bold">Hour Count</Form.Label>
                        <Form.Control
                          type="text"
                          name="hourCount"
                          size="sm"
                          value={item.hourCount}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      {" "}
                      <Form.Group
                        controlId={`nomSpeed${index}`}
                        className="mb-3"
                      >
                        <Form.Label className="fw-bold">
                          Nominal Speed
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="nomSpeed"
                          size="sm"
                          value={item.nomSpeed}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <Form.Group
                        controlId={`actSpeed${index}`}
                        className="mb-3"
                      >
                        <Form.Label className="fw-bold">
                          Actual Speed
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="actSpeed"
                          size="sm"
                          value={item.actSpeed}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group
                    controlId={`machineAttach${index}`}
                    className="mb-3"
                  >
                    <Form.Label className="fw-bold">
                      Machine Attachments
                    </Form.Label>
                    <Form.Control
                      type="file"
                      size="sm"
                      name="machineAttach"
                      onChange={(e) => handleChange(e, index)}
                      multiple // Allow multiple file selection if needed
                    />
                  </Form.Group>
                  {index !== 0 && (
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveFields(index)}
                      size="sm"
                      className="w-25"
                    >
                      Remove
                    </Button>
                  )}
                </Card.Header>
              </Card>
            </>
          ))}
          {machineFormDataList.length < 10 - parseInt(machine_count) && (
            <Button
              variant="primary"
              onClick={handleAddFields}
              className="mb-2 w-25"
              size="sm"
            >
              Add
            </Button>
          )}{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Machines
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProjectAddMachineModal;
