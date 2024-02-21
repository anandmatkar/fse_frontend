import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, Card, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import "./EditProjectAddMachineModal.css";
import axios from "axios";
import {
  Teachnician_List_Api,
  Upload_Machine_Files,
} from "../../../Api/Manager_Api";

function EditProjectViewMachineModal({ show, onHide, project, onSubmit }) {
  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        centered
        dialogClassName="edit-project-add-machine-modal"
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bolder">
            Edit Project : View Added Machines
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table responsive hover>
            <thead color="success">
              <tr>
                <th>S.No</th>
                <th>Machine Type</th>
                <th>Serial Number</th>
                <th>Technicians</th>
                <th>Hour Count</th>
                <th>Nominal Speed</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="my-2">
                <td colSpan={7} className="text-center fw-bolder">
                  No Machine Data Available
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary">Save Machines</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProjectViewMachineModal;
