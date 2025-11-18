import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Carousel } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaHandHoldingHeart, FaHospital, FaPhoneAlt,  FaTint, FaUserPlus, FaHeartbeat } from 'react-icons/fa';
import './requestblood.css';
import bloodRequestImage from '../assets/blood-request1.jpg';
import bloodSlideImage from '../assets/blood-request3.jpg'; 

const RequestBlood = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [emergencyAlert, setEmergencyAlert] = useState(null);


    // Initialize AOS for animations
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    // Emergency Alert
    useEffect(() =>{
        const mockSocket = setInterval(() => {
            const alerts = [
                '🚨 Urgent: A- blood needed at Grace Hospital, Mumbai. Call +91-80000-12345',
                '🚨 Emergency: O+ donor required for surgery at MedLife, Delhi. Contact +91-91234-56789',
                '🚨 Alert: B- blood urgently needed in AIIMS, Bhopal. Reach us at +91-99887-66554'
            ];
            const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
            setEmergencyAlert(randomAlert);
        }, 10000); // every 10 seconds

        return () => clearInterval(mockSocket);
    } , []);


    // Toggle Dark Mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode', !darkMode);
    };




    useEffect(() => {
        const counters = document.querySelectorAll('.count-up');
      
        const runCounter = (counter) => {
          const target = +counter.getAttribute('data-target');
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;
      
          const update = () => {
            current += step;
            if (current < target) {
              counter.textContent = Math.ceil(current);
              requestAnimationFrame(update);
            } else {
              counter.textContent = target;
            }
          };
          update();
        };
      
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              runCounter(entry.target);
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 1 });
      
        counters.forEach(counter => {
          observer.observe(counter);
        });
      }, []);
      

    return (
        <div className={darkMode ? 'dark-mode request-page' : 'request-page'}>
            <Container>
                {/* Dark Mode Toggle */}
                <div className="d-flex justify-content-end mt-3">
                    <Form.Check
                        type="switch"
                        id="dark-mode-toggle"
                        label="Dark Mode"
                        checked={darkMode}
                        onChange={toggleDarkMode} 
                    />
                </div>

                {/* Hero Section */}
                <Row className="align-items-center hero-request" data-aos="fade-up">
                    <Col md={6} className="hero-text" data-aos="fade-right">
                        <h2 className="hero-title">Need Blood Urgently?</h2>
                        <p className="hero-subtitle">Connect instantly with donors and save precious lives in critical situations.</p>
                    </Col>
                    <Col md={6}>
                        <img src={bloodRequestImage} alt="Blood Request" className="img-fluid request-hero-img" data-aos="fade-left" />
                    </Col>
                </Row>
            </Container>

            
            {/* Emergency Alert */}
            {emergencyAlert && (
                <div className='urgent-banner' data-aos="fade-down">
                    {emergencyAlert}
                </div>
            )}

            {/* Glassmorphic Form Section with Parallax */}
            <div
                className="form-parallax-section"
                style={{ backgroundImage: `url(${bloodSlideImage})`, borderRadius: '40px' }}
            >
                <Container className="py-5">
                    <Row className="align-items-center glass-form-wrapper" data-aos="fade-up">
                        <Col md={6} className="form-side-content text-white">
                            <h3 className="mb-3">Submit Your Request</h3>
                            <p>Help is just a few steps away. Submit your blood request and our network will assist you right away.</p>
                        </Col>
                        <Col md={6}>
                            <Form className="request-form p-4 glassmorphic-form">
                                <h4 className="mb-4 text-white">Blood Request Form</h4>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" placeholder="Patient Name" required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Select required>
                                        <option>Select blood group</option>
                                        <option>A+</option><option>B+</option><option>O+</option><option>AB+</option>
                                        <option>A-</option><option>B-</option><option>O-</option><option>AB-</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" placeholder="Hospital Name" required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" placeholder="Contact Number" required />
                                </Form.Group>
                                <Button variant="danger" type="submit" className="w-100">Submit Request</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>


            {/*Steps to Request Blood */}
            <section className='steps-section py-5' data-aos="fade-up">
                <h3 className='text-center mb-4'>How to Request Blood</h3>
                <Row className='g-4 text-center'>
                    <Col md={4}>
                        <div className='step-card'>
                            <h5>📝 Fill Request Form</h5>
                            <p>Complete the blood request form with patient and hospital details.</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className='step-card'>
                            <h5>📞 Verification Call</h5>
                            <p>Our team will call you immediately to verify the urgency and details.</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className='step-card'>
                            <h5>🩸 Find Donors</h5>
                            <p>We’ll match you with nearby available donors or guide you further.</p>
                        </div>
                    </Col>
                </Row>
            </section>


            {/* Live Blood Availability Indicator */}
            <section className="blood-availability-section py-5" data-aos="fade-up">
                <h3 className="text-center mb-4">Live Blood Group Availability</h3>
                <Row className="g-4 justify-content-center">
                {[
                    { group: 'A+', units: 14 },
                    { group: 'B+', units: 10 },
                    { group: 'O+', units: 18 },
                    { group: 'AB+', units: 6 },
                    { group: 'A-', units: 8 },
                    { group: 'B-', units: 4 },
                    { group: 'O-', units: 2 },
                    { group: 'AB-', units: 1 }
                ].map((item, index) => (
                    <Col xs={6} md={3} key={index}>
                        <div className="blood-availability-box">
                            <h5>{item.group}</h5>
                            <p>{item.units} Units</p>
                        </div>
                    </Col>
                    ))}
                </Row>
            </section>

            {/* Donor Impact Counter / Live Stats */}
            <section className="impact-counter-section" data-aos="fade-up">
                <h2 className="text-center mb-4">Our Impact So Far</h2>
                <Row className="text-center g-4 justify-content-center">
                    {[
                        { icon: <FaUserPlus />, title: 'Registered Donors', value: 1125, color: '#e63946' },
                        { icon: <FaTint />, title: 'Requests Fulfilled', value: 920, color: '#f77f00' },
                        { icon: <FaHeartbeat />, title: 'Lives Saved', value: 2779, color: '#2a9d8f' },
                        {  icon: <FaHospital />, title: 'Hospitals Connected', value: 78, color: '#457b9d' }
                    ].map((stat, index) => (
                        <Col key={index} xs={6} md={3}>
                            <div className="impact-box" style={{ borderColor: stat.color }}>
                             <div className="impact-icon" style={{ color: stat.color }}>{stat.icon}</div>
                                <h3 className="count-up" data-target={stat.value}>0</h3>
                                <p>{stat.title}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </section>


            {/* Info Cards */}
            <Container className="mt-5">
                <Row className="g-4 text-center">
                    {[{
                        icon: <FaHandHoldingHeart />,
                        title: "Emergency Support",
                        text: "Our team is available 24/7 to assist in urgent cases."
                    }, {
                        icon: <FaHospital />,
                        title: "Hospital Assistance",
                        text: "We coordinate with hospitals to ensure blood availability."
                    }, {
                        icon: <FaPhoneAlt />,
                        title: "24/7 Helpline",
                        text: "Call us anytime for immediate help: +123-456-7890"
                    }].map((item, index) => (
                        <Col md={4} key={index} data-aos="zoom-in">
                            <Card className="request-info-card" style={{ borderRadius: '20px', backgroundColor: 'rgb(220, 141, 141)' }}>
                                <Card.Body>
                                    <div className="request-icon mb-3">{item.icon}</div>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Text>{item.text}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Sticky Testimonials */}
            <div className="sticky-testimonial-container mt-5">
                <div className="sticky-background"></div>
                <div className="testimonial-carousel-section" data-aos="fade-up">
                    <h3 className="text-center mb-4">What People Say</h3>
                    <Carousel indicators={false} interval={6000}>
                        <Carousel.Item>
                            <p className="testimonial-text">“In a time of crisis, this platform helped us find a donor in minutes. Forever grateful!”</p>
                            <p className="testimonial-author">– Ramesh, Chennai</p>
                        </Carousel.Item>
                        <Carousel.Item>
                            <p className="testimonial-text">“It’s efficient, reliable, and life-saving. Found rare blood for my son through this.”</p>
                            <p className="testimonial-author">– Priya, Bangalore</p>
                        </Carousel.Item>
                        <Carousel.Item>
                            <p className="testimonial-text">“The 24/7 helpline truly works. Got connected with a donor within an hour.”</p>
                            <p className="testimonial-author">– Amit, Delhi</p>
                        </Carousel.Item>
                        <Carousel.Item>
                            <p className="testimonial-text">“Impressed by the quick response and professional support. Highly recommend!”</p>
                            <p className="testimonial-author">– Meena, Hyderabad</p>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>

        </div>
    );
};

export default RequestBlood;
