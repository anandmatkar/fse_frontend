import React from "react";
import Layout4 from "../../Layout/Layout4";
import classes from "./techdashboard.module.css"
import './techdashboard.css'
import { Button } from "react-bootstrap";
import {  useNavigate } from "react-router-dom";
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
      
      

    return(
      <Layout4>

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
  </Layout4>
          );
}


export default TechnicianDashboard;