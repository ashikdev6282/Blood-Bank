import React, { useState } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';
import './editProfileModal.css'; // You'll create this CSS

const EditProfileModal = ({ profileData, setProfileData, onClose }) => {
  const [formData, setFormData] = useState(profileData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setProfileData(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-btn" onClick={onClose}><FaTimes /></button>
        <h2>Edit Profile</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="bloodType"
          value={formData.bloodType}
          onChange={handleChange}
          placeholder="Blood Type"
        />
        <button className="save-btn" onClick={handleSave}>
          <FaSave /> Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfileModal;
