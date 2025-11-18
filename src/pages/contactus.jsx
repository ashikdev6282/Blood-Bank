import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import Lottie from "lottie-react";
import contactAnimation from "../assets/contactanimation.json";
import { FiSettings } from 'react-icons/fi';
import { FaGlobe, FaDatabase } from 'react-icons/fa';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import AOS from "aos";
import "aos/dist/aos.css";

import "./contactus.css";


const ContactUs = () => {
    return (
        <section className="contact-section" data-aos="fade-up">
            <Container>
                <Row className="align-items-start">
                    {/* Left Side: Info */}
                    <Col md={6} className="contact-info" data-aos="fade-right">
                        <h2>Reach Out to Us</h2>
                        <p>Have a question or need assistance? Feel free to reach out to us via email or phone.</p>
                        
                        <div className="help-section">
                            <h4>Help</h4>
                            <p><a href="tel:+123456789" className="contact-link">Call</a></p>
                            <p><a href="mailto:support@example.com" className="contact-link">Email</a></p>
                        </div>
                    </Col>

                    {/* Right Side: Contact Form */}
                    <Col md={6} data-aos="fade-left">
                        <h2>Contact us</h2>
                        <Form className="contact-form text-start">
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="form-group">
                                        <Form.Label>First name</Form.Label>
                                        <Form.Control type="text" placeholder="First name" />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="form-group">
                                        <Form.Label>Last name</Form.Label>
                                        <Form.Control type="text" placeholder="Last name" />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="form-group">
                                        <Form.Label>Email *</Form.Label>
                                        <Form.Control type="email" placeholder="Email" required />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="form-group">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control type="tel" placeholder="Phone" />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="form-group">
                                <Form.Label>Message *</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Message" required />
                            </Form.Group>

                            <Button type="submit" variant="outline-dark" className="submit-btn">Submit</Button>
                        </Form>
                    </Col>
                </Row>

                {/* Lottie Animation */}
                <Row className="justify-content-center mt-4">
                    <Col md={8}>
                        <Lottie animationData={contactAnimation} loop={true} />
                    </Col>
                </Row>


                <section className="connect-with-us-section py-5 " data-aos="fade-up">
                    <Container>
                        <Row className="align-items-center mb-5">
                            <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
                                <h2 className="fw-bold display-5">Connect With Us</h2>
                                <Button variant="outline-dark" className="rounded-pill mt-3 px-4">Follow</Button>
                            </Col>
                            <Col md={6} className="text-center">
                                <div className="connect-circle"></div>
                            </Col>
                            <div className="social-icons mt-3 d-flex  gap-3">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-dark">
                                    <FaFacebookF size={24} />
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-dark">
                                    <FaTwitter size={24} />
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-dark">
                                    <FaInstagram size={24} />
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-dark">
                                    <FaLinkedinIn size={24} />
                                </a>
                            </div>

                        </Row>


                        <Row className="g-4">
                            <Col md={4}>
                                <Card className="connect-card h-100 text-center p-4">
                                    <FiSettings size={40} className="mb-3" />
                                    <Card.Title>Stay Connected</Card.Title>
                                    <Card.Text>
                                         Connect with us on various social platforms.
                                    </Card.Text>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card className="connect-card h-100 text-center p-4">
                                    <FaGlobe size={40} className="mb-3" />
                                    <Card.Title>Engage</Card.Title>
                                    <Card.Text>
                                         Stay engaged with our latest news and initiatives.
                                    </Card.Text>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card className="connect-card h-100 text-center p-4">
                                    <FaDatabase size={40} className="mb-3" />
                                    <Card.Title>Interact</Card.Title>
                                    <Card.Text>
                                        Interact with us and the community online.
                                    </Card.Text>
                                </Card>                            
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Container>
        </section>


        


    );
};

export default ContactUs;
