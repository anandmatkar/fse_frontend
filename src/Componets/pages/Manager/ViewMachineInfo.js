import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Project_Machine_Details } from '../../../Api/Manager_Api';
import NavbarManagerDashboard from '../../NavBar/navbarManagerDashboard';
import PageSpinner from '../Common/PageSpinner';

export default function ViewMachineInfo() {
  const navigate = useNavigate();

  const [machineInfoDetails, setMachineInfoDetails] = useState([]);
  const [isFetchingMachineInfo, setIsFetchingMachineInfo] = useState(false);

  const fetchMachineDetails = async () => {
    try {
      setIsFetchingMachineInfo(true);
      
      const token = Cookies.get("token");

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

      console.log(response.data);
      setMachineInfoDetails(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetchingMachineInfo(false);
    };
  };

  useEffect(() => {
    fetchMachineDetails();
  }, []);

  return (
    <React.Fragment>
      
      <NavbarManagerDashboard/>

        <Container>

          <div className="text-center wow fadeInUp my-5" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Manager's Panel
            </h6>
            <h1 className="mb-5">Machine Info Details</h1>
          </div>

          {
            isFetchingMachineInfo ? (
              <PageSpinner/>
            ) : (
              <>
                <Table bordered hover responsive>
                    <thead>
                        <tr>
                        <th>Order ID</th>
                        <th>Project Type</th>
                        <th>Description</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>View Machines</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            machineInfoDetails.map((machineInfo, i) => (
                                <>
                                    <tr key={machineInfo.id}>
                                        <td>{machineInfo.order_id}</td>
                                        <td>{machineInfo.project_type}</td>
                                        <td>{machineInfo.description}</td>
                                        <td>{machineInfo.start_date}</td>
                                        <td>{machineInfo.end_date}</td>
                                        <td>
                                            <Button
                                                variant='success'
                                                size="sm"
                                                onClick={() => navigate(`/project-attached-machine-details/${machineInfo.project_id}`)}
                                                
                                            > 
                                                View Machine's
                                            </Button>
                                        </td>
                                    </tr>
                                </>
                            ))
                        }
                    </tbody>
                </Table>
              </>
            )
          }
        </Container>
    </React.Fragment>
  )
}
