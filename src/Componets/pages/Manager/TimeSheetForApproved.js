import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BsFillFileEarmarkPostFill } from 'react-icons/bs';
import { Table, Container } from 'react-bootstrap';
import NavbarManagerDashboard from '../../NavBar/navbarManagerDashboard';
import { Manager_Base_Url } from '../../../Api/Manager_Api';

const TimeSheetForApproved = () => {
  const { techId, projectId } = useParams();
  const [technicianData, setTechnicianData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(
        `${Manager_Base_Url}timesheetDetails?techId=${techId}&projectId=${projectId}`,
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

  // Calculate the total number of pages based on the number of items and items per page
  const totalPages = Math.ceil(technicianData.length / itemsPerPage);

  const renderApprovalButton = () => {
    if (
      technicianData.some((entry) => entry.is_timesheet_requested_for_approval)
    ) {
      return (
        <button className="btn btn-success" onClick={handleApprovedButtonClick}>
          Approve Timesheet
        </button>
      );
    }
    return null;
  };

  const handleApprovedButtonClick = async () => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(
        `${Manager_Base_Url}acceptTimesheetRequest?projectId=${projectId}&techId=${techId}`,
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
      navigate('/projectStatus');
    } catch (error) {
      console.error('Error accepting timesheet request:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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

  return (
    <>
      <NavbarManagerDashboard />
      <div className="jobcontainer container mt-5">
        <h1 className="jobassigntext mb-4">Time Sheet</h1>
        <div className="card">
          {loading ? (
            <p>Loading technician details...</p>
          ) : technicianData.length === 0 ? (
            <p>No technician details found.</p>
          ) : (
            <div className="card-body">
              <div className="bf-table-responsive">
                <Container fluid>
                  <Table responsive hover className="bf-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Comments</th>
                        <th>Attachments</th>
                      </tr>
                    </thead>
                    <tbody>
                      {technicianData
                        .slice(
                          (currentPage - 1) * itemsPerPage,
                          currentPage * itemsPerPage
                        )
                        .map((entry) => (
                          <tr key={entry.id}>
                            <td>{entry.date}</td>
                            <td>{entry.start_time}</td>
                            <td>{entry.end_time}</td>
                            <td>{entry.comments}</td>
                            <td>
                              {entry.timesheet_attach.length > 0
                                ? entry.timesheet_attach.map((attachment) => (
                                    <a
                                      key={attachment.id}
                                      href={attachment.file_path}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <BsFillFileEarmarkPostFill className="fs-3"></BsFillFileEarmarkPostFill>{' '}
                                    </a>
                                  ))
                                : 'No attachments'}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </Container>
              </div>
              <div className="d-flex float-end mt-3 p-2">
                {renderApprovalButton()}{' '}
              </div>
            </div>
          )}
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
};

export default TimeSheetForApproved;
