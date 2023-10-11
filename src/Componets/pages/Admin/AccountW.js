import React, { useState, useEffect } from "react";
import axios from "axios";
import './AccountWA.css'
import Table from 'react-bootstrap/Table';
import { Button } from "react-bootstrap";
import { Base_Url } from "../../../Api/Base_Url";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading,setLoading] = useState(false)

  const toggleActivation = async (userId) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("Token not found in localStorage.");
      return;
    }
  
    const config = {
      headers: {
        Authorization: token,
      },
    };
  
    try {
      const response = await axios.put(`${Base_Url}api/v1/companyAdmin/approveManager?managerId=${userId}`, null, config);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }

    window.location.href = "/AccountWA"
    
  };
  

  useEffect(() => {
    // Fetch data from the API
    const config = {
      headers: {
        Authorization: `${localStorage.getItem("token")}`, // Add the token to the headers
      },
    };
    
    axios
      .get("http://3.110.86.245/api/v1/companyAdmin/managerListForApproval", config)
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
        setLoading(false)
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
 if(loading){
  return <div>
  </div>;

 }
  return (
    <div className="user-table-container">
    <h1 className='text-center text-info'>Account Waiting Approval </h1>
      <div className="card">
        <div className="card-body">
        <Table responsive hover >
          <thead className=''>
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
            {
              users.map((user) => (
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
                    <Button onClick={() => toggleActivation(user.id)}>
                    {user.status==2 ? "Active" : "Approved"}
                    </Button>
                  </td>
                  </tr>
                ))
              }
          </tbody>
      </Table>
        </div>
      </div>
      

      
    </div>
  );
}

export default UserTable;
