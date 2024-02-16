import React, { useState } from 'react';
import * as formik from 'formik';
import * as yup from 'yup';
import {
  Card,
  Container,
  Button,
  Row,
  Col,
  Form,
  InputGroup,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import {
  Create_Technician_Api,
  Upload_Technician_Profile,
  Upload_Technician_Documents,
  Manager_Base_Url,
} from './../../../Api/Manager_Api';
import { FiUploadCloud, FiDownload, FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import NavbarManagerDashboard from '../../NavBar/navbarManagerDashboard';
import { useRef } from 'react';
import { Base_Url } from '../../../Api/Base_Url';
import { FaArrowLeft } from 'react-icons/fa';

function CreateTechnician() {
  const { Formik } = formik;
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required(),
    surname: yup.string().required(),
    emailAddress: yup
      .string()
      .required('Email is required')
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
        'Invalid email address'
      ),
    password: yup
      .string()
      .required('Password is required')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
        'Password must be at least 8 characters and contain both letters and numbers'
      ),
    phone: yup
      .string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .required(),
    nationality: yup.string().required(),
    qualification: yup.string().required(),
    level: yup.string().required(),
    profilePic: yup.string(),
    documents: yup.string(),
  });

  const [selectedFile, setSelectedFile] = useState('');
  const [profilePicPath, setProfilePicPath] = useState('');
  const [documentsPath, setDocumentsPath] = useState([]);
  const [showPassword, setShowPassword] = useState(false); // State to control password visibility
  const fileInputRef = useRef(null);

  const createTechnician = async (formData) => {
    try {
      const token = Cookies.get('token');

      if (!token) {
        toast.error('Token not found in localStorage.');
        return;
      }
      let config = {
        headers: {
          Authorization: token,
        },
      };
      let technicianData = {
        ...formData,
        profilePic: profilePicPath,
        documents: documentsPath,
      };
      console.log(technicianData);
      const response = await axios.post(
        Create_Technician_Api,
        technicianData,
        config
      );
      if (response.data.status === 201) {
        navigate('/managetechnician');
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error creating technician. Please try again.');
    }
  };

  const handleSubmit = (values, e) => {
    // console.log(selectedFile);
    createTechnician(values);
  };

  const handleFileChange = async (e) => {
    try {
      setSelectedFile(e.target.files[0]);
      const profileImage = e.target.files[0];

      const token = Cookies.get('token');
      if (!token) {
        console.error('Token not found in localStorage.');
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

      const response = await axios.post(
        Upload_Technician_Profile,
        fileData,
        config
      );

      setProfilePicPath(response.data.data);
    } catch (error) {
      toast.error(error.message);
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
      console.error('Token not found in localStorage.');
      return;
    }
    let config = {
      headers: {
        Authorization: token,
      },
    };
    // Make an HTTP POST request to your API to send the documents
    try {
      const response = await axios.post(
        Upload_Technician_Documents,
        docFormData,
        config
      );

      if (response.data.status === 201) {
        setDocumentsPath(response.data.data);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleExcelFileChange = async (e) => {
    const selectedExcelFile = e.target.files[0];

    const token = Cookies.get('token');
    if (!token) {
      console.error('Token not found in localStorage.');
      return;
    }
    let config = {
      headers: {
        Authorization: token,
      },
    };
    if (selectedExcelFile) {
      let excelFileData = new FormData();
      // Append the profile image to the FormData
      excelFileData.append('file', selectedExcelFile);

      try {
        const response = await axios.post(
          `${Manager_Base_Url}insertTechnician`,
          excelFileData,
          config
        );

        if (response.data.status === 201) {
          navigate('/managetechnician');
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleDownloadTemplate = () => {
    const downloadLink = `${Base_Url}uploads/exampleTemplate/tech_example.xlsx`;
    const newTab = window.open(downloadLink, '_blank');
    newTab.focus();
  };

  return (
    <React.Fragment>
      <NavbarManagerDashboard />

      <div className="text-center wow fadeInUp my-5" data-wow-delay="0.1s">
        <h6 className="section-title bg-white text-center text-primary px-3">
          Manager's Panel
        </h6>
        <h1 className="mb-5">Create Technician</h1>
      </div>

      <Container as={Card.Header}>
        <Row>
          <Col>
            <Button
              variant="primary"
              onClick={() => {
                navigate('/managetechnician');
              }}
              className="my-2"
            >
              <FaArrowLeft /> Back to Manage Technicians
            </Button>
          </Col>
        </Row>
        <Row>
          <Col lg={3} md={12}>
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: 'none' }}
              accept=".xlsx, .xls" // Specify allowed file types
              onChange={handleExcelFileChange}
            />

            <Button
              variant="success"
              className="w-100 my-2"
              onClick={() => fileInputRef.current.click()}
            >
              Import Excel Sheet <FiUploadCloud className="ms-2 fs-4" />
            </Button>
          </Col>

          <Col lg={3} md={12}>
            <Button
              className="w-100 my-2"
              variant="success"
              onClick={handleDownloadTemplate}
            >
              Sample Template <FiDownload className="ms-2 fs-4" />
            </Button>
          </Col>
        </Row>

        <Formik
          validationSchema={schema}
          onSubmit={handleSubmit}
          initialValues={{
            name: '',
            surname: '',
            emailAddress: '',
            password: '',
            phone: '',
            nationality: '',
            qualification: '',
            level: '',
            profilePic: '',
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
                      isInvalid={touched.name && !!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {touched.name && errors.name}
                      {/* Show error only if field is touched */}
                    </Form.Control.Feedback>
                    {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
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
                      isInvalid={touched.surname && !!errors.surname}
                    />
                    <Form.Control.Feedback type="invalid">
                      {touched.surname && errors.surname}{' '}
                      {/* Show error only if field is touched */}
                    </Form.Control.Feedback>
                    {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
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
                        isInvalid={
                          touched.emailAddress && !!errors.emailAddress
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {touched.emailAddress && errors.emailAddress}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col lg={6} className="mb-3">
                  <Form.Group controlId="validationFormik03" className="my-2">
                    <Form.Label>Password</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={touched.password && !!errors.password}
                      />
                      <InputGroup.Text>
                        {showPassword ? (
                          <FiEyeOff
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        ) : (
                          <FiEye
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        )}
                      </InputGroup.Text>
                      <Form.Control.Feedback type="invalid">
                        {touched.password && errors.password}
                      </Form.Control.Feedback>
                    </InputGroup>
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
                      isInvalid={touched.phone && !!errors.phone}
                    />
                    <Form.Control.Feedback type="invalid">
                      {touched.phone && errors.phone}
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
                      isInvalid={touched.nationality && !!errors.nationality}
                    />
                    <Form.Control.Feedback type="invalid">
                      {touched.nationality && errors.nationality}
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
                      isInvalid={
                        touched.qualification && !!errors.qualification
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {touched.qualification && errors.qualification}
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
                      isInvalid={touched.level && !!errors.level}
                    />
                    <Form.Control.Feedback type="invalid">
                      {touched.level && errors.level}
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
