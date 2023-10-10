import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container, Table, Form, Pagination, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

export default function ManageTechnician() {

    const [technicianList, setTechnicianList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [techniciansPerPage] = useState(10);

    const indexOfLastTechnician = currentPage * techniciansPerPage;
    const indexOfFirstTechnician = indexOfLastTechnician - techniciansPerPage;
    const currentTechnicians = technicianList.slice(
        indexOfFirstTechnician,
        indexOfLastTechnician
    );

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredTechnicians = currentTechnicians.filter((technician) =>
        `${technician.name} ${technician.surname}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const fetchTechnicianList = async () => {
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
            const response = await axios.get('http://localhost:3003/api/v1/manager/technicianLists', config);
            console.log(response.data);
            setTechnicianList(response.data.data);            
        } catch (error) {
            console.log(error.message);            
        }
    }
    
    useEffect(() => {
        fetchTechnicianList();
    }, []);

  return (
    <React.Fragment>
        <Container className='my-5'>

            <Button variant='warning' as={NavLink} to={'/createtechnician'}>Create Technician</Button>

            <h3 className='my-3'>Manage Technicians</h3>

            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1"><FaSearch/></InputGroup.Text>
                <Form.Control
                placeholder="Search Technicians"
                aria-label="Search Technicians"
                aria-describedby="basic-addon1"
                onChange={handleSearch}
                />
            </InputGroup>

            <Table hover responsive className='technicians-data-table my-3'>
                <thead>
                    <tr>
                        <th>S. No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (filteredTechnicians) ? (
                            filteredTechnicians.map((technician, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{`${technician.name} ${technician.surname}`}</td>
                                    <td>{technician.email_address}</td>
                                    <td>
                                        <Button as={NavLink} to={`/viewtechnicianprofile/${technician.id}`}>
                                            View Details
                                        </Button>
                                    </td>
                                    
                                    
                                </tr>
                            ))
                        ) : (
                            <tr className='text-center'>
                                No Technician List to Show
                            </tr>
                        )
                    }
                </tbody>
            </Table>

            <Pagination className="justify-content-center">
            {Array.from({ length: Math.ceil(technicianList.length / techniciansPerPage) }).map((_, index) => (
                <Pagination.Item
                key={index}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
                >
                {index + 1}
                </Pagination.Item>
            ))}
            </Pagination>
        </Container>
    </React.Fragment>
  )
}
