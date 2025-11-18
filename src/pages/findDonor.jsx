import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./findDonor.css";
import Aos from "aos";
import "aos/dist/aos.css";
import IndiaMap from '../assets/india-map.png';
import DonorFind from '../assets/find-donor1.jpg';
import Lottie from "lottie-react";
import heartbeatAnimation from "../assets/lottie-animation.json";
// import axios from "axios"; // Uncomment when backend is ready

// Temporary mock data
const mockDonors = [
  { name: 'Akhil Sharma', group: 'O+', location: 'Hyderabad', status: 'Available' },
  { name: 'Sneha Reddy', group: 'B+', location: 'Bangalore', status: 'Available' },
  { name: 'Manoj Verma', group: 'A-', location: 'Delhi', status: 'Busy' },
  { name: 'Fatima Khan', group: 'AB+', location: 'Mumbai', status: 'Available' },
];

const FindDonor = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 1200 });
  }, []);

  useEffect(() => {
    // Simulate fetch delay with mock data
    setIsLoading(true);
    setError(null);

    const timeout = setTimeout(() => {
      try {
        const lowerTerm = searchTerm.toLowerCase();
        const filtered = mockDonors.filter((donor) =>
          donor.location.toLowerCase().includes(lowerTerm) &&
          (bloodGroup === "" || donor.group === bloodGroup)
        );
        setFilteredDonors(filtered);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to filter donor data.");
        setIsLoading(false);
      }
    }, 700);

    return () => clearTimeout(timeout);
  }, [searchTerm, bloodGroup]);

  // 🔧 Replace this with actual API call when backend is ready
  /*
  useEffect(() => {
    const fetchDonors = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/donors', {
          params: {
            location: searchTerm,
            group: bloodGroup,
          },
        });
        setFilteredDonors(response.data);
      } catch (err) {
        setError("Failed to fetch donors from server.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDonors();
  }, [searchTerm, bloodGroup]);
  */

  return (
    <div className="find-donor-page">
      {/* Hero Section */}
      <section className="find-donor-hero parallax-bg" data-aos="fade-up">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start">
              <h1 className="display-4 fw-bold">Find a Donor</h1>
              <p className="hero-description">
                Search and connect with registered blood donors in your area instantly. Save time, save lives.
              </p>
              <Button variant="outline-dark" size="lg">Search Now</Button>
            </Col>
            <Col md={6}>
              <img src={DonorFind} alt="Find Donor" className="img-fluid rounded hero-image" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Search Filters */}
      <section className="search-section py-5" data-aos="zoom-in">
        <Container>
          <Row className="justify-content-center g-3">
            <Col md={6} lg={4}>
              <Form.Control
                type="text"
                placeholder="Enter location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col md={6} lg={4}>
              <Form.Select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                <option value="">All Blood Groups</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </Form.Select>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Donor Cards */}
      <section className="donor-availability-section" data-aos="fade-up">
        <Container>
          <h2 className="section-title text-center mb-5">Live Donor Availability</h2>

          {isLoading && <div className="text-center"><Spinner animation="border" variant="danger" /></div>}
          {error && <Alert variant="danger" className="text-center">{error}</Alert>}

          <Row className="g-4">
            {!isLoading && filteredDonors.length > 0 ? (
              filteredDonors.map((donor, index) => (
                <Col md={6} lg={3} key={index}>
                  <div className={`donor-card styled-card ${donor.status.toLowerCase()}`} data-aos="zoom-in">
                    <div className="donor-card-header">
                      <div className={`status-indicator ${donor.status.toLowerCase()}`}></div>
                      <span className="status-text">{donor.status}</span>
                    </div>
                    <div className="donor-info">
                      <h5>{donor.name}</h5>
                      <p className="blood-group">🩸 <strong>{donor.group}</strong></p>
                      <p className="location">📍 {donor.location}</p>
                    </div>
                  </div>
                </Col>
              ))
            ) : (!isLoading && !error) && (
              <p className="text-center">No matching donors found.</p>
            )}
          </Row>
        </Container>
      </section>

      {/* Map */}
      <section className="donor-map-section" data-aos="fade-up">
        <Container>
          <h2 className="text-center section-title mb-5">Find Donors Around You</h2>
          <div className="map-container">
            <img src={IndiaMap} alt="Map" className="map-image" />
            <div className="marker marker-1" data-aos="zoom-in"></div>
            <div className="marker marker-2" data-aos="zoom-in" data-aos-delay="200"></div>
            <div className="marker marker-3" data-aos="zoom-in" data-aos-delay="400"></div>
            <div className="marker marker-4" data-aos="zoom-in" data-aos-delay="600"></div>
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="how-it-works-section" data-aos="fade-up">
        <Container>
          <h2 className="section-title text-center mb-5">How It Works</h2>
          <Row className="gy-4 text-center">
            <Col md={4}>
              <div className="how-card" data-aos="zoom-in" data-aos-delay="100">
                <i className="fas fa-map-marker-alt how-icon"></i>
                <h5>1. Search Location</h5>
                <p>Enter your location to find available donors nearby in real time.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="how-card" data-aos="zoom-in" data-aos-delay="300">
                <i className="fas fa-user-friends how-icon"></i>
                <h5>2. View Donors</h5>
                <p>Check donor availability, blood groups, and contact details instantly.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="how-card" data-aos="zoom-in" data-aos-delay="500">
                <i className="fas fa-hand-holding-heart how-icon"></i>
                <h5>3. Connect</h5>
                <p>Reach out to suitable donors directly and get lifesaving help fast.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA */}
      <section className="donor-cta-banner" data-aos="zoom-in-up">
        <Container className="text-center">
          <h2 className="cta-title mb-3">Be the Reason Someone Lives</h2>
          <p className="cta-subtitle mb-4">
            Join our life-saving mission. Register as a blood donor today or request blood in emergencies.
          </p>
          <div className="cta-buttons">
            <Button variant="outline-dark" className="me-3">Become a Donor</Button>
            <Button variant="outline-dark">Request Blood</Button>
          </div>
        </Container>
      </section>

      {/* Lottie Animation */}
      <section className="lottie-section text-center py-5" data-aos="fade-up">
        <Lottie animationData={heartbeatAnimation} loop={true} style={{ height: 200 }} />
        <p className="mt-3 fw-bold">Every drop counts. Thank you for making a difference!</p>
      </section>
    </div>
  );
};

export default FindDonor;
