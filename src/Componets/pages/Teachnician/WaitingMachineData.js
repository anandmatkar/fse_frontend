import React, { useState, useEffect } from 'react';
import Layout4 from '../../Layout/Layout4';
import {  Table, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Technician_DetailJobAssign } from '../../../Api/Technicians_Api';
import {AiFillProfile} from 'react-icons/ai'
import './JobAssigned.css'
import {Link} from 'react-router-dom'

const WaitingMachineData = () => {
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
        .catch(error => console.error("Error fetching machine data:", error));
    }, [projectID]);

    return (
        <Layout4>
            <Container fluid>
                <div className="text-center mb-5 mt-3">
                    <h6 className="section-title bg-white text-center text-primary px-3">Machine Details</h6>
                    <h1>Your Machine Details</h1>
                </div>
                <div className="card">
                <div className="card-body">
                    <div className="bf-table-responsive">
                {project && (
                    <Table striped bordered hover responsive className='bf-table'> 
                        <thead>
                            <tr>
                                <th>Machine Type</th>
                                <th>Hour Count</th>
                                <th>Serial</th>
                                <th>Nominal Speed</th>
                                <th>Actual Speed</th>
                                <th>Description</th>
                                <th>Attachments</th>
                            </tr>
                        </thead>
                        <tbody>
                            {project.technician_data.flatMap(technician =>
                                technician.machine_data.map(machine => (
                                    <tr key={machine.id}>
                                        <td>{machine.machine_type}</td>
                                        <td>{machine.hour_count}</td>
                                        <td>{machine.serial}</td>
                                        <td>{machine.nom_speed}</td>
                                        <td>{machine.act_speed}</td>
                                        <td>{machine.description}</td>
                                        <td>
                                            {machine.machine_attach_data.map(attachment => (
                                        //        <a key={attachment.id} href={`${attachment.file_path}?projectID=${projectID}`} 
                                        //        target="_blank" rel="noreferrer" >
                                        //        <AiFillProfile size="30px" color="black"/>
                                        //    </a>
                                        <Link to={`/AssignAttachmentMachineData/${projectID}`}>
                                             <AiFillProfile size="30px" color="black" />
                                        </Link>
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

export default WaitingMachineData;
