import React, { useState } from 'react'; 
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
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

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
        const response = await axios.post('http://localhost:3003/api/v1/manager/createTechnician', technicianData, config);
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

      const response = await axios.post('http://localhost:3003/api/v1/technician/uploadProfilePic', fileData, config);

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
      const response = await axios.post('http://localhost:3003/api/v1/manager/uploadTechnicianDocuments', docFormData, config);

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

      <h3 className='my-3 text-center'>Create Technician</h3>

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
                <Form.Group controlId="validationFormik01" className='my-2'>
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
                <Form.Group controlId="validationFormik02" className='my-2'>
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
                <Form.Group controlId="validationFormikUsername" className='my-2'>
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
                <Form.Group controlId="validationFormik03" className='my-2'>
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
                <Form.Group controlId="validationFormik04" className='my-2'>
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
                <Form.Group controlId="validationFormik05" className='my-2'>
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

                <Form.Group controlId="validationFormik06" className='my-2'>
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
                <Form.Group controlId="validationFormik07" className='my-2'>
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
                <Form.Group controlId="validationFormik08" className='my-2'>
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.Control
                    type="file" // Use type "file" for file input
                    name="profilePic"
                    onChange={handleFileChange} // Handle file input change
                    isInvalid={!!errors.profilePic}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.profilePic}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationFormik09" className='my-2'>
                  <Form.Label>Documents</Form.Label>
                  <Form.Control
                    type="file" // Use type "file" for file input
                    name="documents"
                    onChange={handleDocFileChange} // Handle file input change
                    isInvalid={!!errors.documents}
                    multiple // Allow multiple file selection

                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.documents}
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