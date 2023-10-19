import React, { useState, useEffect } from 'react';
import Layout4 from '../../Layout/Layout4';
import { Table, Container, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Technician_DetailJobAssign, Technician_DeleteReport } from '../../../Api/Technicians_Api';
import { AiFillProfile } from 'react-icons/ai';
import './JobAssigned.css';
import NewReportModal from './NewReportModal';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequestApproval from './RequestApproval';
import { Base_Url } from '../../../Api/Base_Url';

const AssignReportData = () => {
    const { projectID , machineID } = useParams();
    const [project, setProject] = useState([]);

    const [isRequestSent, setIsRequestSent] = useState(false);


    const fetchData = () => {
        const token = Cookies.get('token');
        const reportDetailsUrl = `${Base_Url}api/v1/technician/reportDetailsForTech?projectId=${projectID}&machineId=${machineID}`
        fetch(reportDetailsUrl, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data && data.data && data.data.length > 0) {
                    setProject(data.data);  // <-- set the entire array here
                }
            })
            .catch(error => console.error("Error fetching report data:", error));
    };
    useEffect(() => {
        fetchData();
    }, [projectID, machineID]); 
        

    const deleteReport = async (id, project_id) => {
        try {
            const token = Cookies.get('token');
            if (!token) {
                console.error("Token not found in localStorage.");
                return;
            }
    
            const config = {
                headers: {
                    Authorization: token,
                },
            };
            
            let url = `${Technician_DeleteReport}?projectId=${project_id}&reportId=${id}`;
            const response = await axios.get(url, config);
    
            if (response.status === 200) {
                toast.success("Report deleted succesfully");
    
                // Instantly update the state to reflect the deletion
                setProject(prevProjectArray => {
                    return prevProjectArray.filter(report => report.id !== id);
                });
            } else {
                toast.error("Failed to delete Report");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    
    

    const onNewReportCallback = (newReport) => {
        setProject(prevProject => {
            // Check if prevProject or prevProject.technician_data is null/undefined
            if (!prevProject?.technician_data) return prevProject;

            const updatedTechnicianData = prevProject.technician_data.map(technician => {
                const existingReports = technician.project_report_data || [];
                return {
                    ...technician,
                    project_report_data: [...existingReports, newReport]  // Add the new report
                };
            });
    
            return {
                ...prevProject,
                technician_data: updatedTechnicianData
            };
        });
        
        fetchData(); 
    }

    const shouldShowButtons = () => {
        return project.every(report => !report.is_requested_for_approval && !report.is_approved);
    };

    
    return (
        <Layout4>
        <Container fluid>
            <div className="text-center mb-5 mt-3">
                <h6 className="section-title bg-white text-center text-primary px-3">Report Details</h6>
                <h1>Your Report Details</h1>
                <div className='d-flex justify-content-center align-items-center'>
                {shouldShowButtons() && (
                    <>
                        <NewReportModal projectID={projectID} machineID={machineID} onNewReport={onNewReportCallback} />
                        {project && project.length > 0 && <RequestApproval projectID={projectID} onRequestSent={() => setIsRequestSent(true)} />}
                    </>
                )}
                </div>

            </div>
    
            <div className="card">
                <div className="card-body">
                    <div className="bf-table-responsive">
                        {project && project.length > 0 ? (
                            <Table striped bordered hover responsive className='bf-table'>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Description</th>
                                        <th>Comments</th>
                                        <th>Duration</th>
                                        <th>Attachments</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {project.map(report => (
                                        <tr key={report.id}>
                                            <td>{report.date}</td>
                                            <td>{report.description}</td>
                                            <td>{report.comments}</td>
                                            <td>{report.duration}</td>
                                            <td>
                                                {report.project_documents.map(attachment => (
                                                    <a key={attachment.id} href={attachment.file_path} target="_blank" rel="noreferrer">
                                                        <AiFillProfile size="30px" color="black" />
                                                    </a>
                                                ))}
                                            </td>
                                            <td>
                                                <Button variant="danger" onClick={() => deleteReport(report.id, projectID)}>
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <div className="text-center fs-3 fw-bold">
                                No report presented.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Container>
    </Layout4>
    
    );
}

export default AssignReportData;
