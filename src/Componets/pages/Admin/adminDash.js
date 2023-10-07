import React, { useState } from "react";
import Layout from "../../Layout/Layout";
import DynamicButton from "../../Model/DynamicButton";
import { Button,Dropdown,} from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { NavLink, Link } from "react-router-dom";
import "./AdminDasboard.css";
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
      {/* <div className="imgBg"> */}
        {/* <br /> 
      <br />
      <br /> */}

        {/* <div className="section_our_solution">
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
      </div> */}
      
      <div className='Admindashboard-bodynew'>
          <div className="Admindashboard-blog_post">
              <div className="Admindashboard-img_pod">
                  <img className="Admindashboard-img" src="https://img.freepik.com/free-vector/man-search-hiring-job-online-from-laptop_1150-52728.jpg?w=1380&t=st=1696506931~exp=1696507531~hmac=50499c7a5872e2fc93126b4f2534b7087d0d95d84897b3f64be8542e79e484a6" alt="random image" />
              </div>
              <div className="Admindashboard-container_copy">
                  <h3 className="Admindashboard-h3">Accounts Registered !</h3>
                  <h1 className="Admindashboard-h1"></h1>
                  <p className="Admindashboard-p">View Registered Accounts of Managers !</p>
                  <Button onClick={handleRegisteredAccountsClick}>Click Here !!</Button>
              </div>
          </div>

          <div className="Admindashboard-blog_post">
              <div className="Admindashboard-img_pod">
                  <img className="Admindashboard-img" src="https://img.freepik.com/free-vector/elegant-businessman-waiting-room_24877-57777.jpg?size=626&ext=jpg&ga=GA1.1.1085728591.1696533906&semt=ais" alt="random image" />
              </div>
              <div className="Admindashboard-container_copy">
                  <h3 className="Admindashboard-h3">Account Waiting Approval !</h3>
                  <p className="Admindashboard-p">View Waiting for Approval Accounts of Managers !</p>
                  <Button onClick={handleAccountsApprovalClick}>Click Here !!</Button>
              </div>
          </div>

         
      </div>
    </Layout>
  );
}

export default AdminDashboard;
