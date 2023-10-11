import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, FormControl, Container } from 'react-bootstrap';
import NavbarManagerDashboard from '../../NavBar/navbarManagerDashboard';
import { Manager_Base_Url } from '../../../Api/Manager_Api';

function ProjectReportData() {
  const { techId, projectId } = useParams();
  const [technicianData, setTechnicianData] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Add loading state
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(
        `${Manager_Base_Url}reportDetails?techId=${techId}&projectId=${projectId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setTechnicianData(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [techId, projectId]);

  const renderApprovalButton = () => {
    // Check if any timesheet in the data has "is_timesheet_requested_for_approval" set to true
    if (technicianData.some((entry) => entry.is_requested_for_approval)) {
      return (
        <button className="btn btn-success" onClick={handleApprovedButtonClick}>
          Approve Project Report
        </button>
      );
    }
    return null;
  };

  const handleApprovedButtonClick = async () => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(
        `${Manager_Base_Url}validateReport?projectId=${projectId}&techId=${techId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      fetchData();
      navigate('/projectprogress');
    } catch (error) {
      console.error('Error accepting timesheet request:', error);
    }
  };

  // Filter data based on the search input
  const filteredCustomers = technicianData.filter((entry) =>
    entry.description.toLowerCase().includes(search.toLowerCase())
  );

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <li key={i} className={`dt-item ${currentPage === i ? 'active' : ''}`}>
          <button className="dt-link" onClick={() => setCurrentPage(i)}>
            {i}
          </button>
        </li>
      );
    }
    return buttons;
  };

  const renderCustomerRows = () => {
    if (currentCustomers.length === 0) {
      return (
        <tr>
          <td colSpan="11" className="text-center">
            No data found
          </td>
        </tr>
      );
    }

    return (
      <tbody>
        {currentCustomers.map((entry) => (
          <tr key={entry.id}>
            <td>{entry.date}</td>
            <td>{entry.description}</td>
            <td>
              {entry.project_documents.length > 0
                ? entry.project_documents.map((attachment) => (
                    <a
                      key={attachment.id}
                      href={attachment.file_path}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i
                        className="fa fa-cloud-download"
                        style={{ fontSize: '20px' }}
                      ></i>{' '}
                    </a>
                  ))
                : 'No attachments'}
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <>
      <NavbarManagerDashboard />
      <div className="jobcontainer container mt-5">
        <h1 className="jobassigntext mb-4">Project Report Data</h1>
        <div className="card">
          <FormControl
            type="text"
            className="mb-3"
            placeholder="Search by Description..."
            onChange={(e) => {
              console.log('Search input:', e.target.value);
              setSearch(e.target.value);
            }}
            style={{ width: '25%', border: '1px solid black', float: 'right' }}
          />

          <div className="card-body">
            <div className="bf-table-responsive">
              <Container fluid>
                <Table responsive hover className="bf-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Attachments</th>
                    </tr>
                  </thead>
                  {renderCustomerRows()}
                </Table>
              </Container>
            </div>
          </div>
          <nav className="dt-pagination">
            <ul className="dt-pagination-ul">
              <li className={`dt-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  className="dt-link"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Prev
                </button>
              </li>
              {renderPaginationButtons()}
              <li
                className={`dt-item ${
                  currentPage === totalPages ? 'disabled' : ''
                }`}
              >
                <button
                  className="dt-link"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default ProjectReportData;
