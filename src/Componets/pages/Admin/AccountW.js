import React, { useState, useEffect } from "react";
import axios from "axios";
import './AccountWA.css';
import Table from 'react-bootstrap/Table';
import { Button } from "react-bootstrap";
import { Base_Url } from "../../../Api/Base_Url";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserTable() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleAction = async (userId, actionType) => {
      const token = localStorage.getItem("token");
      
      if (!token) {
          console.error("Token not found in localStorage.");
          return;
      }
      
      let status = actionType === "approve" ? 1 : 0;
      
      const endPointUrl = `${Base_Url}api/v1/companyAdmin/approveManager?managerId=${userId}&status=${status}`;
      
      const config = {
          headers: {
              Authorization: token,
          },
      };
      
      try {
          await axios.put(endPointUrl, null, config);
          
          // Filter out the user from the users array
          const updatedUsers = users.filter(user => user.id !== userId);
          setUsers(updatedUsers);
          
          if(status === 1) {
              toast.success("Manager Approved Successfully!");
          } else {
              toast.error("Manager Rejected Successfully");
          }
      } catch (error) {
          console.error("Error:", error);
      }
    };
    
  
  

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
            },
        };

        axios
            .get(`${Base_Url}api/v1/companyAdmin/managerListForApproval`, config)
            .then((response) => {
                setUsers(response.data.data.ManagerListForApproval);
                setLoading(false);
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    console.error("Unauthorized access:", error);
                } else {
                    console.error("Error:", error);
                }
            });
    }, []);

    return (
        <div className="user-table-container">
            <h1 className='text-center text-info'>Account Waiting Approval </h1>
            <div className="card">
                <div className="card-body">
                    <Table responsive hover>
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
                            <Button 
                                variant="primary" 
                                disabled={user.status === 1} 
                                onClick={() => handleAction(user.id, "approve")}
                            >
                                Approve
                            </Button>

                            <Button 
                                variant={user.status === 1 ? "secondary" : "danger"} 
                                disabled={user.status === 1} 
                                onClick={() => handleAction(user.id, "reject")}
                            >
                                Reject
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
