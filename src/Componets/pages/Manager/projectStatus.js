import React from 'react';
import classes from './ProjectStatusss.module.css'; // Import the CSS module
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ProjectStatus() {
  const Navigate = useNavigate();
  const progrssHandler = () => {
    console.log('Successfully Updated');
    Navigate('/projectprogress');
  };
  const progrssHandlerM = () => {
    console.log('Successfully Updated');
    Navigate('/projectRequestedForApproval');
  };

  return (
    <div className={classes.cardContainer}>
      <div className={classes.card1}>
        <div className={classes.cardBody}>
          <div className={classes.cardTitle}>Project in Progress</div>
          <div className={classes.cardText}>
            Project in Progress, you can find more details here.
          </div>
          <button className={classes.cardButton} onClick={progrssHandler}>
            click Here
          </button>
        </div>
      </div>
      <div className={classes.card2}>
        <div className={classes.cardBody}>
          <div className={classes.cardTitle}>Project Waiting for Approval</div>
          <div className={classes.cardText}>
            Project for Approval, you can see more details here.
          </div>
          <button className={classes.cardButton} onClick={progrssHandlerM}>
            Click Here
          </button>
        </div>
      </div>
      <div className={classes.card3}>
        <div className={classes.cardBody}>
          <div className={classes.cardTitle}>Finished Project</div>
          <div className={classes.cardText}>
            Finished Project, you can see more details here. Ples click Here
          </div>
          <Button variant="Danger" className={classes.cardButton}>
            Click Here
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProjectStatus;
