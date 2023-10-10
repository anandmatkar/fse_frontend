import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import NavbarManagerDashboard from '../../NavBar/navbarManagerDashboard';
import Cookies from 'js-cookie';
import { Project_Count_Manager } from './../../../Api/Manager_Api';

function ProjectStatus() {
  const Navigate = useNavigate();
  const [projectCounts, setProjectCounts] = useState(null); // Initialize as null

  const token = Cookies.get('token');

  useEffect(() => {
    // Fetch project counts data
    fetch('http://3.110.86.245/api/v1/manager/projectCount', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProjectCounts(data.data);
      })
      .catch((error) => {
        console.error('Error fetching project counts:', error);
      });
  }, [token]); // Include token in the dependency array

 
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
      <NavbarManagerDashboard />
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
                  <Container>
                    <Row>
                      <Col>
                        <i className="fa fa-3x fa-globe text-primary mb-4"></i>
                      </Col>
                      <Col
                        className="col fs-3 d-flex justify-content-end"
                        style={{ height: '40px', lineHeight: '24px' }}
                      >
                        {projectCounts && (
                          <Badge>{projectCounts.projectInProgressCount}</Badge>
                        )}
                      </Col>
                    </Row>
                  </Container>

                  <Card.Title>Project Progress </Card.Title>
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
                  <Container>
                    <Row>
                      <Col>
                        <i className="fa fa-3x fa-hotel text-primary mb-4"></i>
                      </Col>
                      <Col
                        className="col fs-3 d-flex justify-content-end"
                        style={{ height: '40px', lineHeight: '24px' }}
                      >
                        {projectCounts && (
                          <Badge>
                            {projectCounts.projectRequestedForApprovalCount}
                          </Badge>
                        )}
                      </Col>
                    </Row>
                  </Container>
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
                  <Container>
                    <Row>
                      <Col>
                        <i className="fa fa-3x fa-user text-primary mb-4"></i>
                      </Col>
                      <Col
                        className="col fs-3 d-flex justify-content-end"
                        style={{ height: '40px', lineHeight: '24px' }}
                      >
                        {projectCounts && (
                          <Badge>{projectCounts.completedProjectsCount}</Badge>
                        )}
                      </Col>
                    </Row>
                  </Container>
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
