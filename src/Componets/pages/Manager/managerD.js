import React from 'react';
import './managerD.css';
import { useNavigate } from 'react-router-dom';
import DynamicButton from '../../Model/DynamicButton';
import NavbarManager from './Navbar';
import NavBar from '../../NavBar/navbarManager';

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

  return (
    <>
      <div
        className="imgBg"
        style={{
          background: `url(${'/assets/CurveLine.svg'})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          // maxHeight: '100vh',
          height: '100vh',
        }}
      >
        {/* <NavbarManager /> */}
        <NavBar />

        <div className="section_our_solution container-fluid">
          <div className="row">
            <div className="col-6"></div>
            <div className="col-6 ">
              <div className="our_solution_category">
                <div className="solution_cards_box d-flex col-md-3 col-lg-3 col-6">
                  <div className="solution_card ">
                    <div className="hover_color_bubble"></div>
                    <div className="so_top_icon">
                      <img
                        src="/assets/create_customer.png"
                        style={{ width: '50px' }}
                      />
                    </div>
                    <div className="solu_title">
                      <h3>Create Customer</h3>
                    </div>
                    <div className="solu_description">
                      <p>• Creating New Customer and Manageing them</p>
                      {/* <button type="button" className="read_more_btn" onClick={createCustomerHandler}>
                      Click Here
                    </button> */}
                      <DynamicButton
                        className="read_more_btn"
                        onClick={createCustomerHandler}
                      ></DynamicButton>
                    </div>
                  </div>
                  <div className="solution_card">
                    <div className="hover_color_bubble"></div>
                    <div className="so_top_icon">
                      <img
                        src="/assets/project.png"
                        style={{ width: '50px' }}
                      />
                    </div>
                    <div className="solu_title">
                      <h3>Create Project</h3>
                    </div>
                    <div className="solu_description">
                      <p>• Create and Manage Project with Ease</p>
                      <DynamicButton
                        className="read_more_btn"
                        onClick={createProject}
                      >
                        Click Here
                      </DynamicButton>
                    </div>
                  </div>
                </div>

                {/* Addon on 28 Sep */}
                <div className="solution_cards_box d-flex">
                  <div className="solution_card">
                    <div className="hover_color_bubble"></div>
                    <div className="so_top_icon">
                      <img
                        src="/assets/technician.png"
                        style={{ width: '50px' }}
                      />
                    </div>
                    <div className="solu_title">
                      <h3>Manage Technician</h3>
                    </div>
                    <div className="solu_description">
                      <p>• Manage Technician </p>
                      {/* <button type="button" className="read_more_btn" onClick={createCustomerHandler}>
                      Click Here
                    </button> */}
                      <DynamicButton
                        className="read_more_btn"
                        onClick={manageTechnicians}
                      ></DynamicButton>
                    </div>
                  </div>

                  <div className="solution_card">
                    <div className="hover_color_bubble"></div>
                    <div className="so_top_icon">
                      <img src="/assets/status.png" style={{ width: '50px' }} />
                    </div>
                    <div className="solu_title">
                      <h3>Manage Status</h3>
                    </div>
                    <div className="solu_description">
                      <p>• Approve or reject project time sheets and reports</p>
                      <button
                        type="button"
                        className="read_more_btn"
                        onClick={ManageProjectStatus}
                      >
                        Click Here!
                      </button>

                      {/* <button
                          type="button"
                          className="read_more_btn"
                          onClick={showNewProject}
                        >
                          show new project!
                        </button>

                        <button
                          type="button"
                          className="read_more_btn"
                          onClick={timeSheetHandler}
                        >
                          timeSheetHandler!
                        </button>

                        <button
                          type="button"
                          className="read_more_btn"
                          onClick={ManageMachineInfo}
                        >
                          ManageMachineInfo!
                        </button>

                        <button
                          type="button"
                          className="read_more_btn"
                          onClick={ManageCustomerInfo}
                        >
                          ManageCustomerInfo!
                        </button>

                        <button
                          type="button"
                          className="read_more_btn"
                          onClick={AssignTechnician}
                        >
                          AssignTechnician!
                        </button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
