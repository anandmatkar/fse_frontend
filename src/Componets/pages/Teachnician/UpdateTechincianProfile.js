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
import { Card, Container, Image } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import './UpdateTechincianProfile.css'
import { NavLink } from "react-router-dom";


function UpdateTechincianProfile() {

    // Define a state to store the selected documents
    const [selectedDocuments, setSelectedDocuments] = useState([]);
    const [files, setFiles] = useState([]);

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
      console.log(formData);
      
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

  });

  const [selectedImage, setSelectedImage] = useState('');
  const [profileImgPath, setProfileImgPath] = useState('');
  const [docsFilePath, setDocsFilePath] = useState([]);


// Function to handle the image upload
const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (file) {

    const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
      
    const formData = new FormData();
    formData.append('image', file);

    try {
      const token = Cookies.get('token');
      if (!token) {
        console.error("Token not found in localStorage.");
        return;
      }
      const config = {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data', // Set the content type for file upload
        },
      };
      
      // Make an API request to upload the image and get the path
      const response = await axios.post(
        'http://localhost:3003/api/v1/technician/uploadProfilePic',
        formData,
        config
      );

      if (response.status === 200) {
        const imagePath = response.data.data;

        setProfileImgPath(imagePath);

        console.log(imagePath);

        // Update the profilePic field in the form data
        // setFormData({ ...formData, profilePic: imagePath });
        console.log(formData);

        // Show a success message
        toast.success('Image uploaded successfully');
      } else {
        // Handle errors, show an error message
        console.error('Failed to upload image');
        toast.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while uploading the image');
    }
  }
};

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

      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDocumentsUpload = (e) => {
    const files = e.target.files;
    if (files) {
      const documentsArray = Array.from(files);
      setSelectedDocuments(documentsArray);
    }
  };

  const submitFormWithDocuments = async (e) => {
    try {
      // if (selectedDocuments.length === 0) {
      //   // No documents selected, handle this case as needed
      //   return [];
      // }
      
      const files = e.target.files;
      const docsFormData = new FormData();

      if (files.length > 0) {
        // Loop through the selected files and append each one to the formData object
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          docsFormData.append(`files`, file); // You can use a unique name for each file here
        }

        // Log the formData after appending the files
        console.log(docsFormData);
      } else {
        console.log("No files selected.");
      }
  
      const token = Cookies.get('token');

      if (!token) {
        console.error('Token not found in localStorage.');
        return [];
      }
  
      const config = {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
      };
  
      const response = await axios.post(
        'http://localhost:3003/api/v1/technician/uploadTechnicianDocuments',
        docsFormData,
        config
      );
  
      if (response.status === 201) {
        const filePaths = response.data.data;
        setDocsFilePath(response.data.data);
        return filePaths;


      } else {
        console.error('Failed to upload documents');
        return [];
      }
    } catch (error) {
      console.error('Error:', error);
      return [];
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
      const documentPaths = await submitFormWithDocuments(selectedDocuments);
      
      const newFormData = {
        ...formData,
        profilePic: profileImgPath,
      };
      
      // const newFormData = {...formData, profilePic : profileImgPath}
      console.log(newFormData);
      console.log(config);

        const response = await axios.post('/api/v1/technician/updateTechnicianProfile', newFormData, config);
  
        if (response.status === 201) {
          // Profile updated successfully, you can show a success message or redirect
          console.log('Profile updated successfully');
          toast.success("update technician profile succesfully");
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
      <Container as={Card.Header} className="py-5">
        <h1 className='text-center'>Edit Technician Profile</h1>
        <Form noValidate onSubmit={updateTechDataSubmit}>
          <Row className="mb-3">
            <Col lg={6}>
              <Form.Group controlId="validationFormik01">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  isValid={!!formData.name}
                />
              </Form.Group>

              <Form.Group controlId="validationFormik02">
                <Form.Label>Surname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Surname"
                  name="surname"
                  value={formData.surname}
                  onChange={(e) =>
                    setFormData({ ...formData, surname: e.target.value })
                  }
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
                  onChange={(e) =>
                    setFormData({ ...formData, emailAddress: e.target.value })
                  }
                  isInvalid={!!formData.emailAddress}
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </InputGroup>
              </Form.Group>

              <Form.Group controlId="validationFormik05">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Phone"
                  name="phone"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  isInvalid={!!formData.phone}
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="validationFormik06">
              <Form.Label>Nationality</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nationality"
                name="nationality"
                value={formData.nationality}
                onChange={(e) =>
                  setFormData({ ...formData, nationality: e.target.value })
                }
                isInvalid={!!formData.nationality}
              />
              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="validationFormik07">
                <Form.Label>Qualification</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Qualification"
                  name="qualification"
                  value={formData.qualification}
                  onChange={(e) =>
                    setFormData({ ...formData, qualification: e.target.value })
                  }
                  isInvalid={!!formData.qualification}
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="validationFormik08">
                <Form.Label>Level</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Level"
                  name="level"
                  value={formData.level}
                  onChange={(e) =>
                    setFormData({ ...formData, level: e.target.value })
                  }
                  isInvalid={!!formData.level}
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="validationFormik08">
                <Form.Label>Upload Documents</Form.Label>
                <Form.Control
                  type="file"
                  multiple  // Add the 'multiple' attribute to allow multiple file selection
                  name="documents"
                  onChange={submitFormWithDocuments}
                  
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>


            </Col>
            
            <Col lg={6}>
              <Row>
                <Col className='mx-5'>
                  {selectedImage && (
                    <div className="circular-frame">
                      <Image src={selectedImage} roundedCircle />
                    </div>
                  )}
                </Col>
              </Row>
              <Row>
                <Col className='mx-5'>
                  <Form>
                    <Form.Group>
                      <Form.Label>Upload a Picture:</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </Form.Group>
                  </Form>
                </Col>
              </Row>

             
            </Col>

          </Row>
          <Button
            variant="warning"
            type="button"
            onClick={() => {updateTechDataSubmit(formData);}}
            className="my-3"
            as={Col}
            lg="3"
          >
            Update Technician Details
          </Button>

          <Button as={NavLink} to="/ChangePassword">
              <Col className='mx-5'>

                Change Password

                </Col>

              </Button>
        </Form>
      </Container>
    </React.Fragment>
  );
}
 export default  UpdateTechincianProfile;