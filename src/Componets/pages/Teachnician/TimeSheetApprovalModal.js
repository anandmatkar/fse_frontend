import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Base_Url } from '../../../Api/Base_Url';
import { Technician_Timesheet_Approval } from '../../../Api/Technicians_Api';

const TimeSheetApprovalModal = ({ projectID, onNewTimesheet }) => {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleRequestApproveModal = async () => {
    const token = Cookies.get('token');
    const approvalEndpoint = `${Technician_Timesheet_Approval}?projectId=${projectID}`

    try {
      const response = await fetch(approvalEndpoint, {
        method: 'PUT', // You might need to change the HTTP method based on your API's requirements
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        // You can include any request data or body if required by your API
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Assuming the API returns a success response when the timesheet is approved
      const data = await response.data;
      console.log(data);

      // You can update your state or perform any other actions here
      // Close the modal after approval
      setShowModal(false);

      // Show a success message or perform any other actions
      toast.success("Timesheet sent approval successfully!");

      navigate('/JobAssigned');

    } catch (error) {
      console.error('Error:', error);
      toast.error('Error sending request: ' + error.message);
    }
  };

  return (
    <div className='d-flex '>
      <Button className='btn btn-success'onClick={() => setShowModal(true)}
      >
        Req Timesheet
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Timesheet</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to approve the timesheet?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            No
          </Button>
          <Button variant="primary" onClick={handleRequestApproveModal}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TimeSheetApprovalModal;
