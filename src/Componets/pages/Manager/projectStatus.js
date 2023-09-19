
// import Card from 'react-bootstrap/Card';
// import { Button } from 'react-bootstrap';

// function BgColorExample() {
//   return (
//     <>
//       {[
//         'Success',
//         'Danger',
//         'Warning',
//       ].map((variant) => (
//         <Card
//           bg={variant.toLowerCase()}
//           key={variant}
//           text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
//           style={{ width: '40rem' ,textAlign:"center"}}
//           className="mb-2"
//         >
//           <Card.Header>Header</Card.Header>
//           <Card.Body>
//             <Card.Title>{variant} Card Title </Card.Title>
//             <Card.Text>
//               Some quick example text to build on the card title and make up the
//               bulk of the card's content.
//             </Card.Text>
//             <Button variant="primary">Go somewhere</Button>
//           </Card.Body>
//         </Card>
//       ))}
//     </>
//   );
// }

// export default BgColorExample;
import React from 'react';
import classes from './ProjectStatusss.module.css'; // Import the CSS module
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ProjectStatus() {
  const Navigate = useNavigate()
  const progrssHandler = () => {

    console.log("Successfully Updated");
    Navigate("/projectprogress")
  };
  const progrssHandlerM = () => {

    console.log("Successfully Updated");
    Navigate("/WaitingAprroval")
  };

  return (
    <div className={classes.cardContainer}>
      <div className={classes.card1}>
        <div className={classes.cardBody}>
          <div className={classes.cardTitle}>Project in Progress</div>
          <div className={classes.cardText}>Project in Progress, you can find more details here.</div>
          <button className={classes.cardButton} onClick={progrssHandler}>click Here</button>
        </div>
      </div>
      <div className={classes.card2}>
        <div className={classes.cardBody}>
          <div className={classes.cardTitle}>Project Waiting for Approval</div>
          <div className={classes.cardText}>Project for Approval, you can see more details here.</div>
          <button className={classes.cardButton} onClick={progrssHandlerM}>Click Here</button>
        </div>
      </div>
      <div className={classes.card3}>
        <div className={classes.cardBody}>
          <div className={classes.cardTitle}>Finished Project</div>
          <div className={classes.cardText}>Finished Project, you can see more details here. Ples click Here</div>
          <Button variant='Danger' className={classes.cardButton}>Click Here</Button>
        </div>
      </div>
    </div>
  );
}

export default ProjectStatus;

