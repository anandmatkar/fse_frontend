import React, { useState, useEffect } from 'react';
import Layout4 from '../../Layout/Layout4';
import { Table, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Technician_DetailJobAssign } from '../../../Api/Technicians_Api';
import { AiFillProfile } from 'react-icons/ai';

const AssignAttachmentMachineData = () => {
    const { projectID } = useParams();
    const [attachments, setAttachments] = useState([]);

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
                // Assuming each technician might have multiple machine data with attachments
                let allAttachments = [];
                data.data[0].technician_data.forEach(technician => {
                    technician.machine_data.forEach(machine => {
                        allAttachments = [...allAttachments, ...machine.machine_attach_data];
                    });
                });
                setAttachments(allAttachments);
            }
        })
        .catch(error => console.error("Error fetching machine attachment data:", error));
    }, [projectID]);

    return (
        <Layout4>
            <Container fluid>
                <div className="text-center mb-5 mt-3">
                    <h6 className="section-title bg-white text-center text-primary px-3">Machine Attachments</h6>
                    <h1>Your Machine Attachments</h1>
                </div>
                <div className="card">
                <div className="card-body">
                    <div className="bf-table-responsive">
                {attachments && attachments.length > 0 ? (
                    <Table striped bordered hover responsive className='bf-table'> 
                        <thead>
                            <tr>
                                <th>Attachment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attachments.map(attachment => (
                                <tr key={attachment.id}>
                                    <td>
                                        <a href={`${attachment.file_path}?projectID=${projectID}`} target="_blank" rel="noreferrer">
                                           <AiFillProfile size="30px" color="black"/>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <div>No attachments found.</div>
                )}
                </div>
                </div>
                </div>
            </Container>
        </Layout4>
    );
}

export default AssignAttachmentMachineData;
