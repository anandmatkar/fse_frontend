import React from "react";
import LayoutTech from "../../Layout/Layout3";
import classes from "./techdashboard.module.css"
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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
        <LayoutTech>
            <div className={classes.cardContainer}>
              <div className={classes.card1}>
                <div className={classes.cardBody}>
                  <div className={classes.cardTitle}>Job Assign</div>
                  <div className={classes.cardText}>View your Assign Project, you can find more details here.</div>
                  <button className={classes.cardButton} onClick={JobAssigned} >click Here</button>
                </div>
              </div>
              <div className={classes.card2}>
                <div className={classes.cardBody}>
                  <div className={classes.cardTitle}>Job waiting Approval</div>
                  <div className={classes.cardText}>View Jobs Waiting for Approval,you can see more details here.</div>
                  <button className={classes.cardButton} onClick={JobEWaitingAprroval}>Click Here</button>
                </div>
              </div>
              <div className={classes.card3}>
                <div className={classes.cardBody}>
                  <div className={classes.cardTitle}>Job Closed</div>
                  <div className={classes.cardText}>View job which are closed, you can see more details here.</div>
                  <Button variant='Danger' className={classes.cardButton} onClick={JobClosed}>Click Here</Button>
                </div>
              </div>
            </div>
            </LayoutTech>
          );
}


export default TechnicianDashboard;