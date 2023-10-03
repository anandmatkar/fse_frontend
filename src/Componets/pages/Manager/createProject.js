import React, { useRef, useState, useEffect } from 'react';
import './createProject.css';
import Spinner from '../Common/Spinner';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function CreateProject() {
  const [customerList, setCustomerList] = useState([]);
  const [techList, setTechList] = useState([]);
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
  const [techIds, setTechId] = useState([]);
  const [machineAttach, setMachineAttach] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTechIdChange = (event) => {
    const selectedIds = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setTechId(selectedIds);
  };

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
    // Fetch customer data from the API using Axios or your preferred HTTP library
    const token = Cookies.get('token');

    // Check if a token is available
    if (token) {
      // Set the token in Axios headers
      axios.defaults.headers.common['Authorization'] = token;
    }

    axios
      .get('http://localhost:3003/api/v1/manager/technicianLists')
      .then((response) => {
        // Assuming the response contains an array of customer objects
        const techniciansData = response.data.data;

        // Extract customer names from the data
        const technicianNames = techniciansData.map(
          (technician) => technician.customer_name
        );

        // Update the state with customer names
        setTechList(technicianNames);

        // Optionally, you can also set the entire customer data
        setTechnicians(techniciansData);
      })
      .catch((error) => {
        console.error('Error fetching customer data:', error);
      });
  }, []);

  const goBackHandler = () => {
    Navigate('/manager');
  };

  const handleProfilePicChange = async (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files); // Convert FileList to an array
    setMachineAttach(fileArray);

    if (fileArray.length > 0) {
      const formData = new FormData();

      // Append each file to the formData with the same field name 'files'
      fileArray.forEach((file, index) => {
        formData.append('files', file);
      });

      try {
        const response = await axios.post(
          '/api/v1/manager/uploadMachineFiles',
          formData
        );

        if (response.data.status === 201) {
          // The API should return an array of URLs for the uploaded files
          const uploadedURLs = response.data.data;
          console.log(uploadedURLs);
          setMachineAttach(uploadedURLs);
        } else {
          console.error('Files Upload Failed. Status Code:', response.status);
        }
      } catch (error) {
        console.error('API Error:', error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a FormData object to send the form data including files
    // const formData = new FormData();
    // formData.append('customerId', customerId);
    // formData.append('projectType', projectType);
    // formData.append('description', description);
    // formData.append('startDate', startDate);
    // formData.append('endDate', endDate);
    // if (projectAttach) {
    //   for (let i = 0; i < projectAttach.length; i++) {
    //     formData.append('projectAttach', projectAttach[i]);
    //   }
    // }

    // // Create an array of machine details objects
    // const machineDetails = [
    //   {
    //     MachineType,
    //     MachineSerial,
    //     hourCount,
    //     nomSpeed,
    //     actSpeed,
    //     techIds,
    //     machineAttach,
    //   },
    // ];
    // formData.append('techIds', JSON.stringify(techIds));

    // formData.append('machineDetails', JSON.stringify(machineDetails));

    const projectData = {
      customerId,
      projectType,
      description,
      startDate,
      endDate,
      projectAttach,
      machineDetails: [
        {
          MachineType,
          MachineSerial,
          hourCount,
          nomSpeed,
          actSpeed,
          techIds,
          machineAttach,
        },
      ],
      techIds, // Add techIds directly to the object
    };

    // Convert the projectData object to JSON
    const projectDataJSON = JSON.stringify(projectData);

    // Create a FormData object to send the form data including files
    const formData = new FormData();
    formData.append('projectData', projectDataJSON);
    console.log(projectData);

    try {
      const response = await axios.post(
        '/api/v1/manager/createProject',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.status === 201) {
        // Handle success
        toast.success('Project created successfully');
        console.log('Project created successfully', response.data);
      } else {
        // Handle API error (status code other than 201)
        toast.error('Error creating project');
        console.error('Error creating project. Status Code:', response.status);
      }
    } catch (error) {
      // Handle network or other errors
      toast.error('An error occurred while creating the project');
      console.error('API Error:', error);
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
                    value={customerId}
                    onChange={(event) => setCustomerId(event.target.value)}
                  >
                    <option disabled selected value="">
                      Select Customer
                    </option>
                    {customers.map((customer, index) => (
                      <option key={index} value={customer.id}>
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
                    value={MachineType}
                    onChange={(event) => setMachineType(event.target.value)}
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
                    value={MachineSerial}
                    onChange={(event) => setMachineSerial(event.target.value)}
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
                    value={hourCount}
                    onChange={(event) => setHourCount(event.target.value)}
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
                    value={nomSpeed}
                    onChange={(event) => setNomSpeed(event.target.value)}
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
                    value={actSpeed}
                    onChange={(event) => setActSpeed(event.target.value)}
                    class="form-control formcontrol"
                  />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group formgroup">
                  <label id="number-label" for="number">
                    Technician
                  </label>
                  {/* <select
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
                  </select> */}

                  <select
                    id="techId"
                    class="form-control formcontrol"
                    multiple
                    value={techIds}
                    onChange={handleTechIdChange}
                  >
                    <option disabled selected value="">
                      Select Teachnician
                    </option>
                    {technician.map((technician, index) => (
                      <option key={index} value={technician.id}>
                        {technician.name}
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
                  // accept="imafge/*"
                  multiple
                  onChange={handleProfilePicChange}
                />
              </div>
            </div>
            <div className="col-12 d-flex justify-content-end">
              <button className="btn btn-primary1 mt-2 ">Submit</button>
            </div>{' '}
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreateProject;
