import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Cookies from 'js-cookie';

const TimeSheetModal = ({ projectID , onNewTimesheet }) => { 
    const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    projectID: projectID, 
    date: '',
    start_time: '',
    end_time: '',
    comments: '', 
    attachment: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, attachment: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = Cookies.get('token');
    let attachmentPath = [];

    try {
      let response = await fetch('http://localhost:3003/api/v1/technician/createTimesheet', {
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
          comments: formData.comments,
          attachment: attachmentPath 
        })
      });
      let data = await response.json();
      console.log(data.data);
      onNewTimesheet(data.data); 
      // Check if data was sent successfully
      if (!data.success) {
        throw new Error(data.message);
      }

      // If the above data was sent successfully and there's an attachment to send
      if (formData.attachment) {
        const fileFormData = new FormData();
        fileFormData.append('attachment', formData.attachment);

        response = await fetch('http://localhost:3003/api/v1/technician/uploadTimesheetAttachements', {
          method: 'POST',
          headers: {
            'Authorization': token
          },
          body: fileFormData
        });
        data = await response.json();

        if (!data.success) {
          throw new Error(data.message);
        }
        attachmentPath = data.data[0].path;
      }

      alert('Timesheet created successfully');
      setShowModal(false);

    } catch (error) {
      console.error('Error:', error);
      alert('Error creating timesheet: ' + error.message);
    }
};

  return (
    <div className='d-flex '>
      <Button 
        className="btn btn-primary float-end" 
        style={{position: "relative", left: "415%"}} 
        onClick={() => setShowModal(true)}>
        Add new Timesheet
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Timesheet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}> 
            {/* Date Input */}
            <label>
              Date:
              <input type="date" name="date" onChange={handleInputChange} required />
            </label>

            {/* Start Time Input */}
            <label>
              Start Time:
              <input type="time" name="start_time" className='mt-3' onChange={handleInputChange} required />
            </label>

            {/* End Time Input */}
            <label>
              End Time:
              <input type="time" name="end_time"   className='mt-3'onChange={handleInputChange} required />
            </label>

          
            <label>
    Comments:
    <textarea name="comments" value={formData.comments} onChange={handleInputChange}   required ></textarea>
</label>

              {/* Attachment Input */}
              <label>
              Attachment:
              <input type="file" name="attachment" className='mt-3' onChange={handleFileChange} />
            </label>
            <Button type="submit">Submit</Button> 
            </form>
      
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={() => setShowModal(false)}>Close</Button> */}
        
        </Modal.Footer>
      </Modal>     
    </div>
  )
}

export default TimeSheetModal