import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faClipboard } from "@fortawesome/free-solid-svg-icons";

const JobProgress = () => {
  const jobData = [
    {
      orderNumber: "12345",
      customerName: "John Doe",
      customerAccount: "789456",
      countryName: "United States",
      jobDescription: "Job 1 Description",
      dateFrom: "2023-07-01",
      dateTo: "2023-07-10",
      technicalReport: "Technical Report 1",
      timeSheet: "Time Sheet 1",
    },
    {
      orderNumber: "67890",
      customerName: "Jane Smith",
      customerAccount: "987654",
      countryName: "Canada",
      jobDescription: "Job 2 Description",
      dateFrom: "2023-07-15",
      dateTo: "2023-07-25",
      technicalReport: "Technical Report 2",
      timeSheet: "Time Sheet 2",
    },
  ];

  const [showModal, setShowModal] = useState(false);
  const [showTimeSheetModal, setShowTimeSheetModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showReportModaal, setShoeReportModal] = useState(false);

  const handleShowModal = (jobIndex) => {
    setSelectedJob(jobData[jobIndex]);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowTimeSheetModal(false); 
  };

  const handleShowTimeSheetModal = () => {
    setShowTimeSheetModal(true);
  };

  const handleCloseTimeSheetModal = () => {
    setShowTimeSheetModal(false);
  };
  const handleShowReportModal = () => {
    setShoeReportModal(true);
  }
  const handleCloseReportModal = () => {
    setShoeReportModal(false);
  }

  return (
    <div className="job-progress">
      <h2>Job Progress</h2>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>Order number</th>
            <th>Customer account</th>
            <th>Customer name</th>
            <th>Country name</th>
            <th>Job Description</th>
            <th>Date from</th>
            <th>Date to</th>
            <th>More</th>
          </tr>
        </thead>
        <tbody>
          {jobData.map((job, index) => (
            <tr key={index}>
              <td>{job.orderNumber}</td>
              <td>{job.customerAccount}</td>
              <td>{job.customerName}</td>
              <td>{job.countryName}</td>
              <td>{job.jobDescription}</td>
              <td>{job.dateFrom}</td>
              <td>{job.dateTo}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleShowModal(index)}
                >
                  More
                </Button>
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
                  <th>Qualification</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Tel phone</th>
                  <th>Scope</th>
                  <th>Start date</th>
                  <th>End Date</th>
                  <th>Technical Report</th>
                  <th>Time Sheet</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Electrician</td>
                  <td>Shubham</td>
                  <td>gmail.com</td>
                  <td>524647584</td>
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
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                </tr>
                {/* Add more technical report and time sheet data as needed */}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="success" onClick={handleCloseModal}>
            Approve
          </Button>

          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Time Sheet Modal */}
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
                <td>22/03/2023</td>
                <td>14:30 pm</td>
                <td>18:30pm</td>
                <td>Working</td>
                {/* <Button variant="secondary">Approve</Button>
                <Button variant="danger">Reject</Button> */}
              </tr>
              <tr>
                <td>23/03/2023</td>
                <td>10:00 AM</td>
                <td>20:00 PM</td>
                <td>Lazy Day</td>
                {/* <Button variant="secondary">Approve</Button>
                <Button variant="danger">Reject</Button> */}
              </tr>
              <tr>
                <td>24/03/2023</td>
                <td>10:00 AM</td>
                <td>20:00 PM</td>
                <td>OVERHAUL</td>
                {/* <Button variant="secondary">Approve</Button>
                <Button variant="danger">Reject</Button> */}
              </tr>
              <tr>
                <td>25/03/2023</td>
                <td>10:00 AM</td>
                <td>20:00 PM</td>
                <td>Machine Design</td>
                {/* <Button variant="secondary">Approve</Button>
                <Button variant="danger">Reject</Button> */}
              </tr>
              <tr>
                <td>26/03/2023</td>
                <td></td>
                <td></td>
                <td>day off</td>
                {/* <Button variant="secondary">Approve</Button>
                <Button variant="danger">Reject</Button> */}
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
        {/* <Button variant="primary">Validate</Button> */}
        {/* <Button variant="success" onClick={handleCloseModal}>
            Approve TimeSheet
          </Button> */}
          <Button variant="secondary" onClick={handleCloseTimeSheetModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default JobProgress;


