import React,{useState , useEffect} from "react";
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
// import './JobAssigned.css'
function JobAssigned() {
  const [projectList, setProjectList] = useState([]);
  useEffect(() => {
    // Fetch data from the API endpoint
    const token = Cookies.get('token');
    const axiosConfig = { headers: {
        'Content-Type': 'application/json',
        Authorization: token, // Assuming you use Bearer token format
      },
    };
    fetch('/api/v1/technician/assignedProjectList', axiosConfig)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (Array.isArray(data.data.assignedProject)) {
        setProjectList(data.data.assignedProject);
      } else {
        console.error('API response is not in the expected format:', data);
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, []);

   return (
    <div>
          <div class="mt-3">
	<h1 className="text-center">Technician Job Assign </h1>
	<div class="bf-table-responsive bf-table-responsive--zebra">
		<table class="bf-table">
			{/* <caption>
				Caption goes here
			</caption> */}
			<thead>
				<tr>
					<th>Order ID</th>
					<th>Project Type</th>
					<th>Description</th>
					<th>Start Date</th>
					<th>End Date</th>
					<th>Customer Name</th>
					<th>Customer Contact</th>
					<th>Customer Account</th>
          <th>Email</th>
          <th>Phone No.</th>
          <th>Country</th>
          <th>City</th>
          <th>Address</th>
          <th>Scope of Work</th>
          <th>See details</th>
				</tr>
			</thead>
			<tbody>
      {projectList.length === 0 ? (
                <tr>
                  <td colSpan="15" className="text-center mt-5 fw-bold fs-3 text-capitalize">No data assigned</td>
                </tr>
              ) : ( projectList.map((project, index) => (
    <tr key={index}>
      <td>{project.order_id}</td>
      <td>{project.project_type}</td>
      <td>{project.description}</td>
      <td>{project.start_date}</td>
      <td>{project.end_date}</td>
      <td>{project.customer_name}</td>
      <td>{project.customer_contact}</td>
      <td>{project.customer_account}</td>
      <td>{project.email_address}</td>
      <td>{project.phone_number}</td>
      <td>{project.country}</td>
      <td>{project.city}</td>
      <td>{project.address}</td>
      <td>{project.scope_of_work}</td>
      <td>
        <Link to={`/DeatilsodJobAssign/${project.project_id}`} className="btn btn-primary">See details</Link></td>
    </tr>
  ))
  )}
</tbody>
		</table>
	</div>

</div>
    </div>
  );
}

export default JobAssigned;