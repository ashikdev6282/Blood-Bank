// src/components/BloodRequestTab.jsx
import React, { useContext, useMemo } from "react";
import { BloodContext } from "../context/BloodContext";
import { Table, Badge, Spinner } from "react-bootstrap";

const BloodRequestsTab = () => {
  const { user, loadingUser, requests, loadingRequests } =
    useContext(BloodContext);

  const loading = loadingUser || loadingRequests;

  const myRequests = useMemo(() => {
    if (!user) return [];
    return (requests || []).filter(
      (r) => r.createdBy && r.createdBy === user.email
    );
  }, [user, requests]);

  if (!user && !loadingUser) {
    return <p>Please log in to see your blood requests.</p>;
  }

  if (loading) {
    return (
      <div className="text-center py-4">
        <Spinner animation="border" />
        <p className="mt-2">Loading your requests...</p>
      </div>
    );
  }

  if (myRequests.length === 0) {
    return (
      <p className="text-muted">
        You haven&apos;t submitted any blood requests yet.
      </p>
    );
  }

  return (
    <div className="blood-requests-tab">
      <Table responsive hover bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Patient</th>
            <th>Blood Group</th>
            <th>Units</th>
            <th>Hospital</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {myRequests.map((req, index) => (
            <tr key={req.id || index}>
              <td>{index + 1}</td>
              <td>{req.patientName || "Patient"}</td>
              <td>{req.bloodGroup}</td>
              <td>{req.units || "-"}</td>
              <td>{req.hospital || "-"}</td>
              <td>
                <Badge
                  bg={
                    req.status === "fulfilled"
                      ? "success"
                      : req.status === "rejected"
                      ? "danger"
                      : "warning"
                  }
                >
                  {req.status || "Pending"}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BloodRequestsTab;
