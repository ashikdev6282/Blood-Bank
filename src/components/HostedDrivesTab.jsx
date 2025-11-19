import React from 'react';
import Slider from 'react-slick';
import './hostedDrivetab.css';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaClock } from 'react-icons/fa';

const HostedDrivesTab = () => {
  const drivesData = [
    {
      id: 1,
      name: "John Doe",
      org: "Red Cross Society",
      date: "2024-11-21",
      time: "10:00 AM",
      location: "City Center, Trivandrum",
      phone: "123-456-7890",
      email: "john@example.com",
      type: "Community",
      donors: 100,
      requirements: "None",
      status: "Completed",
      desc: "Annual blood donation drive to support local hospitals.",
    },
    {
      id: 2,
      name: "Jane Smith",
      org: "Global Blood Org",
      date: "2024-10-15",
      time: "11:00 AM",
      location: "Main Hall, Kochi",
      phone: "987-654-3210",
      email: "jane@example.com",
      type: "Corporate",
      donors: 80,
      requirements: "Snacks",
      status: "Pending",
      desc: "Drive to encourage corporate donor participation.",
    },
    {
      id: 3,
      name: "Raj Kumar",
      org: "Youth Blood Circle",
      date: "2024-09-10",
      time: "09:30 AM",
      location: "Community Hall, Chennai",
      phone: "777-888-9999",
      email: "raj@example.com",
      type: "College",
      donors: 60,
      requirements: "Water Bottles",
      status: "Approved",
      desc: "Drive with college volunteers and NSS unit.",
    },
    // Add more if needed...
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1, // or 2 if you want multiple per view
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
    
  };

  return (
    <div className="hosted-drives-tab" data-aos="fade-up">
      <h2>Your Hosted Drives</h2>
      <div style={{ width: "100%", margin: "0 auto", maxWidth: "750px", padding: "20px" }}>
      <Slider {...settings}>
        {drivesData.map((drive) => (
          <div key={drive.id} className="carousel-card" data-aos="zoom-in" data-aos-delay={drive.id * 100}> 
            <div className="drive-card">
              <div className="card-header">
                <h3>{drive.name}</h3>
                <span className={`status ${drive.status.toLowerCase()}`}>{drive.status}</span>
              </div>
              <p><strong>Org:</strong> {drive.org}</p>
              <p><FaCalendarAlt /> {drive.date} <FaClock style={{ marginLeft: "10px" }} /> {drive.time}</p>
              <p><FaMapMarkerAlt /> {drive.location}</p>
              <p><FaPhone /> {drive.phone}</p>
              <p><FaEnvelope /> {drive.email}</p>
              <p><strong>Type:</strong> {drive.type}</p>
              <p><strong>Expected Donors:</strong> {drive.donors}</p>
              <p><strong>Requirements:</strong> {drive.requirements}</p>
              <p><strong>Description:</strong> {drive.desc}</p>
            </div>
          </div>
        ))}
      </Slider>
      </div>
    </div>
  );
};

export default HostedDrivesTab;
