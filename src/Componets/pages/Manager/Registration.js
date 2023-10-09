import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { toast } from 'react-toastify';
import axios from 'axios';
import Navbar from '../../NavBar/navbarManager';
import './Registration.css';

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [emailAddress, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicURL, setProfilePicURL] = useState(''); // Holds the uploaded picture URL
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleProfilePicChange = async (event) => {
    const file = event.target.files[0];
    setProfilePic(file);

    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post(
          '/api/v1/manager/uploadProfilePic',
          formData
        );
        console.log(response.data.data);
        if (response.data.status === 201) {
          // The API should return the URL of the uploaded profile picture
          const uploadedURL = response.data.data;
          console.log(uploadedURL);
          setProfilePicURL(uploadedURL);
          toast.success(response.data.message);
        } else {
          console.error(
            'Profile Picture Upload Failed. Status Code:',
            response.status
          );
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error('API Error:', error);
        toast.error(error.message);
      }
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    let formErrors = {};
    if (!name) {
      formErrors.name = 'Please enter your name';
    } else if (!validateName(name)) {
      formErrors.name = 'Please enter alphabets only';
    }
    if (!surname) {
      formErrors.surname = 'Please enter your surname';
    } else if (!validateName(surname)) {
      formErrors.surname = 'Please enter alphabets only';
    }
    if (!emailAddress) {
      formErrors.emailAddress = 'Please enter your email';
    } else if (!validateEmail(emailAddress)) {
      formErrors.emailAddress = 'Please enter a valid Email address';
    }
    if (!phone) {
      formErrors.phone = 'Please enter your phone contact';
    } else if (!validatePhone(phone)) {
      formErrors.phone = 'Please enter a valid phone number';
    }
    if (!company) {
      formErrors.company = 'Please enter your company name';
    }
    if (!password) {
      formErrors.password = 'Please enter your password';
    } else if (password.length < 8) {
      formErrors.password = 'Password must contain at least 8 characters';
    }
    if (!confirmPass) {
      formErrors.confirmPass = 'Please confirm your password';
    } else if (password !== confirmPass) {
      formErrors.confirmPass = 'Passwords do not match';
    }
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      let registrationData = {
        emailAddress,
        password,
        confirmPass,
        position: 'Manager',
        name,
        surname,
        company,
        phone,
      };

      registrationData = {
        ...registrationData,
        profilePic: profilePicURL,
      };

      console.log(registrationData);

      try {
        const response = await axios.post(
          '/api/v1/manager/createManager',
          registrationData
        );
        console.log(response.data);
        if (response.data.status === 201) {
          console.log('Registration Successful:', response.data);
          toast.success(response.data.message);
          localStorage.setItem(
            'registrationData',
            JSON.stringify(registrationData)
          );

          navigate('/verifyManager');
        } else if (response.data.status === 409) {
          toast.error(response.data.message);
          console.error('Registration Failed. Status Code:', response.status);
        }
      } catch (error) {
        console.error('API Error:', error);
        toast.error(error.message);
      }
    }
  };

  var validateName = (name) => {
    return /^[A-Za-z]+$/.test(name);
  };
  const validateEmail = (emailAddress) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
  };
  const validatePhone = (phone) => {
    const tenDigitRegex = /^\d{10}$/;
    return tenDigitRegex.test(phone);
  };

  return (
    <div>
      <Navbar />
      {/* <div className="container">
        <div className="card">
          <div className="card-body p-4 p-lg-5 text-black">
            <form onSubmit={submitHandler}>
              <div className="d-flex align-items-center mb-3 pb-1"></div>
              <h3
                className="fw-normal mb-3 pb-3"
                style={{ letterSpacing: '1px' }}
              >
                Register an account
              </h3>
              <div className="row mb-4">
                <div className="col">
                  <div className="form-outline">
                    <input
                      type="text"
                      id="firstName"
                      className="form-control inputfieldresistration"
                      value={name}
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label className="form-label" htmlFor="firstName">
                      First Name
                    </label>
                  </div>
                  {errors.name && (
                    <span className="error" style={{ color: 'red' }}>
                      {errors.name}
                    </span>
                  )}
                </div>
                <div className="col">
                  <div className="form-outline">
                    <input
                      type="text"
                      id="lastName"
                      className="form-control inputfieldresistration"
                      value={surname}
                      name="surname"
                      onChange={(e) => setSurname(e.target.value)}
                    />
                    <label className="form-label" htmlFor="lastName">
                      Last Name
                    </label>
                    {errors.surname && (
                      <span className="error" style={{ color: 'red' }}>
                        {errors.surname}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col">
                  <div className="form-outline">
                    <input
                      type="text"
                      id="company"
                      className="form-control inputfieldresistration"
                      value={company}
                      name="company"
                      onChange={(e) => setCompany(e.target.value)}
                    />
                    <label className="form-label" htmlFor="company">
                      Company
                    </label>
                  </div>
                  {errors.company && (
                    <span className="error" style={{ color: 'red' }}>
                      {errors.company}
                    </span>
                  )}
                </div>
                <div className="col">
                  <div className="form-outline">
                    <input
                      type="text"
                      id="email"
                      className="form-control inputfieldresistration"
                      value={emailAddress}
                      name="emailAddress"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="form-label" htmlFor="email">
                      Email Address
                    </label>
                    {errors.emailAddress && (
                      <span className="error" style={{ color: 'red' }}>
                        {errors.emailAddress}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col">
                  <div className="form-outline">
                    <input
                      type="password"
                      id="password"
                      className="form-control inputfieldresistration"
                      value={password}
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                  </div>
                  {errors.password && (
                    <span className="error" style={{ color: 'red' }}>
                      {errors.password}
                    </span>
                  )}
                </div>
                <div className="col">
                  <div className="form-outline">
                    <input
                      type="password"
                      id="confirmPassword"
                      className="form-control inputfieldresistration"
                      value={confirmPass}
                      name="confirmPass"
                      onChange={(e) => setConfirmPass(e.target.value)}
                    />
                    <label className="form-label" htmlFor="confirmpass">
                      Confirm Password
                    </label>
                    {errors.confirmPass && (
                      <span className="error" style={{ color: 'red' }}>
                        {errors.confirmPass}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="form-outline">
                    <input
                      type="text"
                      id="phone"
                      className="form-control inputfieldresistration"
                      value={phone}
                      name="phone"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <label className="form-label" htmlFor="phone">
                      Phone
                    </label>
                  </div>
                  {errors.phone && (
                    <span className="error" style={{ color: 'red' }}>
                      {errors.phone}
                    </span>
                  )}
                </div>
                <div className="col">
                  <div className="form-outline">
                    <input
                      type="file"
                      id="file"
                      className="form-control inputfieldresistration"
                      onChange={handleProfilePicChange}
                    />
                    <label className="form-label" htmlFor="profilePic">
                      Profile Pic
                    </label>
                    {errors.profilePic && (
                      <span className="error" style={{ color: 'red' }}>
                        {errors.profilePic}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-8">
                <button className="btn btn-dark " type="submit">
                  Register
                </button>
              </div>
              <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                Already have an account?{' '}
                <Link to={'/mangerLogin'} style={{ color: '#393f81' }}>
                  Sign in here
                </Link>
              </p>
              <a href="#!" className="small text-muted">
                Terms of use.
              </a>
              <a href="#!" className="small text-muted">
                Privacy policy
              </a>
            </form>
          </div>
        </div>
      </div> */}

      <div className="user-registration">
        <div className="container registerManager">
          <div className="row">
            <div className="col-md-3 register-left">
              <img
                src="/assets/manager.svg"
                alt=""
                style={{ width: '220px' }}
                className="managerImage"
              />
              <h3>Welcome</h3>
              <p className="paraManager">Here manager Register yourself!</p>
            </div>
            <div className="col-md-9 register-right">
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <h3 className="register-heading">Register here</h3>
                  <div className=" formDiv">
                    <form onSubmit={submitHandler}>
                      <div className="row register-form">
                        <div className="col-md-6">
                          <div className="form-group">
                            <input
                              type="text"
                              id="firstName"
                              className="form-control inputfieldresistration"
                              value={name}
                              name="name"
                              placeholder="First Name"
                              onChange={(e) => setName(e.target.value)}
                            />
                            {errors.name && (
                              <span className="error" style={{ color: 'red' }}>
                                {errors.name}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <input
                              type="text"
                              id="lastName"
                              className="form-control inputfieldresistration"
                              value={surname}
                              name="surname"
                              placeholder="Last Name"
                              onChange={(e) => setSurname(e.target.value)}
                            />
                            {errors.surname && (
                              <span className="error" style={{ color: 'red' }}>
                                {errors.surname}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <input
                              type="text"
                              id="company"
                              className="form-control inputfieldresistration"
                              value={company}
                              placeholder="Company"
                              name="company"
                              onChange={(e) => setCompany(e.target.value)}
                            />
                            {errors.company && (
                              <span className="error" style={{ color: 'red' }}>
                                {errors.company}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <input
                              type="text"
                              id="email"
                              className="form-control inputfieldresistration"
                              value={emailAddress}
                              placeholder="Email"
                              name="emailAddress"
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && (
                              <span className="error" style={{ color: 'red' }}>
                                {errors.email}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <input
                              type="password"
                              id="password"
                              className="form-control inputfieldresistration"
                              value={password}
                              placeholder="Password"
                              name="password"
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && (
                              <span className="error" style={{ color: 'red' }}>
                                {errors.password}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <input
                              type="password"
                              id="confirmpass"
                              className="form-control inputfieldresistration"
                              value={confirmPass}
                              placeholder="Re-enter Password"
                              name="confirmpass"
                              onChange={(e) => setConfirmPass(e.target.value)}
                            />
                            {errors.confirmPass && (
                              <span className="error" style={{ color: 'red' }}>
                                {errors.confirmPass}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <input
                              type="text"
                              id="phone"
                              className="form-control inputfieldresistration"
                              value={phone}
                              placeholder="Phone"
                              name="phone"
                              onChange={(e) => setPhone(e.target.value)}
                            />
                            {errors.confirmPass && (
                              <span className="error" style={{ color: 'red' }}>
                                {errors.confirmPass}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <input
                              type="file"
                              id="file"
                              className="form-control inputfieldresistration"
                              onChange={handleProfilePicChange}
                            />
                            {errors.profilePic && (
                              <span className="error" style={{ color: 'red' }}>
                                {errors.profilePic}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col">
                          <button className="btn btn-dark " type="submit">
                            Register
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <p className="p-3 text-end">
                  Already have an account? <Link to="/mangerLogin"> Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};
export default RegistrationPage;
