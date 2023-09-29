import React from 'react'; 
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import { Card, Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

import axios from 'axios';

function CreateTechnician() {
  const { Formik } = formik;

  const schema = yup.object().shape({
    name: yup.string().required(),
    surname: yup.string().required(),
    emailAddress: yup.string().required(),
    password: yup.string().required(),
    phone: yup.string().required(),
    nationality: yup.string().required(),
    qualification: yup.string().required(),
    level: yup.string().required(),
    profilePic: yup.string().required(),
  });

  const createTechnician = async (formData) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
        console.error("Token not found in localStorage.");
        return;
        }
        let config = {
            headers: {
                Authorization: token,
            },
        };
        let technicianData = formData;
        console.log(technicianData);
        const response = await axios.post('http://localhost:3003/api/v1/manager/createTechnician', technicianData, config);
        console.log(response.data);
        if(response.success === true) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);           
        }
    } catch (error) {
        console.log(error.message);
        toast.error('Error creating technician. Please try again.');           
    }
}
  
  const handleSubmit = (values, e) => {
    console.log("Form Data:", values);
    createTechnician(values);
  };
  
  
  
  

  return (
    <React.Fragment>
      <Container as={Card.Header}>
        <Formik
          validationSchema={schema}
          onSubmit={handleSubmit} // Use the custom handleSubmit function
          initialValues={{
            name: '',
            surname: '',
            emailAddress: '',
            password: '',
            phone: '',
            nationality: '',
            qualification: '',
            level:'',
            profilePic: '',
          }}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group controlId="validationFormik01">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder='First Name'
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    isValid={touched.name && !errors.name}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationFormik02">
                  <Form.Label>Surname</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder='Surname'
                    name="surname"
                    value={values.surname}
                    onChange={handleChange}
                    isValid={touched.surname && !errors.surname}
                  />

                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationFormikUsername">
                  <Form.Label>Email Address</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Email Address"
                      aria-describedby="inputGroupPrepend"
                      name="emailAddress"
                      value={values.emailAddress}
                      onChange={handleChange}
                      isInvalid={!!errors.emailAddress}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.emailAddress}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group controlId="validationFormik03">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationFormik04">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Phone"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    isInvalid={!!errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationFormik05">
                  <Form.Label>Nationality</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nationality"
                    name="nationality"
                    value={values.nationality}
                    onChange={handleChange}
                    isInvalid={!!errors.nationality}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.nationality}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="validationFormik06">
                  <Form.Label>Qualification</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Qualification"
                    name="qualification"
                    value={values.qualification}
                    onChange={handleChange}
                    isInvalid={!!errors.qualification}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.qualification}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationFormik07">
                  <Form.Label>Level</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Level"
                    name="level"
                    value={values.level}
                    onChange={handleChange}
                    isInvalid={!!errors.level}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.level}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationFormik08">
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Profile Photo"
                    name="profilePic"
                    value={values.profilePic}
                    onChange={handleChange}
                    isInvalid={!!errors.profilePic}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.profilePic}
                  </Form.Control.Feedback>
                </Form.Group>
                
              </Row>
              
              <Button variant='warning' type="button" onClick={handleSubmit} className='my-3' as={Col} lg="3">Submit Technician Details</Button>
            </Form>
          )}
        </Formik>
      </Container>
    </React.Fragment>
  );
}

export default CreateTechnician;