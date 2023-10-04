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
        for(let i = 0; i < files.length; i++){
        fileFormData.append('files', files[i]);
        }

         fileFormData.append('projectID', projectID);

        try {
            const response = await fetch('http://localhost:3003/api/v1/technician/uploadReportAttach', {
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

            // Store the attachment path directly in the state
            setAttachments(prev =>[...prev, ...data.data]); 

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
        const response = await fetch('http://localhost:3003/api/v1/technician/createReport', {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                projectID: formData.projectID,
                date: formData.date,
                description: formData.description,
                attachment: attachments
            })
        });
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }

        onNewReport(data.data);

        alert('Report created successfully');
        setShowModal(false);
    } catch (error) {
        console.error('Error:', error);
        alert('Error creating report: ' + error.message);
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
              <input type="file" name="attachment" onChange={handleFileUpload} multiple />
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