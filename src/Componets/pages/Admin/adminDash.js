import React, { useState } from "react";
import DynamicButton from "../../Model/DynamicButton";
import { Button,Container,Dropdown,Row, Card ,Col} from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { NavLink, Link } from "react-router-dom";
import AdminDashboardNavbar from "../../NavBar/AdminDashboardNavbar";
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
    <React.Fragment>
      <AdminDashboardNavbar/>
      <Container className="container-xxl py-5">
        <Container>
        <Row xs={1} lg={3} className="g-4">
        <Col lg={6} sm={12} className="wow fadeInUp" data-wow-delay="0.1s" >
        <Card className="service-item rounded pt-3"> 
          <Card.Body>
                  <i className="fa fa-3x fa-globe text-primary mb-4"src="https://img.freepik.com/free-vector/man-search-hiring-job-online-from-laptop_1150-52728.jpg?w=1380&t=st=1696506931~exp=1696507531~hmac=50499c7a5872e2fc93126b4f2534b7087d0d95d84897b3f64be8542e79e484a6" alt="random image" ></i>
              <Card.Title><h3 className="Admindashboard-h3">Accounts Registered !</h3></Card.Title>  
                  <h1 className="Admindashboard-h1"></h1>
                  <Card.Text><p className="Admindashboard-p">View Registered Accounts of Managers !</p></Card.Text>  
                  <Button onClick={handleRegisteredAccountsClick}>Click Here !!</Button>
          </Card.Body>
          
          </Card>
        </Col>
         
        <Col lg={6} sm={12} className="wow fadeInUp" data-wow-delay="0.3s">
        <Card  className="service-item rounded pt-3">
            <Card.Body>
                            <i className="fa fa-3x fa-globe text-primary mb-4" src="https://img.freepik.com/free-vector/elegant-businessman-waiting-room_24877-57777.jpg?size=626&ext=jpg&ga=GA1.1.1085728591.1696533906&semt=ais" alt="random image" ></i>
                        <Card.Title>   <h3 className="Admindashboard-h3">Account Waiting Approval !</h3></Card.Title>
                        <Card.Text> <p className="Admindashboard-p">View Waiting for Approval Accounts of Managers !</p></Card.Text> 
                            <Button onClick={handleAccountsApprovalClick}>Click Here
                            !!</Button>
            </Card.Body>
        
          </Card>
        </Col>
         
         

         
        </Row>
        </Container>
       
     
      </Container>
      
 </React.Fragment>
  );
}

export default AdminDashboard;
