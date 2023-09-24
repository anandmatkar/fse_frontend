import React, { useState, useEffect } from "react";
import axios from "axios";
import './viewProjectDetails.css'
import Spinner from "../Common/Spinner";

function ProjectList() {
  const [projectData, setProjectData] = useState({
    completedProjects: [],
    projectInProgress: [],
    projectRequestedForApproval: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch project data from the API
    setIsLoading(true)
    axios
      .get("http://localhost:3003/api/v1/manager/projectList")
      .then((response) => {
        setProjectData(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching project data:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="project-list">
      <h1>Manager Project List</h1>

      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div>
          <h2>Completed Projects</h2>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer ID</th>
                <th>Project Type</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Created At</th>
                <th>Request for Approval</th>
                <th>Completed</th>
                <th>Manager ID</th>
              </tr>
            </thead>
            

            <tbody>
              {projectData.completedProjects.map((project) => (
                <tr key={project.id}>
                  <td>{project.order_id}</td>
                  <td>{project.customer_id}</td>
                  <td>{project.project_type}</td>
                  <td>{project.description}</td>
                  <td>{project.start_date}</td>
                  <td>{project.end_date}</td>
                  <td>{project.created_at}</td>
                  <td>{project.is_requested_for_approval.toString()}</td>
                  <td>{project.is_completed.toString()}</td>
                  <td>{project.manager_id}</td>
                </tr>
              ))}
            </tbody>
            </table>

            <h2> Projects in progress</h2>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer ID</th>
                <th>Project Type</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Created At</th>
                <th>Request for Approval</th>
                <th>Completed</th>
                <th>Manager ID</th>
              </tr>
            </thead>
            <tbody>
              {projectData.projectInProgress.map((project) => (
                <tr key={project.id}>
                  <td>{project.order_id}</td>
                  <td>{project.customer_id}</td>
                  <td>{project.project_type}</td>
                  <td>{project.description}</td>
                  <td>{project.start_date}</td>
                  <td>{project.end_date}</td>
                  <td>{project.created_at}</td>
                  <td>{project.is_requested_for_approval.toString()}</td>
                  <td>{project.is_completed.toString()}</td>
                  <td>{project.manager_id}</td>
                </tr>
              ))}
            </tbody>
            </table>

            <h2> Projects request for approval</h2>   
           <table>
           <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer ID</th>
                <th>Project Type</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Created At</th>
                <th>Request for Approval</th>
                <th>Completed</th>
                <th>Manager ID</th>
              </tr>
            </thead>
           <tbody>
              {projectData.projectRequestedForApproval.map((project) => (
                <tr key={project.id}>
                  <td>{project.order_id}</td>
                  <td>{project.customer_id}</td>
                  <td>{project.project_type}</td>
                  <td>{project.description}</td>
                  <td>{project.start_date}</td>
                  <td>{project.end_date}</td>
                  <td>{project.created_at}</td>
                  <td>{project.is_requested_for_approval.toString()}</td>
                  <td>{project.is_completed.toString()}</td>
                  <td>{project.manager_id}</td>
                </tr>
              ))}
            </tbody>
           </table>
        </div>
      )}
    </div>
  );
}

export default ProjectList;
