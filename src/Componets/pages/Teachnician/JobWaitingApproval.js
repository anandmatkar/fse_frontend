import React,{useState} from "react";
import { Table, Button, Modal } from "react-bootstrap"; // Import necessary Bootstrap components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faClipboard } from "@fortawesome/free-solid-svg-icons"
function JobWaitingApproval() {
    const [showModal, setShowModal] = useState(false);
    const [showTimeSheetModal, setShowTimeSheetModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [showReportModaal, setShoeReportModal] = useState(false);
    const handleShowModal = (jobIndex) => {
        setSelectedJob(jobData[jobIndex]);
        setShowModal(true);
    };
    
    
      const handleCloseModal = () => {
        setShowModal(false);
        setShowTimeSheetModal(false);
        setShowReportModal(false);
      };
    
      const handleShowTimeSheetModal = () => {
        setShowTimeSheetModal(true);
      };
    
      const handleCloseTimeSheetModal = () => {
        setShowTimeSheetModal(false);
      };
    
      const handleShowReportModal = () => {
        setShowReportModal(true);
      };
    
      const handleCloseReportModal = () => {
        setShowReportModal(false);
      };
  const data = [
    {
      month: "Jun",
      orderNumber: 12678,
      customerAccount: 95252354,
      customerName: "Shubham Goswami",
      country: "INDIA",
      job: "OVERHAUL",
      jobDescription: "1 FEB",
      machine: "",
      dateFrom: "1 FEB",
      dateTo: "15 FEB"
    },
    // ... Add more data entries here if needed
    {
      month: "July",
      orderNumber: 15245,
      customerAccount: 875693412,
      customerName: "Yash Tiwari",
      country: "Canada",
      job: "Maintenance",
      jobDescription: "10 MAR",
      machine: "",
      dateFrom: "10 MAR",
      dateTo: "25 MAR"
    }
  ];
  const jobData = [
    {
      orderNumber: "12678",
      customerName: "Shubham Goswami",
      customerAccount: "95252354",
      countryName: "INDIA",
      jobDescription: "Closed space work",
      dateFrom: "2023-07-01",
      dateTo: "2023-07-10",
      technicalReport: "Technical Report 1",
      timeSheet: "Time Sheet 1",
    },
    {
      orderNumber: "15245",
      customerName: "Yash Tiwari",
      customerAccount: "875693412",
      countryName: "Canada",
      jobDescription: "Job 2 Description",
      dateFrom: "2023-07-15",
      dateTo: "2023-07-25",
      technicalReport: "Technical Report 2",
      timeSheet: "Time Sheet 2",
    },
    // Add more job data as needed
  ];

  return (
    <div>
      <h1 className="text-center">Job Waiting For Approval</h1>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Month</th>
            <th>Order number</th>
            <th>Customer account</th>
            <th>Customer name</th>
            <th>Country</th>
            <th>Job</th>
            <th>Job Description</th>
            <th>Machine</th>
            <th>Date from</th>
            <th>Date to</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.month}</td>
              <td>{item.orderNumber}</td>
              <td>{item.customerAccount}</td>
              <td>{item.customerName}</td>
              <td>{item.country}</td>
              <td>{item.job}</td>
              <td>{item.jobDescription}</td>
              <td>{item.machine}</td>
              <td>{item.dateFrom}</td>
              <td>{item.dateTo}</td>
              <td>
                <Button variant="primary"  onClick={() => handleShowModal(index)}>Click Here</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Order Number: {selectedJob?.orderNumber}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h4>Customer Details:</h4>
            <p>Customer: {selectedJob?.customerName}</p>
            <p>Customer Account: {selectedJob?.customerAccount}</p>
            <p>Job Description: {selectedJob?.jobDescription}</p>
            <input type="file" placeholder="Attach Documents" />
          </div>
          <div>
            <h4>Technician Assign and TimeSheets</h4>
            <Table striped bordered responsive>
              <thead>
                <tr>
                  <th>Scope</th>
                  <th>Start date</th>
                  <th>End Date</th>
                  <th>Technical Report</th>
                  <th>Time Sheet</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Blower OH</td>
                  <td>12/03/2023</td>
                  <td>End Date 1</td>
                  <td>
                    <FontAwesomeIcon
                     icon={faFileAlt}
                      size="lg"
                      onClick={handleShowReportModal}
                      style={{ cursor: "pointer", color:"#FFC9A2"}}
                       />
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faClipboard}
                      size="lg"
                      onClick={handleShowTimeSheetModal}
                      style={{ cursor: "pointer",color:"red" }}
                    />
                  </td>
                </tr>
                {/* Add more technical report and time sheet data as needed */}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    <Modal
        show={showTimeSheetModal}
        onHide={handleCloseTimeSheetModal}
        size="lg"
    >
          <Modal.Header closeButton>
          <Modal.Title>Time Sheet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Technician Name: Shubham</h5>
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>Date</th>
                <th>Starting Time</th>
                <th>Ending Time</th>
                <th>Comments</th>
                {/* <th>Approve or Reject TimwSheet</th> */}
              
                {/* Add more fields as needed */}
              </tr>
            </thead>
            <tbody>
              {/* Add time sheet data here */}
              <tr>
                <td>12/03/2023</td>
                <td>14:30 pm</td>
                <td>18:30pm</td>
                <td>Working</td>
                {/* <Button variant="secondary">Approve</Button>
                <Button variant="danger">Reject</Button> */}
              </tr>
              <tr>
                <td>23/06/2023</td>
                <td>10:00 AM</td>
                <td>20:00 PM</td>
                <td>Lazy Day</td>
                {/* <Button variant="secondary">Approve</Button>
                <Button variant="danger">Reject</Button> */}
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="success">Add</Button>
        <Button variant="primary">Validate</Button>
          <Button variant="secondary" onClick={handleCloseTimeSheetModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showReportModaal}
        onHide={handleCloseReportModal}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Time Sheet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Technician Name: Shubham</h5>
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>Date</th>
                <th>Starting Time</th>
                <th>Ending Time</th>
                <th>Comments</th>
                {/* <th>Approve or Reject TimwSheet</th> */}
              
                {/* Add more fields as needed */}
              </tr>
            </thead>
            <tbody>
              {/* Add time sheet data here */}
              <tr>
                <td>12/03/2023</td>
                <td>14:30 pm</td>
                <td>18:30pm</td>
                <td>Working</td>
                {/* <Button variant="secondary">Approve</Button>
                <Button variant="danger">Reject</Button> */}
              </tr>
              <tr>
                <td>23/06/2023</td>
                <td>10:00 AM</td>
                <td>20:00 PM</td>
                <td>Lazy Day</td>
                {/* <Button variant="secondary">Approve</Button>
                <Button variant="danger">Reject</Button> */}
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="success">Add</Button>
        <Button variant="primary">Validate</Button>
          <Button variant="secondary" onClick={handleCloseReportModal}>
            Close
          </Button>
        </Modal.Footer>

    </Modal>
    </div>
  );
}

export default JobWaitingApproval;