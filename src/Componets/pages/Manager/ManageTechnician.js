import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Technician_Lists_Manager } from './../../../Api/Manager_Api';

export default function ManageTechnician() {
  const [technicianList, setTechnicianList] = useState();

  const fetchTechnicianList = async () => {
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
      const response = await axios.get(Technician_Lists_Manager, config);
      console.log(response.data);
      setTechnicianList(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchTechnicianList();
  }, []);

  return (
    <React.Fragment>
      <Container className="my-5">
        <Button variant="warning" as={NavLink} to={'/createtechnician'}>
          Create Technician
        </Button>

        <h3 className="my-3">Manage Technicians</h3>

        <Table bordered hover responsive className="my-3">
          <thead>
            <tr>
              <th>S. No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {technicianList ? (
              technicianList.map((technician, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{`${technician.name} ${technician.surname}`}</td>
                  <td>{technician.email_address}</td>
                  <td>
                    <Button
                      as={NavLink}
                      to={`/viewtechnicianprofile/${technician.id}`}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center">No Technician List to Show</tr>
            )}
          </tbody>
        </Table>
      </Container>
    </React.Fragment>
  );
}
