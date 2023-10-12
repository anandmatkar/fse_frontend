import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Dropdown, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Manager_Base_Url, Project_Machine_Details } from '../../../Api/Manager_Api';
import NavbarManagerDashboard from '../../NavBar/navbarManagerDashboard';

export default function ViewProjectMachineInfo() {
  const navigate = useNavigate();

  let { projectID } = useParams();

  const [machineInfoDetails, setMachineInfoDetails] = useState([]);
  const [projectSpecificDetails, setProjectSpecificDetails] = useState([]);

  const fetchMachineDetails = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Token not found in localStorage.');
        return;
      }

      const config = {
        headers: {
          Authorization: token,
        },
      };

      const response = await axios.get(Project_Machine_Details, config);

      console.log(response.data.data);
      setMachineInfoDetails(response.data.data);

      // Filter the machineInfoDetails array to get project-specific details
      const specificDetails = response.data.data.find(
        (machineInfo) => machineInfo.project_id === projectID
      );

      if (specificDetails) {
        setProjectSpecificDetails(specificDetails.machine_data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteMachineDetails = async (machineID, projectID) => {
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        console.error("Token not found in localStorage.");
        return;
      }
  
      const config = {
        headers: {
          Authorization: token,
        },
      };
  
      // Send a DELETE request to your API endpoint for machine deletion
      const response = await axios.put(
        `${Manager_Base_Url}deleteMachine?machineId=${machineID}&projectId=${projectID}`,
        {},
        config
      );
  
      if (response.status === 200) {
        // Machine deletion was successful
        // You can also update the local state or re-fetch the machine details
        fetchMachineDetails();
      } else {
        console.error("Failed to delete the machine.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    fetchMachineDetails();
  }, [projectID]);

  return (
    <>
      <NavbarManagerDashboard/>
      
      <Container>

          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Manager's Panel
            </h6>
            <h1 className="mb-5">View Project Specific Machines</h1>
          </div>

        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Machine Type</th>
              <th>Hour Count</th>
              <th>Nominal Speed</th>
              <th>Actual Speed</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projectSpecificDetails.map((machine, i) => (
              <>
                <tr key={machine.machine_id}>
                  <td>{machine.serial}</td>
                  <td>{machine.machine_type}</td>
                  <td>{machine.hour_count}</td>
                  <td>{machine.nom_speed}</td>
                  <td>{machine.act_speed}</td>
                  <td>{machine.description}</td>
                  <td>
                  <Dropdown drop='centered'>
                    <Dropdown.Toggle variant="secondary" size="sm" id="machine-actions-dropdown">
                      Actions
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item  size="sm" className='edit-machine-action'
                        onClick={() =>
                          navigate(`/project-attached-machine-details/edit-machine/${projectID}/${machine.machine_id}`)
                        }
                      >
                        Edit Machine
                      </Dropdown.Item>
                      <Dropdown.Item size="sm" className='delete-machine-action'
                        onClick={() => handleDeleteMachineDetails(machine.machine_id, projectID)}
                      >
                        Delete Machine
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  </td>
                </tr>
              </>
            ))}
            <tr></tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
}
