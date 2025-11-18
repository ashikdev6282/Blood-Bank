import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Carousel, Accordion, Form } from 'react-bootstrap';
import { FaHeartbeat, FaCheckCircle, FaGift, FaTint } from 'react-icons/fa';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import DonorForm from '../components/DonorForm';
import './donate.css';
import bloodDonationImage from '../assets/blood-donation.jpg';

const Donate = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(prev => !prev);
        document.body.classList.toggle('dark-mode', !darkMode);
    };

    return (
        <div className={darkMode ? 'dark-mode donate-page' : 'donate-page'}>
            <Container className="donate-section">
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
                <motion.div 
                    initial={{ opacity: 0, y: -50 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 1 }}
                    className="hero-section-1"
                >
                    <Row className="align-items-center">
                        <Col md={6} data-aos="fade-right">
                            <h2 className="hero-title">Donate Blood, Save Lives</h2>
                            <p className="hero-subtitle">One donation can save up to three lives. Be a hero today!</p>
                            <Button variant="danger" size="lg">Register as a Donor</Button>
                        </Col>
                        <Col md={6} data-aos="fade-left">
                            <img src={bloodDonationImage} alt="Blood Donation" className="img-fluid" />
                        </Col>
                    </Row>
                </motion.div>

                {/* Donor Form */}
                <div data-aos="fade-up">
                    <DonorForm onRegister={(data) => console.log("New Donor Registered:", data)} />
                </div>

                {/* Why Donate */}
                <h2 className="text-center mt-5" data-aos="fade-up">Why Donate Blood?</h2>
                <Row className="justify-content-center g-4 mt-3">
                    {[
                        { icon: <FaHeartbeat />, title: "Save Lives", text: "Your blood can save up to 3 lives." },
                        { icon: <FaCheckCircle />, title: "Easy & Safe", text: "Simple and safe process." },
                        { icon: <FaGift />, title: "Health Benefits", text: "Boosts heart health." },
                        { icon: <FaTint />, title: "Emergency Ready", text: "Ensures supply in emergencies." }
                    ].map((item, index) => (
                        <Col md={6} lg={3} key={index} data-aos="zoom-in">
                            <Card className="donate-card">
                                <Card.Body>
                                    <div className="donate-icon mb-2">{item.icon}</div>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Text>{item.text}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Testimonials */}
                <div className="testimonial-bg mt-5 p-5" data-aos="fade-up">
                    <h3 className="text-center mb-4">Donor & Recipient Testimonials</h3>
                    <Carousel className="testimonial-carousel">
                        {[
                            { name: "John Doe", quote: "Donating blood made me feel like a real hero!", role: "Donor" },
                            { name: "Emily Smith", quote: "Donors saved my life after an accident.", role: "Recipient" }
                        ].map((testimonial, idx) => (
                            <Carousel.Item key={idx}>
                                <Card className="testimonial-card">
                                    <Card.Body>
                                        <blockquote>"{testimonial.quote}"</blockquote>
                                        <h5>- {testimonial.name}</h5>
                                        <p className="role">{testimonial.role}</p>
                                    </Card.Body>
                                </Card>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>

                {/* FAQs */}
                <h3 className="text-center mt-5" data-aos="fade-up">Frequently Asked Questions</h3>
                <Accordion className="faq-section" data-aos="fade-up">
                    {[
                       { question: "How often can I donate blood?", answer: "You can donate whole blood every 8 weeks, plasma every 4 weeks, and platelets every 7 days up to 24 times a year." },
                       { question: "Is donating blood safe?", answer: "Yes! Sterile, disposable equipment is used for each donor to eliminate any risk of infection." },
                       { question: "Does donating blood hurt?", answer: "You may feel a quick pinch when the needle is inserted, but most donors experience minimal discomfort." },
                       { question: "Who can donate blood?", answer: "Generally, healthy individuals aged 18–65 and weighing at least 50kg can donate. Specific criteria may vary by region." },
                       { question: "What should I do before donating blood?", answer: "Stay hydrated, eat a healthy meal (rich in iron), and get plenty of rest the night before." },
                       { question: "What should I do after donating?", answer: "Rest for a few minutes, drink fluids, and avoid heavy exercise for the rest of the day." },
                       { question: "Can I donate if I have a tattoo or piercing?", answer: "Yes, after a waiting period of 3–6 months (depending on local guidelines and sterility of the procedure)." },
                    ].map((faq, i) => (
                        <Accordion.Item eventKey={i.toString()} key={i}>
                            <Accordion.Header>{faq.question}</Accordion.Header>
                            <Accordion.Body>{faq.answer}</Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>

                {/* CTA */}
                <div className="text-center mt-4" data-aos="zoom-in">
                    <Button variant="danger" size="lg">Become a Donor Today</Button>
                </div>
            </Container>
        </div>
    );
};

export default Donate;
