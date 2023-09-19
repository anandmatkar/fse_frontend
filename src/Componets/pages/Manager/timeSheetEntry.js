import React from 'react';
import './TimesheetEntry.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function TimesheetEntry({ entry, onDelete }) {
  return (
    <div className="timesheet-entry">
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th>Date</th>
            <td>{entry.date}</td>
          </tr>
          <tr>
            <th>Start Time</th>
            <td>{entry.startTime}</td>
          </tr>
          <tr>
            <th>End Time</th>
            <td>{entry.endTime}</td>
          </tr>
          <tr>
            <th>Comments</th>
            <td>{entry.comments}</td>
          </tr>
        </tbody>
      </table>
      <button className="btn btn-danger delete-button" onClick={onDelete}>
        Delete
      </button>
      <button className="btn btn-danger delete-button" onClick={onDelete}>
        Edit
      </button>
    </div>
  );
}

export default TimesheetEntry;
