import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import { Base_Url } from "../../../Api/Base_Url";
import AdminDashboardNavbar from "../../NavBar/AdminDashboardNavbar";
import Cookies from "js-cookie";
import { FaArrowLeft, FaSpinner } from "react-icons/fa";
import PageSpinner from "../Common/PageSpinner";

const Registeredaccount = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const toggleActivation = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isActive: !user.isActive } : user
      )
    );
  };
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentUsers = users.slice(firstIndex, lastIndex);
  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };
  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <li key={i} className={`dt-item ${currentPage === i ? "active" : ""}`}>
          <button className="dt-link" onClick={() => handleChangePage(i)}>
            {i}
          </button>
        </li>
      );
    }
    return buttons;
  };
  useEffect(() => {
    setIsFetching(true);
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(`${Base_Url}api/v1/companyAdmin/managerListForApproval`, config)
      .then((response) => {
        setUsers(response.data.data.RegisteredManagerList || []);
        setIsFetching(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsFetching(false);
      });
  }, []);
  return (
    <>
      <AdminDashboardNavbar />
      <div className="text-center mb-5 mt-5">
        <h6 className="section-title bg-white text-center text-primary px-3">
          Admin Panel
        </h6>
        <h1>Registered Accounts</h1>
      </div>
      <div className="user-table-container">
        <Button
          variant="primary"
          onClick={() => navigate("/AdminD")}
          className="my-2"
        >
          <FaArrowLeft /> Back to Admin Dashboard
        </Button>
        {isFetching ? (
          <>
            <PageSpinner />
          </>
        ) : (
          <>
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
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers && currentUsers.length > 0 ? (
                      currentUsers.map((user) => (
                        <tr key={user.id}>
                          <td>{user.name}</td>
                          <td>{user.surname}</td>
                          <td>{user.position}</td>
                          <td>{user.company}</td>
                          <td>{user.email_address}</td>
                          <td>{user.phone_number}</td>
                          <td>{user.created_at}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center fs-3 fw-bold">
                          No registered accounts
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </div>
            <nav className="dt-pagination">
              <ul className="dt-pagination-ul">
                <li
                  className={`dt-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="dt-link"
                    onClick={() => handleChangePage(currentPage - 1)}
                  >
                    Prev
                  </button>
                </li>
                {renderPaginationButtons()}
                <li
                  className={`dt-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="dt-link"
                    onClick={() => handleChangePage(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </>
        )}
      </div>
    </>
  );
};
export default Registeredaccount;
