import React, { useContext } from 'react';
import { BloodContext } from '../../context/BloodContext';
import { FaUsers, FaTint, FaHandsHelping } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
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
  Legend
} from 'recharts';

import './overview.css';

AOS.init();

const Overview = () => {
  const { adminStats } = useContext(BloodContext);

  const stats = [
    {
      label: 'Total Drives',
      value: adminStats?.totalDrives || 0,
      icon: <FaHandsHelping size={30} />,
      color: '#f44336',
    },
    {
      label: 'Blood Requests',
      value: adminStats?.totalRequests || 0,
      icon: <FaTint size={30} />,
      color: '#3f51b5',
    },
    {
      label: 'Donors',
      value: adminStats?.totalDonors || 0,
      icon: <FaUsers size={30} />,
      color: '#4caf50',
    },
  ];

  const chartData = [
    { name: 'Drives', value: adminStats?.totalDrives || 0 },
    { name: 'Requests', value: adminStats?.totalRequests || 0 },
    { name: 'Donors', value: adminStats?.totalDonors || 0 },
  ];

  const pieColors = ['#f44336', '#3f51b5', '#4caf50'];

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
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
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
