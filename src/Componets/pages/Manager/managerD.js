import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import NavbarManagerDashboard from '../../NavBar/navbarManagerDashboard';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Cookies from "js-cookie";

export default function ManagerDashboard() {
  const navigate = useNavigate();


  const createCustomerHandler = () => {
    navigate('/customerlist');
  };

  const ManageProjectStatus = () => {
    navigate('/projectStatus');
  };

  const createProject = () => {
    navigate('/createP');
  };

  const manageTechnicians = () => {
    navigate('/managetechnician');
  };
  const manageMachineDetails = () => {
    navigate('/managemachineinfo');
  };


    useEffect(() => {
        const token = Cookies.get('token');
        const role = Cookies.get('role');  // Assuming 'role' is the name of the cookie storing the role
        // Function to block back navigation
        const blockBackNavigation = (e) => {
            e.preventDefault();
            // Resetting the state to prevent going back
            window.history.pushState(null, null, window.location.pathname);
        };
    
        // If token and role are present, block the back navigation
        if (token && role) {
            // Push a new entry to history stack
            window.history.pushState(null, null, window.location.pathname);
            
            // Add a popstate listener
            window.addEventListener('popstate', blockBackNavigation);
        }
    
    
        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('popstate', blockBackNavigation);
        };
    }, []);

  return (
    <React.Fragment>
      <NavbarManagerDashboard />

      <div className="container-xxl py-5">
        <Container>
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Manager's Panel
            </h6>
            <h1 className="mb-5">Services</h1>
          </div>
          <Row>
            <ServiceItem
              icon="fa-globe"
              title="Manage Customers"
              text="Create Customer & Manage Customers"
              onClick={createCustomerHandler}
            />

            <ServiceItem
              icon="fa-user"
              title="Manage Technicians"
              text="Create Technician & Manage Technicians"
              onClick={manageTechnicians}
            />
            <ServiceItem
              icon="fa-cog"
              title="Manage Projects"
              text="Create Project & View/Manage Projects Status"
              onClick={ManageProjectStatus}
            />
            <ServiceItem
              icon="fa-cog"
              title="Manage Machines"
              text="View Manage & Edit Machines Details"
              onClick={manageMachineDetails}
            />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

function ServiceItem({ icon, title, text, onClick }) {
  return (
    <Col lg={6} md={12} className="wow fadeInUp my-3" data-wow-delay="0.1s">
      <Card className="service-item rounded pt-3" onClick={onClick}>
        <div className="p-4">
          <i className={`fa fa-3x ${icon} text-primary mb-4`}></i>
          <h5>{title}</h5>
          <p>{text}</p>
        </div>
      </Card>
    </Col>
  );
}
