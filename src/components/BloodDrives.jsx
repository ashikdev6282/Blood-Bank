import React, { useContext } from 'react';
import { BloodContext } from '../context/BloodContext';
import './bloodDrives.css';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaPhoneAlt, FaUsers } from 'react-icons/fa';

const UpcomingDrives = () => {
  const { bloodDrives } = useContext(BloodContext);

  return (
    <section className="upcoming-drives-section py-5">
      <div className="container">
        <h2 className="text-center mb-5 text-crimson fw-bold">Upcoming Blood Drives</h2>

        {bloodDrives.length === 0 ? (
          <p className="text-center">No upcoming drives available yet.</p>
        ) : (
          <div className="row justify-content-center">
            {bloodDrives.map((drive, index) => (
              <div key={index} className="col-12 mb-4">
                <div className="drive-card-horizontal d-flex flex-column flex-md-row align-items-stretch">
                  
                  <div className="drive-left pe-md-4 mb-3 mb-md-0 border-end">
                    <h5 className="text-crimson fw-bold mb-2">{drive.fullName}</h5>
                    <p className="org">{drive.organization}</p>
                    <p><FaCalendarAlt /> {drive.date}</p>
                    <p><FaClock /> {drive.time}</p>
                    <p><FaMapMarkerAlt /> {drive.location}</p>
                  </div>

                  <div className="drive-right ps-md-4">
                    <p><FaPhoneAlt /> {drive.phoneNumber}</p>
                    <p><strong>Email:</strong> {drive.email}</p>
                    <p><strong>Drive Type:</strong> {drive.driveType}</p>
                    <p><FaUsers /> {drive.expectedDonors}</p>

                    {drive.specialRequirements && (
                      <p><strong>Special Requirements:</strong> {drive.specialRequirements}</p>
                    )}

                    {drive.description && (
                      <p><strong>Description:</strong> {drive.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingDrives;
