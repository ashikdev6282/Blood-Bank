import React, { useContext, useState, useEffect } from 'react';
import { Table, Button, Form, Row, Col, Badge } from 'react-bootstrap';
import { BloodContext } from '../../context/BloodContext';
import DonorProfileModal from '../pages/DonorProfile';
import './donor.css';

const AdminDonors = () => {
  const { donors, setDonors } = useContext(BloodContext);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);

  useEffect(() => {
    let filtered = donors;

    if (searchTerm) {
      filtered = filtered.filter((donor) =>
        donor.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedBloodGroup) {
      filtered = filtered.filter(
        (donor) => donor.bloodGroup === selectedBloodGroup
      );
    }

    setFilteredDonors(filtered);
  }, [donors, searchTerm, selectedBloodGroup]);

  const handleViewProfile = (donor) => {
    setSelectedDonor(donor);
    setShowModal(true);
  };

  const handleBlock = (id) => {
    setDonors(donors.map(d => d.id === id ? { ...d, blocked: !d.blocked } : d));
  };

  const handleRemove = (id) => {
    if (window.confirm('Are you sure you want to remove this donor?')) {
      setDonors(donors.filter(d => d.id !== id));
    }
  };

  const totalDonors = donors.length;
  const blockedDonors = donors.filter(d => d.blocked).length;
  const activeDonors = totalDonors - blockedDonors;

  // Stats
  

  return (
    <div className="container mt-4 admin-donors-page">
      <h3 className="mb-3">Donor Management</h3>

      {/* Stats Summary */}
      <Row className="mb-4">
        <Col md={6}>
          <div className="stats-card p-3 bg-light border rounded shadow-sm">
            <h5>Total Registered Donors</h5>
            <h3>{totalDonors}</h3>
          </div>
        </Col>
        <Col md={6}>
          <div className="stats-card p-3 bg-light border rounded shadow-sm">
            <h5>Active Donors</h5>
            <h3>{activeDonors}</h3>
          </div>
        </Col>
      </Row>

      {/* Filter/Search */}
      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={6}>
          <Form.Select
            value={selectedBloodGroup}
            onChange={(e) => setSelectedBloodGroup(e.target.value)}
          >
            <option value="">Filter by Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Donor Table */}
      <Table responsive bordered hover className="donor-table">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Blood Group</th>
            <th>Donor Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDonors.map((donor, index) => (
            <tr key={index}>
              <td>{donor.name}</td>
              <td>{donor.email}</td>
              <td><Badge bg="danger">{donor.bloodGroup}</Badge></td>
              <td>
                {donor.isDonor ? (
                  <Badge bg="success">Active Donor</Badge>
                ) : (
                  <Badge bg="secondary">Not a Donor</Badge>
                )}
              </td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => handleViewProfile(donor)}
                  className="me-2"
                >
                  View Profile
                </Button>
                <Button variant="warning" size="sm" className="me-2">
                  Block
                </Button>
                <Button variant="danger" size="sm">
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Donor Profile Modal */}
      {selectedDonor && (
        <DonorProfileModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          donor={selectedDonor}
        />
      )}
    </div>
  );
};

export default AdminDonors;
