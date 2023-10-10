import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container, Table, Form, Pagination, InputGroup } from 'react-bootstrap';
import { FaSearch, FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { Technician_Lists_Manager } from './../../../Api/Manager_Api';

export default function ManageTechnician() {

    const [technicianList, setTechnicianList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [techniciansPerPage] = useState(10);
    const pagesToShow = 2; // Number of pages to show before and after the current page

    

    const indexOfLastTechnician = currentPage * techniciansPerPage;
    const indexOfFirstTechnician = indexOfLastTechnician - techniciansPerPage;
    const currentTechnicians = technicianList.slice(indexOfFirstTechnician, indexOfLastTechnician);


    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredTechnicians = currentTechnicians.filter((technician) =>
        `${technician.name} ${technician.surname}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(technicianList.length / techniciansPerPage);

    const paginate = (pageNumber) => {
        if (pageNumber < 1) {
            pageNumber = 1;
        } else if (pageNumber > totalPages) {
            pageNumber = totalPages;
        }
        setCurrentPage(pageNumber);
    };

    const renderPaginationItems = () => {
        const items = [];
        const startPage = Math.max(1, currentPage - pagesToShow);
        const endPage = Math.min(totalPages, currentPage + pagesToShow);

        // Add the "First Page" button
        items.push(
            <Pagination.First
                key="first-page"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
            />
        );

        // Add the "Previous Pages" button
        if (currentPage > pagesToShow + 1) {
            items.push(
                <Pagination.Ellipsis
                    key="previous-ellipsis"
                    onClick={() => setCurrentPage(currentPage - pagesToShow - 1)}
                />
            );
        }

        for (let page = startPage; page <= endPage; page++) {
            items.push(
                <Pagination.Item
                    key={page}
                    active={page === currentPage}
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </Pagination.Item>
            );
        }

        // Add the "Next Pages" button
        if (currentPage < totalPages - pagesToShow) {
            items.push(
                <Pagination.Ellipsis
                    key="next-ellipsis"
                    onClick={() => setCurrentPage(currentPage + pagesToShow + 1)}
                />
            );
        }

        // Add the "Last Page" button
        items.push(
            <Pagination.Last
                key="last-page"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
            />
        );

        return items;
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
            const response = await axios.get(Technician_Lists_Manager, config);
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
                    {renderPaginationItems()}
            </Pagination>
            
        </Container>
    </React.Fragment>
  )
}