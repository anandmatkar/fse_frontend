import React,{useState , useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Card, ListGroup, Row , Table , Button , Container } from 'react-bootstrap';
import Layout4 from '../../Layout/Layout4';
import {AiFillProfile} from 'react-icons/ai'
import { Technician_DetailJobAssign } from '../../../Api/Technicians_Api';
import { Link } from 'react-router-dom';

const DetailofJobclosed = () => {
   
    const [project, setProject] = useState(null);
    const [timesheetData, setTimesheetData] = useState([]);
    const [NewReport, setNewReport] = useState([]);

    const { projectID } = useParams();
    useEffect(() => {
        const token = Cookies.get('token');
        fetch(`${Technician_DetailJobAssign}?projectId=${projectID}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          if (data && data.data && data.data.length > 0) {
            setProject(data.data[0]);
            setTimesheetData(data.data[0].timesheet_data);
          } else {
            console.error('API response is not in the expected format:', data);
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      }, [projectID]);
  return (
    <Layout4>
          <Container fluid>
          {/* order id */}
         <div className="text-center mb-5 mt-5">
                    <h6 className="section-title bg-white text-center text-primary px-3">Detail Panel</h6>
                    <h1>Your Complete Tasks Details</h1>
                    <h2 className='fs-2 font-weight-bold'>Order Id:-{project ? project.order_id : 'Loading...'}</h2>
                </div>
    
    <div className="container border border-dark mt-5 rounded p-4">
      <div className="row">
      {project ? (
              <>
                {/* Customer Details */}
                <div className="col-6">
                  <Card>
                    <Card.Header className='fs-5 fw-bold'>Customer Data:</Card.Header>
                    <ListGroup variant="flush">
                      <ListGroup.Item><b>Name : </b> {project.customer_name || 'N/A'}</ListGroup.Item>
                      <ListGroup.Item><b>Customer Contact :</b> {project.customer_contact || 'N/A'}</ListGroup.Item>
                      <ListGroup.Item><b>Account :</b> {project.customer_account || 'N/A'}</ListGroup.Item>
                      <ListGroup.Item><b>Email Address :</b> {project.email_address || 'N/A'}</ListGroup.Item>
                      <ListGroup.Item><b>Phone :</b> {project.phone_number || 'N/A'}</ListGroup.Item>
                    </ListGroup>
                  </Card>
                </div>

                {/* Technician Details */}
                <div className="col-6">
                  {project.technician_data.map((technician, index) => (
                    <Card key={technician.id}>
                      <Card.Header className='fs-5 fw-bold'>Technician Data:</Card.Header>
                      <ListGroup variant="flush">
                        <ListGroup.Item><b>Name:</b> {technician.name || 'N/A'}</ListGroup.Item>
                        <ListGroup.Item><b>Surname:</b> {technician.surname || 'N/A'}</ListGroup.Item>
                        <ListGroup.Item><b>Email:</b> {technician.email_address || 'N/A'}</ListGroup.Item>
                        <ListGroup.Item><b>Phone:</b> {technician.phone_number || 'N/A'}</ListGroup.Item>
                        <ListGroup.Item><b>Position:</b> {technician.position || 'N/A'}</ListGroup.Item>
                        <ListGroup.Item><b>Nationality:</b> {technician.nationality || 'N/A'}</ListGroup.Item>
                        <ListGroup.Item><b>Qualification:</b> {technician.qualification || 'N/A'}</ListGroup.Item>
                        <ListGroup.Item><b>Level:</b> {technician.level || 'N/A'}</ListGroup.Item>
                      </ListGroup>
                    </Card>
                  ))}
                </div>
   
               {/* Table with 4 buttons */}

               <div className='col-12 mt-3'>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Machine Data</th>
                        {/* <th>Project Report</th> */}
                        <th>Timesheet Data</th>
                        <th>Project Attachments</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <Link to={`/CompleteMachineData/${project.project_id}`}>
                            <Button variant="primary">See Machine Details</Button>
                          </Link>
                        </td>
                        {/* <td>
                          <Link to={`/CompleteReportData/${project.project_id}`}>
                            <Button variant="primary">See Project Report</Button>
                          </Link>
                        </td> */}
                        <td>
                          <Link to={`/CompleteTimesheetData/${project.project_id}`}>
                            <Button variant="primary">See Timesheet Data</Button>
                          </Link>
                        </td>
                        <td>
                          <Link to={`/CompleteProjectAttachments/${project.project_id}`}>
                            <Button variant="primary">See Attachments</Button>
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>

              </>
                ) : (
                    <div className="text-center mt-5">Loading...</div>
                  )}
                </div>
              </div>
            </Container>
    </Layout4>
  )
}

export default DetailofJobclosed
