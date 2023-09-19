
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

function App() {
  return (
    <Container fluid className="bg-dark">
      <Row className="d-flex justify-content-center align-items-center h-100">
        <Col md={6}>
          <Card className="my-4">
            <Row className="g-0">
              <Col md={6}>
                <Card.Img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                  alt="Sample photo"
                  className="rounded-start"
                  fluid
                />
              </Col>
              <Col md={6}>
                <Card.Body className="text-black d-flex flex-column justify-content-center">
                  <h3 className="mb-5 text-uppercase fw-bold">Customer Registration Form</h3>

                  <Form.Group className="mb-4">
                    <Form.Label>Customer Name</Form.Label>
                    <Form.Control size="lg" type="text" />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Customer Account</Form.Label>
                    <Form.Control size="lg" type="text" />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Country</Form.Label>
                    <Form.Select size="lg">
                      <option>Select Country</option>
                      <option>India</option>
                      <option>America</option>
                      <option>china</option>
                      <option>Japan</option>
                      <option>Russia</option>
                      <option>Other</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Customer Contact</Form.Label>
                    <Form.Control size="lg" type="text" />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control size="lg" type="text" />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Email</Form.Label>
                    <Form.Control size="lg" type="text" />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Line Number</Form.Label>
                    <Form.Control size="lg" type="text" />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Scope of Work</Form.Label>
                    <Form.Control size="lg" type="text" />
                  </Form.Group>

                  <div className="d-flex justify-content-end pt-3">
                    <Button variant="light" size="lg">
                      Reset all
                    </Button>
                    <Button className="ms-2" variant="warning" size="lg">
                      Save/Submit
                    </Button>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;



