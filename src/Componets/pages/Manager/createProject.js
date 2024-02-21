import React, { useState, useEffect } from "react";
import "./createProject.css";
import Spinner from "../Common/Spinner";
import Cookies from "js-cookie";
import { Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Create_Project_Api,
  Upload_File_Attach,
  Upload_Machine_Files,
  Teachnician_List_Api,
  Customer_List_Api,
} from "./../../../Api/Manager_Api";
import Select from "react-select";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import NavbarManagerDashboard from "../../NavBar/navbarManagerDashboard";
import { FaArrowLeft } from "react-icons/fa";

function CreateProject() {
  const [customerList, setCustomerList] = useState([]);
  const [techList, setTechList] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [projectType, setProjectType] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [projectAttach, setProjectAttach] = useState([]);
  const [addedMachineDetails, setAddedMachineDetails] = useState([]);
  const [machineDetails, setMachineDetails] = useState([
    {
      MachineType: "",
      MachineSerial: "",
      hourCount: "",
      nomSpeed: "",
      actSpeed: "",
      techIds: [],
      machineAttach: [],
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    customerId: "",
    projectType: "",
    description: "",
    startDate: "",
    endDate: "",
    projectAttach: "",
    machineDetails: "",
  });

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!customerId) {
      newErrors.customerId = "Customer is required";
    }

    if (!projectType) {
      newErrors.projectType = "Project Type is required";
    }

    if (!description) {
      newErrors.description = "Project Description is required";
    }

    if (!startDate) {
      newErrors.startDate = "Start Date is required";
    }

    if (!endDate) {
      newErrors.endDate = "End Date is required";
    }

    // if (projectAttach.length === 0) {
    //   newErrors.projectAttach = 'At least one file is required';
    // } else {
    //   newErrors.projectAttach = ''; // Clear the error if files are selected
    // }
    if (!machineDetails) {
      newErrors.machineDetails = "All Machine Details are required";
    }
    machineDetails.forEach((machine, index) => {
      if (!machine.MachineType.trim()) {
        newErrors[`MachineType_${index}`] = "Machine Type is required";
      }

      if (!machine.MachineSerial.trim()) {
        newErrors[`MachineSerial_${index}`] = "Serial Number is required";
      }

      if (!machine.hourCount.trim()) {
        newErrors[`hourCount_${index}`] = "Hour Count is required";
      }

      if (!machine.nomSpeed.trim()) {
        newErrors[`nomSpeed_${index}`] = "Nominal Speed is required";
      }

      if (!machine.actSpeed.trim()) {
        newErrors[`actSpeed_${index}`] = "Actual Speed is required";
      }

      if (!machine.techIds.length) {
        newErrors[`techIds_${index}`] = "Technician selection is required";
      }

      // if (!machine.machineAttach.length) {
      //   newErrors[`machineAttach_${index}`] =
      //     'At least one attachment is required';
      // }
    });

    setErrors(newErrors);

    // Check if there are any errors
    return Object.values(newErrors).every((error) => !error);
  };

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
    }

    // Fetch customer data
    axios
      .get(Customer_List_Api) // You need to replace this with your API endpoint
      .then((response) => {
        const customersData = response.data.data;
        const names = customersData.map((customer) => customer.customer_name);
        setCustomerList(names);
        setCustomers(customersData);
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });

    // Fetch technician data
    axios
      .get(Teachnician_List_Api) // You need to replace this with your API endpoint
      .then((response) => {
        const techniciansData = response.data.data;
        const technicianNames = techniciansData.map(
          (technician) => technician.name
        );
        setTechList(technicianNames);
        setTechnicians(techniciansData);
      })
      .catch((error) => {
        console.error("Error fetching technician data:", error);
      });
  }, []);

  const handleTechChange = (selectedOptions, machineIndex) => {
    if (selectedOptions.length > 10) {
      toast.error("You can only select a maximum of 10 Technicians.");
      return; // Don't update the state if more than 10 technicians are selected
    }

    const techIds = selectedOptions.map((option) => option.value);

    const updatedMachineDetails = [...machineDetails];
    updatedMachineDetails[machineIndex].techIds = techIds;
    setMachineDetails(updatedMachineDetails);
  };

  const handleMachineDocuments = async (event, machineIndex) => {
    const files = event.target.files;
    const fileArray = Array.from(files);
    const updatedMachineDetails = [...machineDetails];
    updatedMachineDetails[machineIndex].machineAttach = fileArray;
    setMachineDetails(updatedMachineDetails);

    if (fileArray.length > 0) {
      const formData = new FormData();

      fileArray.forEach((file, index) => {
        formData.append("files", file);
      });

      try {
        const response = await axios.post(Upload_Machine_Files, formData);

        if (response.data.status === 201) {
          const uploadedURLs = response.data.data;
          const updatedMachineDetails = [...machineDetails];
          updatedMachineDetails[machineIndex].machineAttach = uploadedURLs;
          setMachineDetails(updatedMachineDetails);
        } else {
          console.error("Files Upload Failed. Status Code:", response.status);
        }
      } catch (error) {
        console.error("API Error:", error);
      }
    }
  };

  const addMachineDetail = () => {
    if (machineDetails.length < 10) {
      const newMachineDetail = {
        MachineType: "",
        MachineSerial: "",
        hourCount: "",
        nomSpeed: "",
        actSpeed: "",
        techIds: [],
        machineAttach: [],
      };
      setMachineDetails([...machineDetails, newMachineDetail]);
    } else {
      // You can display an error message or take other actions if the limit is reached.
      // For example, you can set an error state.
      toast.error("You can only add a maximum of 10 machine details.");
    }
  };

  const handleProjectAttachChange = async (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files);
    setProjectAttach(fileArray);

    if (fileArray.length > 0) {
      const formData = new FormData();

      fileArray.forEach((file, index) => {
        formData.append("files", file);
      });

      try {
        const response = await axios.post(Upload_File_Attach, formData);

        if (response.data.status === 201) {
          const uploadedURLs = response.data.data;
          setProjectAttach(uploadedURLs);
        } else {
          console.error("Files Upload Failed. Status Code:", response.status);
        }
      } catch (error) {
        console.error("API Error:", error);
      }
    }
  };

  const handleMachineDetailChange = (event, index, fieldName) => {
    const updatedMachineDetails = [...machineDetails];
    updatedMachineDetails[index][fieldName] = event.target.value;
    setMachineDetails(updatedMachineDetails);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isFormValid = validateForm();

    if (isFormValid) {
      setIsLoading(true);
      const finalMachineDetails = [...machineDetails, ...addedMachineDetails];

      const projectData = {
        customerId,
        projectType,
        description,
        startDate,
        endDate,
        projectAttach,
        machineDetails: finalMachineDetails, // Include machine details in the request
      };

      try {
        const response = await axios.post(Create_Project_Api, projectData);

        if (response.data.status === 200) {
          toast.success("Project created successfully");
          navigate("/projectStatus");
        } else {
          toast.error("Error creating project");
          console.error(
            "Error creating project. Status Code:",
            response.status
          );
        }
      } catch (error) {
        toast.error("An error occurred while creating the project");
        console.error("API Error:", error);
      } finally {
        setIsLoading(false); // Set isLoading back to false after the API request is complete
      }
    }
  };

  // if (isLoading) {
  //   return (
  //     <div>
  //       <Spinner />
  //     </div>
  //   );
  // }

  const removeMachineDetail = (index) => {
    if (index > 0) {
      const updatedMachineDetails = [...machineDetails];
      updatedMachineDetails.splice(index, 1);
      setMachineDetails(updatedMachineDetails);
    } else {
      toast.error("The first machine detail cannot be deleted.");
    }
  };

  return (
    <>
      <NavbarManagerDashboard />

      <div class="container newproject">
        <header class="headernewproject">
          <div className="text-center wow fadeInUp my-2" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Manager's Panel
            </h6>
            <h1 className="mb-5">Create Project</h1>
          </div>
        </header>
        <Row>
          <Col>
            <Button
              variant="primary"
              as={NavLink}
              to={"/projectStatus"}
              className="my-4"
            >
              <FaArrowLeft /> Back to Project Status
            </Button>
          </Col>
        </Row>
        {isLoading ? (
          <Spinner />
        ) : (
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
                    {errors.customerId && (
                      <p className="error-message text-danger">
                        {errors.customerId}
                      </p>
                    )}
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group formgroup">
                    <label htmlFor="projectType" className="labeltag">
                      Project Type
                    </label>
                    <select
                      name="projectType"
                      id="projectType"
                      class="form-control formcontrolinput"
                      value={projectType}
                      onChange={(event) => setProjectType(event.target.value)}
                    >
                      <option value="" disabled>
                        Select Project Type
                      </option>
                      <option value="Change over part">Change over part</option>
                      <option value="Overhaul">Overhaul</option>
                      <option value="Line installation">
                        Line installation
                      </option>
                      <option value="Start up">Start up</option>
                      <option value="Commissioning machine">
                        Commissioning machine
                      </option>
                    </select>
                    {errors.projectType && (
                      <p className="error-message text-danger">
                        {errors.projectType}
                      </p>
                    )}
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
                    {errors.description && (
                      <p className="error-message text-danger">
                        {errors.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div class="row colrow">
                <div class="col-md-4">
                  <div class="form-group">
                    <label htmlFor="startDate" className="labeltag">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      id="startDate"
                      min={getCurrentDate()}
                      value={startDate}
                      onChange={(event) => setStartDate(event.target.value)}
                      class="form-control formcontrolinput"
                    />
                    {errors.startDate && (
                      <p className="error-message text-danger">
                        {errors.startDate}
                      </p>
                    )}
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
                      min={startDate}
                      value={endDate}
                      onChange={(event) => setEndDate(event.target.value)}
                      class="form-control formcontrolinput"
                    />
                    {errors.endDate && (
                      <p className="error-message text-danger">
                        {errors.endDate}
                      </p>
                    )}
                  </div>
                </div>
                <div className="form-group formgroup col-md-4">
                  <label htmlFor="projectAttach" className="labeltag">
                    Project Documents
                  </label>
                  <input
                    type="file"
                    className={`form-control formcontrolinput ${
                      errors.projectAttach ? "is-invalid" : ""
                    }`}
                    multiple
                    onChange={handleProjectAttachChange}
                  />
                  {errors.projectAttach && (
                    <p className="error-message text-danger">
                      {errors.projectAttach}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-12">
                {errors.machineDetails && (
                  <p className="error-message text-danger">
                    {errors.machineDetails}
                  </p>
                )}
              </div>

              {machineDetails.map((machine, index) => (
                <div key={index}>
                  <div class="row p-2 colrow">
                    <div className="col-12">
                      {errors.machineDetails && (
                        <p className="error-message text-danger">
                          {errors.machineDetails}
                        </p>
                      )}
                    </div>
                    <div class="col-md-4">
                      <div class="form-group formgroup">
                        <label htmlFor="MachineType" className="labeltag">
                          Machine Type
                        </label>
                        <input
                          type="text"
                          name="MachineType"
                          value={machine.MachineType}
                          onChange={(event) =>
                            handleMachineDetailChange(
                              event,
                              index,
                              "MachineType"
                            )
                          }
                          placeholder="Machine type"
                          class="form-control formcontrolinput"
                        />
                        {errors[`MachineType_${index}`] && (
                          <small className="text-danger">
                            {errors[`MachineType_${index}`]}
                          </small>
                        )}
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group formgroup">
                        <label htmlFor="MachineSerial" className="labeltag">
                          Serial Number
                        </label>
                        <input
                          type="text"
                          name="MachineSerial"
                          value={machine.MachineSerial}
                          onChange={(event) =>
                            handleMachineDetailChange(
                              event,
                              index,
                              "MachineSerial"
                            )
                          }
                          placeholder="Machine Serial number"
                          class="form-control formcontrolinput"
                        />
                        {errors[`MachineSerial_${index}`] && (
                          <small className="text-danger">
                            {errors[`MachineSerial_${index}`]}
                          </small>
                        )}
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group formgroup">
                        <label htmlFor="hourCount" className="labeltag">
                          Hour Count
                        </label>
                        <input
                          type="text"
                          name="hourCount"
                          value={machine.hourCount}
                          onChange={(event) =>
                            handleMachineDetailChange(event, index, "hourCount")
                          }
                          placeholder="Hour Count"
                          class="form-control formcontrolinput"
                        />
                        {errors[`hourCount_${index}`] && (
                          <small className="text-danger">
                            {errors[`hourCount_${index}`]}
                          </small>
                        )}
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group formgroup">
                        <label htmlFor="nomSpeed" className="labeltag">
                          Nominal Speed
                        </label>
                        <input
                          type="text"
                          name="nomSpeed"
                          value={machine.nomSpeed}
                          onChange={(event) =>
                            handleMachineDetailChange(event, index, "nomSpeed")
                          }
                          placeholder="Nominal Speed"
                          class="form-control formcontrolinput"
                        />
                        {errors[`nomSpeed_${index}`] && (
                          <small className="text-danger">
                            {errors[`nomSpeed_${index}`]}
                          </small>
                        )}
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group formgroup">
                        <label htmlFor="actSpeed" className="labeltag">
                          Actual Speed
                        </label>
                        <input
                          type="text"
                          name="actSpeed"
                          value={machine.actSpeed}
                          onChange={(event) =>
                            handleMachineDetailChange(event, index, "actSpeed")
                          }
                          placeholder="Actual Speed"
                          class="form-control formcontrolinput"
                        />
                        {errors[`actSpeed_${index}`] && (
                          <small className="text-danger">
                            {errors[`actSpeed_${index}`]}
                          </small>
                        )}
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="form-group formgroup">
                        <label
                          htmlFor={`techIds_${index}`}
                          className="labeltag"
                        >
                          Technician
                        </label>
                        <Select
                          isMulti
                          name={`techIds_${index}`}
                          options={technicians.map((technician) => ({
                            value: technician.id,
                            label: `${technician.name} - (${technician.position})`,
                          }))}
                          onChange={(selectedOptions) =>
                            handleTechChange(selectedOptions, index)
                          }
                          value={technicians
                            .filter((technician) =>
                              machine.techIds.includes(technician.id)
                            )
                            .map((technician) => ({
                              value: technician.id,
                              label: technician.name,
                            }))}
                        />
                        {errors[`techIds_${index}`] && (
                          <small className="text-danger">
                            {errors[`techIds_${index}`]}
                          </small>
                        )}
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="form-group formgroup">
                        <label
                          htmlFor={`machineAttach_${index}`}
                          className="labeltag"
                        >
                          Machine Attachments
                        </label>
                        <input
                          type="file"
                          class="form-control formcontrolinput"
                          multiple
                          onChange={(event) =>
                            handleMachineDocuments(event, index)
                          }
                        />
                        {errors[`machineAttach_${index}`] && (
                          <small className="text-danger">
                            {errors[`machineAttach_${index}`]}
                          </small>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="d-flex justify-content-between">
                <div>
                  <AiOutlinePlusCircle
                    color="black"
                    className="border border-0 btn fs-1  btn-success"
                    onClick={addMachineDetail}
                  />{" "}
                  Add Machine Details
                </div>
                <div>
                  {machineDetails.length > 1 && (
                    <>
                      <MdOutlineDelete
                        color="black"
                        className="border border-0 btn fs-1 btn-danger"
                        onClick={() =>
                          removeMachineDetail(machineDetails.length - 1)
                        }
                      />
                      Remove Machine
                    </>
                  )}
                </div>
              </div>

              <div class="col-12 d-flex justify-content-end">
                <button className="btn btn-dark buttonFocus mt-2 p-2 fs-5">
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default CreateProject;
