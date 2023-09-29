import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import { Card, Container } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';


function UpdateTechincianProfile() {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        emailAddress: '',
        phoneNumber: '',
        nationality: '',
        qualification: '',
        level: '',
        profilePic: '',
      });
      
  const { Formik } = formik;

  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required(),
    surname: yup.string().required(),
    emailAddress: yup.string().required(),
    phoneNumber: yup.string().required(),
    nationality: yup.string().required(),
    qualification: yup.string().required(),
    level: yup.string().required(),
    profilePic: yup.string().required(),
  });

  const fetchTechnicianProfile = async () => {
    try {
    //   const token = localStorage.getItem("token");
    const token = Cookies.get('token'); 
      if (!token) {
        console.error("Token not found in localStorage.");
        return;
      }
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const response = await axios.get('http://localhost:3003/api/v1/technician/showProfile', config);
      const profileData = response.data.data[0];
      console.log(profileData);
      setFormData({
        name: profileData.name,
        surname: profileData.surname,
        emailAddress: profileData.email_address,
        phoneNumber: profileData.phone_number,
        nationality: profileData.nationality,
        qualification: profileData.qualification,
        level: profileData.level,
        profilePic: profileData.avatar,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateTechDataSubmit = async (formData) => {
    try {
      // console.log(values);
      const token = Cookies.get('token'); 
      if (!token) {
        console.error("Token not found in localStorage.");
        return;
      }
      const config = {
        headers: {
          Authorization: token,
        },
      };
      console.log(formData);
      console.log(config);
        const response = await axios.post('http://localhost:3003/api/v1/technician/updateTechnicianProfile', formData, config);
  
        if (response.status === 200) {
          // Profile updated successfully, you can show a success message or redirect
          console.log('Profile updated successfully');
          toast.success(response.data.message);
          navigate('/techD')
          return { success: true, message: 'Profile updated successfully' };
        } else {
          // Handle errors, show an error message
          console.error('Failed to update profile');
          toast.error(response.data.message);
          return { success: false, message: 'Failed to update profile' }
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error(error.message);
        return { success: false, message: 'An error occurred while updating the profile' };
      }
    };
  

useEffect(() => {
    fetchTechnicianProfile();
    // UpdateTechincianProfile();
}, []);

  return (
    <React.Fragment>
       <React.Fragment>
      <Container as={Card.Header}>
        <h1>Edit Technician Profile</h1>
        <Form noValidate onSubmit={updateTechDataSubmit}>     
             <Row className="mb-3">
            <Form.Group controlId="validationFormik01">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder='First Name'
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                isValid={!!formData.name}
              />
            </Form.Group>
            <Form.Group controlId="validationFormik02">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                placeholder='Surname'
                name="surname"
                value={formData.surname}
                onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                isValid={!!formData.surname}
              />
            </Form.Group>

            <Form.Group controlId="validationFormik03">
              <Form.Label>Email Address</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Email Address"
                  aria-describedby="inputGroupPrepend"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                  isInvalid={!!formData.emailAddress}
                />
                <Form.Control.Feedback type="invalid">
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="validationFormik05">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone"
                name="phone"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                isInvalid={!!formData.phone}
              />
              <Form.Control.Feedback type="invalid">
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationFormik06">
              <Form.Label>Nationality</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nationality"
                name="nationality"
                value={formData.nationality}
                onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                isInvalid={!!formData.nationality}
              />
              <Form.Control.Feedback type="invalid">
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationFormik07">
              <Form.Label>Qualification</Form.Label>
              <Form.Control
                type="text"
                placeholder="Qualification"
                name="qualification"
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                isInvalid={!!formData.qualification}
              />
              <Form.Control.Feedback type="invalid">
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationFormik08">
              <Form.Label>Level</Form.Label>
              <Form.Control
                type="text"
                placeholder="Level"
                name="level"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                isInvalid={!!formData.level}
              />
              <Form.Control.Feedback type="invalid">
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationFormik09">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="text"
                placeholder="Profile Photo"
                name="profilePic"
                value={formData.profilePic}
                onChange={(e) => setFormData({ ...formData, profilePic: e.target.value })}
                isInvalid={!!formData.profilePic}
              />
              <Form.Control.Feedback type="invalid">
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button
            variant="warning"
            type="button"
            onClick={() => updateTechDataSubmit(formData)}
            className="my-3"
            as={Col}
            lg="3"
          >
            Update Technician Details
          </Button>
        </Form>
      </Container>
    </React.Fragment>
    </React.Fragment>
  );
}
 export default  UpdateTechincianProfile;