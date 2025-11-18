import React from 'react';
import './tabcontents.css'; 


const BloodRequestsTab = () => {
  const requests = [
    {
      id: 1,
      hospital: 'General Hospital',
      date: '2025-05-12',
      bloodType: 'B+',
      status: 'Fulfilled',
    },
    {
      id: 2,
      hospital: 'Sunrise Clinic',
      date: '2025-06-01',
      bloodType: 'O-',
      status: 'Pending',
    },
  ];

  return (
    <div>
      <h2>Your Blood Requests</h2>
      <ul className="request-list" data-aos="fade-up">
        {requests.map((req) => (
          <li key={req.id} className="request-card" data-aos="zoom-in" data-aos-delay={req.id * 100}> 
            <h4>{req.hospital}</h4>
            <p><strong>Date:</strong> {req.date}</p>
            <p><strong>Blood Group:</strong> {req.bloodType}</p>
            <span className={`status ${req.status.toLowerCase()}`}>{req.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BloodRequestsTab;
