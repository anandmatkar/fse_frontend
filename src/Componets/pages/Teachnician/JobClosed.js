import React,{useState , useEffect} from "react";
import { Table, Container, Button } from 'react-bootstrap';
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import { Technician_ProjectList } from "../../../Api/Technicians_Api";

function JobClosed() {
  const [projectList, setProjectList] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredProjects = projectList.filter(project =>
    project.project_type.toLowerCase().includes(search.toLowerCase())
  );

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentProjects = filteredProjects.slice(firstIndex, lastIndex);
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);

  useEffect(() => {
    // Fetch data from the API endpoint
    const token = Cookies.get('token');
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token, // Assuming you use Bearer token format
      },
    };
    fetch(`${Technician_ProjectList}`, axiosConfig)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.data && Array.isArray(data.data.completedProject)) {
        setProjectList(data.data.completedProject);
      } else {
        console.error('API response is not in the expected format:', data);
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, []);

const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  return (
         <div class="container mt-5">
	<h1 className="jobassigntext mb-4">Technician Job Completed </h1>
  <input
        type="text"
        className="form-control mb-4"
        placeholder="Search by Project Type..."
        onChange={e => setSearch(e.target.value)}
        style={{width:"25%" , border:"1px solid black",float:"inline-end",marginTop:"10px"}}
      />

{filteredProjects.length === 0 ? (
  <div className="text-center mt-5 fw-bold fs-3 text-capitalize">No data found</div>
      ) : (
        <div>
           <div className="card">
  <div className="card-body">
        <div className="bf-table-responsive">
        <Container fluid>
    <Table responsive hover className="bf-table">
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
      {currentProjects.map((project, index) => (
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
      <td><Link to={`/DetailsofJobClosed/${project.project_id}`}>
      <Button variant="primary" size="sm">
                                See details
                            </Button>
      </Link></td>
    </tr>
  ))}
</tbody>
		</Table>
    </Container>
    </div>
    </div>
    </div>
    <nav className="dt-pagination">
    <ul className="dt-pagination-ul">
        <li className={`dt-item ${currentPage === 1 ? 'disabled': ''}`}><button className="dt-link" onClick={() => setCurrentPage(currentPage - 1)}>Prev</button></li>
        {arrOfCurrButtons.map((data, index) => {
            return (
                <li key={index} className={`dt-item ${currentPage === data ? 'active' : ''}`}><button className="dt-link" onClick={() => setCurrentPage(data)}>{data}</button></li>
            )
        })}
        <li className={`dt-item ${currentPage === totalPages ? 'disabled': ''}`}><button className="dt-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button></li>
    </ul>
</nav>

	</div>
    )}
</div>
  );
}

export default JobClosed;