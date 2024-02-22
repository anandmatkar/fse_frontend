import React, { useCallback, useEffect, useState } from "react";
import { Popconfirm, Table, Upload, Button as AntButton, Divider } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { Button, Modal } from "react-bootstrap";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { UploadOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { Formik } from "formik";
import axios from "axios";
import {
  Delete_Machine_Attachment,
  Project_Machine_Details,
  Upload_Machine_Files_While_Editing,
} from "../../../Api/Manager_Api";

function EditProjectMachineAttach({
  showModal,
  onSubmit,
  onCancel,
  machineInfoDetails,
}) {
  const navigate = useNavigate();

  let { projectID, machineID } = useParams();

  // console.log(projectID, machineID);
  // console.log(machineInfoDetails);

  const [onlyMachineInfoDetails, setOnlyMachineInfoDetails] = useState([]);
  const [projectSpecificDetails, setProjectSpecificDetails] = useState([]);
  const [machineAttachDetails, setMachineAttachDetails] = useState([]);

  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  // console.log(machineAttachDetails);

  const handleUpload = () => {
    try {
      let { manager_id } = machineInfoDetails[0];
      const token = Cookies.get("token");

      if (!token) {
        toast.error("Token not found in Cookies.");
        return;
      }

      const config = {
        headers: {
          Authorization: token,
        },
      };

      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append("files", file);
      });
      setUploading(true);

      axios
        .post(
          `${Upload_Machine_Files_While_Editing}?project_id=${projectID}&manager_id=${manager_id}&machine_id=${machineID}`,
          formData,
          config
        )
        .then((response) => {
          setFileList([]);
          fetchMachineDetails();
          toast.success("Upload successful.");
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          toast.error("Upload failed.");
        })
        .finally(() => {
          setUploading(false);
        });
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error(error.message);
    }
  };

  const handleDeleteConfirm = async (record) => {
    // console.log(record);
    try {
      const token = Cookies.get("token");

      if (!token) {
        console.error("Token not found in Cookies.");
        return;
      }

      const config = {
        headers: {
          Authorization: token,
        },
      };

      const response = await axios.put(
        `${Delete_Machine_Attachment}?attach_id=${record.id}`,
        {},
        config
      );

      // console.log(response);
      if (response.data.status === 200) {
        // If deletion is successful, update the state to reflect the changes

        toast.success(response.data.message);
        fetchMachineDetails();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting attachment:", error);
      toast.error("Failed to delete attachment.");
    }
  };

  const columns = [
    {
      title: <span className="fw-bold">S.No.</span>,
      width: "15%",
      align: "center",
      render: (text, record, index) => (
        <span className="fw-bold">{index + 1}</span>
      ),
    },
    {
      title: <span className="fw-bold">Attachment File</span>,
      dataIndex: "file_path",
      width: "65%",
      align: "center",
      render: (path) => (
        <Button
          variant="link"
          className="fw-bold text-decoration-none"
          title="View Attached File"
          as={NavLink}
          to={path}
          target="_blank"
        >
          View Attached File
        </Button>
      ),
    },
    {
      title: "",
      width: "20%",
      render: (text, record) => (
        <Popconfirm
          title="Are you sure you want to delete this attachment file?"
          onConfirm={() => handleDeleteConfirm(record)}
          okText="Yes"
          cancelText="No"
        >
          <Button variant="danger" size="sm">
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
    multiple: true,
  };

  const fetchMachineDetails = useCallback(async () => {
    try {
      const token = Cookies.get("token");

      if (!token) {
        console.error("Token not found in Cookies.");
        return;
      }

      const config = {
        headers: {
          Authorization: token,
        },
      };

      const response = await axios.get(Project_Machine_Details, config);

      // setMachineInfoDetails(response.data.data);

      // Find the project details based on projectID
      const projectDetails = response.data.data.find(
        (project) => project.project_id === projectID
      );

      if (projectDetails) {
        // Find the machine details based on machineID within the project
        const machineDetails = projectDetails.machine_data.find(
          (machine) => machine.machine_id === machineID
        );

        if (machineDetails) {
          setOnlyMachineInfoDetails(machineDetails);
          setMachineAttachDetails(machineDetails.machine_attach);
          // Populate the form with the specific machine details
          Formik.setValues({
            machine_id: machineDetails.machine_id,
            machine_type: machineDetails.machine_type,
            serial: machineDetails.serial,
            // hour_count: machineDetails.hour_count,
            // nom_speed: machineDetails.nom_speed,
            // act_speed: machineDetails.act_speed,
            description: machineDetails.description,
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  }, [machineID, projectID]);

  useEffect(() => {
    fetchMachineDetails();
  }, [projectID, machineID, fetchMachineDetails]);

  return (
    <>
      <Modal show={showModal} onHide={onCancel} centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Machine Attachment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Table
              columns={columns}
              dataSource={machineAttachDetails}
              //   pagination={{
              //     pageSize: 50,
              //   }}
              scroll={{
                y: 240,
              }}
              pagination={false}
              size="small"
            />
          </div>

          <Divider style={{ borderWidth: "5px" }} className=" border-black">
            Add New Attachment
          </Divider>

          <div className="my-2">
            <Upload {...props}>
              <AntButton icon={<UploadOutlined />}>Select Files</AntButton>
            </Upload>
            <AntButton
              type="primary"
              onClick={handleUpload}
              disabled={fileList.length === 0}
              loading={uploading}
              style={{
                marginTop: 16,
              }}
            >
              {uploading ? "Uploading" : "Start Upload"}
            </AntButton>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCancel}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProjectMachineAttach;
