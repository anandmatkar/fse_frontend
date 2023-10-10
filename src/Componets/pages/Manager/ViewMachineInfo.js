import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

export default function ViewMachineInfo() {

    const navigate = useNavigate();

    const [ machineInfoDetails, setMachineInfoDetails ] = useState([]);

    const fetchMachineDetails = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
            console.error("Token not found in localStorage.");
            return;
            }

            const config = {
                headers: {
                    Authorization: token,
                },
            };            

            const response = await axios.get('http://localhost:3003/api/v1/manager/machineDetails', config);

            console.log(response.data);
            setMachineInfoDetails(response.data.data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchMachineDetails();
    },[])

  return (
    <React.Fragment>
        <Container>
            <h1 className='text-center'>Machine Info Details</h1>        

                <Table bordered hover responsive>
                    <thead>
                        <tr>
                        <th>Order ID</th>
                        <th>Project Type</th>
                        <th>Description</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th></th>
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

        </Container>
    </React.Fragment>
  )
}
