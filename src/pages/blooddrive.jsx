import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import "./blooddrive.css";
import bloodDriveAnimation from "../assets/bloodrive-image.png";
import { FaCalendarAlt, FaHandsHelping, FaHeartbeat } from "react-icons/fa";
import Lottie from "lottie-react";
import JourneyPath from "../assets/journey-path.json";
import { BloodContext } from "../context/BloodContext";
import { generateTimeOptions } from "../utils/timeutils";

const BloodDrive = () => {
  const [stats, setStats] = useState({ drives: 0, donors: 0, lives: 0 });
  const { addBloodDrive, user } = useContext(BloodContext);

  const [formData, setFormData] = useState({  
    fullName: '',
    organization: '',
    email: '',
    phoneNumber: '',
    date: '',
    location: '',
    time: '',
    driveType: '',
    expectedDonors: 0,
    specialRequirements: '',
    description: '',
    agreeToContact: false,
  });

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    AOS.init({ duration: 1000 });
    animateStats();
  }, []);

  const animateStats = () => {
    let drives = 0, donors = 0, lives = 0;
    const interval = setInterval(() => {
      drives = Math.min(drives + 5, 320);
      donors = Math.min(donors + 25, 5200);
      lives = Math.min(lives + 15, 7450);
      setStats({ drives, donors, lives });

      if (drives === 320 && donors === 5200 && lives === 7450) {
        clearInterval(interval);
      }
    }, 30);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.organization || !formData.email || !formData.location || !formData.date || !formData.time) {
      alert("Please fill all required fields.");
      return;
    }

    addBloodDrive(formData);
    setSuccessMessage("Blood drive hosted successfully!");

    setFormData({
      fullName: '',
      organization: '',
      email: '',
      phoneNumber: '',
      date: '',
      location: '',
      time: '',
      driveType: '',
      expectedDonors: 0,
      specialRequirements: '',
      description: '',
      agreeToContact: false,
    });

    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <section className="blood-drive-section">
      <Container fluid className="py-5">

        {/* Hero Section */}
        <Row className="align-items-center hero-section" data-aos="fade-up">
          <Col md={6}>
            <h1 className="display-5 fw-bold">Organize a Blood Drive</h1>
            <p className="lead">Make a difference by hosting a life-saving blood donation event in your community or organization.</p>
            <Button className="cta-btn" variant="danger">Learn More</Button>
          </Col>
          <Col md={6}>
            <img
              src={bloodDriveAnimation}
              alt="Blood Drive Illustration"
              className="img-fluid animated-bounce"
              style={{ borderRadius: "20px" }}
            />
          </Col>
        </Row>

        {/* Info Sections */}
        <Row className="info-section my-5 px-4 justify-content-center" data-aos="fade-up">
          <Col md={4} sm={12} className="text-center info-card" data-aos="zoom-in">
            <div className="info-icon"><FaCalendarAlt /></div>
            <h4>Plan the Event</h4>
            <p>Create awareness and choose a location, date, and team for smooth hosting.</p>
          </Col>
          <Col md={4} sm={12} className="text-center info-card" data-aos="zoom-in" data-aos-delay="150">
            <div className="info-icon"><FaHandsHelping /></div>
            <h4>Get Support</h4>
            <p>Our team provides support materials, volunteers, and medical equipment.</p>
          </Col>
          <Col md={4} sm={12} className="text-center info-card" data-aos="zoom-in" data-aos-delay="300">
            <div className="info-icon"><FaHeartbeat /></div>
            <h4>Save Lives</h4>
            <p>Every donation made during your event contributes to saving multiple lives.</p>
          </Col>
        </Row>

        {/* Host Form Section - Lottie Left, Form Right */}
        <Row className="host-form-section my-5 p-4 rounded align-items-center" data-aos="fade-up">
          <Col md={6} className="text-center order-md-1 order-2" data-aos="zoom-in">
            <Lottie animationData={JourneyPath} loop={true} style={{ height: 280, maxWidth: 400, margin: '0 auto' }} />
            <h2 className="mt-3">Host a Blood Drive</h2>
          </Col>

          <Col md={6} className="order-md-2 order-1">
            {user?.isDonor ? (
              <>
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                <Form className="glass-form" onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Organization (School, NGO, Company)" name="organization" value={formData.organization} onChange={handleChange} required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control type="email" placeholder="Email Address" name="email" value={formData.email} onChange={handleChange} required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control type="tel" placeholder="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Venue / Location" name="location" value={formData.location} onChange={handleChange} required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Select name="time" value={formData.time} onChange={handleChange} required>
                      <option value="">Select Time</option>
                      {generateTimeOptions().map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Select name="driveType" value={formData.driveType} onChange={handleChange} required>
                      <option value="">Select Drive Type</option>
                      <option value="indoor">Indoor</option>
                      <option value="outdoor">Outdoor</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control type="number" placeholder="Expected Number of Donors" name="expectedDonors" min={1} value={formData.expectedDonors} onChange={handleChange} required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control as="textarea" placeholder="Any special requirements?" name="specialRequirements" rows={3} value={formData.specialRequirements} onChange={handleChange} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control as="textarea" placeholder="Brief description of the event" name="description" rows={3} value={formData.description} onChange={handleChange} required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="I agree to be contacted regarding the blood drive."
                      name="agreeToContact"
                      checked={formData.agreeToContact}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Button type="submit" variant="outline-dark">Submit</Button>
                </Form>
              </>
            ) : (
              <Alert variant="warning">
                Only registered donors can host a blood drive. Please register as a donor to access this form.
              </Alert>
            )}
          </Col>
        </Row>

        {/* Stats Section */}
        <Row className="text-center py-5" data-aos="fade-up">
          <h2 className="fw-bold mb-4">Successful Blood Drives</h2>
          <Col md={4}>
            <h3 className="display-6">{stats.drives}+</h3>
            <p>Drives Hosted</p>
          </Col>
          <Col md={4}>
            <h3 className="display-6">{stats.donors}+</h3>
            <p>Donors Registered</p>
          </Col>
          <Col md={4}>
            <h3 className="display-6">{stats.lives}+</h3>
            <p>Lives Saved</p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BloodDrive;