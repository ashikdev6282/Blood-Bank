import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import './donorform.css'; // Custom styles

const DonorForm = ({ onRegister }) => {
    const [formData, setFormData] = useState({ name: "", bloodGroup: "", contact: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(formData);
        setFormData({ name: "", bloodGroup: "", contact: "" });
    };

    return (
        <Container fluid className="donor-form-section">
            <Row className="align-items-center">
                {/* Left: Form */}
                <Col md={6} className="form-container">
                    <h2 className="mb-4 text-black bold">Join as a Donor</h2>
                    <Form onSubmit={handleSubmit} className="glass-form">
                        <Form.Group className="mb-3">
                            <Form.Control 
                                type="text" 
                                name="name" 
                                placeholder="Full Name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control 
                                type="text" 
                                name="bloodGroup" 
                                placeholder="Blood Group (e.g. O+)" 
                                value={formData.bloodGroup} 
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control 
                                type="text" 
                                name="contact" 
                                placeholder="Contact Number" 
                                value={formData.contact} 
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control 
                                type="text" 
                                name="location" 
                                placeholder="Location" 
                                value={formData.location} 
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>
                        <Button type="submit" variant="light" className="w-100">
                            Register
                        </Button>
                    </Form>
                </Col>

                {/* Right: Image or content */}
                <Col md={6} className="info-container d-none d-md-block">
                    <div className="form-image-overlay">
                        <h3 className="text-black">Every Drop Counts</h3>
                        <p className="text-black">Donating blood is a simple act of kindness that saves lives every day. Join our community of heroes.</p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default DonorForm;
