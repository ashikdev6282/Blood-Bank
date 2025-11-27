import React, { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "./adminlogin.css";
import { useNavigate } from "react-router-dom";
import { LoginAdmin } from "../../firebase_services/authService"; // ✅ use lowercase loginAdmin

AOS.init();

const AdminLoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // ✅ store error message instead of just boolean
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(""); // ✅ reset error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { email, password } = formData;

    try {
      await LoginAdmin(email, password); // ✅ call Firebase Auth
      navigate("/admin/overview"); // ✅ go to admin dashboard
    } catch (err) {
      console.error(err);

      // ✅ basic error handling
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/wrong-password"
      ) {
        setError("Invalid email or password");
      } else if (err.code === "auth/user-not-found") {
        setError("No admin found with this email");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="admin-login-page">
      <Container>
        <Row
          className="justify-content-center align-items-center"
          style={{ height: "100vh", width: "800px" }}
        >
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
                {error && (
                  <p
                    className="text-danger mt-2"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {error}
                  </p>
                )}
              </div>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 text-dark text-start bold">
                  <Form.Label className="bold">Email Address</Form.Label>
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
                  <Form.Label className="bold">Password</Form.Label>
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
                      onClick={() => setShowPassword((prev) => !prev)}
                      style={{
                        backgroundColor: "transparent",
                        padding: "0.3rem",
                        marginLeft: "0.5rem",
                        paddingBottom: "1.0rem",
                        marginBottom: "0.8rem",
                        border: "none",
                        color: "#000",
                      }}
                      type="button"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </InputGroup>
                </Form.Group>

                <Button
                  type="submit"
                  variant="outline-dark"
                  className="w-100 submit-btn"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
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
