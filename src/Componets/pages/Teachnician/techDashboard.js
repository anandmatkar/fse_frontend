import React from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';
import Layout4 from "../../Layout/Layout4";
import classes from "./techdashboard.module.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function TechnicianDashboard() {
    const Navigate = useNavigate();

    const JobClosed = () => {
        Navigate("/JobClosed");
        console.log("Successfully Updated");
    };

    const JobAssigned = () => {
        Navigate("/JobAssigned");
        console.log("Successfully Updated");
    };

    const JobEWaitingAprroval = () => {
        Navigate("/JobApproval");
        console.log("Successfully Updated");
    };

    return (
        <Layout4>
            <Container className="container-xxl py-5">
                <div className="text-center mb-5">
                    <h6 className="section-title bg-white text-center text-primary px-3">Dashboard</h6>
                    <h1>Your Tasks Overview</h1>
                </div>
                <Row xs={1} lg={3} className="g-4">
                    <Col onClick={JobAssigned}>
                        <Card className="service-item rounded pt-3">
                            <Card.Body className="text-center">
                                <i className="fa fa-3x fa-globe text-primary mb-4"></i>
                                <Card.Title className="fs-3">Job Assign</Card.Title>
                                <Card.Text>View your Assign Project, you can find more details here.</Card.Text>
                                <Button variant="primary" className={classes.cardButton} onClick={JobAssigned}>View Details</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col onClick={JobEWaitingAprroval}>
                        <Card className="service-item rounded pt-3">
                            <Card.Body className="text-center">
                                <i className="fa fa-3x fa-hotel text-primary mb-4"></i>
                                <Card.Title  className="fs-3">Job waiting Approval</Card.Title>
                                <Card.Text>View Jobs Waiting for Approval, you can see more details here.</Card.Text>
                                <Button variant="primary" className={classes.cardButton} onClick={JobEWaitingAprroval}>View Details</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col onClick={JobClosed}>
                        <Card className="service-item rounded pt-3">
                            <Card.Body className="text-center">
                                <i className="fa fa-3x fa-user text-primary mb-4"></i>
                                <Card.Title  className="fs-3">Job Closed</Card.Title>
                                <Card.Text>View job which are closed, you can see more details here.</Card.Text>
                                <Button variant="danger" className={classes.cardButton} onClick={JobClosed}>View Details</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Layout4>
    );
}

export default TechnicianDashboard;
