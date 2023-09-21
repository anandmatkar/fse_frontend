// import React, { useState } from 'react';
// import "./TechnicianTable.css"
// function TechnicianTable() {
//   const [technicians, setTechnicians] = useState([
//     { name: 'Shubham', age: 24, speciality: 'Drill Machine', experience: '2 years', assigned: false },
//     { name: 'Yash', age: 30, speciality: 'Jaw Drop Machine', experience: '5 years', assigned: false },
//     { name: 'Riya', age: 28, speciality: 'ChainSaw Machine', experience: '3 years', assigned: false },
//   ]);

//   const handleAssign = (index) => {
//     const updatedTechnicians = [...technicians];
//     updatedTechnicians[index].assigned = true;
//     setTechnicians(updatedTechnicians);
//   };

//   const handleCancelAssign = (index) => {
//     const updatedTechnicians = [...technicians];
//     updatedTechnicians[index].assigned = false;
//     setTechnicians(updatedTechnicians);
//   };

//   return (
//     <table className="technician-table">
//       <thead>
//         <tr>
//           <th>Technician Name</th>
//           <th>Age</th>
//           <th>Speciality</th>
//           <th>Working Experience</th>
//           <th></th>
//         </tr>
//       </thead>
//       <tbody>
//         {technicians.map((technician, index) => (
//           <tr key={index}>
//             <td>{technician.name}</td>
//             <td>{technician.age}</td>
//             <td>{technician.speciality}</td>
//             <td>{technician.experience}</td>
//             <td>
//               {technician.assigned ? (
//                 <>
//                   <span>Your technician is assigned</span>
//                   <button className="cancel-assign-button" onClick={() => handleCancelAssign(index)}>
//                     Cancel
//                   </button>
//                 </>
//               ) : (
//                 <button className="assign-button" onClick={() => handleAssign(index)}>
//                   Assign
//                 </button>
//               )}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

// export default TechnicianTable;
import React, { useState } from 'react';
import './TechnicianTable.css';

function TechnicianTable() {
  const [technicians, setTechnicians] = useState([
    { name: 'Shubham', age: 24, speciality: 'Drill Machine', experience: '2 years', assigned: false },
    { name: 'Yash', age: 30, speciality: 'Jaw Drop Machine', experience: '5 years', assigned: false },
    { name: 'Riya', age: 28, speciality: 'ChainSaw Machine', experience: '3 years', assigned: false },
  ]);

  const handleAssign = (index) => {
    const updatedTechnicians = [...technicians];
    updatedTechnicians[index].assigned = true;
    setTechnicians(updatedTechnicians);

    const assignedTechnician = updatedTechnicians[index];

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
  };

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
  );
}

export default TechnicianTable;

