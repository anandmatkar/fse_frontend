import React, { useState, useEffect } from 'react';
import './createProject.css';
import Spinner from '../Common/Spinner';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../NavBar/navbarManager';

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
  const [projectAttach, setProjectAttach] = useState([]);
  const [MachineType, setMachineType] = useState('');
  const [MachineSerial, setMachineSerial] = useState('');
  const [hourCount, setHourCount] = useState('');
  const [nomSpeed, setNomSpeed] = useState('');
  const [actSpeed, setActSpeed] = useState('');
  const [techIds, setTechId] = useState([]);
  const [machineAttach, setMachineAttach] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTechs, setSelectedTechs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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

  // const goBackHandler = () => {
  //   Navigate('/manager');
  // };

  const handleTechCheckboxChange = (event) => {
    const techId = event.target.value;
    if (event.target.checked) {
      setSelectedTechs([...selectedTechs, techId]);
    } else {
      setSelectedTechs(selectedTechs.filter((id) => id !== techId));
    }
  };

  const handleMachineDocuments = async (event) => {
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

  const handleProjectAttachChange = async (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files); // Convert FileList to an array
    setProjectAttach(fileArray);

    if (fileArray.length > 0) {
      const formData = new FormData();

      // Append each file to the formData with the same field name 'files'
      fileArray.forEach((file, index) => {
        formData.append('files', file);
      });

      try {
        const response = await axios.post(
          'http://localhost:3003/api/v1/manager/uploadProjectAttach',
          formData
        );

        if (response.data.status === 201) {
          // The API should return an array of URLs for the uploaded files
          const uploadedURLs = response.data.data;
          console.log(uploadedURLs);
          setProjectAttach(uploadedURLs);
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
          techIds: selectedTechs,
          machineAttach,
        },
      ],
      // techIds, // Add techIds directly to the object
    };
    console.log(projectData);

    try {
      const response = await axios.post(
        '/api/v1/manager/createProject',
        projectData
      );
      console.log(projectData);

      if (response.data.status === 200) {
        // Handle success
        toast.success('Project created successfully');
        console.log('Project created successfully', response.data);
        navigate('/manager');
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
    <>
      <Navbar />
      <div>
        <div class="container newproject">
          <header class="headernewproject">
            <h1 id="title" class="text-center heading1">
              Create new Project
            </h1>
          </header>
          <div class="form-wrap newprojectform">
            <form onSubmit={handleSubmit}>
              <div class="row colrow">
                <div class="col-md-4">
                  <div class="form-group formgroupinput">
                    <label htmlFor="customer" className="labeltag">
                      Customer
                    </label>
                    <select
                      id="customerId"
                      class="form-control formcontrolinput"
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
                      class="form-control formcontrolinput"
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
                      class="form-control formcontrolinput"
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
                      class="form-control formcontrolinput"
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
                      class="form-control formcontrolinput"
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
                      class="form-control formcontrolinput"
                      // accept="imafge/*"
                      multiple
                      onChange={handleProjectAttachChange}
                    />
                  </div>
                </div>
              </div>
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
                      class="form-control formcontrolinput"
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
                      class="form-control formcontrolinput"
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
                      class="form-control formcontrolinput"
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
                      class="form-control formcontrolinput"
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
                      class="form-control formcontrolinput"
                    />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group formgroup">
                    <label id="number-label" for="number">
                      Technician
                    </label>

                    <div className="d-flex flex-wrap ">
                      {technician.map((technician, index) => (
                        <div key={index} className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`techCheckbox_${index}`}
                            value={technician.id}
                            onChange={handleTechCheckboxChange}
                            checked={selectedTechs.includes(technician.id)}
                          />
                          <label
                            className="form-check-label me-2"
                            htmlFor={`techCheckbox_${index}`}
                          >
                            {technician.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12 ">
                <label className="labeltag">Machine Attachments</label>
                <div class="form-control formcontrolinput">
                  <input
                    type="file"
                    class="formcontrolinput"
                    // accept="imafge/*"
                    multiple
                    onChange={handleMachineDocuments}
                  />
                </div>
              </div>
              <div className="col-12 d-flex justify-content-end">
                <button className="btn btn-dark buttonFocus mt-2 p-2 fs-5 ">
                  Submit
                </button>
              </div>{' '}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateProject;
