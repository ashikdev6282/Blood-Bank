import React, { useState, useEffect } from 'react';
import './profile.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaCamera, FaEnvelope, FaTint, FaEdit } from 'react-icons/fa';
import OverviewTab from '../components/OverviewTab';
import HostedDrivesTab from '../components/HostedDrivesTab';
import BloodRequestsTab from '../components/BloodRequestTab';
import EditProfileModal from '../components/EditProfileModal'; // new import

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showModal, setShowModal] = useState(false);

  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bloodType: 'A+',
    photo: 'https://via.placeholder.com/100',
  });

  const [previewImage, setPreviewImage] = useState(profileData.photo);

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out' });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setProfileData({ ...profileData, photo: imageUrl });
    }
  };

  return (
    <div className="profile-page" data-aos="fade-up">
      {/* Left Sidebar */}
      <div className="profile-card" data-aos="fade-right">
        <div className="profile-photo">
          <img src={previewImage || "https://via.placeholder.com/100"} alt="User" className="avatar" />
          <label className="upload-icon">
            <FaCamera />
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
        </div>

        <h2>{profileData.name}</h2>
        <p className="email"><FaEnvelope /> {profileData.email}</p>
        <p className="blood"><FaTint /> Blood Type: {profileData.bloodType}</p>

        <button className="edit-btn" onClick={() => setShowModal(true)}>
          <FaEdit /> Edit Profile
        </button>
      </div>

      {/* Right Content */}
      <div className="profile-content" data-aos="fade-left">
        <div className="tabs">
          <button
            className={activeTab === "overview" ? "tab active" : "tab"}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={activeTab === "drives" ? "tab active" : "tab"}
            onClick={() => setActiveTab("drives")}
          >
            Hosted Drives
          </button>
          <button
            className={activeTab === "requests" ? "tab active" : "tab"}
            onClick={() => setActiveTab("requests")}
          >
            Blood Requests
          </button>
        </div>

        <div className="tab-content" data-aos="zoom-in">
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "drives" && <HostedDrivesTab />}
          {activeTab === "requests" && <BloodRequestsTab />}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showModal && (
        <EditProfileModal
          profileData={profileData}
          setProfileData={setProfileData}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Profile;
