import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./aboutus.css";
import Lottie from "lottie-react";
import GrowingStats from "../assets/growing-stats.json";
import JourneyPath from "../assets/journey-path.json";
import heartbeat from "../assets/Heart-Beat.json";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutUs = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
        });
    }, []);

    return (
        <>
            {/* Mission Section */}
            <section className="mission-section" data-aos="fade-up">
                <div className="mission-header">
                    <h2>
                        As a blood bank, our mission is to save lives by ensuring a 
                        sustainable supply of blood for those in need.
                    </h2>
                </div>

                {/* Vision & Join Section */}
                <Container fluid className="vision-section" data-aos="fade-left">
                    <Row className="g-0">
                        {/* Left Side: Vision & Join Button */}
                        <Col md={6} className="vision-text" data-aos="fade-right">
                            <p>
                                Our vision is a world where no life is lost due to the 
                                unavailability of blood. Join us in this life-saving cause.
                            </p>
                            <Button variant="outline-dark" className="join-btn">Join</Button>
                        </Col>

                        {/* Right Side: Soft Gradient Background */}
                        <Col md={6} className="vision-bg" data-aos="zoom-in">
                            <Lottie animationData={heartbeat} loop={true} style={{ height: 150 }} />
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Impact Stats Section */}
            <section className="impact-section" data-aos="zoom-in">
                <h2 className="impact-title">Our Impact</h2>
                <Lottie animationData={GrowingStats} loop={true} style={{ height: 250, margin: '0 auto' }} data-aos="fade-up" />
                <div className="impact-stats">
                    <div className="stat-card" data-aos="fade-up" data-aos-delay="100">
                        <div className="stat-value">10,000+</div>
                        <div className="stat-label">Lives Saved</div>
                    </div>
                    <div className="stat-card" data-aos="fade-up" data-aos-delay="200">
                        <div className="stat-value">5,000+</div>
                        <div className="stat-label">Donors Registered</div>
                    </div>
                    <div className="stat-card" data-aos="fade-up" data-aos-delay="300">
                        <div className="stat-value">200+</div>
                        <div className="stat-label">Events Conducted</div>
                    </div>
                </div>
            </section>

            {/* Save Lives Section */}
            <section className="save-lives-section" data-aos="fade-up">
                <Container>
                    <Row className="align-items-center">
                        {/* Left Side: Title, Description, and Button */}
                        <Col md={6} className="save-lives-text" data-aos="fade-right">
                            <h2>Save Lives</h2>
                            <p>
                                Donating blood can save lives in emergencies, surgeries, and 
                                for patients with certain medical conditions.
                            </p>
                            <Button variant="outline-dark" className="donate-btn">
                                Donate
                            </Button>
                        </Col>

                        {/* Right Side: Benefits List */}
                        <Col md={6} className="save-lives-benefits text-start" data-aos="fade-left">
                            <div className="benefit">
                                <h5>Health Benefits</h5>
                                <p>Regular blood donation has health benefits like reducing the risk of heart disease and cancer.</p>
                            </div>
                            <hr />
                            <div className="benefit">
                                <h5>Life-Saving Potential</h5>
                                <p>Each blood donation has the potential to save up to three lives, making a significant impact.</p>
                            </div>
                            <hr />
                            <div className="benefit">
                                <h5>Emergency Preparedness</h5>
                                <p>By donating blood, you contribute to emergency preparedness and ensure a stable blood supply for those in critical need.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Journey Section */}
            <section className="journey-section" data-aos="fade-up">
                <h2 className="journey-title">Our Journey</h2>
                <Lottie animationData={JourneyPath} loop={true} style={{ height: 250, margin: '0 auto' }} data-aos="zoom-in" />
                <div className="timeline">
                    <div className="timeline-item left" data-aos="fade-right">
                        <div className="timeline-content">
                            <h4>2018</h4>
                            <p>Launched our initiative with the first blood donation drive in 3 cities.</p>
                        </div>
                    </div>
                    <div className="timeline-item right" data-aos="fade-left">
                        <div className="timeline-content">
                            <h4>2020</h4>
                            <p>Expanded to 20 cities and launched mobile donation tracking app.</p>
                        </div>
                    </div>
                    <div className="timeline-item left" data-aos="fade-right">
                        <div className="timeline-content">
                            <h4>2023</h4>
                            <p>Crossed 10,000+ lives saved milestone and partnered with 50+ hospitals.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dedicated Team Members Section */}
            <section className="team-section" data-aos="fade-up">
                <Container>
                    <h2 className="team-heading">Our Dedicated Team Members</h2>
                    <Row className="justify-content-center">
                        <Col md={4} className="team-member" data-aos="zoom-in">
                            <div className="team-card">
                                <div className="team-avatar"></div>
                                <h4>Jane Smith</h4>
                                <p>Carlos Ramirez</p>
                                <p className="team-role">Blood Bank Manager</p>
                                <p className="team-link">Donate Now</p>
                            </div>
                        </Col>
                        <Col md={4} className="team-member" data-aos="zoom-in" data-aos-delay="100">
                            <div className="team-card active">
                                <div className="team-avatar"></div>
                                <h4>Ali Khan</h4>
                                <p>Mia Wong</p>
                                <p className="team-role">Head Nurse</p>
                                <p className="team-link">Contact Us</p>
                            </div>
                        </Col>
                        <Col md={4} className="team-member" data-aos="zoom-in" data-aos-delay="200">
                            <div className="team-card">
                                <div className="team-avatar"></div>
                                <h4>Lila Chen</h4>
                                <p>David Lee</p>
                                <p className="team-role">Medical Technician</p>
                                <p className="team-link">Meet Our Team</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Collaborative Partnerships Section */}
            <section className="collaborative-partnerships" data-aos="fade-up">
                <Container>
                    <Row className="align-items-center">
                        {/* Left Side: Title */}
                        <Col md={6} data-aos="fade-right">
                            <h2 className="collaborative-title">Collaborative Partnerships</h2>
                        </Col>

                        {/* Right Side: Description & Logos */}
                        <Col md={6} className="collaborative-content" data-aos="fade-left">
                            <p>
                                We are proud to collaborate with various institutions and 
                                organizations to enhance blood donation awareness and accessibility.
                            </p>
                            <div className="partners-logos">
                                <span className="partner-logo">Ocean</span>
                                <span className="partner-logo">Ktilario</span>
                                <span className="partner-logo">SPAZIO</span>
                                <span className="partner-logo">Gasparyan</span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default AboutUs;
