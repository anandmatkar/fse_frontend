import React, { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { Button, Card, Container, ListGroup, Row, Col } from "react-bootstrap";
import { BsFiletypeDoc } from "react-icons/bs";
import axios from "axios";
import NavbarManagerDashboard from "../../NavBar/navbarManagerDashboard";
import { Manager_Base_Url } from "../../../Api/Manager_Api";
import PageSpinner from "../Common/PageSpinner";
import Cookies from "js-cookie";
import { FaArrowLeft } from "react-icons/fa";

export default function ViewTechnicianProfile() {
  // Extract the 'technicianId' parameter from the URL
  const navigate = useNavigate();
  let { technicianID } = useParams();

  const [technicianProfile, setTechnicianProfile] = useState({});
  const [technicianDocs, setTechnicianDocs] = useState([]);
  const [isFetchingProfile, setIsFetchingProfile] = useState(false);

  const fetchTechnicianProfile = async () => {
    try {
      setIsFetchingProfile(true);

      const token = Cookies.get("token");
      if (!token) {
        console.error("Token not found in localStorage.");
        return;
      }
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const response = await axios.get(
        `${Manager_Base_Url}technicianDetailsForManager?techId=${technicianID}`,
        config
      );
      console.log(response.data);
      setTechnicianProfile(response.data.data[0]);
      setTechnicianDocs(response.data.data[0].tech_documents);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsFetchingProfile(false);
    }
  };

  useEffect(() => {
    fetchTechnicianProfile();
  }, [technicianID]);

  return (
    <React.Fragment>
      <NavbarManagerDashboard />

      <Container className="my-5">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 className="section-title bg-white text-center text-primary px-3">
            Manager's Panel
          </h6>
          <h1 className="mb-5">View Technician Profile</h1>
        </div>

        {isFetchingProfile ? (
          <PageSpinner />
        ) : (
          <>
            <Button
              variant="primary"
              className="my-2"
              onClick={() => {
                navigate("/managetechnician");
              }}
            >
              <FaArrowLeft /> Back to Manage Technicians
            </Button>
            <Card>
              <Row>
                <Col lg={4}>
                  <Card>
                    <Card.Header>Profile Picture</Card.Header>
                    <center>
                      <Card.Img
                        className="my-5"
                        variant="top"
                        src={technicianProfile.profilepic}
                        style={{ maxWidth: "240px", maxHeight: "320px" }}
                      />
                    </center>
                  </Card>
                </Col>
                <Col lg={8}>
                  <Card>
                    <Card.Header>Profile Details</Card.Header>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <b>Name : </b> {`${technicianProfile.name}`}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <b>Surname :</b> {`${technicianProfile.surname}`}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <b>Position :</b> {`${technicianProfile.position}`}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <b>Email Address :</b>{" "}
                        {`${technicianProfile.email_address}`}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <b>Phone :</b> {`${technicianProfile.phone_number}`}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <b>Nationality :</b>{" "}
                        {`${technicianProfile.nationality}`}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <b>Qualification :</b>{" "}
                        {`${technicianProfile.qualification}`}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <b>Level :</b> {`${technicianProfile.level}`}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <b>Documents :</b>{" "}
                        {technicianDocs.map((document) => (
                          <>
                            <NavLink
                              as={NavLink}
                              to={document.file_path}
                              target="_blank"
                            >
                              <BsFiletypeDoc className="fs-3 mx-2">
                                Document
                              </BsFiletypeDoc>
                            </NavLink>
                          </>
                        ))}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
            </Card>
          </>
        )}
      </Container>
    </React.Fragment>
  );
}
