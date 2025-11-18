import React, { useContext, useState, useEffect } from 'react';
import { BloodContext } from '../../context/BloodContext';
import { Card, Row, Col, Button, Form, Badge } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './bloodrequest.css';

const BloodRequest = () => {
  const { requests } = useContext(BloodContext);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [filterGroup, setFilterGroup] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const dummyRequests = [
    { id: 1, patientName: 'John Doe', bloodGroup: 'A+', status: 'pending', units: 2, hospital: 'City Hospital' },
    { id: 2, patientName: 'Jane Smith', bloodGroup: 'O-', status: 'fulfilled', units: 3, hospital: 'Central Care' },
    { id: 3, patientName: 'Sam Patel', bloodGroup: 'B+', status: 'pending', units: 1, hospital: 'Hope Clinic' },
  ];

  const [allRequests, setAllRequests] = useState(dummyRequests);

  useEffect(() => {
    AOS.init({ duration: 800 });
    applyFilter();
  }, [filterGroup, filterStatus]);

  const applyFilter = () => {
    let filtered = [...allRequests];
    if (filterGroup) {
      filtered = filtered.filter(req => req.bloodGroup === filterGroup);
    }
    if (filterStatus !== 'all') {
      filtered = filtered.filter(req => req.status === filterStatus);
    }
    setFilteredRequests(filtered);
  };

  const updateStatus = (id, status) => {
    const updated = allRequests.map(req =>
      req.id === id ? { ...req, status } : req
    );
    setAllRequests(updated);
    applyFilter();
  };

  const stats = {
    total: allRequests.length,
    fulfilled: allRequests.filter(r => r.status === 'fulfilled').length,
    pending: allRequests.filter(r => r.status === 'pending').length,
  };

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
          <Card className="shadow-sm text-center p-3" data-aos="fade-up" data-aos-delay="100">
            <h5>Fulfilled</h5>
            <h2 className="text-success">{stats.fulfilled}</h2>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm text-center p-3" data-aos="fade-up" data-aos-delay="200">
            <h5>Pending</h5>
            <h2 className="text-warning">{stats.pending}</h2>
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Row className="mb-4">
        <Col md={4}>
          <Form.Select onChange={e => setFilterGroup(e.target.value)} value={filterGroup}>
            <option value="">Filter by Blood Group</option>
            <option value="A+">A+</option>
            <option value="B+">B+</option>
            <option value="O-">O-</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select onChange={e => setFilterStatus(e.target.value)} value={filterStatus}>
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="fulfilled">Fulfilled</option>
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
              <Card className="request-card shadow-sm" data-aos="zoom-in" data-aos-delay={index * 100}>
                <Card.Body>
                  <h5>{req.patientName}</h5>
                  <p><strong>Blood Group:</strong> <Badge bg="danger">{req.bloodGroup}</Badge></p>
                  <p><strong>Units:</strong> {req.units}</p>
                  <p><strong>Hospital:</strong> {req.hospital}</p>
                  <p><strong>Status:</strong> 
                    <Badge bg={req.status === 'fulfilled' ? 'success' : 'warning'} className="ms-2">
                      {req.status}
                    </Badge>
                  </p>
                  <div className="d-flex justify-content-between mt-3">
                    <Button variant="outline-success" size="sm" onClick={() => updateStatus(req.id, 'fulfilled')}>
                      <FaCheckCircle /> Approve
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => updateStatus(req.id, 'rejected')}>
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
