import React, { useContext, useEffect } from 'react';
import { BloodContext } from '../../context/BloodContext';
import { Row, Col, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaUsers, FaHeartbeat, FaEnvelope, FaTint, FaCheckCircle } from 'react-icons/fa';
import './statisticsadmin.css';

const StatisticsAdmin = () => {
  const { adminStats } = useContext(BloodContext);

  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-in-out' });
  }, []);

  const statsData = [
    { title: 'Total Drives', value: adminStats.totalDrives, icon: <FaHeartbeat />, color: '#dc3545' },
    { title: 'Approved Drives', value: adminStats.approvedDrives || 20, icon: <FaCheckCircle />, color: '#28a745' },
    { title: 'Total Donors', value: adminStats.totalDonors, icon: <FaUsers />, color: '#17a2b8' },
    { title: 'Pending Messages', value: adminStats.messages, icon: <FaEnvelope />, color: '#ffc107' },
  ];

  return (
    <div className="admin-section" data-aos="fade-up">
      <h2 className="text-center mb-4">📊 Platform Statistics</h2>

      <Row className="mb-5">
        {statsData.map((stat, idx) => (
          <Col xs={12} sm={6} lg={3} key={idx} className="mb-4">
            <Card className="stat-card shadow" style={{ borderLeft: `5px solid ${stat.color}` }}>
              <Card.Body className="d-flex align-items-center">
                <div className="icon-wrapper" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                  {stat.icon}
                </div>
                <div className="ms-3">
                  <h4>{stat.value}</h4>
                  <p className="mb-0">{stat.title}</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h4 className="section-subtitle mb-3">🩸 Blood Stock Overview</h4>
      <Row>
        {adminStats.bloodStock.map((bs, idx) => (
          <Col xs={6} sm={4} md={3} lg={2} key={idx} className="mb-3">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id={`tooltip-${idx}`}>{bs.units} units available</Tooltip>}
            >
              <Card className="stock-card text-center shadow-sm">
                <Card.Body>
                  <h5 className="blood-group">{bs.bloodGroup}</h5>
                  <p className="units">{bs.units} Units</p>
                </Card.Body>
              </Card>
            </OverlayTrigger>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default StatisticsAdmin;
