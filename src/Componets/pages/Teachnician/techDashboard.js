import React from "react";
import LayoutTech from "../../Layout/Layout3";
import classes from "./techdashboard.module.css"
import './techdashboard.css'
import { Button , Dropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function TechnicianDashboard() {
    const Navigate = useNavigate();

    const JobClosed = () => {
        Navigate("/JobClosed")
        console.log("Successfully Updated");
      };
      const JobAssigned = () => {
        Navigate("/JobAssigned")
        console.log("Successfully Updated");
      };
      const JobEWaitingAprroval = () => {
        Navigate("/JobApproval")
        console.log("Successfully Updated");
      };
      
      const handleLogout = async () => {
        const token = Cookies.get('token');
        console.log("Token from cookies:", token);
    
        try {
            const response = await fetch("http://localhost:3003/api/v1/technician/techLogout", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
    
            const responseData = await response.json(); // assuming server responds with json
            console.log("Server Response:", responseData);
    
            if (response.ok) {
                Cookies.remove('token');
                Navigate("/techlogin");
                console.log("successfully logout");
            } else {
                console.log("Logout failed.");
            }
        } catch (error) {
            console.error("There was an error logging out", error);
        }
    };

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
      <a
          href=""
          ref={ref}
          onClick={(e) => {
              e.preventDefault();
              onClick(e);
          }}
      >
          {children}
      </a>
  ));
    return(
      <LayoutTech>
      <Dropdown className="imgdropdown">
                <Dropdown.Toggle as={CustomToggle}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpFdo7jMQ4ZhDD1zqDdGGW0HjKNbV4iiOniQ&usqp=CAU" alt="Profile" style={{ width: '60px', borderRadius: '50%' }} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item as={NavLink} to="/updateTechnicianprofile">Show Profile</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
      <div className='techdashboard-bodynew'>
          <div className="techdashboard-blog_post">
              <div className="techdashboard-img_pod">
                  <img className="techdashboard-img" src="https://img.freepik.com/free-vector/man-search-hiring-job-online-from-laptop_1150-52728.jpg?w=1380&t=st=1696506931~exp=1696507531~hmac=50499c7a5872e2fc93126b4f2534b7087d0d95d84897b3f64be8542e79e484a6" alt="random image" />
              </div>
              <div className="techdashboard-container_copy">
                  <h3 className="techdashboard-h3">Job Assign</h3>
                  <h1 className="techdashboard-h1">View your Assign Project</h1>
                  <p className="techdashboard-p">View your Assign Project, you can find more details here.</p>
                  <button className={classes.cardButton} onClick={JobAssigned}>Click Here</button>
              </div>
          </div>

          <div className="techdashboard-blog_post">
              <div className="techdashboard-img_pod">
                  <img className="techdashboard-img" src="https://img.freepik.com/free-vector/elegant-businessman-waiting-room_24877-57777.jpg?size=626&ext=jpg&ga=GA1.1.1085728591.1696533906&semt=ais" alt="random image" />
              </div>
              <div className="techdashboard-container_copy">
                  <h3 className="techdashboard-h3">Job waiting Approval</h3>
                  <h1 className="techdashboard-h1">Jobs Waiting for Approval</h1>
                  <p className="techdashboard-p">View Jobs Waiting for Approval,you can see more details here.</p>
                  <button className={classes.cardButton} onClick={JobEWaitingAprroval}>Click Here</button>
              </div>
          </div>

          <div className="techdashboard-blog_post">
              <div className="techdashboard-img_pod">
                  <img className="techdashboard-img" src="https://img.freepik.com/free-vector/done-concept-illustration_114360-3060.jpg?size=626&ext=jpg&ga=GA1.2.1085728591.1696533906&semt=ais" alt="random image" />
              </div>
              <div className="techdashboard-container_copy">
                  <h3 className="techdashboard-h3">Job Closed</h3>
                  <h1 className="techdashboard-h1">View closed jobs</h1>
                  <p className="techdashboard-p">View job which are closed, you can see more details here.</p>
                  <Button variant='Danger' className={classes.cardButton} onClick={JobClosed}>Click Here</Button>
              </div>
          </div>
      </div>
  </LayoutTech>
          );
}


export default TechnicianDashboard;