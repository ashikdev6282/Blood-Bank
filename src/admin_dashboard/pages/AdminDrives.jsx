import React, { useContext, useState } from 'react';
import { Table, Modal, Button, Badge, Row, Col, Form } from 'react-bootstrap';
import { BloodContext } from '../../context/BloodContext';
import './admindrive.css'; 

const AdminDrives = () => {
  const { hostedDrives, setHostedDrives } = useContext(BloodContext);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('');

  const handleStatusChange = (id, newStatus) => {
    setHostedDrives(prev =>
      prev.map(d => (d.id === id ? { ...d, status: newStatus } : d))
    );
  };

  const handleRemove = (id) => {
    setHostedDrives(prev => prev.filter(d => d.id !== id));
    setShowModal(false);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <Badge bg="warning">Pending</Badge>;
      case 'Approved':
        return <Badge bg="success">Approved</Badge>;
      case 'Completed':
        return <Badge bg="primary">Completed</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  const filteredDrives = hostedDrives.filter(d =>
    d.fullName.toLowerCase().includes(filter.toLowerCase()) ||
    d.organization.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="admin-drives-page p-4">
      <h3 className="mb-4">Drive Management</h3>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search by organizer or organization..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </Col>
      </Row>

      <Table responsive bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Organizer</th>
            <th>Organization</th>
            <th>Date</th>
            <th>Location</th>
            <th>Type</th>
            <th>Expected</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDrives.map((drive, idx) => (
            <tr key={drive.id}>
              <td>{idx + 1}</td>
              <td>{drive.fullName}</td>
              <td>{drive.organization}</td>
              <td>{drive.date}</td>
              <td>{drive.location}</td>
              <td>{drive.driveType}</td>
              <td>{drive.expectedDonors}</td>
              <td>{getStatusBadge(drive.status)}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => {
                    setSelectedDrive(drive);
                    setShowModal(true);
                  }}
                >
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      {selectedDrive && (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Drive Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Organizer:</strong> {selectedDrive.fullName}</p>
            <p><strong>Email:</strong> {selectedDrive.email}</p>
            <p><strong>Phone:</strong> {selectedDrive.phoneNumber}</p>
            <p><strong>Organization:</strong> {selectedDrive.organization}</p>
            <p><strong>Date:</strong> {selectedDrive.date}</p>
            <p><strong>Time:</strong> {selectedDrive.time}</p>
            <p><strong>Location:</strong> {selectedDrive.location}</p>
            <p><strong>Type:</strong> {selectedDrive.driveType}</p>
            <p><strong>Expected Donors:</strong> {selectedDrive.expectedDonors}</p>
            <p><strong>Special Requirements:</strong> {selectedDrive.specialRequirements || 'None'}</p>
            <p><strong>Description:</strong> {selectedDrive.description}</p>
            <p><strong>Status:</strong> {getStatusBadge(selectedDrive.status)}</p>
          </Modal.Body>
          <Modal.Footer>
            {selectedDrive.status === 'Pending' && (
              <Button
                variant="success"
                onClick={() => handleStatusChange(selectedDrive.id, 'Approved')}
              >
                Approve
              </Button>
            )}
            {selectedDrive.status === 'Approved' && (
              <Button
                variant="primary"
                onClick={() => handleStatusChange(selectedDrive.id, 'Completed')}
              >
                Mark as Completed
              </Button>
            )}
            <Button variant="danger" onClick={() => handleRemove(selectedDrive.id)}>
              Remove
            </Button>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default AdminDrives;
