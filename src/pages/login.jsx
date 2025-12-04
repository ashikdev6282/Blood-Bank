import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Card,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import "./login.css";
import { loginUser } from "../firebase_services/authService";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginUser(formData.email, formData.password);
      // On success, redirect to profile (or /home if you prefer)
      navigate("/home");
    } catch (err) {
      console.error("Login error:", err);

      let message = "Login failed. Please check your credentials.";
      if (err.code === "auth/user-not-found") {
        message = "No account found with this email.";
      } else if (err.code === "auth/wrong-password") {
        message = "Incorrect password. Please try again.";
      } else if (err.code === "auth/invalid-email") {
        message = "Please enter a valid email address.";
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page">
      <Container className="d-flex justify-content-center align-items-center">
        <Row className="w-100">
          {/* Left Section */}
          <Col md={6} className="login-left">
            <motion.div
              className="welcome-content"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-black">Welcome Back!</h1>
              <p className="text-black">
                Please login to continue your journey.
              </p>
            </motion.div>
          </Col>

          {/* Right Section */}
          <Col md={6} className="login-right">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="w-100"
            >
              <Card
                className="auth-card"
                style={{
                  background: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: "20px",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
                }}
              >
                <Card.Body>
                  <h2 className="text-center text-white mb-4">Login</h2>

                  {error && <Alert variant="danger">{error}</Alert>}

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label
                        style={{
                          color: "#fff",
                          textAlign: "left",
                          display: "block",
                        }}
                      >
                        Email
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{
                          color: "#fff",
                          background: "rgba(255,255,255,0.1)",
                          backdropFilter: "blur(6px)",
                          border: "none",
                          borderRadius: "12px",
                        }}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label
                        style={{
                          color: "#fff",
                          textAlign: "left",
                          display: "block",
                        }}
                      >
                        Password
                      </Form.Label>
                      <div style={{ position: "relative" }}>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          style={{
                            color: "#fff",
                            background: "rgba(255,255,255,0.1)",
                            backdropFilter: "blur(6px)",
                            border: "none",
                            borderRadius: "12px",
                            paddingRight: "50px",
                          }}
                        />
                        <span
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                            position: "absolute",
                            right: "15px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            color: "#fff",
                            fontSize: "0.9rem",
                            fontWeight: "bold",
                          }}
                        >
                          {showPassword ? "Hide" : "Show"}
                        </span>
                      </div>
                    </Form.Group>

                    <Button
                      type="submit"
                      variant="light"
                      className="w-100"
                      style={{
                        borderRadius: "30px",
                        padding: "12px",
                        backgroundColor: "#fff",
                        color: "#f66",
                        fontWeight: "bold",
                        boxShadow: "0 0 12px rgba(255, 99, 99, 0.4)",
                      }}
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "Login"}
                    </Button>
                  </Form>

                  <p className="text-center mt-3 text-white">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      style={{ color: "red", fontWeight: "bold" }}
                    >
                      Sign Up
                    </Link>
                  </p>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
