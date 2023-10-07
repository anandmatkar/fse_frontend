import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
const TimeSheetForApproved = () => {
  const { techId, projectId } = useParams();
  const [technicianData, setTechnicianData] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(
        `/api/v1/manager/timesheetDetails?techId=${techId}&projectId=${projectId}`,
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
        `http://localhost:3003/api/v1/manager/acceptTimesheetRequest?projectId=${projectId}&techId=${techId}`,
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
  return (
    <div>
      <div>
        <h2>Time Sheet Details</h2>
        {loading ? ( // Display a loading message while data is being fetched
          <p>Loading technician details...</p>
        ) : technicianData.length === 0 ? ( // Display a message if no data is available
          <p>No technician details found.</p>
        ) : (
          <table className="table">
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
              {technicianData.map((entry) => (
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
          </table>
        )}
      </div>
      <div className="d-flex float-end mt-3 p-2">{renderApprovalButton()} </div>
    </div>
  );
};
export default TimeSheetForApproved;