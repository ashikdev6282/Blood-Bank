import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import './requestform.css';

const RequestForm = ({ onRequest }) => {
    const [request, setRequest] = useState({ patientName: "", bloodGroup: "", urgency: "Normal" });

    const handleChange = (e) => {
        setRequest({ ...request, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onRequest(request);
    };

    return (
        <Container fluid className="request-form-wrapper my-5">
            <Row className="align-items-center shadow-lg rounded-4 overflow-hidden">
                {/* Left Side - Image or Content */}
                <Col md={6} className="form-illustration d-none d-md-flex justify-content-center align-items-center">
                    <img src="/assets/request-blood.svg" alt="Request Blood" className="img-fluid" />
                </Col>

                {/* Right Side - Form */}
                <Col xs={12} md={6} className="p-4 bg-light form-side">
                    <h2 className="mb-4 text-danger">Request Blood</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Patient Name</Form.Label>
                            <Form.Control type="text" name="patientName" required onChange={handleChange} placeholder="Enter full name" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Required Blood Group</Form.Label>
                            <Form.Control type="text" name="bloodGroup" required onChange={handleChange} placeholder="e.g., A+, O-" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Urgency Level</Form.Label>
                            <Form.Select name="urgency" onChange={handleChange}>
                                <option value="Normal">Normal</option>
                                <option value="Urgent">Urgent</option>
                                <option value="Emergency">Emergency</option>
                            </Form.Select>
                        </Form.Group>

                        <Button type="submit" variant="outline-dark" className="w-100">Submit Request</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default RequestForm;
