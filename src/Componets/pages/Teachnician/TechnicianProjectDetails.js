import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button, Table, Nav, Tab, ListGroup, Modal } from 'react-bootstrap';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import './TechnicianProjectDetails.css'
import PageSpinner from '../Common/PageSpinner';
import { FcDocument } from 'react-icons/fc';
import Layout4 from '../../Layout/Layout4'
import { Technician_Assigned_Project_Details, Technician_Timesheet_Approval, Technician_Upload_Agreement } from '../../../Api/Technicians_Api';
import NavTechnicanProfile from '../../NavBar/navTechnicanProfile';

export default function TechnicianProjectDetails() {

    const { projectID } = useParams();
    const navigate = useNavigate();
    const fileInputRef = React.createRef();


    const tabNames = ['project-details', 'customer-details', 'reports', 'timesheets'];

    const [ activeTab, setActiveTab ] = useState('project-details');
    const [ projectDetails, setProjectDetails ] = useState({});
    const [ technicianDetails, setTechnicianDetails ] = useState([]);
    const [ machineDetails, setMachineDetails ] = useState([]);
    const [ isFetchingProjectDetails, setIsFetchingProjectDetails ] = useState(false);
    const [ selectedImage, setSelectedImage ] = useState(null); // State to store the selected image
    
    const fetchProjectDetails = async () => {
        try {
            setIsFetchingProjectDetails(true);

            let token = Cookies.get("token");
      
            if (!token) {
                toast.error("Token not found in Cookies. Session Timeout Please Login Again.");
                return;
            }
            const config = {
                headers: {
                Authorization: token,
                },
            };

            let response = await axios.get(`${Technician_Assigned_Project_Details}?projectId=${projectID}`, config);

            console.log(response.data.data[0]);

            if(response.data.status === 200) {
                setProjectDetails(response.data.data[0]);
                setTechnicianDetails(response.data.data[0].technician_data);
                setMachineDetails(response.data.data[0].machine_data);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error.message);
            setIsFetchingProjectDetails(false);            
        } finally {
            setIsFetchingProjectDetails(false);
        }
    }

    const handleImageUpload = async (e) => {
        try {

            const selectedTimeSheetFile = e.target.files[0];
            
            let token = Cookies.get("token");
      
            if (!token) {
                toast.error("Token not found in Cookies. Session Timeout Please Login Again.");
                return;
            }
            const config = {
                headers: {
                Authorization: token,
                },
            };

            // Check if an image is selected
            if (!selectedTimeSheetFile) {
                toast.error("Please Select an Timesheet Agreement to upload.");
                return;
            }

            // Create a FormData object to send the image to the API
            const formData = new FormData();
            formData.append('file', selectedTimeSheetFile);

            // Make an HTTP POST request to the upload API
            const response = await axios.post(`${Technician_Upload_Agreement}?projectId=${projectID}`, formData, config);

            if (response.data.status === 201) {
                toast.success(response.data.message);
                // You can handle success as needed
            } else {
                toast.error(response.data.message);
                // Handle the error as needed
            }
        } catch (error) {
            console.error("Timesheet Agreement Upload Error:", error);
            toast.error(error.message);            
        }
    }

    
    const [showConfirmation, setShowConfirmation] = useState(false);

    // Function to show the confirmation dialog
    const showConfirmationDialog = () => {
        setShowConfirmation(true);
    };

    // Function to hide the confirmation dialog
    const hideConfirmationDialog = () => {
        setShowConfirmation(false);
    };

    const handleRequestApprovalClick = async () => {
        // Show the confirmation dialog
        showConfirmationDialog();
    };

    const confirmApproval = async () => {

        hideConfirmationDialog();

        try {
            let token = Cookies.get("token");
      
            if (!token) {
                toast.error("Token not found in Cookies. Session Timeout Please Login Again.");
                return;
            }
            const config = {
                headers: {
                Authorization: token,
                },
            };

            let response = await axios.put(`${Technician_Timesheet_Approval}?projectId=${projectID}`,{}, config);

            if (response.data.status === 200) {
                toast.success(response.data.message);
                fetchProjectDetails();
                // You can handle success as needed
            } else {
                toast.error(response.data.message);
                // Handle the error as needed
            }            
        } catch (error) {
            toast.error(error.message);            
        }
    }

    useEffect(() => {
        fetchProjectDetails();
    }, []);


  return (
    <>
        <NavTechnicanProfile/>

            <div className="text-center my-5">
            <h6 className="section-title bg-white text-center text-primary px-3">
                Technician's Dashboard
            </h6>
            <h1>Project Details</h1>
            </div>

            {
                isFetchingProjectDetails ? (
                    <PageSpinner/>
                ) :(
                    <Container>
                        <Nav variant="tabs">
                            {tabNames.map((tabName) => (
                            <Nav.Item key={tabName}>
                                <Nav.Link
                                eventKey={tabName}
                                onClick={() => setActiveTab(tabName)}
                                className={activeTab === tabName ? 'custom-tabs-active' : 'custom-tabs'}
                                >
                                {tabName.replace('-', ' ').toUpperCase()}
                                </Nav.Link>
                            </Nav.Item>
                            ))}
                        </Nav>

                        {/* Render tab content based on the activeTab state */}
                        {activeTab === 'project-details' && (
                            <>
                                <Card className='w-100 my-2'>
                                <Card.Header className='fs-4 text-center'>Project Description</Card.Header>
                                <ListGroup variant="flush">
                                    <ListGroup.Item><b>Order ID :</b> {projectDetails.order_id}</ListGroup.Item>
                                    <ListGroup.Item><b>Customer Name :</b> {projectDetails.customer_name}</ListGroup.Item>
                                    <ListGroup.Item><b>Description :</b> {projectDetails.description}</ListGroup.Item>
                                    <ListGroup.Item><b>Start Date :</b> {projectDetails.start_date}</ListGroup.Item>
                                    <ListGroup.Item><b>End Date :</b> {projectDetails.end_date}</ListGroup.Item>
                                </ListGroup>
                                </Card>
                            </>
                        )}
                        {activeTab === 'customer-details' && (
                            <>
                                <Card className='w-100 my-2'>
                                <Card.Header className='fs-4 text-center'>Customer Description</Card.Header>
                                <ListGroup variant="flush">
                                    <ListGroup.Item><b>Customer Name : </b> {projectDetails.customer_name}</ListGroup.Item>
                                    <ListGroup.Item><b>Customer Contact : </b> {projectDetails.customer_contact}</ListGroup.Item>
                                    <ListGroup.Item><b>Customer Account : </b> {projectDetails.customer_account}</ListGroup.Item>
                                    <ListGroup.Item><b>Email : </b> {projectDetails.email_address}</ListGroup.Item>
                                    <ListGroup.Item><b>Address : </b> {projectDetails.address}</ListGroup.Item>
                                    <ListGroup.Item><b>Phone :</b> {projectDetails.phone_number}</ListGroup.Item>
                                    <ListGroup.Item><b>Country :</b> {projectDetails.country}</ListGroup.Item>
                                    <ListGroup.Item><b>City :</b> {projectDetails.city}</ListGroup.Item>
                                </ListGroup>
                                </Card>
                            </>
                        )}
                        {activeTab === 'reports' && (
                            <>
                                <Card className='w-100 my-2'>
                                    <Card.Header className='fs-4 text-center'>Reports</Card.Header>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th>Machine Serial</th>
                                                <th>Type</th>
                                                <th>Reports</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                machineDetails.length > 0 &&
                                                machineDetails.map((machine, index) => (
                                                    <tr>
                                                        <td>{machine.serial}</td>
                                                        <td>{machine.machine_type}</td>
                                                        <td>{<FcDocument className='fs-3'/>}</td>
                                                        <td>
                                                            {
                                                                (!machine.project_report_data[0].is_requested_for_approval &&
                                                                !machine.project_report_data[0].is_approved) ? 
                                                                (<Button variant='primary' size='sm'>In Progress</Button>) :
                                                                (machine.project_report_data[0].is_requested_for_approval) ?
                                                                (<Button variant='warning' size='sm'>Waiting</Button>) :
                                                                (machine.project_report_data[0].is_approved) ? 
                                                                (<Button variant='success' size='sm'>Approved</Button>) : <></>
                                                            }
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                        </Table>
                                </Card>
                            </>
                        )}
                        {activeTab === 'timesheets' && (
                            <>
                                <Card className='w-100 my-2'>
                                    <Card.Header className='fs-4 text-center'>TimeSheets</Card.Header>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th>Start Date</th>
                                                <th>End Date</th>
                                                <th>Lunch Time</th>
                                                <th>Attachment</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                technicianDetails.length > 0 &&
                                                technicianDetails.map((technician, index) => (
                                                        (
                                                            technician.timesheet_data.length > 0 &&
                                                            technician.timesheet_data.map((timesheet, index) => (
                                                                <tr>
                                                                    <td>{timesheet.start_time}</td>
                                                                    <td>{timesheet.end_time}</td>
                                                                    <td>{timesheet.lunch_time}</td>
                                                                    <td>{<FcDocument className='fs-3'/>}</td>
                                                                    <td>
                                                                        {
                                                                            (!timesheet.is_timesheet_approved &&
                                                                                !timesheet.is_timesheet_requested_for_approval)
                                                                                ? <Button variant='primary' size='sm'>In Progress</Button> : 
                                                                                (timesheet.is_timesheet_approved)
                                                                                ? <Button variant='success' size='sm'>Approved</Button> : 
                                                                                (timesheet.is_timesheet_requested_for_approval)
                                                                                ? <Button variant='warning' size='sm'>Waiting for Approval</Button> :
                                                                                <></>
                                                                        }
                                                                    </td>

                                                                </tr>
                                                            ))
                                                        )
                                                ))
                                            }
                                        </tbody>
                                        </Table>
                                </Card>

                                <Row>
                                    <Col lg={3} md={6}>

                                    </Col>
                                    <Col lg={3} md={6}>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            style={{ display: 'none' }}
                                            onChange={handleImageUpload}
                                        />
                                        <Button
                                            variant='warning'
                                            className='w-100 my-2'
                                            onClick={() => fileInputRef.current.click()}
                                        >
                                            Attach Scanned Timesheet
                                        </Button>
                                    </Col>
                                    <Col lg={3} md={6}>
                                        {
                                            (technicianDetails[0].timesheet_data[0].is_timesheet_requested_for_approval ||
                                            technicianDetails[0].timesheet_data[0].is_timesheet_approved) ? (
                                                <></>
                                            ) : (
                                                <Button variant='primary' className='w-100 my-2' onClick={() => handleRequestApprovalClick()}>Request Timesheet For Approval</Button>
                                            )
                                        }
                                    </Col>
                                    <Col lg={3} md={6}>
                                        
                                    </Col>

                                </Row>
                            </>
                        )}
                    </Container>
                )
            }

            {/* Confirmation Dialog */}
        <Modal show={showConfirmation} onHide={hideConfirmationDialog}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to request timesheet for approval?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={hideConfirmationDialog}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={confirmApproval}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}
