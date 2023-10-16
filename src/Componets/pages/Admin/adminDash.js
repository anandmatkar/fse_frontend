import React, { useState,useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import AdminDashboardNavbar from "../../NavBar/AdminDashboardNavbar";
import { Base_Url } from "../../../Api/Base_Url";
import { useNavigate } from "react-router-dom";
import "./AdminDasboard.css";
import classes from "../Teachnician/techdashboard.module.css";
import axios from "axios";
import Cookies from "js-cookie";


function AdminDashboard() {
  const Navigate = useNavigate();
  const [numberOfAccounts, setNumberOfAccounts] = useState(0); // initialize to 0

  useEffect(() => {
    const token = Cookies.get('token');
    axios.get(`${Base_Url}api/v1/companyAdmin/waitingManagerCount`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        }
    })
    .then(response => {
        if (response.data.success) {
            setNumberOfAccounts(response.data.data[0].count);
        }
    })
    .catch(error => {
        console.error("Error fetching the waiting managers count:", error);
    });
}, []);

  const handleRegisteredAccountsClick = () => {
      Navigate("/registerdaccount");
  };

  const handleAccountsApprovalClick = () => {
      Navigate("/AccountWA");
  };


  return (
    <React.Fragment>
    <AdminDashboardNavbar/>
    <Container className="container-xxl">
      
    <div className="text-center my-5">
                    <h6 className="section-title bg-white text-center text-primary px-3">Admin Dashboard</h6>
                    <h1>Your Request Overview</h1>
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
       
      <Col lg={6} sm={12} className="wow fadeInUp" data-wow-delay="0.3s" >
      <Card  className="service-item rounded pt-3 position-relative">
          <Card.Body>
          <Badge 
                        pill 
                        variant="danger" 
                        className={`position-absolute ${classes.badgePosition}`}>
                        {numberOfAccounts}
                    </Badge>
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
