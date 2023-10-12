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
    <Container className="container-xxl py-5 mt-5">
    <div className="text-center mb-5">
                    <h6 className="section-title bg-white text-center text-primary px-3">Dashboard</h6>
                    <h1>Your Requet Overview</h1>
                </div>
      <Container>
      <Row xs={1} lg={3} className="g-4">
      <Col lg={6} sm={12} className="wow fadeInUp" data-wow-delay="0.1s" >
      <Card className="service-item rounded pt-3"> 
        <Card.Body>
        {/* <i className="fa fa-3x fa-hotel text-primary mb-4"></i> */}
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
          {/* <i className="fa fa-3x fa-globe text-primary mb-4"></i> */}
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
