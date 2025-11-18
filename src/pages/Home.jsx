import React, { useState, useContext, useEffect } from "react";
import { BloodContext } from "../context/BloodContext";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { BsStar, BsAt, BsPerson, BsEnvelope, BsChevronRight, BsChevronLeft } from "react-icons/bs";
import "./home.css";
import ContactUs from "./contactus";
import UpcomingDrives from "../components/BloodDrives";
import AOS from "aos";
import "aos/dist/aos.css";


const slides = [
    {
        title: "Request Blood",
        description: "Need blood urgently? Place a request and find the right match.",
        buttonText: "Request",
        buttonLink: "/request",
    },
    {
        title: "Find Donors",
        description: "Find eligible donors in your area. Connect and save lives.",
        buttonText: "Find",
        buttonLink: "/find-donors",
    },
    {
        title: "Blood Donation Guide",
        description: "Explore our comprehensive guide on blood donation. Learn more and make an impact.",
        buttonText: "Read More",
        buttonLink: "/donation-guide",
    },
];

const Home = () => {
    const { bloodStock, requests } = useContext(BloodContext);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [direction, setDirection] = useState("next");

    const handleNext = () => {
        if (animating) return;
        setDirection("next");
        setAnimating(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
            setAnimating(false);
        }, 600);
    };

    const handlePrev = () => {
        if (animating) return;
        setDirection("prev");
        setAnimating(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
            setAnimating(false);
        }, 600);
    };

    useEffect(() => {
        AOS.init({
            duration: 800,
        });
    }, []);
    

    return (
        <>
            {/* Hero Section */}
            <section className="hero-section" data-aos="fade-right" data-aos-delay="100">
                <Container>
                    <Row className="align-items-center">
                        <Col md={6}>
                            <div className="hero-content">
                                <h1>Donate Blood, Save Lives</h1>
                                <p>Your donation can save lives. Join us in our mission to provide life-saving blood to those in need.</p>
                                <Button variant="outline-dark" className="hero-btn">Join Us</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <Container className="mt-5 text-center">
                <h1 className="mb-4">Welcome to the Blood Bank</h1>
                <p className="lead">Save lives by donating or requesting blood.</p>

                {/* Blood Stock & Requests */}
                <Row className="mt-4">
                    <Col md={6}>
                        <Card className="shadow-sm" data-aos="fade-up" data-aos-delay="100">
                            <Card.Body>
                                <Card.Title>Available Blood Units</Card.Title>
                                {bloodStock.length > 0 ? (
                                    <ul className="list-group">
                                        {bloodStock.map((stock, index) => (
                                            <li key={index} className="list-group-item">
                                                {stock.bloodGroup} - {stock.units} units
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No blood units available</p>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card className="shadow-sm" data-aos="fade-up" data-aos-delay="200">
                            <Card.Body>
                                <Card.Title>Recent Blood Requests</Card.Title>
                                {requests.length > 0 ? (
                                    <ul className="list-group">
                                        {requests.map((req, index) => (
                                            <li key={index} className="list-group-item">
                                                {req.patientName} needs {req.bloodGroup}
                                                {req.units} units of blood at {req.hospital}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No active blood requests.</p>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Blood Bank Stats Section */}
                <section className="mt-5 text-start stats-section" data-aos="fade-up">
                    <Row className="align-items-center">
                        <Col md={5}>
                            <h2 className="fw-bold" data-aos="fade-right">Blood Bank Stats</h2>
                            <p data-aos="fade-right">We have a dedicated team of donors. Discover the impact we've made in saving lives.</p>
                            <Button variant="outline-dark" data-aos="fade-right">View Stats</Button>
                        </Col>
                        <Col md={7}>
                            <Row>
                                <Col md={6} className="mb-3">
                                    <Card className="border-0 stats-card" data-aos="fade-left">
                                        <Card.Body>
                                            <BsStar size={30} />
                                            <h5 className="fw-bold mt-2">Units</h5>
                                            <p>Available blood units for emergency needs.</p>
                                            <a href="#">Show More</a>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={6} className="mb-3">
                                    <Card className="border-0 stats-card" data-aos="fade-left">
                                        <Card.Body>
                                            <BsAt size={30} />
                                            <h5 className="fw-bold mt-2">Requests</h5>
                                            <p>Current requests awaiting donors.</p>
                                            <a href="#">Show More</a>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={6} className="mb-3">
                                    <Card className="border-0 stats-card" data-aos="fade-left">
                                        <Card.Body>
                                            <BsPerson size={30} />
                                            <h5 className="fw-bold mt-2">Fulfilled</h5>
                                            <p>Successful blood donations and requests.</p>
                                            <a href="#">Show More</a>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={6} className="mb-3">
                                    <Card className="border-0 stats-card" data-aos="fade-left">
                                        <Card.Body>
                                            <BsEnvelope size={30} />
                                            <h5 className="fw-bold mt-2">Available</h5>
                                            <p>Blood available in different locations.</p>
                                            <a href="#">Show More</a>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </section>

                {/* CAROUSEL */}
                <div className="carousel-container mt-5" data-aos="fade-up" data-aos-delay="300">
                    <button className="nav-arrow left" onClick={handlePrev}>
                        <BsChevronLeft size={30} />
                    </button>

                    <div className={`carousel-slide ${direction}`} key={currentIndex}>
                        <h2>{slides[currentIndex].title}</h2>
                        <p>{slides[currentIndex].description}</p>
                        <a href={slides[currentIndex].buttonLink} className="btn">
                            {slides[currentIndex].buttonText}
                        </a>
                    </div>

                    <button className="nav-arrow right" onClick={handleNext}>
                        <BsChevronRight size={30} />
                    </button>
                </div>
                <UpcomingDrives />
                <ContactUs />
            </Container>
        </>
    );
};

export default Home;
