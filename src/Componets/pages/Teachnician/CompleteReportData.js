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


const CompleteReportData = () => {
    const { projectID } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        const token = Cookies.get('token');
        fetch(`${Technician_DetailJobAssign}?projectId=${projectID}`, {
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
    }, [projectID]);

  
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
                            {project && (
                                <Table striped bordered hover responsive className='bf-table'>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Description</th>
                                            <th>Attachments</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {project.technician_data.flatMap(technician =>
                                            technician.project_report_data.map(report => (
                                                <tr key={report.id}>
                                                    <td>{report.date}</td>
                                                    <td>{report.description}</td>

                                                    <td>
                                                        {report.report_attach_data && report.report_attach_data.map(attachment => (

                                                            <a key={attachment.id} href={attachment.file_path} target="_blank" rel="noreferrer">
                                                                <AiFillProfile size="30px" color="black" />
                                                            </a>
                                                        ))}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </Table>
                            )}

                            {!project && <div>Loading...</div>}
                        </div>
                    </div>
                </div>
            </Container>
        </Layout4>
    );
}

export default CompleteReportData;
