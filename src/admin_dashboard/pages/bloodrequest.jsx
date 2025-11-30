import React, { useContext, useState, useEffect } from "react";
import { BloodContext } from "../../context/BloodContext";
import { Card, Row, Col, Button, Form, Badge, Spinner } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "./bloodrequest.css";

const BloodRequest = () => {
  const {
    requests,
    loadingRequests,
    changeRequestStatus,
    // removeRequest, // available if you want delete later
  } = useContext(BloodContext);

  const [filteredRequests, setFilteredRequests] = useState([]);
  const [filterGroup, setFilterGroup] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  // Apply filters whenever requests or filter values change
  useEffect(() => {
    let filtered = [...requests];

    if (filterGroup) {
      filtered = filtered.filter((req) => req.bloodGroup === filterGroup);
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((req) => req.status === filterStatus);
    }

    setFilteredRequests(filtered);
  }, [requests, filterGroup, filterStatus]);

  // Update status using Firestore via context
  const updateStatus = async (id, status) => {
    try {
      await changeRequestStatus(id, status);
    } catch (err) {
      console.error("Error updating request status:", err);
    }
  };

  const stats = {
    total: requests.length,
    fulfilled: requests.filter((r) => r.status === "Approved").length,
    pending: requests.filter((r) => r.status === "Pending").length,
  };

  if (loadingRequests) {
    return (
      <div className="blood-requests-page text-center">
        <Spinner animation="border" className="mt-4" />
        <p className="mt-2">Loading requests...</p>
      </div>
    );
  }

  return (
    <div className="blood-requests-page">
      <h3 className="mb-4 fw-bold">Manage Blood Requests</h3>

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow-sm text-center p-3" data-aos="fade-up">
            <h5>Total Requests</h5>
            <h2>{stats.total}</h2>
          </Card>
        </Col>
        <Col md={4}>
          <Card
            className="shadow-sm text-center p-3"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h5>Approved</h5>
            <h2 className="text-success">{stats.fulfilled}</h2>
          </Card>
        </Col>
        <Col md={4}>
          <Card
            className="shadow-sm text-center p-3"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h5>Pending</h5>
            <h2 className="text-warning">{stats.pending}</h2>
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Row className="mb-4">
        <Col md={4}>
          <Form.Select
            onChange={(e) => setFilterGroup(e.target.value)}
            value={filterGroup}
          >
            <option value="">Filter by Blood Group</option>
            <option value="A+">A+</option>
            <option value="B+">B+</option>
            <option value="O+">O+</option>
            <option value="AB+">AB+</option>
            <option value="A-">A-</option>
            <option value="B-">B-</option>
            <option value="O-">O-</option>
            <option value="AB-">AB-</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select
            onChange={(e) => setFilterStatus(e.target.value)}
            value={filterStatus}
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Requests List */}
      <Row>
        {filteredRequests.length === 0 ? (
          <p className="text-muted text-center">No matching requests found.</p>
        ) : (
          filteredRequests.map((req, index) => (
            <Col md={6} lg={4} className="mb-4" key={req.id}>
              <Card
                className="request-card shadow-sm"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <Card.Body>
                  <h5>{req.name || req.patientName}</h5>
                  <p>
                    <strong>Blood Group:</strong>{" "}
                    <Badge bg="danger">{req.bloodGroup}</Badge>
                  </p>
                  <p>
                    <strong>Units:</strong>{" "}
                    {req.units ? req.units : "-"}
                  </p>
                  <p>
                    <strong>Hospital:</strong> {req.hospital}
                  </p>
                  <p>
                    <strong>Contact:</strong> {req.contact}
                  </p>
                  <p>
                    <strong>Status:</strong>
                    <Badge
                      bg={
                        req.status === "Approved"
                          ? "success"
                          : req.status === "Rejected"
                          ? "danger"
                          : "warning"
                      }
                      className="ms-2"
                    >
                      {req.status}
                    </Badge>
                  </p>
                  <div className="d-flex justify-content-between mt-3">
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => updateStatus(req.id, "Approved")}
                      disabled={req.status === "Approved"}
                    >
                      <FaCheckCircle /> Approve
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => updateStatus(req.id, "Rejected")}
                      disabled={req.status === "Rejected"}
                    >
                      <FaTimesCircle /> Reject
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default BloodRequest;
