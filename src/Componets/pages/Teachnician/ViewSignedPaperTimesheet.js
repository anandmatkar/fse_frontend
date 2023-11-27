import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Modal,
  Dropdown,
} from "react-bootstrap";

import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import NavTechnicanProfile from "../../NavBar/navTechnicanProfile";
import { FaArrowLeft } from "react-icons/fa";
import {
  Delete_Signed_Paper,
  Show_Signed_Paper_To_Tech,
  Technician_Upload_Agreement,
} from "../../../Api/Technicians_Api";

export default function ViewSignedPaperTimesheet() {
  const { projectID } = useParams();

  const [documentDownloadLink, setDocumentDownloadLink] = useState(null);
  const [signedPapers, setShowSignedPapers] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedDocumentText, setSelectedDocumentText] = useState("");

  const fileInputRef = React.createRef();

  const handleDeleteClick = (text, document) => {
    setSelectedDocumentText(text);
    setSelectedDocument(document);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = Cookies.get("token");

      if (!token) {
        toast.error("Token not found in Cookies.");
        return;
      }
      const config = {
        headers: {
          Authorization: token,
        },
      };

      const response = await axios.put(
        `${Delete_Signed_Paper}?projectId=${projectID}&paperId=${selectedDocument.id}`,
        {},
        config
      );

      console.log(response.data);

      if (response.data.status === 200) {
        toast.success(response.data.message);
        fetchSignedDocument();
        setShowDeleteModal(false);
        setSelectedDocument(null);
        setSelectedDocumentText("");
      } else {
        toast.error(response.data.message);
        setShowDeleteModal(false);
        setSelectedDocument(null);
        setSelectedDocumentText("");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const onFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const onAttachButtonClick = async () => {
    try {
      const token = Cookies.get("token");
      //   console.log("Files to be attached:", selectedFiles);

      if (!token) {
        toast.error("Token not found in Cookies.");
        return;
      }

      const formData = new FormData();
      //   formData.append("projectId", projectID);

      selectedFiles.forEach((file, index) => {
        formData.append("file", file); // Use a common parameter name for all files
      });

      const config = {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.post(
        `${Technician_Upload_Agreement}?projectId=${projectID}`,
        formData,
        config
      );

      console.log(response.data);
      if (response.data.status === 201 && response.data.success === true) {
        toast.success(response.data.message);
        fetchSignedDocument();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchSignedDocument = async () => {
    try {
      const token = Cookies.get("token");

      if (!token) {
        toast.error("Token not found in Cookies.");
        return;
      }
      const config = {
        headers: {
          Authorization: token,
        },
      };

      const response = await axios.get(
        `${Show_Signed_Paper_To_Tech}?projectId=${projectID}`,
        config
      );
      console.log(response.data);
      if (response.data.status === 200) {
        setShowSignedPapers(response.data.data || []);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchSignedDocument();
  }, []);

  useEffect(() => {
    if (selectedFiles.length > 0) {
      onAttachButtonClick();
    }
  }, [selectedFiles]);

  return (
    <React.Fragment>
      <NavTechnicanProfile />

      <div className="text-center my-5">
        <h6 className="section-title bg-white text-center text-primary px-3">
          Technician's Dashboard
        </h6>
        <h1>View Signed Papers Timesheet</h1>
      </div>

      <Container>
        <Row>
          <Col>
            <Button variant="primary" as={NavLink} to={-1} className="my-2">
              <FaArrowLeft /> Back to Project Details
            </Button>
          </Col>
        </Row>
        <Card>
          <Card.Header className="text-center fw-bolder">
            Timesheet Attached Signed Papers
          </Card.Header>
          <Card.Header>
            <Button
              size="sm"
              variant="warning"
              className="float-end"
              onClick={() => fileInputRef.current.click()}
            >
              Attach Signed Paper
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              multiple
              onChange={onFileChange}
            />
          </Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              {signedPapers.length > 0 ? (
                signedPapers.map((paper, i) => (
                  <Row>
                    <Col lg={12}>
                      <ListGroup.Item className="fw-bolder text-center">
                        Attachment Paper {i + 1} :{" "}
                        <Dropdown as={"span"} className="float-end">
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
                              to={paper.file_path}
                              target="_blank"
                            >
                              View Document
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                handleDeleteClick(
                                  `Attachment Paper ${i + 1}`,
                                  paper
                                )
                              }
                            >
                              Delete Document
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </ListGroup.Item>
                    </Col>
                    {/* <Col lg={3}>
                      <Dropdown>
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
                            to={paper.file_path}
                            target="_blank"
                          >
                            View Document
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() =>
                              handleDeleteClick(
                                `Attachment Paper ${i + 1}`,
                                paper
                              )
                            }
                          >
                            Delete Document
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col> */}
                  </Row>
                ))
              ) : (
                <>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="fw-bolder">
                      <strong>No Attached Signed Paper Found</strong>
                    </ListGroup.Item>
                  </ListGroup>
                </>
              )}
            </ListGroup>
          </Card.Body>
        </Card>
        <Card.Footer>
          <></>
        </Card.Footer>
      </Container>

      {/* Delete Document Modal */}
      <Modal show={showDeleteModal} onHide={handleDeleteCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Attached Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{" "}
          <strong>{selectedDocumentText}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
