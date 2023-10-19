import React, { useState, useEffect } from 'react';
import Layout4 from '../../Layout/Layout4';
import { Table, Container, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Technician_DetailJobAssign, Technician_DeleteReport } from '../../../Api/Technicians_Api';
import { AiFillProfile } from 'react-icons/ai';
import './JobAssigned.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Base_Url } from '../../../Api/Base_Url';


const WaitingReportData = () => {
    const { projectID , machineID } = useParams();
    const [project, setProject] = useState([]);

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

  
    return (
        <Layout4>
            <Container fluid>
                <div className="text-center mb-5 mt-3">
                    <h6 className="section-title bg-white text-center text-primary px-3">Report Details</h6>
                    <h1>Your Report Details</h1>
                </div>

                <div className="card">
                    <div className="card-body">
                        <div className="bf-table-responsive">
                            {project &&  project.length > 0 ?  (
                                <Table striped bordered hover responsive className='bf-table'>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Description</th>
                                            <th>Comments</th>
                                            <th>Duration</th>
                                            <th>Attachments</th>
                                          
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
                                                        { report.project_documents.map(attachment => (

                                                            <a key={attachment.id} href={attachment.file_path} target="_blank" rel="noreferrer">
                                                                <AiFillProfile size="30px" color="black" />
                                                            </a>
                                                        ))}
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            ):(

                                <div className="text-center">
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

export default WaitingReportData;
