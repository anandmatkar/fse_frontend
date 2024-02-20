import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Table,
  Form,
  Pagination,
  InputGroup,
  Spinner,
  Modal,
  Dropdown,
} from "react-bootstrap";
import {
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaArrowLeft,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import {
  Manager_Base_Url,
  Technician_Lists_Manager,
} from "./../../../Api/Manager_Api";
import NavbarManagerDashboard from "../../NavBar/navbarManagerDashboard";
import PageSpinner from "../Common/PageSpinner";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import EditTechnicianModal from "./EditTechnicianModel";

export default function ManageTechnician() {
  const navigate = useNavigate();

  const [technicianList, setTechnicianList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [techniciansPerPage] = useState(10);
  const pagesToShow = 2;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTechnician, setSelectedTechnician] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTechnicianForEdit, setSelectedTechnicianForEdit] =
    useState(null);

  const openEditModal = (technician) => {
    setSelectedTechnicianForEdit(technician);
    setShowEditModal(true);
  };

  const handleSaveEditedTechnician = async (editedTechnician) => {
    try {
      const token = Cookies.get("token");

      if (!token) {
        console.error("Token not found in localStorage.");
        return;
      }

      const config = {
        headers: {
          Authorization: token,
        },
      };

      console.log("Save edited technician:", editedTechnician);

      const response = await axios.put(
        `${Manager_Base_Url}editTechnician`,
        editedTechnician,
        config
      );
      if (response.data.status === 200) {
        toast.success(response.data.message);
        fetchTechnicianList();
      } else {
        toast.error(response.data.message);
      }

      console.log(response.data);
    } catch (error) {
      toast.error(error.message);
    }
    setShowEditModal(false);
  };

  const openDeleteModal = (technician) => {
    setSelectedTechnician(technician);
    setShowDeleteModal(true);
  };

  const handleDeleteTechnician = async (techID) => {
    try {
      const token = Cookies.get("token");

      if (!token) {
        console.error("Token not found in localStorage.");
        return;
      }

      const config = {
        headers: {
          Authorization: token,
        },
      };

      const response = await axios.put(
        `${Manager_Base_Url}deleteTechnician?techId=${techID}`,
        {},
        config
      );

      if (response.status === 200) {
        fetchTechnicianList();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
        console.error("Failed to delete the machine.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      // setIsDeletingMachine(false); // Set deleting machine to false in all cases
    }

    setShowDeleteModal(false);
  };

  const indexOfLastTechnician = currentPage * techniciansPerPage;
  const indexOfFirstTechnician = indexOfLastTechnician - techniciansPerPage;
  const currentTechnicians = technicianList.slice(
    indexOfFirstTechnician,
    indexOfLastTechnician
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTechnicians = currentTechnicians.filter((technician) =>
    `${technician.name} ${technician.surname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(technicianList.length / techniciansPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber < 1) {
      pageNumber = 1;
    } else if (pageNumber > totalPages) {
      pageNumber = totalPages;
    }
    setCurrentPage(pageNumber);
  };

  const renderPaginationItems = () => {
    const items = [];
    const startPage = Math.max(1, currentPage - pagesToShow);
    const endPage = Math.min(totalPages, currentPage + pagesToShow);

    // Add the "First Page" button
    items.push(
      <Pagination.First
        key="first-page"
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
      />
    );

    // Add the "Previous Pages" button
    if (currentPage > pagesToShow + 1) {
      items.push(
        <Pagination.Ellipsis
          key="previous-ellipsis"
          onClick={() => setCurrentPage(currentPage - pagesToShow - 1)}
        />
      );
    }

    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </Pagination.Item>
      );
    }

    // Add the "Next Pages" button
    if (currentPage < totalPages - pagesToShow) {
      items.push(
        <Pagination.Ellipsis
          key="next-ellipsis"
          onClick={() => setCurrentPage(currentPage + pagesToShow + 1)}
        />
      );
    }

    // Add the "Last Page" button
    items.push(
      <Pagination.Last
        key="last-page"
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage === totalPages}
      />
    );

    return items;
  };

  const fetchTechnicianList = async () => {
    try {
      setIsFetching(true); // Set loading state to true

      const token = Cookies.get("token");

      if (!token) {
        console.error("Token not found in localStorage.");
        return;
      }
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const response = await axios.get(Technician_Lists_Manager, config);
      console.log(response.data);
      setTechnicianList(response.data.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsFetching(false); // Set loading state to true
    }
  };

  useEffect(() => {
    fetchTechnicianList();
  }, []);

  return (
    <React.Fragment>
      <NavbarManagerDashboard />

      <div className="text-center wow fadeInUp my-5" data-wow-delay="0.1s">
        <h6 className="section-title bg-white text-center text-primary px-3">
          Manager's Panel
        </h6>
        <h1 className="mb-5">Manage Technicians</h1>
      </div>

      <Container>
        <Button
          variant="primary"
          onClick={() => {
            navigate("/manager");
          }}
        >
          <FaArrowLeft /> Back to Manager Dashboard
        </Button>
      </Container>

      <Container className="mb-5">
        <Button
          variant="warning"
          as={NavLink}
          to={"/createtechnician"}
          className="my-3"
        >
          Create Technician
        </Button>

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search Technicians"
            aria-label="Search Technicians"
            aria-describedby="basic-addon1"
            onChange={handleSearch}
          />
        </InputGroup>

        {isFetching ? (
          <div>
            <PageSpinner />
          </div>
        ) : (
          <>
            <Table hover responsive className="technicians-data-table my-3">
              <thead>
                <tr>
                  <th>S. No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTechnicians ? (
                  filteredTechnicians.map((technician, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{`${technician.name} ${technician.surname}`}</td>
                      <td>{technician.email_address}</td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle
                            size="sm"
                            variant="success"
                            id="dropdown-basic"
                          >
                            Actions
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item
                              href="#"
                              as={NavLink}
                              to={`/viewtechnicianprofile/${technician.id}`}
                            >
                              View Details
                            </Dropdown.Item>
                            <Dropdown.Item
                              href="#"
                              onClick={() => openEditModal(technician)}
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              href="#"
                              onClick={() => openDeleteModal(technician)}
                            >
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        {/* <Button
                            variant="success"
                            as={NavLink}
                            to={`/viewtechnicianprofile/${technician.id}`}
                        >
                          View Details
                        </Button>
                        <Button
                          variant="danger"
                          className="mx-2"
                          onClick={() => openDeleteModal(technician)} // Open the delete confirmation modal
                        >
                          Delete
                        </Button> */}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="text-center">No Technician List to Show</tr>
                )}
              </tbody>
            </Table>

            <Pagination className="justify-content-center">
              {renderPaginationItems()}
            </Pagination>
          </>
        )}
      </Container>

      {showDeleteModal && (
        <>
          <Modal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              Are you sure you want to delete <br />
              <strong>
                {selectedTechnician
                  ? `${selectedTechnician.name} ${selectedTechnician.surname}`
                  : "this technician"}
              </strong>{" "}
              ?
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDeleteTechnician(selectedTechnician.id)}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}

      {showEditModal && (
        <EditTechnicianModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          technician={selectedTechnicianForEdit}
          onSave={handleSaveEditedTechnician}
        />
      )}
    </React.Fragment>
  );
}
