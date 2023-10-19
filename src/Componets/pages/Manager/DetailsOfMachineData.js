import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import NavbarManagerDashboard from '../../NavBar/navbarManagerDashboard';
import { Table, Container } from 'react-bootstrap';
import { LuDownload } from 'react-icons/lu';
import { Manager_Base_Url, managerlogin_Api } from '../../../Api/Manager_Api';

function DetailsOfMachineData() {
  const { techID, projectId } = useParams();
  const [machineId, setMachineId] = useState('');
  const [search, setSearch] = useState('');
  const [machineData, setMachineData] = useState([]);

  useEffect(() => {
    async function fetchMachineData() {
      try {
        const token = Cookies.get('token');
        const response = await fetch(
          `${Manager_Base_Url}machineData?techId=${techID}&projectId=${projectId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setMachineData(data.data);
        if (data.data.length > 0) {
          const fetchedMachineId = data.data[0].machine_id; // Adjust this according to your response structure
          setMachineId(fetchedMachineId);
        }
      } catch (error) {
        console.error('Error fetching machine data:', error);
      }
    }

    fetchMachineData();
  }, [techID, projectId]);

  const filterMachineAttach = (data, searchText) => {
    return data.filter((attach) => attach.file_path.includes(searchText));
  };

  return (
    <div>
      <NavbarManagerDashboard />
      <div className="text-center wow fadeInUp my-2" data-wow-delay="0.1s">
        <h6 className="section-title bg-white text-center text-primary px-3">
          Manager's Panel
        </h6>
        <h1 className="mb-5">Details of Machine Data</h1>
      </div>
      <div className="container mt-5">
        <div className="card p-2">
          <div className="card-body">
            <div className="bf-table-responsive rounded">
              <Container fluid>
                <Table responsive hover className="bf-table">
                  <thead>
                    <tr>
                      <th>Order Id</th>
                      <th>Machine Type</th>
                      <th>Serial</th>
                      <th>Hour Count</th>
                      <th>Nom Speed</th>
                      <th>Act Speed</th>
                      <th>Description</th>
                      <th>Attach File</th>
                      <th>Project Report</th>
                    </tr>
                  </thead>
                  <tbody>
                    {machineData.length > 0 ? (
                      machineData.map((machine) => (
                        <tr key={machine.machine_id}>
                          <td>{machine.order_id}</td>
                          <td>{machine.machine_type}</td>
                          <td>{machine.serial}</td>
                          <td>{machine.hour_count}</td>
                          <td>{machine.nom_speed}</td>
                          <td>{machine.act_speed}</td>
                          <td>{machine.description}</td>
                          <td className="d-flex justify-content-center">
                            {filterMachineAttach(machine.machine_attach, search)
                              .length > 0
                              ? filterMachineAttach(
                                  machine.machine_attach,
                                  search
                                ).map((attachment) => (
                                  <a
                                    key={attachment.id}
                                    href={attachment.file_path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <LuDownload
                                      color="black"
                                      className="border border-0 btn fs-1 btn-info d-flex justify-content-center me-2"
                                    />
                                  </a>
                                ))
                              : 'No attachments'}
                          </td>
                          <td>
                            <Link
                              to={`/projectdata/${machine.machine_id}/${projectId}/${techID}`}
                              className="btn btn-primary"
                            >
                              Report
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8">Loading machine data...</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsOfMachineData;
