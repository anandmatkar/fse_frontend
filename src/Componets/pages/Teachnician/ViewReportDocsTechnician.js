import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Card,
  Container,
  Table,
  ListGroup,
  Dropdown,
} from "react-bootstrap";
import { toast } from "react-toastify";
import Layout4 from "../../Layout/Layout4";
import { NavLink, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Cookies from "js-cookie";
import axios from "axios";
import {
  Technician_Edit_Report_Attach,
  Technician_Show_Report_Attach,
} from "../../../Api/Technicians_Api";
import EditReportAttachDocModal from "./EditReportAttachDocModal";

export default function ViewReportDocsTechnician() {
  const { projectID, machineID, reportID } = useParams();

  const [reportDocuments, setReportDocuments] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedDocumentText, setSelectedDocumentText] = useState(null);

  const handleEdit = async (newDocument, docID) => {
    try {
      let token = Cookies.get("token");

      if (!token) {
        toast.error(
          "Token not found in Cookies. Session Timeout Please Login Again."
        );
        return;
      }
      const config = {
        headers: {
          Authorization: token,
        },
      };
      // console.log("Editing document:", newDocument);
      let formData = new FormData();

      formData.append("file", newDocument);
      formData.append("docId", docID);

      console.log(formData);

      const response = await axios.put(
        `${Technician_Edit_Report_Attach}`,
        formData,
        config
      );
      console.log(response.data);
      if (response.data.status === 201) {
        toast.success(response.data.message);
        fetchReportAttachment();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setShowEditModal(false);
  };

  const fetchReportAttachment = async () => {
    try {
      let token = Cookies.get("token");

      if (!token) {
        toast.error(
          "Token not found in Cookies. Session Timeout Please Login Again."
        );
        return;
      }
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const response = await axios.get(
        `${Technician_Show_Report_Attach}?reportId=${reportID}`,
        config
      );

      // console.log(response.data);
      if (response.data.status === 200) {
        setReportDocuments(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchReportAttachment();
  }, []);

  return (
    <>
      <Layout4>
        <div className="text-center wow fadeInUp my-5" data-wow-delay="0.1s">
          <h6 className="section-title bg-white text-center text-primary px-3">
            Technician's Panel
          </h6>
          <h1 className="mb-5">View Report Documents</h1>
        </div>

        <Container>
          <Row>
            <Col>
              <Button
                variant="primary"
                as={NavLink}
                to={-1}
                className="my-4 me-5 float-start"
              >
                <FaArrowLeft /> Back to Report Details
              </Button>
            </Col>
          </Row>
          <Card>
            <Card.Header className="text-center">
              <strong>Report Documents</strong>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {reportDocuments.length > 0 ? (
                  <>
                    {reportDocuments.map((document, i) => (
                      <ListGroup.Item className="fw-bolder">
                        Technicians Report Document {i + 1}
                        <Dropdown as={"span"} className="float-end" drop="end">
                          <Dropdown.Toggle
                            variant="success"
                            id="dropdown-basic"
                            size="sm"
                          >
                            Actions
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item
                              as={NavLink}
                              to={document.file_path}
                              target="_blank"
                            >
                              View Document
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => {
                                setSelectedDocumentText(
                                  `Report Document ${i + 1}`
                                );
                                setSelectedDocument(document);
                                setShowEditModal(true);
                              }}
                            >
                              Edit Document
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </ListGroup.Item>
                    ))}
                  </>
                ) : (
                  <>No Report Attachments Found</>
                )}
              </ListGroup>
              {/* <Table responsive>
                <thead>
                  <tr>
                    <th></th>
                  </tr>
                </thead>
                <tbody></tbody>
              </Table> */}
            </Card.Body>
          </Card>
        </Container>
        {selectedDocument && (
          <EditReportAttachDocModal
            show={showEditModal}
            handleClose={() => setShowEditModal(false)}
            handleEdit={handleEdit}
            documentText={selectedDocumentText}
            document={selectedDocument}
          />
        )}
      </Layout4>
    </>
  );
}
