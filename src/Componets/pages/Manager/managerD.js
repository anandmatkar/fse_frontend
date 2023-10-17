import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarManagerDashboard from '../../NavBar/navbarManagerDashboard';
import { Card, Col, Container, Row } from 'react-bootstrap';

export default function ManagerDashboard() {
  const navigate = useNavigate();

  const createCustomerHandler = () => {
    navigate('/customerlist');
  };
  const AssignTechnician = () => {
    navigate('/assignTech');
  };
  const ManageProjectStatus = () => {
    navigate('/projectStatus');
  };
  const ManageCustomerInfo = () => {
    navigate('/manageCustomerInfo');
  };
  const ManageMachineInfo = () => {
    navigate('/machinInfo');
  };
  const createProject = () => {
    navigate('/createP');
  };
  const timeSheetHandler = () => {
    navigate('/timeSheet');
  };
  const showNewProject = () => {
    navigate('/showproject');
  };
  const manageTechnicians = () => {
    navigate('/managetechnician');
  };
  const manageMachineDetails = () => {
    navigate('/managemachineinfo');
  };

  return (
    <React.Fragment>
      {/* <div
        className="imgBg"
        style={{
          background: `url(${'/assets/CurveLine.svg'})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          // maxHeight: '100vh',
          height: '100vh',
        }}
      > */}
      {/* <NavbarManager /> */}
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
            {/* <ServiceItem
              icon="fa-hotel"
              title="Create Project"
              text="Create Project & Manage Project Details"
              onClick={createProject}
            /> */}
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
      {/* </div> */}
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
