import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";

import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";

import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import NavTechnicanProfile from "../../NavBar/navTechnicanProfile";
import { FaArrowLeft } from "react-icons/fa";
import { Show_Signed_Paper_Technicians } from "../../../Api/Manager_Api";
import NavbarManagerDashboard from "../../NavBar/navbarManagerDashboard";

export default function ShowSignedPaperTimeSheet() {
  const { projectID, techID } = useParams();

  const [signedPapers, setShowSignedPapers] = useState([]);

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
        `${Show_Signed_Paper_Technicians}?projectId=${projectID}&techId=${techID}`,
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

  return (
    <React.Fragment>
      <NavbarManagerDashboard />

      <div className="text-center my-5">
        <h6 className="section-title bg-white text-center text-primary px-3">
          Manager's Dashboard
        </h6>
        <h1>Show Signed Papers</h1>
      </div>

      <Container>
        <Row>
          <Col>
            <Button variant="primary" as={NavLink} to={-1} className="my-2">
              <FaArrowLeft /> Back to Project Technician Timesheets
            </Button>
          </Col>
        </Row>
        <Card>
          <Card.Header className="text-center fw-bolder">
            Timesheet Attached Signed Papers
          </Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              {signedPapers.length > 0 ? (
                signedPapers.map((paper, i) => (
                  <Row>
                    <Col lg={12}>
                      <ListGroup.Item className="fw-bolder text-center">
                        Attachment Paper {i + 1} :{" "}
                        <Button
                          size="sm"
                          className="float-end"
                          as={NavLink}
                          to={paper.file_path}
                          target="_blank"
                        >
                          View Document
                        </Button>
                      </ListGroup.Item>
                    </Col>
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
    </React.Fragment>
  );
}
