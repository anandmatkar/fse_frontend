import React, { useState, useEffect } from "react";
import axios from "axios";
import './AccountWA.css'
function UserTable() {
  const [users, setUsers] = useState([]);

  const toggleActivation = (userId) => {
    axios.put(`http://localhost:3003/api/v1/companyAdmin/approveManager?managerId=${userId}`)
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  useEffect(() => {
    // Fetch data from the API
    const config = {
      headers: {
        Authorization: `${localStorage.getItem("token")}`, // Add the token to the headers
      },
    };
    
    axios
      .put("http://localhost:3003/api/v1/companyAdmin/managerListForApproval", config)
      .then((response) => {
        // Assuming the response data is an array of user objects
        const apiUsers = response.data;
        console.log(response.data, 'fetcheddata',apiUsers);
        console.log(localStorage.getItem("token"));

        setUsers(response.data.data.ManagerListForApproval)
    
        // Initialize isActive property for each user fetched from the API
        // const updatedUsers = apiUsers.map((user) => ({
        //   ...user,
        //   isActive: false, // You can set the initial value as needed
        // }));
        
        // Now, the GET request will include the authorization token in the headers.
      })
      .catch((error) => {
        if (error.response &&error.response.status===401){
            // Handle unauthorized access error here
      console.error("Unauthorized access:", error);
        } else {
  // Handle other errors here
  console.error("Error:", error);
        }
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className="user-table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>Account ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Position</th>
            <th>Company</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Activation</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.position}</td>
              <td>{user.company}</td>
              <td>{user.email_address}</td>
              <td>{user.phone_number}</td>
              <td>{user.created_at}</td>
              <td>
                <button onClick={() => toggleActivation(user.id)}>
                  {user.isActive ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
