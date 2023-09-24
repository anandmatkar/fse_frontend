import React, { useState } from "react";
import Layout from "../../Layout/Layout";
import DynamicButton from "../../Model/DynamicButton";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function AdminDashboard() {
    const [numberOfAccounts,setnumberOfAccounts] = useState(13)
    const navigate = useNavigate(); // Initialize useNavigate


      // Function to handle the click event for Registered accounts
  const handleRegisteredAccountsClick = () => {
    // Redirect to the "Registered Account" page when the button is clicked
    navigate("/registerdaccount"); // Use the route path
  };

    // Function to handle the click event
    const handleAccountsApprovalClick = () => {
      // Redirect to the desired page when the button is clicked
      navigate("/AccountWA"); // Use the route path
    };

  return (
    <Layout>
      <div className="imgBg">
        {/* <br /> 
      <br />
      <br /> */}

        <div className="section_our_solution">
          <div className="row">
            <div className="col-lg-10 col-md-11 col-sm-11">
              <div className="our_solution_category">
                <div className="solution_cards_box">
                  <div className="solution_card">
                    <div className="hover_color_bubble"></div>
                    <div className="so_top_icon">
                      <svg
                        id="Layer_1"
                        enable-background="new 0 0 512 512"
                        height="40"
                        viewBox="0 0 512 512"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <img
                          src="https://pluspng.com/img-png/user-png-icon-young-user-icon-2400.png"
                          alt="User Icon"
                          height="40"
                        />
                      </svg>
                    </div>
                    <div className="solu_title">
                      <h3>Registered accounts</h3>
                    </div>
                    <div className="solu_description">
                      <p>• Accounts which are Registered are Shown Here!</p>
                      <DynamicButton className="read_more_btn" onClick={handleRegisteredAccountsClick}  ></DynamicButton>
                      <Button variant="danger" className="read_more_btn">{numberOfAccounts}</Button>
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
                      <h3>Accounts WAITING APPROVAL</h3>
                    </div>
                    <div className="solu_description">
                      <p>• Account WAITING for APPROVAL are Shown Here!</p>
                      <DynamicButton className="read_more_btn" onClick={handleAccountsApprovalClick}>
                        Click Here
                      </DynamicButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
