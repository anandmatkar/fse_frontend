
import React, { useState } from 'react';
import './TechnicianTable.css';


function TechnicianTable() {
  const [technicians, setTechnicians] = useState([
    { name: 'kylie', age: 28, speciality: 'Drill Machine', experience: '2 years', assigned: false },
    { name: 'kendall', age: 30, speciality: 'Jaw Drop Machine', experience: '5 years', assigned: false },
    { name: 'kourtney', age: 35, speciality: 'ChainSaw Machine', experience: '3 years', assigned: false },
  ]);

  // State to hold the selected project ID
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const handleAssign = (index) => {
    const updatedTechnicians = [...technicians];
    updatedTechnicians[index].assigned = true;
    setTechnicians(updatedTechnicians);

    const assignedTechnician = updatedTechnicians[index];
    if(selectedProjectId){

      // Send data to Firebase Realtime Database
      fetch('http://localhost:3003/api/v1/technician/assignedProjectDetails?projectId=08e2d3fc-a0a0-4446-840c-9c529f748267', {
        method: 'POST',
        body: JSON.stringify(assignedTechnician),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response.ok) {
          console.log('Technician assigned successfully');
        } else {
          throw new Error('Failed to assign technician');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }else{
    console.error('No project selected.');
  }
};

const handleProjectSelection = (projectId) => {
  // Set the selected project ID when a project is selected
  setSelectedProjectId(projectId);
};

const projects = [
  { projectId: 1, projectName: 'Project 1' },
  { projectId: 2, projectName: 'Project 2' },
  { projectId: 3, projectName: 'Project 3' },
];

  const handleCancelAssign = (index) => {
    const updatedTechnicians = [...technicians];
    updatedTechnicians[index].assigned = false;
    setTechnicians(updatedTechnicians);

    const assignedTechnician = updatedTechnicians[index];

    // Delete data from Firebase Realtime Database
    fetch('https://testproject-e9582-default-rtdb.firebaseio.com/technician.json', {
      method: 'DELETE',
      body: JSON.stringify(assignedTechnician),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log('Technician assignment canceled successfully');
        } else {
          throw new Error('Failed to cancel technician assignment');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
    <ul>
    {projects.map((project) => (
      <li key={project.projectId}>
        <span>{project.projectName}</span>
        <button onClick={() => handleProjectSelection(project.projectId)}>
          Select
        </button>
      </li>
    ))}
  </ul>
    <table className="technician-table">
      <thead>
        <tr>
          <th>Technician Name</th>
          <th>Age</th>
          <th>Speciality</th>
          <th>Working Experience</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        
        {technicians.map((technician, index) => (
          <tr key={index}>
            <td>{technician.name}</td>
            <td>{technician.age}</td>
            <td>{technician.speciality}</td>
            <td>{technician.experience}</td>
            <td>
              {technician.assigned ? (
                <>
                  <span>Your technician is assigned</span>
                  <button className="cancel-assign-button" onClick={() => handleCancelAssign(index)}>
                    Cancel
                  </button>
                </>
              ) : (
                <button className="assign-button" onClick={() => handleAssign(index)}>
                  Assign
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default TechnicianTable;

