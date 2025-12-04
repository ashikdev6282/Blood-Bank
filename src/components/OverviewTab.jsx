import React, { useContext, useMemo } from "react";
import { BloodContext } from "../context/BloodContext";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import { FaHandsHelping, FaTint, FaHeartbeat } from "react-icons/fa";
import "./tabcontents.css";

const OverviewTab = () => {
  const {
    user,
    loadingUser,
    bloodDrives,
    loadingDrives,
    requests,
    loadingRequests,
  } = useContext(BloodContext);

  const loading = loadingUser || loadingDrives || loadingRequests;

  // Filter only this user's data
  const { myDrives, myRequests } = useMemo(() => {
    if (!user) return { myDrives: [], myRequests: [] };

    const email = user.email;

    return {
      myDrives: (bloodDrives || []).filter(
        (d) => d.createdBy && d.createdBy === email
      ),
      myRequests: (requests || []).filter(
        (r) => r.createdBy && r.createdBy === email
      ),
    };
  }, [user, bloodDrives, requests]);

  // If not logged in
  if (!user && !loadingUser) {
    return (
      <div className="text-center py-4">
        <p className="text-muted">Please log in to view your profile.</p>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="text-center py-4">
        <Spinner animation="border" />
        <p className="mt-2 text-muted">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="overview-tab" data-aos="fade-up" data-aos-duration="800">
      <h2>
        Welcome back, {user?.displayName || user?.name || user?.email.split("@")[0]} 👋
      </h2>
      <p className="subtext">Here’s a summary of your activity.</p>

      {/* Stats Cards */}
      <Row className="mt-4 g-3">
        <Col md={4}>
          <Card className="p-3 text-center shadow-sm stat-card">
            <FaHandsHelping size={30} className="mb-2 text-danger" />
            <h3>{myDrives.length}</h3>
            <p>Drives Hosted</p>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="p-3 text-center shadow-sm stat-card">
            <FaTint size={30} className="mb-2 text-primary" />
            <h3>{myRequests.length}</h3>
            <p>Blood Requests</p>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="p-3 text-center shadow-sm stat-card">
            <FaHeartbeat size={30} className="mb-2 text-success" />
            <h3>{myRequests.filter((r) => r.status === "fulfilled").length}</h3>
            <p>Lives Saved</p>
          </Card>
        </Col>
      </Row>

      {/* Recent data preview */}
      <div className="mt-5">
        <h4>Your Recent Drives</h4>
        {myDrives.length === 0 ? (
          <p className="text-muted">No hosted drives yet.</p>
        ) : (
          <ul className="recent-list">
            {myDrives.slice(0, 3).map((d) => (
              <li key={d.id}>
                <strong>{d.organization}</strong> – {d.date} at {d.time}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-4">
        <h4>Your Recent Requests</h4>
        {myRequests.length === 0 ? (
          <p className="text-muted">No blood requests yet.</p>
        ) : (
          <ul className="recent-list">
            {myRequests.slice(0, 3).map((r) => (
              <li key={r.id}>
                <strong>{r.bloodGroup}</strong> needed at {r.hospital || "Hospital"} –{" "}
                <span className="badge bg-warning text-dark">{r.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OverviewTab;
