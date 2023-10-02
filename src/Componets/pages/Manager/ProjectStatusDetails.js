import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProjectStatusDetails = () => {
  const style = {
    borderRight: '1px solid #000',
    paddingRight: '16px',
    height: '100%',
  };

  const [project, setProject] = useState(null);
  const { projectId } = useParams();

  useEffect(() => {
    const token = Cookies.get('token');
    fetch(`/api/v1/manager/projectDetails?projectId=${projectId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.data && data.data.length > 0) {
          setProject(data.data[0]);
        } else {
          console.error('API response is not in the expected format:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [projectId]);

  return (
    <div>
      <div className="container">
        <div className="container border border-dark mt-5 rounded p-4">
          <div className="row justify-content-center">
            <div className="d-flex align-items-start">
              <div
                className="nav flex-column nav-pills me-3"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
                style={style}
              >
                <button
                  className="nav-link active"
                  id="v-pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-home"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-home"
                  aria-selected="true"
                >
                  Order ID
                </button>
                <button
                  className="nav-link"
                  id="v-pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-profile"
                  aria-selected="false"
                >
                  Technician Detail
                </button>
                <button
                  className="nav-link"
                  id="v-pills-messages-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-messages"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-messages"
                  aria-selected="false"
                >
                  Timesheet
                </button>
                <button
                  className="nav-link"
                  id="v-pills-settings-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-settings"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-settings"
                  aria-selected="false"
                >
                  Project Attachments
                </button>
              </div>
              <div className="tab-content" id="v-pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="v-pills-home"
                  role="tabpanel"
                  aria-labelledby="v-pills-home-tab"
                >
                  <h1>Order ID:</h1>
                  <h2 className="fs-2">
                    {project ? project.order_id : 'Loading...'}
                  </h2>
                </div>

                {project && (
                  <>
                    <div
                      className="tab-pane fade"
                      id="v-pills-profile"
                      role="tabpanel"
                      aria-labelledby="v-pills-profile-tab"
                    >
                      <h1>Technician Data:</h1>
                      <p>
                        Name: {project.name} {project.surname}
                      </p>
                      <p>Email: {project.email_address}</p>
                      <p>Phone: {project.phone_number}</p>
                      <p>
                        Qualification: {project.technician_data.qualification}
                      </p>
                      <p>level: {project.level}</p>
                    </div>

                    {/* <div
                      className="tab-pane fade"
                      id="v-pills-messages"
                      role="tabpanel"
                      aria-labelledby="v-pills-messages-tab"
                    >
                      <h1>Timesheet Data:</h1>
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          width: '110%',
                        }}
                      >
                        {project.timesheet_data.map((item) => (
                          <div
                            key={item.id}
                            style={{ width: '50%', padding: '10px' }}
                          >
                            <p>Comments: {item.comments}</p>
                            <p>Start Time: {item.start_time}</p>
                            <p>End Time: {item.end_time}</p>
                            <p>Date: {item.date}</p>
                          </div>
                        ))}
                      </div>
                    </div> */}

                    {/* <div
                      className="tab-pane fade"
                      id="v-pills-settings"
                      role="tabpanel"
                      aria-labelledby="v-pills-settings-tab"
                    >
                      <h1>Project Attachments:</h1>
                      {project.project_attach_data.map((item) => (
                        <div key={item.id}>
                          <a
                            href={item.file_path}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {item.file_path.split('/').pop()}
                          </a>
                        </div>
                      ))}
                    </div> */}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectStatusDetails;
