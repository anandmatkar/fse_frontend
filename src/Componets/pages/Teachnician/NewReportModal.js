import React , { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Technician_NewCreateReport, Technician_ReportAttach } from '../../../Api/Technicians_Api';

const NewReportModal = ({projectID, machineID, onNewReport }) => {

    const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    projectID: projectID,
    machineID: machineID,
    date: '',
    description: '',
    comments: '',
    duration: '1',
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
        };
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
            machineID: formData.machineID,
            date: formData.date,
            description: formData.description,
            comments: formData.comments,
            duration: formData.duration,
            attachment: attachments
          })
      });

      const data = await response.json();
      if (!data.success) {
          throw new Error(data.message);
      }
      toast.success("Report created successfully!");
      setShowModal(false);
      if (response.status === 200) {
          onNewReport(data.data); 
        
      }  
  } catch (error) {
      console.error('Error:', error);
      toast.error('Error creating Report: ' + error.message);
  }
};

  return (
    <div>
      <Button onClick={() => setShowModal(true)} className='btn btn-success me-5'>Add New Report</Button>

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
                        <label htmlFor="comments">Comments:</label>
                        <textarea  className='form-control' name="comments"  value={formData.comments}   onChange={handleInputChange} 
                            required></textarea>
                    </div>

                    <div className='form-group'>
                        <label htmlFor="duration">Duration:</label>
                        <select className='form-control'  name="duration" value={formData.duration}   onChange={handleInputChange} 
                            required >
                            {[...Array(10).keys()].map(i => 
                                <option value={i + 1} key={i}>{i + 1} hr</option>
                            )}
                        </select>
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