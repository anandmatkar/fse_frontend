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
    const [project, setProject] = useState(null);

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
                    setProject(data.data[0]);
                }
            })
            .catch(error => console.error("Error fetching report data:", error));
    };
    useEffect(() => {
        fetchData();
    }, [projectID, machineID]); 
        

    const deleteReport = async (id, project_id) => {

        console.log(id, project_id);

        try {
            const token = Cookies.get('token');
            // console.log(token,"token")
            if (!token) {
                console.error("Token not found in localStorage.");
                return;
            }

            const config = {
                headers: {
                    Authorization: token, // Attach the token with "Bearer" prefix
                },
            };
            console.log(config, "config")
            let url = `${Technician_DeleteReport}?projectId=${project_id}&reportId=${id}`

            const response = await axios.get(url, config);

            if (response.status === 200) {
                toast.success("Report deleted succesfully")
                setProject((prevProject) => {
                    const updatedTechnicianData = prevProject.technician_data.map(technician => {
                        const updatedReports = technician.project_report_data.filter(report => report.id !== id);
                        return { ...technician, project_report_data: updatedReports };
                    });

                    return { ...prevProject, technician_data: updatedTechnicianData };
                });

            } else {
                toast.error("failed to delete Report")
                console.error('Failed to delete report entry');
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
                // Use a default empty array if project_report_data doesn't exist
                const existingReports = technician.project_report_data || [];
                return {
                    ...technician,
                    project_report_data: [...existingReports, newReport]
                };
            });
            
            return {
                ...prevProject,
                technician_data: updatedTechnicianData
            };
        });
    }
    
    return (
        <Layout4>
            <Container fluid>
                <div className="text-center mb-5 mt-3">
                    <h6 className="section-title bg-white text-center text-primary px-3">Report Details</h6>
                    <h1>Your Report Details</h1>
                    <div className='d-flex justify-content-center align-items-center'>
                    <NewReportModal projectID={projectID} machineID={machineID} onNewReport={onNewReportCallback} />
                    {project && project.technician_data && project.technician_data.some(technician => technician.project_report_data && technician.project_report_data.length > 0) && 
                    <RequestApproval projectID={projectID} />}
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <div className="bf-table-responsive">
                            {project ? (
                                project.project_documents && project.project_documents.length > 0 ? (
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
                                            <tr>
                                                <td>{project.date}</td>
                                                <td>{project.description}</td>
                                                <td>{project.comments}</td>
                                                <td>{project.duration}</td>
                                                <td>
                                                    {project.project_documents.map(attachment => (
                                                        <a key={attachment.id} href={attachment.file_path} target="_blank" rel="noreferrer">
                                                            <AiFillProfile size="30px" color="black" />
                                                        </a>
                                                    ))}
                                                </td>
                                                <td>
                                                    <Button variant="danger" onClick={() => deleteReport(project.id, projectID)}>
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                ) : (
                                    <div className="text-center">
                                        No report presented.
                                    </div>
                                )
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
