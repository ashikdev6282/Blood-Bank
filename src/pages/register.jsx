import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bloodGroup: '',
    location: '',
    gender: '',
    password: '',
    confirmPassword: '',
    isDonor: false,
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // This is where you'd normally send formData to the backend
    console.log('Registered User:', formData);

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      bloodGroup: '',
      location: '',
      gender: '',
      password: '',
      confirmPassword: '',
      isDonor: false,
    });
  };

  return (
    <div className="register-wrapper">
      <div className="register-left" data-aos="fade-right">
        <h1 data-aos="fade-up" data-aos-delay="100">Join Our Life-Saving Mission</h1>
        <p data-aos="fade-up" data-aos-delay="200">
          Become a donor and help save lives. Every drop counts.
        </p>
      </div>

      <div className="register-right" data-aos="fade-left">
        <div className="glass-card" data-aos="zoom-in-up" data-aos-delay="400">
          <h2 className="text-center mb-4">Register</h2>
          <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3 text-start">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 text-start">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 text-start">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 text-start">
              <Form.Label>Blood Group</Form.Label>
              <Form.Select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                required
              >
                <option value="">Select your blood group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3 text-start">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                placeholder="Enter your city or area"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 text-start">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3 text-start">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 text-start">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 text-start">
              <Form.Check
                type="checkbox"
                label="Register as a donor"
                name="isDonor"
                checked={formData.isDonor}
                onChange={handleChange}
              />
            </Form.Group>

            <Button type="submit" variant="danger" className="w-100">
              Register
            </Button>
          </Form>

          <p className="text-center mt-3">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
