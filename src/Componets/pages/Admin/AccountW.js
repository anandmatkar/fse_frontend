import React, { useState, useEffect } from "react";
import axios from "axios";
import './AccountWA.css';
import Table from 'react-bootstrap/Table';
import { Button } from "react-bootstrap";
import { Base_Url } from "../../../Api/Base_Url";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcApprove, FcDisapprove } from 'react-icons/fc'
import AdminDashboardNavbar from "../../NavBar/AdminDashboardNavbar";
import Cookies from "js-cookie";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAction = async (userId, actionType) => {
    const token = Cookies.get("token");

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

      if (status === 1) {
        toast.success("Manager Approved Successfully!");
      } else {
        toast.success("Manager Rejected Successfully");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };




  useEffect(() => {
    const token= Cookies.get('token')
      const config = {
          headers: {
            Authorization: token, // Add the token to the headers
          },
        };
    axios
    .get(`${Base_Url}api/v1/companyAdmin/managerListForApproval`, config)
    .then((response) => {
      if (response.data.success === false) {
        toast.error(response.data.message);
        setUsers([]); // set to empty array so you can display the "No manager for approval" message
      } else {
        setUsers(response.data.data.ManagerListForApproval || []);
      }
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
    <>
    <AdminDashboardNavbar/>
    <div className="text-center mb-5 mt-5">
  <h6 className="section-title bg-white text-center text-primary px-3">Admin Panel</h6>
  <h1>Accounts Waiting for Approval</h1>
</div>

<div className="user-table-container">
  <div className="card">
    <div className="card-body">
      <Table responsive hover>
        <thead>
          <tr>
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
          {users && users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
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
                    style={{ marginRight: '10px' }}
                    className="button-hover-effect">
                    <FcApprove size={34} />
                  </Button>

                  <Button
                    variant={user.status === 1 ? "secondary" : "danger"}
                    disabled={user.status === 1}
                    onClick={() => handleAction(user.id, "reject")} 
                    className="button-hover-effect">
                    <FcDisapprove size={34} />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center fw-bold mt-4">
                <h3>No manager for approval</h3>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  </div>
</div>

    </>
  );
}

export default UserTable;
