// src/components/HostedDrivesTab.jsx
import React, { useContext, useMemo } from "react";
import { BloodContext } from "../context/BloodContext";
import { Table, Badge, Spinner } from "react-bootstrap";

const HostedDrivesTab = () => {
  const { user, loadingUser, bloodDrives, loadingDrives } =
    useContext(BloodContext);

  const loading = loadingUser || loadingDrives;

  const myDrives = useMemo(() => {
    if (!user) return [];
    return (bloodDrives || []).filter(
      (d) => d.createdBy && d.createdBy === user.email
    );
  }, [user, bloodDrives]);

  if (!user && !loadingUser) {
    return <p>Please log in to see your hosted drives.</p>;
  }

  if (loading) {
    return (
      <div className="text-center py-4">
        <Spinner animation="border" />
        <p className="mt-2">Loading your drives...</p>
      </div>
    );
  }

  if (myDrives.length === 0) {
    return (
      <p className="text-muted">
        You haven&apos;t hosted any blood drives yet. Host your first drive from
        the Blood Drive page!
      </p>
    );
  }

  return (
    <div className="hosted-drives-tab">
      <Table responsive hover bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Organization</th>
            <th>Date</th>
            <th>Time</th>
            <th>Location</th>
            <th>Expected Donors</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {myDrives.map((drive, index) => (
            <tr key={drive.id || index}>
              <td>{index + 1}</td>
              <td>{drive.organization}</td>
              <td>{drive.date}</td>
              <td>{drive.time}</td>
              <td>{drive.location}</td>
              <td>{drive.expectedDonors}</td>
              <td>
                <Badge
                  bg={
                    drive.status === "Approved"
                      ? "success"
                      : drive.status === "Completed"
                      ? "primary"
                      : "warning"
                  }
                >
                  {drive.status || "Pending"}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default HostedDrivesTab;
