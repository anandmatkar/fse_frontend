import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Base_Url } from '../../../Api/Base_Url';
import { Technician_TimesheetAttach } from '../../../Api/Technicians_Api';

const generateTimeSlots = () => {
  const slots = [];
  for(let i = 0; i < 24; i++) {
      for(let j = 0; j < 60; j+=30) {
          let hours = i;
          let period = 'AM';
          if(hours >= 12) {
              period = 'PM';
              hours -= 12;
          }
          if(hours === 0) hours = 12;
          
          const displayHours = hours < 10 ? '0' + hours : hours;
          const minutes = j === 0 ? '00' : j;
          slots.push(`${displayHours}:${minutes} ${period}`);
      }
  }
  return slots;
};

const TimeSheetModal = ({ projectID , onNewTimesheet, fetchProjectDetails }) => { 

  const navigate = useNavigate();
  const timeSlots = generateTimeSlots();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
      projectID: projectID,
      date: '',
      start_time: '',
      end_time: '',
      lunch_time: '', 
      comments: '',
      attachment: null
  });
  const [attachments, setAttachments] = useState([]); 

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e) => {
    const token = Cookies.get('token'); 
    const files = e.target.files;

    if (files.length > 0) {
        const fileFormData = new FormData();
         
        for(let i = 0; i < files.length; i++) {
            fileFormData.append('files', files[i]);
        }
      
        fileFormData.append('projectID', projectID); // Add projectID here

        try {
            const response = await fetch(Technician_TimesheetAttach, {
                method: 'POST',
                headers: {
                    'Authorization': token
                },
                body: fileFormData
            });
            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message);
            }

            // Set the path to state
            setAttachments(prev => [...prev, ...data.data]);
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file: ' + error.message);
        }
    }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const token = Cookies.get('token');

  try {
      const timesheetResponse = await fetch(`${Base_Url}api/v1/technician/createTimesheet`, {
          method: 'POST',
          headers: {
              'Authorization': token,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              projectID: formData.projectID,
              date: formData.date,
              startTime: formData.start_time,
              endTime: formData.end_time,
              lunchtime: formData.lunch_time,
              comments: formData.comments,
              attachment: attachments // Send the attachments array here
          })
      });
      const newTimeSheetData = {
        projectID: formData.projectID,
              date: formData.date,
              startTime: formData.start_time,
              endTime: formData.end_time,
              lunchtime: formData.lunch_time,
              comments: formData.comments,
              attachment: attachments // Send the attachments array here
      }
      
      const timesheetData = await timesheetResponse.json();

      if (!timesheetData.success) {
          throw new Error(timesheetData.message);
      }

      toast.success("Timesheet created successfully!");
      setShowModal(false);
      // Here's the change: Pass the newly created timesheet data back to parent.
      console.log(timesheetData);
      if (timesheetData.success) {
        onNewTimesheet(newTimeSheetData);
        fetchProjectDetails();
    }
  } catch (error) {
      console.error('Error:', error);
      toast.error('Error creating timesheet: ' + error.message);
  }
};

  return (
   <div className='d-flex '>
<Button
  variant='success'
  className='w-100 my-2'
  style={{}} 
  onClick={() => setShowModal(true)}>
  Add new Timesheet
</Button>

<Modal show={showModal} onHide={() => setShowModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Add New Timesheet</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <form onSubmit={handleSubmit}> 
  
    <div className="form-group">
              <label for="date">Date:</label>
              <input className="form-control" type="date" name="date" onChange={handleInputChange} required />
            </div>
   
            <div className="form-group">
            <label htmlFor="start_time">Start Time:</label>
            <select className="form-control" name="start_time" onChange={handleInputChange} required>
    <option value="" disabled selected>Select Time</option>
    {timeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
</select>
        </div>

        <div className="form-group">
            <label htmlFor="end_time">End Time:</label>
            <select className="form-control" name="end_time" onChange={handleInputChange} required>
    <option value="" disabled selected>Select Time</option>
    {timeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
</select>
        </div>
        <div className="form-group">
            <label htmlFor="lunch_time">Lunch Time:</label>
            <select className="form-control" name="lunch_time" onChange={handleInputChange} required>
    <option value="" disabled selected>Select Time</option>
    <option value="30 minutes">30 minutes</option>
    <option value="45 minutes">45 minutes</option>
    <option value="1 hour">1 hour</option>
</select>
        </div>
    
      <div className="form-group">
              <label for="comments">Comments:</label>
              <textarea className="form-control" name="comments" value={formData.comments} onChange={handleInputChange} required></textarea>
            </div>

<div className="form-group">
              <label for="files">Attachment:</label>
              <input className="form-control" type="file" name="files" onChange={handleFileUpload} multiple />
            </div>
      <Button type="submit">Submit</Button> 
      </form>

  </Modal.Body>
  <Modal.Footer>

  
  </Modal.Footer>
</Modal>     
</div>  
  )
}

export default TimeSheetModal


