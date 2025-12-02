import React, { useContext, useEffect, useMemo } from "react";
import { BloodContext } from "../../context/BloodContext";
import { FaUsers, FaTint, FaHandsHelping } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Spinner } from "react-bootstrap";

import "./overview.css";

const Overview = () => {
  const {
    donors,
    loadingDonors,
    requests,
    loadingRequests,
    bloodDrives,
    loadingDrives,
  } = useContext(BloodContext);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const loading = loadingDonors || loadingRequests || loadingDrives;

  // 🔢 Compute live stats
  const { totalDrives, totalRequests, totalDonors } = useMemo(() => {
    return {
      totalDrives: bloodDrives.length,
      totalRequests: requests.length,
      totalDonors: donors.length,
    };
  }, [bloodDrives, requests, donors]);

  const stats = [
    {
      label: "Total Drives",
      value: totalDrives,
      icon: <FaHandsHelping size={30} />,
      color: "#f44336",
    },
    {
      label: "Blood Requests",
      value: totalRequests,
      icon: <FaTint size={30} />,
      color: "#3f51b5",
    },
    {
      label: "Donors",
      value: totalDonors,
      icon: <FaUsers size={30} />,
      color: "#4caf50",
    },
  ];

  const chartData = [
    { name: "Drives", value: totalDrives },
    { name: "Requests", value: totalRequests },
    { name: "Donors", value: totalDonors },
  ];

  const pieColors = ["#f44336", "#3f51b5", "#4caf50"];

  if (loading) {
    return (
      <div className="overview text-center mt-5">
        <Spinner animation="border" />
        <p className="mt-2">Loading dashboard overview...</p>
      </div>
    );
  }

  return (
    <div className="overview">
      <h3 className="mb-4 fw-bold">Dashboard Overview</h3>

      {/* Stat Cards */}
      <div className="row">
        {stats.map((stat, idx) => (
          <div className="col-md-4 mb-4" key={idx}>
            <div
              className="card overview-card text-center"
              style={{ borderTop: `5px solid ${stat.color}` }}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="icon-wrapper mb-2" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <h5 className="stat-label">{stat.label}</h5>
              <h2 className="stat-value">{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="row mt-5">
        <h4 className="fw-bold mb-4">Data Visualization</h4>

        {/* Bar Chart */}
        <div className="col-md-6 mb-4">
          <div className="card p-3 shadow-sm">
            <h5 className="text-center mb-3">Blood Drives & Requests</h5>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="col-md-6 mb-4">
          <div className="card p-3 shadow-sm">
            <h5 className="text-center mb-3">Distribution Overview</h5>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
