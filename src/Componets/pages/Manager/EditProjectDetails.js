import React, { useState, useEffect } from "react";
import "./createProject.css";
import { Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import NavbarManagerDashboard from "../../NavBar/navbarManagerDashboard";
import { FaArrowLeft } from "react-icons/fa";

function EditProjectDetails() {
  return (
    <>
      <NavbarManagerDashboard />

      <div class="container newproject">
        <header class="headernewproject">
          <div className="text-center wow fadeInUp my-2" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Manager's Panel
            </h6>
            <h1 className="mb-5">Edit Project Details</h1>
          </div>
        </header>
        <Row>
          <Col>
            <Button
              variant="primary"
              as={NavLink}
              to={"/projectStatus"}
              className="my-4"
            >
              <FaArrowLeft /> Back to Project Status
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default EditProjectDetails;
