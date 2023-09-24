
import "./createProject.css";
import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Navigate } from "react-router-dom";
import axios from 'axios';
import { Create_Project_Api } from "../../../Api/Manager_Api";
import Spinner from "../Common/Spinner";

function NewProjectScreen(props) {
  const [customer, setCustomer] = useState("");
  const [projectType, setProjectType] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [technicians, setTechnicians] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoading,setIsLoading]= useState(false);
  const machineTypeRef = useRef();
  const serialNumberRef = useRef();
  const hourCountRef = useRef();
  const nominalSpeedRef = useRef();
  const actualSpeedRef = useRef();
  const technicianRef = useRef();
  const attachmentsRef = useRef();
  const [savedMachineData, setSavedMachineData] = useState(null);
  const [machinesData, setMachinesData] = useState([]);
  const techniciansOptions = ["Kylie", "Kendall", "Kourtney", "Kim"];
  const machineTypeOptions = ["Machine 1", "Machine 2", "Machine 3", "Machine 4"];
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleModalSubmit =  (event) => {
    event.preventDefault();

    // Get the machine details from the modal form
    const machineType = machineTypeRef.current.value;
    const serialNumber = serialNumberRef.current.value;
    const hourCount = hourCountRef.current.value;
    const nominalSpeed = nominalSpeedRef.current.value;
    const actualSpeed = actualSpeedRef.current.value;
    const selectedTechnicians = Array.from(
      technicianRef.current.selectedOptions
    ).map((option) => option.value);
    const attachments = attachmentsRef.current.files;

    // Create an object with the machine details
   
    const newMachineData = {
      machineType,
      serialNumber,
      hourCount,
      nominalSpeed,
      actualSpeed,
      technicians: selectedTechnicians,
      attachments,
    };

    // Save the new machine data to the machinesData state
    setMachinesData((prevMachinesData) => [
      ...prevMachinesData,
      newMachineData,
    ]);

    // Close the modal after submission
    handleClose();
  };

  const goBackHandler = () => {
    Navigate("/manager");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create an object with the form field values
    const projectData = {
      customerId: "94361abe-3c42-44e2-93da-d2ebe224738d", // Hardcoded for now, replace with dynamic value
      projectType: projectType,
      description: projectDescription,
      startDate: startDate,
      endDate: endDate,
      technicians: technicians,
      projectAttach: [], // You can add attachments here if needed
      machineDetails: machinesData.map((machine) => ({
        MachineType: machine.machineType,
        MachineSerial: machine.serialNumber,
        hourCount: machine.hourCount,
        nomSpeed: machine.nominalSpeed,
        actSpeed: machine.actualSpeed,
        techIds: machine.technicians, // Assuming techIds is an array of technician IDs
        machineAttach: Array.isArray(machine.attachments) ? 
        machine.attachments.map((attachment) => ({
          path: attachment.path,
          size: attachment.size,
          mimetype: attachment.type,
        })):[],
      })),
    };

    // Combine projectData and machinesData into one object
    const dataToSend = {
      ...projectData,
      machinesData,
    };
    const config = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };
    console.log(dataToSend,'data to send')
    try {
      // Send the dataToSend to the API using Axios
      setIsLoading(true)
      console.log(Create_Project_Api,'create project data')
      const response = await axios.post(
        Create_Project_Api,
        dataToSend,
        config
      );

      console.log("Data sent to Api:", response.data);

      // Reset form fields and show popup
      setCustomer("");
      setProjectType("");
      setProjectDescription("");
      setStartDate("");
      setEndDate("");
      setTechnicians([]);
      setSavedMachineData(null);
      setMachinesData([]);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
      setIsLoading(false)
    } catch (error) {
      console.error("Error sending data to api:", error);
    }
  };
  const handleDeleteMachine = (index) => {
    setMachinesData((prevMachinesData) =>
      prevMachinesData.filter((_, i) => i !== index)
    );
  };
  if(isLoading){
    return <div>
      <Spinner/>
    </div>;
  }

  return (
    <div>
      <React.Fragment>
    <div className="new-project-screen">
      <h2>New Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customer">Customer</label>
          <select
            id="customer"
            value={customer}
            onChange={(event) => setCustomer(event.target.value)}
            required
            className="custom-input"
          >
            <option value="" disabled>
              Select Customer
            </option>
            {techniciansOptions.map((technician) => (
              <option key={technician} value={technician}>
                {technician}
              </option>
            ))}
          </select>
        </div>
          <div className="form-group">
            <label htmlFor="projectType">Project Type</label>
            <select
              id="projectType"
              value={projectType}
              onChange={(event) => setProjectType(event.target.value)}
              required
              className="custom-input"
            >
              <option value="" disabled>
                Select Project Type
              </option>
              <option value="Type 1">Type 1</option>
              <option value="Type 2">Type 2</option>
              <option value="Type 3">Type 3</option>
              <option value="Type 4">Type 4</option>
              {/* Add more project type options as needed */}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="projectDescription">Project Description</label>
            <textarea
              id="projectDescription"
              value={projectDescription}
              onChange={(event) => setProjectDescription(event.target.value)}
              required
              className="custom-input"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              required
              className="custom-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              required
              className="custom-input"
            />
          </div>

          <button type="button" onClick={handleShow} className="add-machine-button">
            Add Machine Details
          </button>

          <button type="submit" className="submit-button">
            Save/Submit
          </button>
          <br />
          <Button variant="danger" className="go-back" onClick={goBackHandler}>
            GO Back!
          </Button>
        </form>
        {showPopup && <div className="popup">New project created!</div>}

        Machine's Added 
        {/* {machinesData.map((machine, index) => (
          <div key={index} className="machine-details">
            <h3>Machine {index + 1}</h3>
            <p>Machine Type: {machine.machineType}</p>
            <p>Serial Number: {machine.serialNumber}</p>
            <p>Hour Count: {machine.hourCount}</p>
            <p>Nominal Speed: {machine.nominalSpeed}</p>
            <p>Actual Speed: {machine.actualSpeed}</p>
            <p>Technicians: {machine.technicians.join(", ")}</p>
            Display other machine data as needed
          </div>
        ))} */}
          {machinesData.length > 0 && (
          <div className="machine-table">
            <table>
              <thead>
                <tr>
                  <th>Machine Type</th>
                  <th>Serial Number</th>
                  <th>Hour Count</th>
                  <th>Nominal Speed</th>
                  <th>Actual Speed</th>
                  <th>Technicians</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {machinesData.map((machine, index) => (
                  <tr key={index}>
                    <td>{machine.machineType}</td>
                    <td>{machine.serialNumber}</td>
                    <td>{machine.hourCount}</td>
                    <td>{machine.nominalSpeed}</td>
                    <td>{machine.actualSpeed}</td>
                    <td>{machine.technicians.join(", ")}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteMachine(index)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal show={show} onHide={handleClose}>
        {" "}
        <Modal.Header closeButton>
          {" "}
          <Modal.Title>Add Machine Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleModalSubmit}>
            {/* Machine details form fields */}
            <Form.Group className="mb-3" controlId="machineType">
              <Form.Label>Machine Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Machine type"
                ref={machineTypeRef}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="serialNumber">
              <Form.Label>Serial Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter serial number"
                ref={serialNumberRef}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="hourCount">
              <Form.Label>Hour Count</Form.Label>
              <Form.Control
                type="number"
                step="1"
                placeholder="Enter hour count"
                ref={hourCountRef}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="nominalSpeed">
              <Form.Label>Nominal Speed</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="Enter nominal speed"
                ref={nominalSpeedRef}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="actualSpeed">
              <Form.Label>Actual Speed</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="Enter actual speed"
                ref={actualSpeedRef}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="technician">
              <Form.Label>Technician</Form.Label>
              <Form.Control as="select" multiple ref={technicianRef}>
                <option>Shubham Goswami</option>
                <option>Yash Tiwari</option>
                <option>Riya</option>
                {/* Add more technicians as needed */}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="attachments">
              <Form.Label>Attachments</Form.Label>
              <Form.Control type="file" multiple ref={attachmentsRef} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalSubmit}>
            Save Machine Details 
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
    </div>
  )
    }
  
  
              


export default NewProjectScreen;
