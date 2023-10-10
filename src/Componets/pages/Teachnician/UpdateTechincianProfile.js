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
import { Card, ListGroup,  Table , Container } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    avatar: yup.string().required(),

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
        'http://3.110.86.245/api/v1/technician/uploadProfilePic',
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
      const response = await axios.get('http://3.110.86.245/api/v1/technician/showProfile', config);
      const profileData = response.data.data[0];
      console.log(profileData);

      if (profileData.profilePic) {
        setSelectedImage(profileData.profilePic);
      }

      setFormData({
        name: profileData.name,
        surname: profileData.surname,
        emailAddress: profileData.email_address,
        phoneNumber: profileData.phone_number,
        nationality: profileData.nationality,
        qualification: profileData.qualification,
        level: profileData.level,
        profilePic: profileData.profilepic,

      });

      setSelectedImage(profileData.profilepic)
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
        'http://3.110.86.245/api/v1/technician/uploadTechnicianDocuments',
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

        const response = await axios.post('http://3.110.86.245/api/v1/technician/updateTechnicianProfile', newFormData, config);
  
        if (response.status === 200) {
          // Profile updated successfully, you can show a success message or redirect
          console.log('Profile updated successfully');
          toast.success('Technician Updated successfully');

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
    <Container className='my-3'>
    {/* <Card.Header className='fs-3 fw-bold text-center my-3'>Edit Technician Profile</Card.Header> */}
    <div className="d-flex justify-content-between mb-4">
        <Button variant="success" type="submit" className="w-10" onClick={()=>{updateTechDataSubmit(formData);}}>
            Update Technician Details
        </Button>
        <Button as={NavLink} to="/ChangePassword">
            Change Password
        </Button>
    </div>
   
        <Card>
            <Row>
                <Col lg={4}>
                    <Card>
                        <Card.Header className='fw-bold'>Profile Picture</Card.Header>
                        <center>
                            {selectedImage && (
                                <Card.Img className='my-5' src={selectedImage} style={{ maxWidth: '240px', maxHeight: '320px' }} roundedCircle />
                            )}
                            <Form>
                                <Form.Group className="mt-3">
                                    <Form.Label className='fw-bold'>Upload a Picture:</Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />
                                </Form.Group>
                            </Form>
                        </center>
                    </Card>
                </Col>
                <Col lg={8}>
    <Form noValidate onSubmit={updateTechDataSubmit}>
        <Card className='w-100 fw-bold'>
            <Card.Header>Profile Details</Card.Header>
            <ListGroup variant="flush">

                <ListGroup.Item>
                    <Row>
                        <Col md={2}><b>Name:</b></Col>
                        <Col md={10}>
                            <Form.Control
                                type="text"
                                placeholder="First Name"
                                name="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col md={2}><b>Surname:</b></Col>
                        <Col md={10}>
                            <Form.Control
                                type="text"
                                placeholder="Surname"
                                name="surname"
                                value={formData.surname}
                                onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                            />
                        </Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col md={2}><b>Email Address:</b></Col>
                        <Col md={10}>
                            <Form.Control
                                type="email"
                                placeholder="Email Address"
                                name="emailAddress"
                                value={formData.emailAddress}
                                onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                            />
                        </Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col md={2}><b>Phone:</b></Col>
                        <Col md={10}>
                            <Form.Control
                                type="tel"
                                placeholder="Phone"
                                name="phone"
                                value={formData.phoneNumber}
                                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                            />
                        </Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col md={2}><b>Nationality:</b></Col>
                        <Col md={10}>
                            <Form.Control
                                type="text"
                                placeholder="Nationality"
                                name="nationality"
                                value={formData.nationality}
                                onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                            />
                        </Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col md={2}><b>Qualification:</b></Col>
                        <Col md={10}>
                            <Form.Control
                                type="text"
                                placeholder="Qualification"
                                name="qualification"
                                value={formData.qualification}
                                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                            />
                        </Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col md={2}><b>Level:</b></Col>
                        <Col md={10}>
                            <Form.Control
                                type="text"
                                placeholder="Level"
                                name="level"
                                value={formData.level}
                                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                            />
                        </Col>
                    </Row>
                </ListGroup.Item>

            </ListGroup>
        </Card>
        {/* <Button variant="warning" type="submit" className="my-3 w-50">
            Update Technician Details
        </Button>
        <Button as={NavLink} to="/ChangePassword" className="my-3">
            Change Password
        </Button> */}
    </Form>
</Col>

            </Row>
        </Card>
        <ToastContainer/>
    </Container>
</React.Fragment>

  );
}
 export default  UpdateTechincianProfile;