import React , { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import Cookies from 'js-cookie';

const NewReportModal = ({projectID, onNewReport}) => {

    const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    projectID: projectID, 
    date: '',
    description: '',
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
      let response = await fetch('http://localhost:3003/api/v1/technician/createReport', {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          projectID: formData.projectID,
          date: formData.date,
            description: formData.description,
          attachment: attachmentPath 
        })
      });
      let data = await response.json();
      console.log(data.data);
      onNewReport(data.data); 
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
    <div>
      <Button onClick={() => setShowModal(true)} className="btn btn-primary float-end" 
        style={{position: "relative", left: "500%"}} >Add New Report</Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}> 
            {/* Date Input */}
            <label>
              Date:
              <input type="date" name="date" onChange={handleInputChange} required />
            </label>

            {/* Description Input */}
            <label className='mt-3'>
              Description:
              <textarea name="description" value={formData.description} onChange={handleInputChange} required></textarea>
            </label>

            {/* Attachment Input */}
            <label className='mt-3'>
              Attachment:
              <input type="file" name="attachment" onChange={handleFileChange} />
            </label>
            <Button className='mt-3' type="submit">Submit</Button> 
          </form>
        </Modal.Body>
        <Modal.Footer>
          {/* Any other footer buttons or info can go here */}
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default NewReportModal