import React from "react";
import Layout from "../../Layout/Layout";
import { useNavigate } from "react-router-dom";
import DynamicButton from "../../Model/DynamicButton";
import { Container, Row, Col, Card } from 'react-bootstrap';
import './LoginMain.css'

import PageSpinner from './PageSpinner'


function LoginFrontPage() {
  const navigate = useNavigate();
  const adminLoginTab = () => {
    navigate("/adminLogin");
  };
  const MloginAndRegister = () => {
    navigate("/mangerLogin");
  };
  const TloginAndRegister = () => {
    navigate("/techLogin");
  };
  return (
    <Layout>
        
        <Container className="admin-container-main container-xxl py-5 mt-5">
        <Container>
        <div className="admin-data text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 className="section-title bg-white text-center text-primary px-3">Login</h6>
          <h1 className="mb-5">Our Login's</h1>
        </div>
        <Row xs={1} lg={3} className="g-4">
          <Col lg={4} sm={12} className="wow fadeInUp" data-wow-delay="0.1s" onClick={adminLoginTab}>
            <Card className="service-item rounded pt-3">
              <Card.Body>
                <i className="fa fa-3x fa-globe text-primary mb-4"></i>
                <Card.Title>Admin Login</Card.Title>
                <Card.Text>If you are Admin then Login Here!..</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} sm={12} className="wow fadeInUp" data-wow-delay="0.3s" onClick={TloginAndRegister}>
            <Card className="service-item rounded pt-3">
              <Card.Body>
                <i className="fa fa-3x fa-hotel text-primary mb-4"></i>
                <Card.Title>Technician Login</Card.Title>
                <Card.Text>If you are Technician then Login Here!..</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} sm={12} className="wow fadeInUp" data-wow-delay="0.5s" onClick={MloginAndRegister}>
            <Card className="service-item rounded pt-3">
              <Card.Body>
                <i className="fa fa-3x fa-user text-primary mb-4"></i>
                <Card.Title>Manager Login</Card.Title>
                <Card.Text>If you are Manager then Login Here!..</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        </Container>
        </Container>
    </Layout>
  );
}

export default LoginFrontPage;