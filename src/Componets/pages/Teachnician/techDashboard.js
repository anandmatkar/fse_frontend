import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Card, Badge, Table } from "react-bootstrap";
import Layout4 from "../../Layout/Layout4";
import classes from "./techdashboard.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";
import { Technician_Assigned_Projects } from "../../../Api/Technicians_Api";
import PageSpinner from "../Common/PageSpinner";

function TechnicianDashboard() {
  const navigate = useNavigate();

  const tableHeads = ['Order ID', 'Customer Name', 'Country', 'Start Date', 'End Date', 'View', 'Status'];

  const [ assignedProjectList, setAssignedProjectList ] = useState([]);
  const [ isFetchingProjectList, setIsFetchingProjectList ] = useState(false);

  const fetchAssignedProjectList = async () => {
    try {
        setIsFetchingProjectList(true);

        let token = Cookies.get("token");
      
      if (!token) {
        toast.error("Token not found in Cookies. Session Timeout Please Login Again.");
        return;
      }
      const config = {
        headers: {
          Authorization: token,
        },
      };

    let response = await axios.get(Technician_Assigned_Projects, config);

    console.log(response.data.data);

    if(response.data.status === 200) {
        setAssignedProjectList(response.data.data);
        setIsFetchingProjectList(false);
    } else {
        toast.error(response.data.message);
        setIsFetchingProjectList(false);
    }
                
    } catch (error) {
        toast.error(error.message);
        setIsFetchingProjectList(false);        
    } finally {
        setIsFetchingProjectList(false);
    };
  };

  useEffect(() => {
    fetchAssignedProjectList()
  }, []);
  
  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role"); // Assuming 'role' is the name of the cookie storing the role
    // Function to block back navigation
    const blockBackNavigation = (e) => {
      e.preventDefault();
      // Resetting the state to prevent going back
      window.history.pushState(null, null, window.location.pathname);
    };

    // If token and role are present, block the back navigation
    if (token && role) {
      // Push a new entry to history stack
      window.history.pushState(null, null, window.location.pathname);

      // Add a popstate listener
      window.addEventListener("popstate", blockBackNavigation);
    }

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("popstate", blockBackNavigation);
    };
  }, []);

  return (
    <Layout4>
      <Container className="container-xxl py-5">
        <div className="text-center mb-5">
          <h6 className="section-title bg-white text-center text-primary px-3">
            Technician's Dashboard
          </h6>
          <h1>Your Tasks Overview</h1>
        </div>

        {
            isFetchingProjectList ? 
            <PageSpinner/> :
            <Container>
                <Row>
                    <Table responsive hover>
                    <thead>
                        <tr>
                        {tableHeads.map((heading) => (
                            <th>{heading}</th>
                        ))}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            assignedProjectList.map((assignedProject) => (
                                <tr>
                                    <td>{assignedProject.order_id}</td>
                                    <td>{assignedProject.customer_name}</td>
                                    <td>{assignedProject.country}</td>
                                    <td>{assignedProject.start_date}</td>
                                    <td>{assignedProject.end_date}</td>
                                    <td>
                                        <Button variant="secondary" size="sm" as={NavLink} to={`/technicianProjectDetails/${assignedProject.project_id}`}>Details</Button>
                                    </td>
                                    <td>
                                        {
                                            (!assignedProject.is_completed &&
                                            !assignedProject.is_requested_for_approval) ?
                                                <Button variant="primary" size="sm" className='w-100'>In Progress</Button> :
                                            (assignedProject.is_completed) ?
                                                <Button variant="success" size="sm" className='w-100'>Completed</Button> :
                                            (assignedProject.is_requested_for_approval) ?
                                                <Button variant="warning" size="sm" className='w-100'>Waiting</Button> :
                                            <></>
                                        }
                                    </td>

                                </tr>
                            ))
                        }
                    </tbody>
                    </Table>
                </Row>
            </Container>
        }
      </Container>
    </Layout4>
  );
}

export default TechnicianDashboard;
