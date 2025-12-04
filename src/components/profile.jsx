import React, { useState, useEffect, useContext } from "react";
import "./profile.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaCamera, FaEnvelope, FaTint, FaEdit } from "react-icons/fa";
import OverviewTab from "../components/OverviewTab";
import HostedDrivesTab from "../components/HostedDrivesTab";
import BloodRequestsTab from "../components/BloodRequestTab";
import EditProfileModal from "../components/EditProfileModal";
import { BloodContext } from "../context/BloodContext";
import {
  listenToUserProfile,
  updateUserProfile,
} from "../firebase_services/userService";
import { Spinner, Alert, Badge } from "react-bootstrap";

const Profile = () => {
  const { user, loadingUser, bloodDrives, requests } =
    useContext(BloodContext);

  const [activeTab, setActiveTab] = useState("overview");
  const [showModal, setShowModal] = useState(false);

  const [profileData, setProfileData] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    "https://via.placeholder.com/100"
  );
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out" });
  }, []);

  // 🔥 Load profile from Firestore when user is logged in
  useEffect(() => {
    if (!user) {
      setProfileData(null);
      setLoadingProfile(false);
      return;
    }

    const unsubscribe = listenToUserProfile(user.uid, (data) => {
      const mapped = {
        name: data?.name || user.displayName || "",
        email: data?.email || user.email || "",
        bloodType: data?.bloodGroup || "",
        photo:
          data?.photoURL ||
          user.photoURL ||
          "https://via.placeholder.com/100",
        isDonor: !!data?.isDonor,
      };

      setProfileData(mapped);
      setPreviewImage(mapped.photo);
      setLoadingProfile(false);
    });

    return () => unsubscribe && unsubscribe();
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setProfileData((prev) =>
        prev ? { ...prev, photo: imageUrl } : prev
      );
      // Note: this is just a local preview.
      // To truly persist images you'd integrate Firebase Storage.
    }
  };

  const saveProfileToBackend = async () => {
    if (!user || !profileData) return;
    setSavingProfile(true);
    setError("");

    try {
      await updateUserProfile(user.uid, {
        name: profileData.name,
        email: profileData.email,
        bloodGroup: profileData.bloodType,
        photoURL: profileData.photo,
      });
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleCloseModal = async () => {
    // When modal closes, persist latest profileData
    await saveProfileToBackend();
    setShowModal(false);
  };

  // 🔄 Loading and auth states
  if (loadingUser || loadingProfile) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p className="mt-2">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container py-4">
        <Alert variant="warning">Please log in to view your profile.</Alert>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="text-center mt-5">
        <p>No profile data found.</p>
      </div>
    );
  }

  // You can pass these to tabs later if you want:
  const myDrives = (bloodDrives || []).filter(
    (d) => d.createdBy && d.createdBy === user.email
  );
  const myRequests = (requests || []).filter(
    (r) => r.createdBy && r.createdBy === user.email
  );

  return (
    <div className="profile-page" data-aos="fade-up">
      {/* Left Sidebar */}
      <div className="profile-card" data-aos="fade-right">
        {error && (
          <Alert variant="danger" className="mb-2">
            {error}
          </Alert>
        )}
        {savingProfile && (
          <div className="mb-2 small text-muted">Saving profile...</div>
        )}

        <div className="profile-photo">
          <img
            src={previewImage || "https://via.placeholder.com/100"}
            alt="User"
            className="avatar"
          />
          <label className="upload-icon">
            <FaCamera />
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
        </div>

        <h2>
          {profileData.name}{" "}
          {profileData.isDonor && (
            <Badge bg="success" className="ms-2">
              Donor
            </Badge>
          )}
        </h2>
        <p className="email">
          <FaEnvelope /> {profileData.email}
        </p>
        <p className="blood">
          <FaTint /> Blood Type: {profileData.bloodType || "Not set"}
        </p>

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
          {/* You can pass myDrives / myRequests as props if those components support it */}
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
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Profile;
