import React, {useState} from 'react'
import { Button, Modal } from 'react-bootstrap';
import Cookies from 'js-cookie';

const RequestApproval = ({projectID}) => {
    const [showApprovalModal, setShowApprovalModal] = useState(false);
    const token = Cookies.get('token');

    const handleApproval = async () => {
        try {
            let response = await fetch(`http://3.110.86.245/api/v1/technician/submitReportForApproval?projectId=${projectID}`, {
                method: 'PUT',
                headers: {
                    'Authorization': token,
                },
            });

            let data = await response.json();
            if (!data.success) {
                throw new Error(data.message);
            }

            alert('Request for approval sent successfully');
            setShowApprovalModal(false);
        } catch (error) {
            console.error('Error:', error);
            alert('Error sending request for approval: ' + error.message);
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