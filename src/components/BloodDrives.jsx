import React, { useContext } from "react";
import { BloodContext } from "../context/BloodContext";
import "./bloodDrives.css";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaPhoneAlt, FaUsers, } from "react-icons/fa";
import { Spinner } from "react-bootstrap";

const UpcomingDrives = () => {
  const { bloodDrives, loadingDrives } = useContext(BloodContext);

  const todayStr = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

  const upcomingDrives = (bloodDrives || [])
    .filter((drive) => {
      const driveDate = drive.date; // stored as "YYYY-MM-DD" from form
      return (
        drive.status === "Approved" &&
        driveDate &&
        driveDate >= todayStr
      );
    })
    .sort((a, b) => (a.date > b.date ? 1 : -1))
    .slice(0, 3); // show only next 3 upcoming drives

  return (
    <section className="upcoming-drives-section py-5">
      <div className="container">
        <h2 className="text-center mb-5 text-crimson fw-bold">
          Upcoming Blood Drives
        </h2>

        {loadingDrives ? (
          <div className="text-center">
            <Spinner animation="border" className="mb-2" />
            <p>Loading upcoming drives...</p>
          </div>
        ) : upcomingDrives.length === 0 ? (
          <p className="text-center">
            No upcoming approved drives right now. Check back soon!
          </p>
        ) : (
          <div className="row justify-content-center">
            {upcomingDrives.map((drive, index) => (
              <div key={drive.id || index} className="col-12 mb-4">
                <div className="drive-card-horizontal d-flex flex-column flex-md-row align-items-stretch">
                  <div className="drive-left pe-md-4 mb-3 mb-md-0 border-end">
                    <h5 className="text-crimson fw-bold mb-2">
                      {drive.fullName}
                    </h5>
                    <p className="org">{drive.organization}</p>
                    <p>
                      <FaCalendarAlt /> {drive.date}
                    </p>
                    <p>
                      <FaClock /> {drive.time}
                    </p>
                    <p>
                      <FaMapMarkerAlt /> {drive.location}
                    </p>
                  </div>

                  <div className="drive-right ps-md-4">
                    <p>
                      <FaPhoneAlt /> {drive.phoneNumber}
                    </p>
                    <p>
                      <strong>Email:</strong> {drive.email}
                    </p>
                    <p>
                      <strong>Drive Type:</strong> {drive.driveType}
                    </p>
                    <p>
                      <FaUsers /> {drive.expectedDonors} expected donors
                    </p>

                    {drive.specialRequirements && (
                      <p>
                        <strong>Special Requirements:</strong>{" "}
                        {drive.specialRequirements}
                      </p>
                    )}

                    {drive.description && (
                      <p>
                        <strong>Description:</strong> {drive.description}
                      </p>
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
