// components/SearchBar.jsx
import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import './searchbar.css';

const SearchBar = ({ onSearch }) => {
  const [bloodGroup, setBloodGroup] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ bloodGroup, location });
  };

  return (
    <div className="search-bar-section" data-aos="fade-up">
      <Form onSubmit={handleSubmit}>
        <Row className="align-items-center g-3">
          <Col md={4}>
            <Form.Select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              aria-label="Select Blood Group"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="B+">B+</option>
              <option value="O+">O+</option>
              <option value="AB+">AB+</option>
              <option value="A-">A-</option>
              <option value="B-">B-</option>
              <option value="O-">O-</option>
              <option value="AB-">AB-</option>
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Enter Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Col>
          <Col md={4}>
            <Button variant="dark" type="submit" className="w-100">Find Donors</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SearchBar;
