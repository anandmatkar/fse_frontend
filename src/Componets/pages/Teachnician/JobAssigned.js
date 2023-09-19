import React,{useState} from "react";
import { Table, Button, Modal, Form } from "react-bootstrap"; // Import necessary Bootstrap components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faClipboard } from "@fortawesome/free-solid-svg-icons"
function JobAssigned() {
    const [showModal, setShowModal] = useState(false);
    const [showTimeSheetModal, setShowTimeSheetModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [showReportModaal, setShoeReportModal] = useState(false);
    const [timeSheetData, setTimeSheetData] = useState([]);
    const [machinesData, setMachinesData] = useState([]);
    const [attachmentFile, setAttachmentFile] = useState(null);
    const [formData, setFormData] = useState({
      date: "",
      startingTime: "",
      endingTime: "",
      comments: "",
    });
    const [reportData, setReportData] = useState({
      date: "",
      description: "",
      attachments: [
        { name: "12/10/2023", type: "HY this my report" ,description : "PDF/Files"},
        { name: "13/10/2023", type: "HY this my report2" ,description : "PDF/Files" },
      ],
    });
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
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleAddEntry = () => {
        // Create a new entry using formData
        const newEntry = {
          date: formData.date,
          startingTime: formData.startingTime,
          endingTime: formData.endingTime,
          comments: formData.comments,
        };
    
        // Add the new entry to machinesData
        setMachinesData((prevMachinesData) => [...prevMachinesData, newEntry]);
    
        // Clear the form and close the modal
        setFormData({
          date: "",
          startingTime: "",
          endingTime: "",
          comments: "",
        });
        handleCloseModal();
      };
  const data = [
    {
      month: "Feb",
      orderNumber: 12345,
      customerAccount: 952458405,
      customerName: "pepsi",
      country: "EGYPT",
      job: "OVERHAUL",
      jobDescription: "1 FEB",
      machine: "",
      dateFrom: "1 FEB",
      dateTo: "15 FEB"
    },
    // ... Add more data entries here if needed
    {
      month: "Mar",
      orderNumber: 12450,
      customerAccount: 875693412,
      customerName: "Coca-Cola",
      country: "India",
      job: "Maintenance",
      jobDescription: "10 MAR",
      machine: "",
      dateFrom: "10 MAR",
      dateTo: "25 MAR"
    }
  ];
  const jobData = [
    {
      orderNumber: "12345",
      customerName: "John Doe",
      customerAccount: "952458405",
      countryName: "United States",
      jobDescription: "Job 1 Description",
      dateFrom: "2023-07-01",
      dateTo: "2023-07-10",
      technicalReport: "Technical Report 1",
      timeSheet: "Time Sheet 1",
    },
    {
      orderNumber: "12450",
      customerName: "Jane Smith",
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
      <h1 className="text-center">Job Assigned</h1>
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
      <Modal show={showReportModal} onHide={handleCloseReportModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Technical Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="reportDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={reportData.date}
                onChange={(e) =>
                  setReportData({
                    ...reportData,
                    date: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="reportDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={reportData.description}
                onChange={(e) =>
                  setReportData({
                    ...reportData,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="attachmentFile">
              <Form.Label>Attachment</Form.Label>
              <Form.Control
                type="file"
                accept=".pdf"
                onChange={(e) => setAttachmentFile(e.target.files[0])}
              />
            </Form.Group>
            
          </Form>
          <Table striped bordered responsive>
            <thead>
              <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Attachment</th>
              </tr>
            </thead>
            <tbody>
              {reportData.attachments.map((attachment,description, index) => (
                <tr key={index}>
                  <td>{attachment.name}</td>
                  <td>{attachment.type}</td>
                  <td>{attachment.description}</td>

                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="success" onClick={handleCloseReportModal}>
            Add Report
          </Button>

          <Button variant="secondary" onClick={handleCloseReportModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
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
                  <Button variant="success" onClick={handleShowModal}>Add</Button>
        <Button variant="primary">Validate</Button>
          <Button variant="secondary" onClick={handleCloseTimeSheetModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      
    </div>
  );
}

export default JobAssigned;


{/* <Modal
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
        <th>Approve or Reject TimwSheet</th>
      
        {/* Add more fields as needed */}
    //   </tr>
    // </thead>
    // <tbody>
      {/* Add time sheet data here */}
      {/* <tr>
        <td>12/03/2023</td>
        <td>14:30 pm</td>
        <td>18:30pm</td>
        <td>Working</td> */}
        {/* <Button variant="secondary">Approve</Button>
        <Button variant="danger">Reject</Button> */}
    //   </tr>
    //   <tr>
    //     <td>23/06/2023</td>
    //     <td>10:00 AM</td>
    //     <td>20:00 PM</td>
    //     <td>Lazy Day</td>
    //   </tr>
      {/* Add more rows as needed */}
//     </tbody>
//   </Table>
// </Modal.Body>
{/* <Modal.Footer>
<Button variant="secondary">Validate</Button>
  <Button variant="secondary" onClick={handleCloseReportModal}>
    Close
  </Button>
</Modal.Footer> */}

// </Modal> */}



{/* <Modal
show={showTimeSheetModal}
onHide={handleCloseTimeSheetModal}
size="lg"
>
<Modal.Body>
  <Form>
    <Form.Group>
      <Form.Label>Date</Form.Label>
      <Form.Control
        type="date"
        value={newTimeSheet.date}
        onChange={(e) =>
          setNewTimeSheet({ ...newTimeSheet, date: e.target.value })
        }
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Starting Time</Form.Label>
      <Form.Control
        type="time"
        value={newTimeSheet.startingTime}
        onChange={(e) =>
          setNewTimeSheet({
            ...newTimeSheet,
            startingTime: e.target.value,
          })
        }
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Ending Time</Form.Label>
      <Form.Control
        type="time"
        value={newTimeSheet.endingTime}
        onChange={(e) =>
          setNewTimeSheet({ ...newTimeSheet, endingTime: e.target.value })
        }
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Comments</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        value={newTimeSheet.comments}
        onChange={(e) =>
          setNewTimeSheet({ ...newTimeSheet, comments: e.target.value })
        }
      />
    </Form.Group>
  </Form>
  <Button variant="success" onClick={handleAddTimeSheet}>
    Add TimeSheet
  </Button>
</Modal.Body>
</Modal> */}


