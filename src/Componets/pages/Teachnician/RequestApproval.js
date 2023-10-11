import React, {useState} from 'react'
import { Button, Modal } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Technician_ReportRequestApproval } from '../../../Api/Technicians_Api';

const RequestApproval = ({projectID}) => {
    const [showApprovalModal, setShowApprovalModal] = useState(false);
    const token = Cookies.get('token');

    const handleApproval = async () => {
        try {
            let response = await fetch(`${Technician_ReportRequestApproval}?projectId=${projectID}`, {
                method: 'PUT',
                headers: {
                    'Authorization': token,
                },
            });

            let data = await response.json();
            if (!data.success) {
                throw new Error(data.message);
            }

            toast.success("Report sent approval successfully!");
            setShowApprovalModal(false);
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error sending request: ' + error.message);
        }
    };
  return (
   <div>
       <Button onClick={() => setShowApprovalModal(true)} className="btn btn-success" 
                style={{position:"relative" , left:"295%"}}>Request Approval</Button>

            <Modal show={showApprovalModal} onHide={() => setShowApprovalModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Request Approval</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to request approval?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowApprovalModal(false)}>
                        No
                    </Button>
                    <Button variant="primary" onClick={handleApproval}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
   </div>
  )
}

export default RequestApproval