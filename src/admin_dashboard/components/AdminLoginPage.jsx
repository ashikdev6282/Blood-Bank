import React, { useState} from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "./adminlogin.css";
import { useNavigate } from "react-router-dom";

AOS.init();

const AdminLoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(false); // Reset error state on input change
  };

  const handleonClick = () => {
    navigate("/admin/overview"); // Navigate to the admin dashboard on successful login
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate validation (replace with real logic later)
    if (
      formData.email === "admin@gmail.com" &&
      formData.password === "admin123"
    ) {
      console.log("Success");
    } else {
      setError(true);
    }
  };

  return (
    <section className="admin-login-page">
      <Container>
        <Row className="justify-content-center align-items-center" style={{ height: "100vh", width: "800px" }}>
          <Col md={6} data-aos="fade-up">
            <motion.div
              className="login-card glass-card p-4"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-4">
                
                <h2 className="fw-bold text-dark">
                  {error ? "Invalid Login" : "Admin Login"}
                </h2>
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 text-dark text-start bold">
                  <Form.Label className="bold ">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="admin@example.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="glass-input"
                  />
                </Form.Group>
                <Form.Group className="mb-4 text-dark text-start">
                  <Form.Label className="bold ">Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="glass-input"
                    />
                    <Button
                      variant="outline-secondary" 
                      onClick={() => setShowPassword((prev) => !prev)} style={{ backgroundColor: "transparent", padding: "0.3rem",marginLeft: "0.5rem", paddingBottom: "1.0rem",marginBottom: "0.8rem", border: "none", color: "#000" }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </InputGroup>
                </Form.Group>
                <Button type="submit" variant="outline-dark" className="w-100 submit-btn" onClick={handleonClick}>

                  Login
                </Button>
              </Form>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AdminLoginPage;
