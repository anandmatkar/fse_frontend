import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewProjectMachineInfo() {
  const navigate = useNavigate();

  let { projectID } = useParams();

  const [machineInfoDetails, setMachineInfoDetails] = useState([]);
  const [projectSpecificDetails, setProjectSpecificDetails] = useState([]);

  const fetchMachineDetails = async () => {
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

      const response = await axios.get(
        "http://localhost:3003/api/v1/manager/machineDetails",
        config
      );

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

  useEffect(() => {
    fetchMachineDetails();
  }, [projectID]);

  return (
    <>
      <Container>
        <h1>Machine Info Details</h1>

        <Table bordered hover responsive>
          <thead>
            <tr>

                <th>Serial No.</th>
                <th>Machine Type</th>
                <th>Hour Count</th>
                <th>Nominal Speed</th>
                <th>Actual Speed</th>
                <th>Description</th>
                <th></th>
            </tr>
          </thead>
          <tbody>
            {projectSpecificDetails.map((machine, i) => (
              <>
                <tr key={machine.id}>
                  <td>{machine.serial}</td>
                  <td>{machine.machine_type}</td>
                  <td>{machine.hour_count}</td>
                  <td>{machine.nom_speed}</td>
                  <td>{machine.act_speed}</td>
                  <td>{machine.description}</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() =>
                        navigate(
                          `/project-attached-machine-details/edit-machine/${machine.machine_id}`
                        )
                      }
                    >
                      Edit Machine
                    </Button>
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
