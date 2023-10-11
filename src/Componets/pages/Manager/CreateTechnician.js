import React, { useState } from 'react'; 
import * as formik from 'formik';
import * as yup from 'yup';
import { Card, Container, Button,Row, Col, Form, InputGroup } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import {
  Create_Technician_Api,
  Upload_Technician_Profile,
  Upload_Technician_Documents,
} from './../../../Api/Manager_Api';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import NavbarManagerDashboard from '../../NavBar/navbarManagerDashboard';

function CreateTechnician() {
  const { Formik } = formik;
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required(),
    surname: yup.string().required(),
    emailAddress: yup.string().required(),
    password: yup.string().required(),
    phone: yup.string().required(),
    nationality: yup.string().required(),
    qualification: yup.string().required(),
    level: yup.string().required(),
    profilePic: yup.string(),
    documents: yup.string(),
  });

  const [selectedFile, setSelectedFile] = useState(''); // State to hold the selected file
  const [profilePicPath, setProfilePicPath] = useState(''); // State to hold the profile picture path
  const [documentsPath, setDocumentsPath] = useState([]); // State to hold the documents path

  const createTechnician = async (formData) => {
    try {
        // const token = localStorage.getItem("token");
        const token = Cookies.get("token");
        if (!token) {
        console.error("Token not found in localStorage.");
        return;
        }
        let config = {
            headers: {
                Authorization: token,
            },
        };

        let technicianData = {...formData, profilePic: profilePicPath, documents: documentsPath};
        console.log(technicianData);
        const response = await axios.post(Create_Technician_Api, technicianData, config);
        console.log(response.data);
        if(response.data.status === 201) {
          navigate('/managetechnician');
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
    // console.log(selectedFile);
    createTechnician(values);
  };

  const handleFileChange = async (e) => {
    try {
      setSelectedFile(e.target.files[0]);
      const profileImage = e.target.files[0];
      console.log(profileImage);

      const token = Cookies.get('token');
        if (!token) {
        console.error("Token not found in localStorage.");
        return;
        }
        let config = {
            headers: {
                Authorization: token,
            },
        };
        let fileData = new FormData();

        // Append the profile image to the FormData
        fileData.append('image', profileImage);

      const response = await axios.post(Upload_Technician_Profile, fileData, config);

      console.log(response.data);

      setProfilePicPath(response.data.data);


    } catch (error) {
      console.log(error.message);
    }

  };

  // Define your handleFileChange function
  const handleDocFileChange = async (event) => {
    const selectedFiles = event.target.files;

    // Create a FormData object to store the files
    const docFormData = new FormData();

    // Append each selected file to the FormData object
    for (let i = 0; i < selectedFiles.length; i++) {
      docFormData.append('files', selectedFiles[i]);
    }

    const token = Cookies.get('token');
          if (!token) {
          console.error("Token not found in localStorage.");
          return;
          }
          let config = {
              headers: {
                  Authorization: token,
              },
          };
          console.log(docFormData);
    // Make an HTTP POST request to your API to send the documents
    try {
      const response = await axios.post(Upload_Technician_Documents, docFormData, config);

      if(response.data.status === 201){
        setDocumentsPath(response.data.data)
        toast.success(response.data.message);
        console.log(response.data.data);
      }
      
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  
  return (
    <React.Fragment>
      
      <NavbarManagerDashboard/>

      <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
        <h6 className="section-title bg-white text-center text-primary px-3">
          Manager's Panel
        </h6>
        <h1 className="mb-5">Create Technician</h1>
      </div>

      <Container as={Card.Header}>
        <Formik
          validationSchema={schema}
          onSubmit={handleSubmit}
          initialValues={{
            name: "",
            surname: "",
            emailAddress: "",
            password: "",
            phone: "",
            nationality: "",
            qualification: "",
            level: "",
            profilePic: "",
          }}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row>
                <Col lg={6} className="mb-3">
                  <Form.Group controlId="validationFormik01" className="my-2">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      placeholder="First Name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      isValid={touched.name && !errors.name}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col lg={6} className="mb-3">
                  <Form.Group controlId="validationFormik02" className="my-2">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control
                      placeholder="Surname"
                      name="surname"
                      value={values.surname}
                      onChange={handleChange}
                      isValid={touched.surname && !errors.surname}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col lg={6} className="mb-3">
                  <Form.Group
                    controlId="validationFormikUsername"
                    className="my-2"
                  >
                    <Form.Label>Email Address</Form.Label>
                    <InputGroup hasValidation>
                      <InputGroup.Text id="inputGroupPrepend">
                        @
                      </InputGroup.Text>
                      <Form.Control
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
                </Col>
                <Col lg={6} className="mb-3">
                  <Form.Group controlId="validationFormik03" className="my-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
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
                </Col>
                <Col lg={6} className="mb-3">
                  <Form.Group controlId="validationFormik04" className="my-2">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
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
                </Col>
                <Col lg={6} className="mb-3">
                  <Form.Group controlId="validationFormik05" className="my-2">
                    <Form.Label>Nationality</Form.Label>
                    <Form.Control
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
                </Col>
                <Col lg={6} className="mb-3">
                  <Form.Group controlId="validationFormik06" className="my-2">
                    <Form.Label>Qualification</Form.Label>
                    <Form.Control
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
                </Col>
                <Col lg={6} className="mb-3">
                  <Form.Group controlId="validationFormik07" className="my-2">
                    <Form.Label>Level</Form.Label>
                    <Form.Control
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
                </Col>
                <Col lg={6} className="mb-3">
                  <Form.Group controlId="validationFormik08" className="my-2">
                    <Form.Label>Profile Picture</Form.Label>
                    <Form.Control
                      type="file"
                      name="profilePic"
                      onChange={handleFileChange}
                      isInvalid={!!errors.profilePic}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.profilePic}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col lg={6} className="mb-3">
                  <Form.Group controlId="validationFormik09" className="my-2">
                    <Form.Label>Documents</Form.Label>
                    <Form.Control
                      type="file"
                      name="documents"
                      onChange={handleDocFileChange}
                      isInvalid={!!errors.documents}
                      multiple
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.documents}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Button
                variant="warning"
                type="button"
                onClick={handleSubmit}
                className="my-3"
                as={Col}
                lg="3"
              >
                Submit Technician Details
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </React.Fragment>
  );
}

export default CreateTechnician;