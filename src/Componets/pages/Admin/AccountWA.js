import React, { useState, useEffect } from "react";
import axios from "axios";

function UserTable() {
  const [users, setUsers] = useState([]);

  const toggleActivation = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://localhost:3003/api/v1/companyAdmin/managerListForApproval")
      .then((response) => {
        // Assuming the response data is an array of user objects
        const apiUsers = response.data;

        // Initialize isActive property for each user fetched from the API
        const updatedUsers = apiUsers.map((user) => ({
          ...user,
          isActive: false, // You can set the initial value as needed
        }));

        // Update the state with the fetched data
        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      <table>
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
            <th>Action</th>
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
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.date}</td>
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
