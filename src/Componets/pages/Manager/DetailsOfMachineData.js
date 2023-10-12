import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import NavbarManagerDashboard from '../../NavBar/navbarManagerDashboard';
import { Table, Container } from 'react-bootstrap';
import { LuDownload } from 'react-icons/lu';
import { Manager_Base_Url, managerlogin_Api } from '../../../Api/Manager_Api';

function DetailsOfMachineData() {
  const { machineId, projectId } = useParams();
  const [search, setSearch] = useState('');
  const [machineData, setMachineData] = useState(null);

  useEffect(() => {
    async function fetchMachineData() {
      try {
        const token = Cookies.get('token');
        const response = await fetch(
          `${Manager_Base_Url}machineData?machineId=${machineId}&projectId=${projectId}`,
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
        setMachineData(data.data[0]);
      } catch (error) {
        console.error('Error fetching machine data:', error);
      }
    }

    fetchMachineData();
  }, [machineId, projectId]);

  const filterMachineAttach = (data, searchText) => {
    return data.filter((attach) => attach.file_path.includes(searchText));
  };

  const filteredMachineAttach = machineData
    ? filterMachineAttach(machineData.machine_attach, search)
    : [];

  return (
    <div>
      <NavbarManagerDashboard />
      <div className="jobcontainer container mt-5">
        <div className="card p-2">
          <div className="card-body ">
            <div className="bf-table-responsive rounded">
              <Container fluid>
                <h1 className="jobassigntext mb-4">Project Details</h1>
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
                    </tr>
                  </thead>
                  <tbody>
                    {machineData ? (
                      <tr>
                        <td>{machineData.order_id}</td>
                        <td>{machineData.machine_type}</td>
                        <td>{machineData.serial}</td>
                        <td>{machineData.hour_count}</td>
                        <td>{machineData.nom_speed}</td>
                        <td>{machineData.act_speed}</td>
                        <td>{machineData.description}</td>
                        <td className="d-flex justify-content-center">
                          {filteredMachineAttach.length > 0
                            ? filteredMachineAttach.map((attachment) => (
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
                      </tr>
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
