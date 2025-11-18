import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Topbar from './components/topbarPage.jsx';
import Overview from './pages/overview';
import './adminDashboard.css';
import BloodStock from './pages/bloodstock';
import BloodRequest from './pages/bloodrequest';
import DonorsOverview from './pages/Donors';
import AdminDrive from './pages/AdminDrives';
import StatisticsAdmin from './pages/StatisticsAdmin';
import MessagesAdmin from './pages/MessagesAdmin';


const AdminDashboard = () => {
    const [sidebarOpen , setSideBarOpen] = useState(false);

    const toggleSidebar = () => {
        setSideBarOpen(!sidebarOpen);
    };


    return(
        <div className='admin-container d-flex'>
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSideBarOpen} />
            <div className='main-content flex-grow-1'>
                <Topbar toggleSidebar={toggleSidebar} />
                <div className='content-body p-3'>
                    <Routes>
                        <Route path='/overview' element={<Overview />} />
                        <Route path='/blood-stock' element={<BloodStock />} />
                        <Route path='/requests' element={<BloodRequest />} />
                        <Route path='/donors' element={<DonorsOverview />} />
                        <Route path='/drives' element={<AdminDrive />} />
                        <Route path='/statistics' element={<StatisticsAdmin />} />
                        <Route path='/messages' element={<MessagesAdmin />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard