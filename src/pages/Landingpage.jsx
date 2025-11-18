import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import './landingpage.css';
import { useEffect } from "react";

const LandingPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="landing-hero position-relative">
      <Container className="text-center text-white" data-aos="fade-up">
        <div className="hero-content">
          <h1 className="fw-bold">Donate Blood, Save Lives</h1>
          <p>One donation can save up to three lives. Be someone’s hero today.</p>
          <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
            <Button variant="light" size="lg" as={Link} to="/login" className="glow-btn">
              Become a Donor
            </Button>
          </div>
        </div>
      </Container>

      {/* Wave Inside Hero */}
      <div className="wave-bottom">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,224L48,202.7C96,181,192,139,288,117.3C384,96,480,96,576,122.7C672,149,768,203,864,218.7C960,235,1056,213,1152,176C1248,139,1344,85,1392,58.7L1440,32L1440,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default LandingPage;
