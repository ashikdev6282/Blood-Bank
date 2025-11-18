import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
  return (
    <footer className="blood-footer">
      <Container>
        <Row className="py-5">
          <Col md={4} className="footer-brand">
            <h4 className="brand-title">BloodConnect</h4>
            <p>Saving lives, one drop at a time.</p>
          </Col>

          <Col md={4} className="footer-links">
            <h5>Quick Links</h5>
            <ul>
              <li><a href="/donate">Donate Blood</a></li>
              <li><a href="/request">Request Blood</a></li>
              <li><a href="/find-donor">Find a Donor</a></li>
              <li><a href="/events">Events</a></li>
              <li><a href="/about">About Us</a></li>
            </ul>
          </Col>

          <Col md={4} className="footer-contact">
            <h5>Contact Us</h5>
            <p><FaPhone /> +91 98765 43210</p>
            <p><FaEnvelope /> help@bloodconnect.org</p>
            <p><FaMapMarkerAlt /> Chennai, Tamil Nadu, India</p>

            <div className="social-icons mt-3">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaTwitter /></a>
            </div>
          </Col>
        </Row>

        <Row className="text-center">
          <Col>
            <p className="copyright">© {new Date().getFullYear()} BloodConnect. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
