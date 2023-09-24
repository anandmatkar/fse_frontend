import React from "react";
import LayoutTech from "../../Layout/Layout3";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import classes from  "./timeSheetShow.module.css";

function TimeSheetsAndReports(){
    const Navigate = useNavigate();
    const progrssHandler = () => {
        Navigate("/timeSheetss")
        console.log("Successfully Updated");
       
    }
    return(
             <LayoutTech>
            <div className={classes.cardContainer}>
              <div className={classes.card1}>
                <div className={classes.cardBody}>
                  <div className={classes.cardTitle}>Create TimeSheets</div>
                  <div className={classes.cardText}>Create Assign Project, you can find more details here.</div>
                  <Link to={"timeSheetss"}>
                  <button className={classes.cardButton} onClick={progrssHandler}>click Here</button>
                  </Link>
                </div>
              </div>
              <div className={classes.card2}>
                <div className={classes.cardBody}>
                  <div className={classes.cardTitle}>View project details,</div>
                  <div className={classes.cardText}>View project details, including customer and machine information</div>
                  <button className={classes.cardButton}>Click Here</button>
                </div>
              </div>
              <div className={classes.card3}>
                <div className={classes.cardBody}>
                  <div className={classes.cardTitle}>TimeSheets And Reports</div>
                  <div className={classes.cardText}>Submit and Edit your TimeSheets and Reports, you can see more details here.</div>
                  <Button variant='Danger' className={classes.cardButton}>Click Here</Button>
                </div>
              </div>
            </div>
            </LayoutTech>

    )
}


export default TimeSheetsAndReports;