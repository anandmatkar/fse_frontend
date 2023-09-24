
import React, { useState, useEffect } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify"; // Import the toast function and CSS

function TimesheetScreen() {
  const [timesheetEntries, setTimesheetEntries] = useState([]);

  useEffect(() => {
    // Fetch data from Firebase API
    fetch("http://localhost:3003/api/v1/technician/timesheetList?projectId=08e2d3fc-a0a0-4446-840c-9c529f748267")
      .then((response) => response.json())
      .then((data) => {
        // Convert the response data into an array of entries
        const entries = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setTimesheetEntries(entries);
      })
      .catch((error) => {
        console.error("Error fetching timesheet data:", error);
      });
  }, []); // Empty dependency array ensures the effect runs only once

  const deleteTimesheetEntry = (id) => {
    // Delete the entry from the Firebase API
    fetch(`http://localhost:3003/api/v1/technician/deleteTimesheet?projectId=08e2d3fc-a0a0-4446-840c-9c529f748267`, {
      method: "DELETE",
    })
      .then(() => {
        // Update the local state by removing the deleted entry
        const updatedEntries = timesheetEntries.filter((entry) => entry.id !== id);
        setTimesheetEntries(updatedEntries);
      })
      .catch((error) => {
        console.error("Error deleting timesheet entry:", error);
      });
  };

  const approveTimesheetEntry = (id) => {
    // Send the entry to the approved timesheet API endpoint
    fetch("http://localhost:3003/api/v1/manager/acceptTimesheetRequest?projectId=08e2d3fc-a0a0-4446-840c-9c529f748267&techId=27d5039b-f3c5-44a1-95c1-3ecc12c2e836", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(timesheetEntries.find((entry) => entry.id === id)),
    })
      .then(() => {
        // Display a success toast message
        toast.success("Timesheet entry has been approved!");
      })
      .catch((error) => {
        console.error("Error approving timesheet entry:", error);
      });
  };

  return (
    <div className="timesheet-screen">
      <div className="table-container">
        <MDBTable hover>
          <MDBTableHead>
            <tr>
              <th scope="col">Technician Name</th>
              <th scope="col">Date</th>
              <th scope="col">Starting Time</th>
              <th scope="col">Ending Time</th>
              <th scope="col">Comments</th>
              <th scope="col">Edit</th>
              <th scope="col">View</th>
              <th scope="col">Delete</th>
              <th scope="col">Permission</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {timesheetEntries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.name}</td>
                <td>{entry.date}</td>
                <td>{entry.startTime}</td>
                <td>{entry.endTime}</td>
                <td>{entry.comments}</td>
                <td>
                  <button className="btn btn-success edit-button">Edit</button>
                </td>
                <td>
                  <button className="btn btn-success edit-button">View</button>
                </td>
                <td>
                  <button
                    className="btn btn-danger delete-button"
                    onClick={() => deleteTimesheetEntry(entry.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-success edit-button"
                    onClick={() => approveTimesheetEntry(entry.id)}
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </div>
    </div>
  );
}

export default TimesheetScreen;


