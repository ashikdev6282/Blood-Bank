import React, { useContext, useState, useEffect } from "react";
import {
  Table,
  Button,
  Form,
  Row,
  Col,
  Badge,
  Spinner,
} from "react-bootstrap";
import { BloodContext } from "../../context/BloodContext";
import DonorProfileModal from "../pages/DonorProfile";
import "./donor.css";

const AdminDonors = () => {
  const {
    donors,
    loadingDonors,
    updateDonorInfo,
    removeDonor,
  } = useContext(BloodContext);

  const [filteredDonors, setFilteredDonors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);

  useEffect(() => {
    let filtered = donors;

    if (searchTerm) {
      filtered = filtered.filter((donor) =>
        donor.name?.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleBlock = async (donor) => {
    try {
      await updateDonorInfo(donor.id, { blocked: !donor.blocked });
    } catch (err) {
      console.error("Error updating donor block status:", err);
    }
  };

  const handleRemove = async (id) => {
    if (!window.confirm("Are you sure you want to remove this donor?")) return;
    try {
      await removeDonor(id);
    } catch (err) {
      console.error("Error removing donor:", err);
    }
  };

  const totalDonors = donors.length;
  const blockedDonors = donors.filter((d) => d.blocked).length;
  const activeDonors = totalDonors - blockedDonors;

  if (loadingDonors) {
    return (
      <div className="container mt-4 admin-donors-page text-center">
        <Spinner animation="border" className="mt-4" />
        <p className="mt-2">Loading donors...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4 admin-donors-page">
      <h3 className="mb-3">Donor Management</h3>

      {/* Stats Summary */}
      <Row className="mb-4">
        <Col md={4}>
          <div className="stats-card p-3 bg-light border rounded shadow-sm">
            <h5>Total Registered Donors</h5>
            <h3>{totalDonors}</h3>
          </div>
        </Col>
        <Col md={4}>
          <div className="stats-card p-3 bg-light border rounded shadow-sm">
            <h5>Active Donors</h5>
            <h3>{activeDonors}</h3>
          </div>
        </Col>
        <Col md={4}>
          <div className="stats-card p-3 bg-light border rounded shadow-sm">
            <h5>Blocked Donors</h5>
            <h3>{blockedDonors}</h3>
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
            <th>Contact / Email</th>
            <th>Location</th>
            <th>Blood Group</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDonors.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center text-muted">
                No donors found.
              </td>
            </tr>
          ) : (
            filteredDonors.map((donor) => (
              <tr key={donor.id}>
                <td>{donor.name}</td>
                <td>{donor.email || donor.contact || "-"}</td>
                <td>{donor.location || "-"}</td>
                <td>
                  <Badge bg="danger">{donor.bloodGroup}</Badge>
                </td>
                <td>
                  <Badge bg={donor.blocked ? "secondary" : "success"}>
                    {donor.blocked ? "Blocked" : "Active Donor"}
                  </Badge>
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
                  <Button
                    variant={donor.blocked ? "success" : "warning"}
                    size="sm"
                    className="me-2"
                    onClick={() => handleBlock(donor)}
                  >
                    {donor.blocked ? "Unblock" : "Block"}
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemove(donor.id)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))
          )}
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
