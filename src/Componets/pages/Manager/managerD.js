import React from 'react';
import './managerD.css';
//import LayoutManager from '../../Layout/Layout2';
// import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DynamicButton from '../../Model/DynamicButton';
import NavbarManager from './Navbar';

export default function ManagerDashboard() {
  const navigate = useNavigate();
  const createCustomerHandler = () => {
    navigate('/createCustomer');
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
      <div className="imgBg">
        <br />
        <br />
        <br />

        <div className="section_our_solution">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="our_solution_category">

                <div className="solution_cards_box">
                  <div className="solution_card">
                    <div className="hover_color_bubble"></div>
                    <div className="so_top_icon">
                      <svg
                        id="Layer_1"
                        enable-background="new 0 0 512 512"
                        height="50"
                        viewBox="0 0 512 512"
                        width="40"
                        xmlns="http://www.w3.org/2000/svg"
                      ></svg>
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
                      <svg
                        id="Layer_1"
                        enable-background="new 0 0 512 512"
                        height="50"
                        viewBox="0 0 512 512"
                        width="40"
                        xmlns="http://www.w3.org/2000/svg"
                      ></svg>
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
                <div className="solution_cards_box">
                  <div className="solution_card">
                    <div className="hover_color_bubble"></div>
                    <div className="so_top_icon">
                      <svg
                        id="Layer_1"
                        enable-background="new 0 0 512 512"
                        height="50"
                        viewBox="0 0 512 512"
                        width="40"
                        xmlns="http://www.w3.org/2000/svg"
                      ></svg>
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

                  {/* <div className="solution_card">
                    <div className="hover_color_bubble"></div>
                    <div className="so_top_icon">
                      <svg
                        id="Layer_1"
                        enable-background="new 0 0 512 512"
                        height="50"
                        viewBox="0 0 512 512"
                        width="40"
                        xmlns="http://www.w3.org/2000/svg"
                      ></svg>
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
                  </div> */}
                </div>

                <div className="solution_cards_box sol_card_top_3">
                  <div className="solution_card">
                    <div className="hover_color_bubble"></div>
                    <div className="so_top_icon">
                      <svg
                        id="Layer_1"
                        enable-background="new 0 0 512 512"
                        height="50"
                        viewBox="0 0 512 512"
                        width="40"
                        xmlns="http://www.w3.org/2000/svg"
                      ></svg>
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

                      <button
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
                      </button>
                    </div>
                  </div>
                </div>

                {/* <div className="solution_cards_box sol_card_top_3">
                  <div className="solution_card">
                    <div className="hover_color_bubble"></div>
                    <div className="so_top_icon">
                      <svg
                        id="Layer_1"
                        enable-background="new 0 0 512 512"
                        height="50"
                        viewBox="0 0 512 512"
                        width="40"
                        xmlns="http://www.w3.org/2000/svg"
                      ></svg>
                    </div>
                    <div className="solu_title">
                      <h3>Manage Technician</h3>
                    </div>
                    <div className="solu_description">
                      <p>• Manage Technician</p>
                      <button
                        type="button"
                        className="read_more_btn"
                        onClick={ManageProjectStatus}
                      >
                        Click Here!
                      </button>

                    </div>
                  </div>
                </div> */}

                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
