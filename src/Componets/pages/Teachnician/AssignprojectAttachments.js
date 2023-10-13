import React, { useState, useEffect } from 'react';
import Layout4 from '../../Layout/Layout4'
import { useParams } from 'react-router-dom';
import { Table, Container, Button , Card } from 'react-bootstrap';
import { AiFillProfile } from 'react-icons/ai';
import { Technician_DetailJobAssign } from '../../../Api/Technicians_Api';
import axios from 'axios';
import Cookies from 'js-cookie';
const AssignprojectAttachments = () => {
  const { projectID } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
      const token = Cookies.get('token');
      const fetchProjectAttachments = async () => {
          try {
              const config = {
                  headers: {
                      'Content-Type': 'application/json',
                      Authorization: token,
                  },
              };
              // Replace with your actual API endpoint
              const response = await axios.get(`${Technician_DetailJobAssign}?projectId=${projectID}`, config);
              if (response.data.success) {
                  setProject(response.data.data[0]);
              } else {
                  console.error("Failed to fetch project attachments");
              }
          } catch (error) {
              console.error("Error fetching project attachments:", error);
          }
      }
      fetchProjectAttachments();
  }, []);

  return (
    <Layout4>
      <Container>
            <div className="text-center mb-5 mt-3">
                <h6 className="section-title bg-white text-center text-primary px-3">Attachment Details</h6>
                <h1>Your Attachment Details</h1>
            </div>

               {project && (
                    <Card>
                        <Card.Header className='fs-5 fw-bold'>Project attachments:</Card.Header>
                        <Card.Body>
                            <Table bordered hover>
                                <thead>
                                    <tr>
                                        <th style={{ padding: '10px', borderBottom: '2px solid #000' }}>No.</th>
                                        <th style={{ padding: '10px', borderBottom: '2px solid #000' }}>Attachment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {project.project_attach_data.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <a href={item.file_path} target="_blank" rel="noreferrer" title={item.file_path.split('/').pop()}>
                                                    <AiFillProfile size="30px" color="black" />
                                                    <div className='inn' style={{ position: "relative", left: "10px", display: "inline-block" }}>
                                                        File {index + 1}
                                                    </div>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                )}
            </Container>
        </Layout4>
  )
}

export default AssignprojectAttachments