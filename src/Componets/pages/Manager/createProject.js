import './createProject.css';
import React, { useRef, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { Create_Project_Api } from '../../../Api/Manager_Api';
import Spinner from '../Common/Spinner';
import Cookies from 'js-cookie';

function NewProjectScreen(props) {
  const [customerList, setCustomerList] = useState([]);
  const [customerId, setCustomer] = useState('');
  const [projectType, setProjectType] = useState('');
  const [description, setProjectDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [projectAttach, setProjectAttach] = useState(null);
  const [technician, setTechnicians] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const machineTypeRef = useRef();
  const serialNumberRef = useRef();
  const hourCountRef = useRef();
  const nominalSpeedRef = useRef();
  const actualSpeedRef = useRef();
  const technicianRef = useRef();
  const attachmentsRef = useRef();
  const [savedMachineData, setSavedMachineData] = useState(null);
  const [machineDetails, setMachinesData] = useState(null);
  const techniciansOptions = ['Kylie', 'Kendall', 'Kourtney', 'Kim'];
  const machineTypeOptions = [
    'Machine 1',
    'Machine 2',
    'Machine 3',
    'Machine 4',
  ];
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch customer data from the API using Axios or your preferred HTTP library
    const token = Cookies.get('token');

    // Check if a token is available
    if (token) {
      // Set the token in Axios headers
      axios.defaults.headers.common['Authorization'] = token;
    }

    axios
      .get('/api/v1/manager/customerList')
      .then((response) => {
        // Assuming the response contains an array of customer objects
        const customersData = response.data.data;

        // Extract customer names from the data
        const names = customersData.map((customer) => customer.customer_name);

        // Update the state with customer names
        setCustomerList(names);

        // Optionally, you can also set the entire customer data
        setCustomers(customersData);
      })
      .catch((error) => {
        console.error('Error fetching customer data:', error);
      });
  }, []);

  useEffect(() => {
    const token = Cookies.get('token');

    // Check if a token is available
    if (token) {
      // Set the token in Axios headers
      axios.defaults.headers.common['Authorization'] = token;
    }
    // Fetch technician data from the API using Axios or your preferred HTTP library
    axios
      .get('http://localhost:3003/api/v1/manager/technicianLists')
      .then((response) => {
        // Assuming the response contains an array of technician objects
        const techniciansData = response.data.data;

        // Extract technician names from the data
        const technicianNames = techniciansData.map(
          (technician) => technician.name
        );

        // Update the state with technician names
        setTechnicians(technicianNames);
      })
      .catch((error) => {
        console.error('Error fetching technician data:', error);
      });
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const goBackHandler = () => {
    Navigate('/manager');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <React.Fragment className="">
        <div className="new-project-screen">
          <h2>New Project</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="customer">Customer</label>
              <select
                id="customerId"
                value={customerId}
                onChange={(event) => setCustomer(event.target.value)}
                className="custom-input"
              >
                <option value="" disabled>
                  Select Customer
                </option>
                {customers.map((customer, index) => (
                  <option key={index} value={customer.customer_id}>
                    {customer.customer_name}
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
                id="description"
                value={description}
                onChange={(event) => setProjectDescription(event.target.value)}
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
                className="custom-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="projectAttach">End Date</label>
              <input
                type="file"
                id="projectAttach"
                value={projectAttach}
                onChange={(event) => setProjectAttach(event.target.value)}
                className="custom-input"
              />
            </div>

            <button
              type="button"
              onClick={handleShow}
              className="add-machine-button"
            >
              Add Machine Details
            </button>

            <button type="submit" className="submit-button">
              Save/Submit
            </button>
            <br />
            <Button
              variant="danger"
              className="go-back"
              onClick={goBackHandler}
            >
              GO Back!
            </Button>
          </form>
          {showPopup && <div className="popup">New project created!</div>}
        </div>

        <Modal show={show} onHide={handleClose}>
          {' '}
          <Modal.Header closeButton>
            {' '}
            <Modal.Title>Add Machine Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
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
                <Form.Select
                  multiple
                  value={technician}
                  onChange={(event) => setTechnicians(event.target.value)}
                  ref={technicianRef}
                >
                  <option value="" disabled>
                    Select Technician
                  </option>
                  {technician.map((technicianName, index) => (
                    <option key={index} value={technicianName}>
                      {technicianName}
                    </option>
                  ))}
                </Form.Select>
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
            <Button variant="primary">Save Machine Details</Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    </div>
  );
}

export default NewProjectScreen;
