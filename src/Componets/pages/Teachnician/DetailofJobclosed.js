import React,{useState , useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Card, ListGroup, Row , Table , Button , Container } from 'react-bootstrap';
// import TimeSheetModal from './TimeSheetModal';
// import NewReportModal from './NewReportModal';
import {AiFillProfile} from 'react-icons/ai'
import axios from 'axios';

const DetailofJobclosed = () => {
    const style = {
        borderRight: "1px solid #000",
        paddingRight: "16px",
        height:"100%"
    }
   
    const tab = {
      borderRadius:"20px"
  }
    const [project, setProject] = useState(null);
    const [timesheetData, setTimesheetData] = useState([]);
    const [NewReport, setNewReport] = useState([]);

    const { projectID } = useParams();
   

    useEffect(() => {
        const token = Cookies.get('token');
        fetch(`/api/v1/technician/assignedProjectDetails?projectId=${projectID}`, {
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
    <div>
       <Container fluid>
    <div className="container border border-dark mt-5 rounded p-4">
      <div className="row justify-content-center">
        <div className="d-flex align-items-start">
          <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical" style={style}>

          <ListGroup variant="flush">
            <ListGroup.Item action href="#v-pills-home" id="v-pills-home-tab" data-bs-toggle="pill" role="tab" aria-controls="v-pills-home" style={tab}>
                Order ID
            </ListGroup.Item>
            <ListGroup.Item action href="#v-pills-profile" id="v-pills-profile-tab" data-bs-toggle="pill" role="tab" aria-controls="v-pills-profile" style={tab}>
                Technician Detail
            </ListGroup.Item>
            <ListGroup.Item action href="#v-pills-messages" id="v-pills-messages-tab" data-bs-toggle="pill" role="tab" aria-controls="v-pills-messages" style={tab}> 
                Timesheet
            </ListGroup.Item>
            <ListGroup.Item action href="#v-pills-settings" id="v-pills-settings-tab" data-bs-toggle="pill" role="tab" aria-controls="v-pills-settings" style={tab}>
                Project Attachments
            </ListGroup.Item>
            <ListGroup.Item action href="#v-pills-technician" id="v-pills-technician-tab" data-bs-toggle="pill" role="tab" aria-controls="v-pills-technician" style={tab}>
                Technician Detail
            </ListGroup.Item>
            <ListGroup.Item action href="#v-pills-Report" id="v-pills-Report-tab" data-bs-toggle="pill" role="tab" aria-controls="v-pills-Report" style={tab}>
                Project Report
            </ListGroup.Item>
            <ListGroup.Item action href="#v-pills-machine" id="v-pills-machine-tab" data-bs-toggle="pill" role="tab" aria-controls="v-pills-machine"  style={tab}>
                Machine Data
            </ListGroup.Item>
        </ListGroup>
   
          </div>
          <div className="tab-content" id="v-pills-tabContent">
            <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
           <Card.Header className='fs-5 fw-bold'>Order ID:</Card.Header>
              <h2 className='fs-2'>{project ? project.order_id : 'Loading...'}</h2>
            </div>

            {project && (
              <>
                <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                <Card>
                        <Card.Header className='fs-5 fw-bold'>Customer Data:</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item><b>Name : </b> {`${project.customer_name}`}</ListGroup.Item>
                            <ListGroup.Item><b>Customer Contact :</b> {`${project.customer_contact}`}</ListGroup.Item>
                            <ListGroup.Item><b>Account :</b> {`${project.customer_account}`}</ListGroup.Item>
                            <ListGroup.Item><b>Email Address :</b> {`${project.email_address}`}</ListGroup.Item>
                            <ListGroup.Item><b>Phone :</b> {`${project.phone_number}`}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </div>

                <div className="tab-pane fade" id="v-pills-technician" role="tabpanel" aria-labelledby="v-pills-technician-tab">
                  <h1>Technician Details:</h1>
                                        {project.technician_data.map((technician) => (
                                             <Card key={technician.id}>
                                             <Card.Header className='fs-5 fw-bold'>Technician Data:</Card.Header>
                                             <ListGroup variant="flush">
                                                 <ListGroup.Item><b>Name:</b> {technician.name}</ListGroup.Item>
                                                 <ListGroup.Item><b>Surname:</b> {technician.surname}</ListGroup.Item>
                                                 <ListGroup.Item><b>Email:</b> {technician.email_address}</ListGroup.Item>
                                                 <ListGroup.Item><b>Phone:</b> {technician.phone_number}</ListGroup.Item>
                                                 <ListGroup.Item><b>Position:</b> {technician.position}</ListGroup.Item>
                                                 <ListGroup.Item><b>Nationality:</b> {technician.nationality}</ListGroup.Item>
                                                 <ListGroup.Item><b>Qualification:</b> {technician.qualification}</ListGroup.Item>
                                                 <ListGroup.Item><b>Level:</b> {technician.level}</ListGroup.Item>
                                             </ListGroup>
                                         </Card>
                                        ))}
                  </div>

               
                  <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
    <div className='d-flex '>
    <Card.Header className='fs-5 fw-bold'>Timesheet Data:</Card.Header>
        {/* <button onClick={() => setShowModal(true)} type="button" className="btn btn-primary float-end" style={{position: "relative", left: "170%"}}>Add new Timesheet</button> */}
        {/* <TimeSheetModal projectID={projectID} onNewTimesheet={setTimesheetData} /> */}
        
       
    </div>
    <Card style={{ marginTop: '20px' }}>
     <Card.Body>
    <Table striped bordered hover style={{marginTop: '20px'}}>
        <thead>
            <tr>
                <th style={{ padding: '10px', borderBottom: '2px solid #000' }}>Comments</th>
                <th style={{ padding: '10px', borderBottom: '2px solid #000' }}>Start Time</th>
                <th style={{ padding: '10px', borderBottom: '2px solid #000' }}>End Time</th>
                <th style={{ padding: '10px', borderBottom: '2px solid #000' }}>Date</th>
                <th style={{ padding: '10px', borderBottom: '2px solid #000' }}>Attachments</th>
            </tr>
        </thead>
        <tbody>
            {project.technician_data.flatMap(technician => (
                technician.timesheet_data.map(timesheet => (
                    <tr key={timesheet.id}>
                        <td>{timesheet.comments}</td>
                        <td>{timesheet.start_time}</td>
                        <td>{timesheet.end_time}</td>
                        <td>{timesheet.date}</td>
                        <td>
                            {timesheet.timesheet_attach_data && timesheet.timesheet_attach_data.map(attachment => (
                                <a key={attachment.id} href={attachment.file_path} target="_blank" rel="noreferrer" title={attachment.file_path.split('/').pop()}>
                                    {/* <i className="fa fa-cloud-upload fa-2x" style={{ marginRight: '5px', color: "black" }}></i> */}
                                    <AiFillProfile size="30px"  color="black"/>
                                </a>
                            ))}
                        </td>
                    </tr>
                ))
            ))}
        </tbody>
    </Table>
    </Card.Body>
    </Card>
</div>

<div className="tab-pane fade" id="v-pills-Report" role="tabpanel" aria-labelledby="v-pills-Report-tab">
    <div className='d-flex'>
    <Card.Header className='fs-5 fw-bold'>Project Reports:</Card.Header>
        {/* <NewReportModal projectID={projectID} onNewReport={setNewReport} /> */}
      
    </div>
    {project && project.technician_data && (
       <Card style={{ marginTop: '20px' }}>
       <Card.Body>
           <Table striped bordered hover>
               <thead>
                   <tr>
                       <th style={{ padding: '10px', borderBottom: '2px solid #000' }}>Date</th>
                       <th style={{ padding: '10px', borderBottom: '2px solid #000' }}>Description</th>
                       <th style={{ padding: '10px', borderBottom: '2px solid #000' }}>Attachments</th>
                   </tr>
               </thead>
               <tbody>
                   {project.technician_data.flatMap(technician => 
                       technician.project_report_data.map((report) => (
                           <tr key={report.id}>
                               <td>{report.date}</td>
                               <td>{report.description}</td>
                               <td>
                                   {report.report_attach_data && report.report_attach_data.map(attachment => (
                                       <a key={attachment.id} href={attachment.file_path} target="_blank" rel="noreferrer" style={{ margin: '0 5px' }}>
                                           {/* <i className="fa fa-cloud-upload fa-2x" style={{color:"black"}}></i> */}
                                           <AiFillProfile size="30px"  color="black"/>
                                       </a>
                                   ))}
                               </td>
                           </tr>
                       ))
                   )}
               </tbody>
           </Table>
       </Card.Body>
   </Card>
    )}
</div>

<div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
<Card.Header className='fs-5 fw-bold'>Project attachments:</Card.Header>
<Card> 
        <Card.Body>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th  style={{ padding: '10px', borderBottom: '2px solid #000' }}>#</th>
                        <th  style={{ padding: '10px', borderBottom: '2px solid #000' }}>Attachment</th>
                    </tr>
                </thead>
                <tbody>
                    {project.project_attach_data.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>
                                <a href={item.file_path} target="_blank" rel="noreferrer" title={item.file_path.split('/').pop()}>
                                    <i className="fa fa-cloud-upload fa-2x" style={{color: "black"}}></i>
                                    <div className='inn' style={{position:"relative", left:"10px", display:"inline-block"}}>
                                        File {index + 1}
                                    </div>
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Card.Body>
    </Card>
</div>

<div className="tab-pane fade" id="v-pills-machine" role="tabpanel" aria-labelledby="v-pills-machine-tab">
<Card.Header className='fs-5 fw-bold'>Machine Data:</Card.Header>
    {project && (
        <Card style={{ marginTop: '20px' }}>
            <Card.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ padding: '10px', borderBottom: '2px solid #000' }}>Type</th>
                            <th style={{ padding: '10px', borderBottom: '2px solid #000' }}>Hour Count</th>
                            <th style={{ padding: '10px', borderBottom: '2px solid #000' }}>Serial</th>
                            <th style={{ padding: '10px', borderBottom: '2px solid #000' }}>Nominal Speed</th>
                            <th style={{ padding: '10px', borderBottom: '2px solid #000' }}>Actual Speed</th>
                            <th style={{ padding: '10px', borderBottom: '2px solid #000' }}>Description</th>
                            <th style={{ padding: '10px', borderBottom: '2px solid #000' }}>Attachments</th>
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
                                            <a key={attachment.id} href={attachment.file_path} target="_blank" rel="noreferrer" title={attachment.file_path.split('/').pop()}>
                                                {/* <i className="fa fa-cloud-upload fa-2x" style={{ marginRight: '5px', color: "black" }}></i> */}
                                                <AiFillProfile size="30px"  color="black"/>
                                            </a>
                                        ))}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    )}
</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
    </Container>
  </div>
  )
}

export default DetailofJobclosed
