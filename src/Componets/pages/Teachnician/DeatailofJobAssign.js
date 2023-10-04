import React, {useState , useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import TimeSheetModal from './TimeSheetModal';
import NewReportModal from './NewReportModal';
import axios from 'axios';
import TimeSheetApprovalModal from './TimeSheetApprovalModal';
import RequestApproval from './RequestApproval';

const DeatailofJobAssign = () => {
    const style = {
        borderRight: "1px solid #000",
        paddingRight : "16px",
        height : "100%"
    }

    const [project , setProject] = useState(null);
    const [timesheetData, setTimesheetData] = useState([]);
    const [NewReport, setNewReport] = useState([]);
   


    const {projectID} = useParams();

        const deleteTimeSheet = async (id, project_id) => {

          console.log(id, project_id);

          try {
            const token = Cookies.get('token');
console.log(token,"token")
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
            let url = `http://localhost:3003/api/v1/technician/deleteTimesheet?projectId=${project_id}&timeSheetId=${id}`
            
            const response = await axios.get(url, config);            

            if (response.status === 200) {
              alert('Timesheet successfully deleted!');
              console.log('Timesheet entry deleted successfully');
  
              // Update the state to reflect the deleted timesheet
              setProject((prevProject) => {
                  const updatedTechnicianData = prevProject.technician_data.map(technician => {
                      const updatedTimeSheets = technician.timesheet_data.filter(timesheet => timesheet.id !== id);
                      return { ...technician, timesheet_data: updatedTimeSheets };
                  });
  
                  return { ...prevProject, technician_data: updatedTechnicianData };
              });
  
          } else {
              console.error('Failed to delete timesheet entry');
          }
      } catch (error) {
          console.error('Error:', error);
      }
  };
  
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
            let url = `http://localhost:3003/api/v1/technician/deleteReport?projectId=${project_id}&reportId=${id}`
            
            const response = await axios.get(url, config);            

            if (response.status === 200) {
              alert('Report successfully deleted!');
              setProject((prevProject) => {
                const updatedTechnicianData = prevProject.technician_data.map(technician => {
                    const updatedReports = technician.project_report_data.filter(report => report.id !== id);
                    return { ...technician, project_report_data: updatedReports };
                });

                return { ...prevProject, technician_data: updatedTechnicianData };
            });

        } else {
            console.error('Failed to delete report entry');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
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
       <div className="container ">
      <div className="container border border-dark mt-5 rounded p-4">
        <div className="row justify-content-center">
          <div className="d-flex align-items-start">
            <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical" style={style}>
              <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Order ID</button>
              <button className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Customer Details</button>
              <button className="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Timesheet</button>
              <button className="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Project Attachments</button>
              <button className="nav-link" id="v-pills-technician-tab" data-bs-toggle="pill" data-bs-target="#v-pills-technician" type="button" role="tab" aria-controls="v-pills-technician" aria-selected="false">Technician Detail</button>
              <button className="nav-link" id="v-pills-Report-tab" data-bs-toggle="pill" data-bs-target="#v-pills-Report" type="button" role="tab" aria-controls="v-pills-Report" aria-selected="false">Project Report</button>
            </div>
            <div className="tab-content" id="v-pills-tabContent">
              <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
              <h1>Order ID:</h1>
                <h2 className='fs-2'>{project ? project.order_id : 'Loading...'}</h2>
              </div>

              {project && (
                <>
                  <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                    <h1>Customer Data:</h1>
                    <p>Name: {project.customer_name}</p>
                    <p>Customer Contact: {project.customer_contact}</p>
                    <p>Account: {project.customer_account}</p>
                    <p>Email: {project.email_address}</p>
                    <p>Phone: {project.phone_number}</p>
                  </div>

                  <div className="tab-pane fade" id="v-pills-technician" role="tabpanel" aria-labelledby="v-pills-technician-tab">
                  <h1>Technician Details:</h1>
                                        {project.technician_data.map((technician) => (
                                            <div key={technician.id}>
                                                <p>Name: {technician.name}</p>
                                                <p>Surname: {technician.surname}</p>
                                                <p>Email: {technician.email_address}</p>
                                                <p>Phone: {technician.phone_number}</p>
                                                <p>Position : {technician.position}</p>
                                                <p>Nationality : {technician.nationality}</p>
                                                <p>Qualification : {technician.qualification}</p>
                                                <p>Level :{technician.level}</p>
                                            </div>
                                        ))}
                  </div>

                  <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
    <div className='d-flex '>
        <h1>Timesheet Data:</h1>
        {/* <button onClick={() => setShowModal(true)} type="button" className="btn btn-primary float-end" style={{position: "relative", left: "170%"}}>Add new Timesheet</button> */}
        <TimeSheetModal projectID={projectID} onNewTimesheet={setTimesheetData} />
        
        <TimeSheetApprovalModal projectID={projectID} />
    </div>
    <table style={{ width: '110%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
            <tr>
                <th style={{ padding: '10px', borderBottom: '2px solid #000' }}>Comments</th>
                <th style={{ padding: '10px', borderBottom: '2px solid #000' }}>Start Time</th>
                <th style={{ padding: '10px', borderBottom: '2px solid #000' }}>End Time</th>
                <th style={{ padding: '10px', borderBottom: '2px solid #000' }}>Date</th>
                <th style={{ padding: '10px', borderBottom: '2px solid #000' }}>Attachments</th> {/* New Column */}
                <th style={{ padding: '10px', borderBottom: '2px solid #000' }}>Action</th>
            </tr>
        </thead>
        <tbody>
            {project.technician_data.flatMap(technician => (
                technician.timesheet_data.map(timesheet => (
                    <tr key={timesheet.id}>
                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{timesheet.comments}</td>
                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{timesheet.start_time}</td>
                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{timesheet.end_time}</td>
                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{timesheet.date}</td>
                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                            {timesheet.timesheet_attach_data && timesheet.timesheet_attach_data.map(attachment => (
                                <a key={attachment.id} href={attachment.file_path} target="_blank" rel="noreferrer">
                                    {attachment.file_path.split('/').pop()}
                                </a>
                            ))}
                        </td>
                        <td>
                            <button onClick={() => deleteTimeSheet(timesheet.id, projectID)} className='btn btn-danger btn-sm'> Delete </button>
                        </td>
                    </tr>
                ))
            ))}
        </tbody>
    </table>
</div>

<div className="tab-pane fade" id="v-pills-Report" role="tabpanel" aria-labelledby="v-pills-Report-tab">
    <div className='d-flex'>
        <h1>Project Reports:</h1>
        <NewReportModal projectID={projectID} onNewReport={setNewReport} />
        <RequestApproval projectID={projectID}/>
    </div>
    {project && project.technician_data && (
        <table style={{ width: '100%', borderCollapse: 'collapse' ,marginTop:"20px"}}>
            <thead>
                <tr>
                    <th style={{ padding: '10px', borderBottom: '2px solid #000' }}>Date</th>
                    <th style={{ padding: '10px', borderBottom: '2px solid #000' }}>Description</th>
                    <th style={{ padding: '10px', borderBottom: '2px solid #000' }}>Attachments</th> {/* New Column */}
                    <th style={{ padding: '10px', borderBottom: '2px solid #000' }}>Action</th>
                </tr>
            </thead>
            <tbody>
                {project.technician_data.flatMap(technician => 
                    technician.project_report_data.map((report) => (
                        <tr key={report.id}>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{report.date}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{report.description}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                {report.report_attach_data && report.report_attach_data.map(attachment => (
                                    <a key={attachment.id} href={attachment.file_path} target="_blank" rel="noreferrer">
                                        {attachment.file_path.split('/').pop()}
                                    </a>
                                ))}
                            </td>
                            <td>
                                <button onClick={() => deleteReport(report.id, projectID)} className='btn btn-danger btn-sm'> Delete </button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    )}
</div>
                  <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                    <h1>Project Attachments:</h1>
                    {project.project_attach_data.map((item) => (
                      <div key={item.id}>
                        <a href={item.file_path} target="_blank" rel="noreferrer">
                          {item.file_path.split('/').pop()}
                        </a>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
   
    </div>
  )
}

export default DeatailofJobAssign


