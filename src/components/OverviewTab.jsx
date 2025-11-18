import React from 'react';
import './tabcontents.css'; // Optional: scoped styles for tab content


const OverviewTab = () => {
  const stats = {
    totalDrives: 5,
    bloodRequests: 3,
    donatedUnits: 12,
  };

  return (
    <div className="overview-tab" data-aos="fade-up" data-aos-duration="800">
      <h2>Welcome back, John Doe 👋</h2>
      <p className="subtext">Here’s a summary of your activity.</p>

      <div className="overview-stats" data-aos="zoom-in" data-aos-duration="800">
        <div className="stat-card">
          <h3>{stats.totalDrives}</h3>
          <p>Drives Hosted</p>
        </div>
        <div className="stat-card" data-aos="zoom-in" data-aos-duration="800">
          <h3>{stats.bloodRequests}</h3>
          <p>Blood Requests</p>
        </div>
        <div className="stat-card" data-aos="zoom-in" data-aos-duration="800">
          <h3>{stats.donatedUnits}</h3>
          <p>Units Donated</p>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
