import React, { useState, useEffect } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Technician_DetailJobAssign , Technician_DeleteTimesheet} from '../../../Api/Technicians_Api';
import axios from 'axios';
import { toast } from 'react-toastify';
import Layout4 from '../../Layout/Layout4';
import { AiFillProfile } from 'react-icons/ai';
import TimeSheetModal from './TimeSheetModal';
import TimeSheetApprovalModal from './TimeSheetApprovalModal';
import { Modal } from 'react-bootstrap';


const AssignTimesheetData = () => {
    const { projectID } = useParams();
    const [timesheetData, setTimesheetData] = useState(null);
    const [project , setProject] = useState(null);
    const [isRequestSent, setIsRequestSent] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
const [timesheetToDelete, setTimesheetToDelete] = useState(null);


    const fetchTimesheet = async () => {
        try {
            const token = Cookies.get('token');
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

    useEffect(() => {
      
        
        fetchTimesheet();
    }, [projectID]);

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
            Authorization: token, 
          },
        };
console.log(config, "config")
        let url = `${Technician_DeleteTimesheet}?projectId=${project_id}&timeSheetId=${id}`
        
        const response = await axios.get(url, config);            

        if (response.status === 200) {
          toast.success("Timehseet deleted succesfully")
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

const confirmDelete = async () => {
    // The actual deletion code
    await deleteTimeSheet(timesheetToDelete, projectID);
    setShowDeleteModal(false); // close the modal
  }
  
  const handleDelete = (id) => {
    setTimesheetToDelete(id);
    setShowDeleteModal(true);
  }
const onNewTimesheetCallback = (newTimesheet) => {
//   console.log(newTimesheet);
// setTimesheetData(prevData => [...prevData, newTimesheet]);
// Update project
setProject(prevProject => {
  const updatedTechnicianData = prevProject.technician_data.map(technician => {
      return {
          ...technician,
          timesheet_data: [...technician.timesheet_data, newTimesheet]
      };
  });
  return {
      ...prevProject,
      technician_data: updatedTechnicianData
  };
});
fetchTimesheet();
}
    return (
      <Layout4>
        <Container fluid>
            <div className="text-center mb-5 mt-3">
                <h6 className="section-title bg-white text-center text-primary px-3">Timesheet Details</h6>  
                <h1>Your Timesheet Details</h1>
                <div className='d-flex justify-content-center align-items-center'>
    {!isRequestSent && (
        <>
            <TimeSheetModal projectID={projectID} onNewTimesheet={onNewTimesheetCallback} />
            {project && project.technician_data && project.technician_data.some(technician => technician.timesheet_data.length > 0) && <TimeSheetApprovalModal projectID={projectID} onRequestSent={() => setIsRequestSent(true)} />}
        </>
    )}
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
              <th>Lunch Time</th>
              <th>Date</th>
              <th>Attachments</th>
              <th>Action</th>
          </tr>
      </thead>
      <tbody>
          {project.technician_data.flatMap(technician => 
              technician.timesheet_data.map(timesheet => (
                  <tr key={timesheet.id}>
                      <td>{timesheet.comments || 'No data'}</td>
                      <td>{timesheet.start_time || 'No data'}</td>
                      <td>{timesheet.end_time || 'No data'}</td>
                      <td>{timesheet.lunch_time || 'No data'}</td>
                      <td>{timesheet.date || 'No data'}</td>
                      <td>
                          {timesheet.timesheet_attach_data && timesheet.timesheet_attach_data.length > 0 ? 
                              timesheet.timesheet_attach_data.map(attachment => (
                                  <a key={attachment.id} href={attachment.file_path} target="_blank" rel="noreferrer" title={attachment.file_path.split('/').pop()}>
                                      <AiFillProfile size="30px" color="black" />
                                  </a>
                              )) 
                              : 
                              'No data'
                          }
                      </td>
                      <td>
                      <Button className='job-delete-timesheet-btn' variant="danger" size="sm" onClick={() => handleDelete(timesheet.id)}>Delete</Button>

                      </td>
                  </tr>
              ))
          )}
      </tbody>
  </Table>
)}
                        {!project && <div>No timesheet presented.</div>}
                    </div>
                </div>
            </div>
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Confirm Deletion</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    Are you sure you want to delete this timesheet entry?
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
      No
    </Button>
    <Button variant="danger" onClick={confirmDelete}>
      Yes
    </Button>
  </Modal.Footer>
</Modal>
        </Container>
        </Layout4>
    );
}

export default AssignTimesheetData;
