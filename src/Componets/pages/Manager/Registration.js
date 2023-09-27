import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AuthContext from '../../auth-context/auth-context';
import LayoutTech from '../../Layout/Layout3';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { managerlogin_Api } from '../../../Api/Manager_Api';

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [emailAddress, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  // const emailInputRef = useRef();
  // const passwordInputRef = useRef();
  // const firstnameRef = useRef();
  // const lastNameRef = useRef();
  // const comapanyRef = useRef();
  // const phoneRef = useRef();
  // const Position = useRef();
  // const confirmPasswordRef = useRef();

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
      const registrationData = {
        emailAddress,
        password,
        confirmPass,
        position: 'Manager',
        name,
        surname,
        company,
        phone,
      };

      try {
        const response = await axios.post(
          '/api/v1/manager/createManager',
          registrationData
        );
        console.log(response.data);
        if (response.data.status === 201) {
          console.log('Registration Successful:', response.data);
          alert(
            'Registration Successful Please Verify your Email address through your Email...'
          );
          localStorage.setItem(
            'registrationData',
            JSON.stringify(registrationData)
          );

          navigate('/verifyManager');
        } else if (response.data.status === 409) {
          alert('Email already exists');
          console.error('Registration Failed. Status Code:', response.status);
        }
      } catch (error) {
        console.error('API Error:', error);
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
    const indianMobileRegex = /^[6789]\d{9}$/;
    return indianMobileRegex.test(phone);
  };

  return (
    <LayoutTech>
      <section className="vh-100" style={{ backgroundColor: 'white' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: '1rem' }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://img.freepik.com/free-vector/industrial-city-concept-with-chemical-plants_1284-11527.jpg?w=740&t=st=1686047150~exp=1686047750~hmac=76eb75f72ca4c93a1c395b6a5f440b78df6b725091b020de6723dedac1fd2ead"
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: '1rem 0 0 1rem' }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={submitHandler}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i
                            className="fas fa-cubes fa-2x me-3"
                            style={{ color: '#ff6219' }}
                          ></i>
                          <span className="h1 fw-bold mb-0">Logo</span>
                        </div>
                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: '1px' }}
                        >
                          Register an account
                        </h5>
                        <div className="row mb-4">
                          <div className="col">
                            <div className="form-outline">
                              <input
                                type="text"
                                id="firstName"
                                className="form-control form-control-lg"
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
                                className="form-control form-control-lg"
                                value={surname}
                                name="surname"
                                onChange={(e) => setSurname(e.target.value)}
                              />
                              <label className="form-label" htmlFor="lastName">
                                Last Name
                              </label>
                              {errors.surname && (
                                <span
                                  className="error"
                                  style={{ color: 'red' }}
                                >
                                  {errors.surname}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="company"
                            className="form-control form-control-lg"
                            value={company}
                            name="company"
                            onChange={(e) => setCompany(e.target.value)}
                          />
                          <label className="form-label" htmlFor="company">
                            Company
                          </label>
                          {errors.company && (
                            <span className="error" style={{ color: 'red' }}>
                              {errors.company}
                            </span>
                          )}
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="email"
                            className="form-control form-control-lg"
                            value={emailAddress}
                            name="emailAddress"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <label className="form-label" htmlFor="email">
                            Email address
                          </label>
                          {errors.emailAddress && (
                            <span className="error" style={{ color: 'red' }}>
                              {errors.emailAddress}
                            </span>
                          )}
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="password"
                            className="form-control form-control-lg"
                            value={password}
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label className="form-label" htmlFor="password">
                            Password
                          </label>
                          {errors.password && (
                            <span className="error" style={{ color: 'red' }}>
                              {errors.password}
                            </span>
                          )}
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="confirmPassword"
                            className="form-control form-control-lg"
                            value={confirmPass}
                            name="confirmPass"
                            onChange={(e) => setConfirmPass(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="confirmPassword"
                          >
                            Confirm Password
                          </label>
                          {errors.confirmPass && (
                            <span className="error" style={{ color: 'red' }}>
                              {errors.confirmPass}
                            </span>
                          )}
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="phone"
                            className="form-control form-control-lg"
                            value={phone}
                            name="phone"
                            onChange={(e) => setPhone(e.target.value)}
                          />
                          <label className="form-label" htmlFor="position">
                            Phone
                          </label>
                          {errors.phone && (
                            <span className="error" style={{ color: 'red' }}>
                              {errors.phone}
                            </span>
                          )}
                        </div>
                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="submit"
                          >
                            Register
                          </button>
                        </div>
                        <p
                          className="mb-5 pb-lg-2"
                          style={{ color: '#393f81' }}
                        >
                          Already have an account?{' '}
                          <Link
                            to={'/mangerLogin'}
                            style={{ color: '#393f81' }}
                          >
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LayoutTech>
  );
};
export default RegistrationPage;
