import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Navbar from '../../NavBar/navbarManager';

function ProjectStatus() {
  const Navigate = useNavigate();
  const progrssHandler = () => {
    console.log('Successfully Updated');
    Navigate('/projectprogress');
  };
  const progrssHandlerM = () => {
    console.log('Successfully Updated');
    Navigate('/projectRequestedForApproval');
  };

  const completedHandelerM = () => {
    console.log('Successfully Updated');
    Navigate('/completedprojects');
  };

  return (
    <>
      <Navbar />
      <Container className="container-xxl py-5">
        <Container>
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Project Status
            </h6>
            <h1 className="mb-5">Our Projects Status</h1>
          </div>
          <Row xs={1} lg={3} className="g-4">
            <Col
              lg={4}
              sm={12}
              className="wow fadeInUp"
              data-wow-delay="0.1s"
              onClick={progrssHandler}
            >
              <Card className="service-item rounded pt-3">
                <Card.Body>
                  <i className="fa fa-3x fa-globe text-primary mb-4"></i>
                  <Card.Title>Project Progress</Card.Title>
                  <Card.Text>
                    {' '}
                    Project in Progress, you can find more details here
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col
              lg={4}
              sm={12}
              className="wow fadeInUp"
              data-wow-delay="0.3s"
              onClick={progrssHandlerM}
            >
              <Card className="service-item rounded pt-3">
                <Card.Body>
                  <i className="fa fa-3x fa-hotel text-primary mb-4"></i>
                  <Card.Title>Projects for Approval</Card.Title>
                  <Card.Text>
                    Project for Approval, you can see more details here.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col
              lg={4}
              sm={12}
              className="wow fadeInUp"
              data-wow-delay="0.5s"
              onClick={completedHandelerM}
            >
              <Card className="service-item rounded pt-3">
                <Card.Body>
                  <i className="fa fa-3x fa-user text-primary mb-4"></i>
                  <Card.Title>Complete Projects</Card.Title>
                  <Card.Text>
                    {' '}
                    Completed Project, you can see more details here. Please
                    click Here...
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default ProjectStatus;
