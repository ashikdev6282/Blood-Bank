import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaUserCircle, FaTint, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import './donorprofilemodel.css';

const DonorProfile = ({ show, handleClose, donor }) => {
  if (!donor) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Donor Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center mb-3">
          {donor.photo ? (
            <img src={donor.photo} alt="Donor" className="rounded-circle" width="100" />
          ) : (
            <FaUserCircle size={100} />
          )}
          <h5 className="mt-2">{donor.name}</h5>
          <span className="badge bg-success">{donor.isDonor ? 'Active Donor' : 'Not a Donor'}</span>
        </div>

        <div className="d-flex align-items-center mb-2"><FaEnvelope className="me-2" /> {donor.email}</div>
        <div className="d-flex align-items-center mb-2"><FaPhone className="me-2" /> {donor.phone}</div>
        <div className="d-flex align-items-center mb-2"><FaTint className="me-2" /> {donor.bloodGroup}</div>
        <div className="d-flex align-items-center mb-2"><FaMapMarkerAlt className="me-2" /> {donor.location}</div>

        {/* Hosted Drives section (if you want) */}
        {donor.hostedDrives?.length > 0 && (
          <div className="mt-3">
            <h6>Hosted Drives:</h6>
            <ul>
              {donor.hostedDrives.map((drive, index) => (
                <li key={index}>{drive}</li>
              ))}
            </ul>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DonorProfile;
