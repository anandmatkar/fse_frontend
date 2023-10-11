import React , { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { Technician_NewCreateReport, Technician_ReportAttach } from '../../../Api/Technicians_Api';

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
            const response = await fetch(Technician_ReportAttach, {
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
        const response = await fetch(`${Technician_NewCreateReport}`, {
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
        const newReport = {
          projectID: formData.projectID,
                date: formData.date,
                description: formData.description,
                attachment: attachments
        }
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }
        console.log(response);
        alert('Report created successfully');
        setShowModal(false);
        if(response.status === 200) {
          onNewReport(newReport);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error creating report: ' + error.message);
    }
};
  return (
    <div>
      <Button onClick={() => setShowModal(true)} className='btn btn-success'
        style={{position: "relative", left: "420%" , top:"130%"}} >Add New Report</Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}> 
            {/* Date Input */}
            <div className='form-group'>
               <label for="date">Date:</label>
               <input className='form-control' type="date" name="date" onChange={handleInputChange} required />
            </div>

            <div className='form-group'>
            <label for="description"> Description: </label>
              <textarea className='form-control' name="description" value={formData.description} onChange={handleInputChange} required></textarea>
           </div>

          <div className='form-group'>
            <label for="files"> Attachment:  </label>
              <input className='form-control' type="file" name="attachment" onChange={handleFileUpload} multiple />
              </div>
          
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