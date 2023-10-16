import React, { useState, useEffect } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Technician_DetailJobAssign} from '../../../Api/Technicians_Api';
import axios from 'axios';
import { toast } from 'react-toastify';
import Layout4 from '../../Layout/Layout4';
import { AiFillProfile } from 'react-icons/ai';
const WaitingTimesheetData = () => {
    const { projectID } = useParams();
    const [timesheetData, setTimesheetData] = useState(null);
    const [project , setProject] = useState(null);

    useEffect(() => {
        const token = Cookies.get('token');
        const fetchTimesheet = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                };
                const response = await axios.get(`${Technician_DetailJobAssign}?projectId=${projectID}`, config);
                if (response.data.success) {
                  const fetchedData = response.data.data[0];
                  setTimesheetData(fetchedData);
                  setProject(fetchedData);  // add this line
              } else {
                    toast.error("Failed to fetch timesheet data");
                }
            } catch (error) {
                console.error("Error fetching timesheet data:", error);
            }
        }
        fetchTimesheet();
    }, [projectID]);

    return (
      <Layout4>
        <Container fluid>
            <div className="text-center mb-5 mt-3">
                <h6 className="section-title bg-white text-center text-primary px-3">Timesheet Details</h6>  
                <h1>Your Timesheet Details</h1>
                <div className='d-flex justify-content-center align-items-center'>
                </div>
            </div>
            
            <div className="card">
                <div className="card-body">
                    <div className="bf-table-responsive">
                        {project && (
                            <Table striped bordered hover responsive className='bf-table'> 
                                <thead>
                                    <tr>
                                        <th>Comments</th>
                                        <th>Start Time</th>
                                        <th>End Time</th>
                                        <th>Date</th>
                                        <th>Attachments</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {project.technician_data.flatMap(technician => 
                                        technician.timesheet_data.map(timesheet => (
                                            <tr key={timesheet.id}>
                                                <td>{timesheet.comments}</td>
                                                <td>{timesheet.start_time}</td>
                                                <td>{timesheet.end_time}</td>
                                                <td>{timesheet.date}</td>
                                                <td>
                                                    {timesheet.timesheet_attach_data && timesheet.timesheet_attach_data.map(attachment => (
                                                        <a key={attachment.id} href={attachment.file_path} target="_blank" rel="noreferrer" title={attachment.file_path.split('/').pop()}>
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

export default WaitingTimesheetData;
