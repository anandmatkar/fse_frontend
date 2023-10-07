import React ,{useEffect,useState}from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';


const Registeredaccount = () => {
    const [users, setUsers] = useState([]);

    const toggleActivation = (userId) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isActive: !user.isActive } : user
        )
      );
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
              setUsers(response.data.data.RegisteredManagerList)
          
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
  
    return (
      <div className="user-table-container">
        <h1 className='text-center text-info'>Account Registered</h1>
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
                  
                  </tr>
                ))
              }
          </tbody>
      </Table>
      </div>
    );
  }


export default Registeredaccount