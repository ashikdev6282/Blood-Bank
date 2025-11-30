import { useState, useContext } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import "./donorform.css"; // Custom styles
import { BloodContext } from "../context/BloodContext";

const DonorForm = ({ onRegister }) => {
  const { addNewDonor } = useContext(BloodContext);

  const [formData, setFormData] = useState({
    name: "",
    bloodGroup: "",
    contact: "",
    location: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    const { name, bloodGroup, contact, location } = formData;

    if (!name || !bloodGroup || !contact || !location) {
      setError("Please fill in all fields.");
      setSubmitting(false);
      return;
    }

    if (contact.length !== 10) {
      setError("Contact number must be 10 digits.");
      setSubmitting(false);
      return;
    }

    if (!/^\d+$/.test(contact)) {
      setError("Contact number should contain only digits.");
      setSubmitting(false);
      return;
    }

    if (!/^[A-Za-z\s]+$/.test(name)) {
      setError("Name should contain only letters and spaces.");
      setSubmitting(false);
      return;
    }

    if (!/^[A-Za-z\s]+$/.test(location)) {
      setError("Location should contain only letters and spaces.");
      setSubmitting(false);
      return;
    }

    try {
      // ✅ Save to Firestore via context
      await addNewDonor({
        name: name.trim(),
        bloodGroup,
        contact: contact.trim(),
        location: location.trim(),
        blocked: false,
      });

      // (optional) still call parent callback if it's used somewhere
      if (onRegister) {
        onRegister(formData);
      }

      setSuccess("You have been registered as a donor. Thank you! ❤️");
      setFormData({
        name: "",
        bloodGroup: "",
        contact: "",
        location: "",
      });
    } catch (err) {
      console.error("Error registering donor:", err);
      setError("Failed to register. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container fluid className="donor-form-section">
      <Row className="align-items-center">
        {/* Left: Form */}
        <Col md={6} className="form-container">
          <h2 className="mb-4 text-black bold">Join as a Donor</h2>
          <Form onSubmit={handleSubmit} className="glass-form">
            {error && (
              <Alert variant="danger" className="py-2">
                {error}
              </Alert>
            )}
            {success && (
              <Alert variant="success" className="py-2">
                {success}
              </Alert>
            )}

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

            <Button
              type="submit"
              variant="light"
              className="w-100"
              disabled={submitting}
            >
              {submitting ? "Registering..." : "Register"}
            </Button>
          </Form>
        </Col>

        {/* Right: Image or content */}
        <Col md={6} className="info-container d-none d-md-block">
          <div className="form-image-overlay">
            <h3 className="text-black">Every Drop Counts</h3>
            <p className="text-black">
              Donating blood is a simple act of kindness that saves lives every
              day. Join our community of heroes.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DonorForm;
