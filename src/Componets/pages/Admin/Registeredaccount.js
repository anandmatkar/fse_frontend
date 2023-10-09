import React ,{useEffect,useState}from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';


const Registeredaccount = () => {

    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

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
          <li key={i} className={`dt-item ${currentPage === i ? 'active' : ''}`}>
            <button className="dt-link" onClick={() => handleChangePage(i)}>{i}</button>
          </li>
        );
      }
      return buttons;
    };

    useEffect(() => {
        const config = {
            headers: {
              Authorization: `${localStorage.getItem("token")}`, // Add the token to the headers
            },
          };
          
          axios
            .get("http://localhost:3003/api/v1/companyAdmin/managerListForApproval", config)
            .then((response) => {
              // Assuming the response data is an array of user objects
              const apiUsers = response.data;
              console.log(response.data, 'fetcheddata');
              setUsers(response.data.data.RegisteredManagerList);
          
              // Initialize isActive property for each user fetched from the API
              // const updatedUsers = apiUsers.map((user) => ({
              //   ...user,
              //   isActive: false, // You can set the initial value as needed
              // }));
              
              // Now, the GET request will include the authorization token in the headers.
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            })
    }, []); // Empty dependency array to run the effect only once

 // Calculate total pages based on the number of items and items per page
  
    return (
      <div className="user-table-container">
        <h1 className='text-center text-info'>Account Registered</h1>
        <div className='card'>
          <div className='card-body'>
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
            </tr>
          </thead>
          <tbody>
            {
              currentUsers.map((currentUsers) => (
                  <tr key={currentUsers.id}>
                    <td>{currentUsers.id}</td>
                    <td>{currentUsers.name}</td>
                    <td>{currentUsers.surname}</td>
                    <td>{currentUsers.position}</td>
                    <td>{currentUsers.company}</td>
                    <td>{currentUsers.email_address}</td>
                    <td>{currentUsers.phone_number}</td>
                    <td>{currentUsers.created_at}</td>
                  
                  </tr>
                ))
              }
          </tbody>
      </Table>

          </div>
        </div>
        <nav className="dt-pagination">
          <ul className="dt-pagination-ul">
            <li className={`dt-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="dt-link" onClick={() => handleChangePage(currentPage - 1)}>Prev</button>
            </li>
            {renderPaginationButtons()}
            <li className={`dt-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="dt-link" onClick={() => handleChangePage(currentPage + 1)}>Next</button>
            </li>
          </ul>
        </nav>

              </div>
    );
  }


export default Registeredaccount