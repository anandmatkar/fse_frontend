import React from "react";
import Layout from "../../Layout/Layout";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./LoginMain.css";

function PageNotFound() {
  return (
    <Layout>
      <Container className="admin-container-main container-xxl py-5 mt-5">
        <Container>
          <div
            className="admin-data text-center wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <h6 className="section-title bg-white text-center text-primary px-3">
              PageNotFound
            </h6>
            <h1 className="mb-5">PageNotFound</h1>
          </div>
        </Container>
      </Container>
    </Layout>
  );
}

export default PageNotFound;
