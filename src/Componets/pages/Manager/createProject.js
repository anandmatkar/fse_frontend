import React, { useRef, useState, useEffect } from 'react';
import './createProject.css';
import Spinner from '../Common/Spinner';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

function CreateProject() {
  const [customerList, setCustomerList] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [technician, setTechnicians] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [projectType, setProjectType] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [projectAttach, setProjectAttach] = useState(null);
  const [MachineType, setMachineType] = useState('');
  const [MachineSerial, setMachineSerial] = useState('');
  const [hourCount, setHourCount] = useState('');
  const [nomSpeed, setNomSpeed] = useState('');
  const [actSpeed, setActSpeed] = useState('');
  const [techIds, setTechId] = useState('');
  const [machineAttach, setMachineAttach] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const machineTypeRef = useRef();
  const serialNumberRef = useRef();
  const hourCountRef = useRef();
  const nominalSpeedRef = useRef();
  const actualSpeedRef = useRef();
  const technicianRef = useRef();
  const attachmentsRef = useRef();

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

  const goBackHandler = () => {
    Navigate('/manager');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a FormData object to send the form data including files
    const formData = new FormData();
    formData.append('customerId', customerId);
    formData.append('projectType', projectType);
    formData.append('description', description);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    if (projectAttach) {
      for (let i = 0; i < projectAttach.length; i++) {
        formData.append('projectAttach', projectAttach[i]);
      }
    }

    // Create an array of machine details objects
    const machineDetails = [
      {
        MachineType,
        MachineSerial,
        hourCount,
        nomSpeed,
        actSpeed,
        techIds,
        machineAttach,
      },
    ];
    formData.append('machineDetails', JSON.stringify(machineDetails));

    try {
      // Send the POST request to create the project
      const response = await axios.post(
        '/api/v1/manager/createProject',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Handle success response here
      console.log('Project created successfully', response.data);
    } catch (error) {
      // Handle error here
      console.error('Error creating project', error);
    }
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
      <div class="container newproject">
        <header class="headernewproject">
          <h1 id="title" class="text-center heading1">
            New Project
          </h1>
        </header>
        <div class="form-wrap newprojectform">
          <form onSubmit={handleSubmit}>
            <div class="row colrow">
              <div class="col-md-4">
                <div class="form-group formgroup">
                  <label htmlFor="customer" className="labeltag">
                    Customer
                  </label>
                  <select
                    id="customerId"
                    class="form-control formcontrol"
                    value={customerId.customerId}
                    onChange={(event) => setCustomerId(event.target.value)}
                  >
                    <option disabled selected value="">
                      Select Customer
                    </option>
                    {customers.map((customer, index) => (
                      <option key={index} value={customer.customer_id}>
                        {customer.customer_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group formgroup">
                  <label htmlFor="projectType" className="labeltag">
                    Project Type
                  </label>
                  <input
                    type="text"
                    name="projectType"
                    id="projectType"
                    placeholder="Project type"
                    class="form-control formcontrol"
                    value={projectType}
                    onChange={(event) => setProjectType(event.target.value)}
                  />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group formgroup">
                  <label htmlFor="projectDescription" className="labeltag">
                    Project description
                  </label>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Project description"
                    class="form-control formcontrol"
                  />
                </div>
              </div>
            </div>
            <div class="row colrow">
              <div class="col-md-4">
                <div class="form-group ">
                  <label htmlFor="startDate" className="labeltag">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                    class="form-control formcontrol"
                  />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group formgroup">
                  <label htmlFor="endDate" className="labeltag">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    id="endDate"
                    value={endDate}
                    onChange={(event) => setEndDate(event.target.value)}
                    class="form-control formcontrol"
                  />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group formgroup">
                  <label htmlFor="projectAttach" className="labeltag">
                    Project Documents
                  </label>
                  <input
                    type="file"
                    name="projectAttach"
                    id="projectAttach"
                    value={projectAttach}
                    onChange={(event) => setProjectAttach(event.target.value)}
                    class="form-control formcontrol"
                  />
                </div>
              </div>
            </div>
            {/* <header className="col-md-12 text-center fs-2">
              Add Machine Details
            </header> */}
            <div class="row p-2 colrow">
              <div class="col-md-4">
                <div class="form-group formgroup">
                  <label id="name-label" className="labeltag">
                    Machine Type
                  </label>
                  <input
                    type="text"
                    name="MachineType"
                    ref={machineTypeRef}
                    placeholder="Machine type"
                    class="form-control formcontrol"
                  />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group formgroup">
                  <label id="email-label" className="labeltag">
                    Serial Number
                  </label>
                  <input
                    type="text"
                    name="MachineSerial"
                    ref={serialNumberRef}
                    placeholder="Machine Serial number"
                    class="form-control formcontrol"
                  />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group formgroup">
                  <label id="email-label" className="labeltag">
                    Hour Count
                  </label>
                  <input
                    type="text"
                    name="hourCount"
                    ref={hourCountRef}
                    placeholder="Hour Count"
                    class="form-control formcontrol"
                  />
                </div>
              </div>
            </div>
            <div class="row colrow">
              <div class="col-md-4">
                <div class="form-group formgroup">
                  <label id="number-label" className="labeltag">
                    Nominal Speed
                  </label>
                  <input
                    type="text"
                    name="nomSpeed"
                    ref={nominalSpeedRef}
                    placeholder="Nominal Speed"
                    class="form-control formcontrol"
                  />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group formgroup">
                  <label id="number-label" className="labeltag">
                    Actual Speed
                  </label>
                  <input
                    type="text"
                    name="actSpeed"
                    placeholder="Actual Speed"
                    ref={actualSpeedRef}
                    class="form-control formcontrol"
                  />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group formgroup">
                  <label id="number-label" for="number">
                    Technician
                  </label>
                  <select
                    id="techIds"
                    class="form-control formcontrol"
                    value={techIds}
                    onChange={(event) => setTechId(event.target.value)}
                  >
                    <option value="" disabled selected>
                      Select Technician
                    </option>
                    {technician.map((technicianName, index) => (
                      <option key={index} value={technicianName}>
                        {technicianName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div class="col-md-12 ">
              <label className="labeltag">Machine Attachments</label>
              <div class="form-control formcontrol">
                <input
                  type="file"
                  class="formcontrol"
                  accept="image/*"
                  multiple
                  // onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="col-12 d-flex justify-content-end">
              <button className="btn btn-primary1 mt-2 ">Submit</button>
            </div>{' '}
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateProject;
