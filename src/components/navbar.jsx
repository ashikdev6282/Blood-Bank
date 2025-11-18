import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import './navbar.css'; // Importing CSS for custom styles

const Navigation = () => {
    return (
        <Navbar expand="lg" className="custom-navbar">
            <Container>
                {/* Logo/Brand */}
                <Navbar.Brand as={Link} to="/" className="navbar-brand">
                    🩸 Blood Bank
                </Navbar.Brand>

                {/* Responsive Toggle Button */}
                <Navbar.Toggle aria-controls="navbar-nav" className="custom-toggler" />

                {/* Navbar Links */}
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/home" className="nav-link">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/Donate" className="nav-link">
                            Donate Blood
                        </Nav.Link>
                        <Nav.Link as={Link} to="/RequestBlood" className="nav-link">
                            Request Blood
                        </Nav.Link>
                        <Nav.Link as={Link} to="/search" className="nav-link">
                            Find a Donor
                        </Nav.Link>
                        <Nav.Link as={Link} to="/blooddrive" className="nav-link">
                            Blood Drive
                        </Nav.Link>
                        <Nav.Link as={Link} to="/about" className="nav-link">
                            About Us
                        </Nav.Link>
                        <Nav.Link as={Link} to="/contact" className="nav-link">
                            Contact
                        </Nav.Link>
                    </Nav>

                    {/* CTA Button */}
                    <Nav.Link as={Link} to="/profile" className="nav-link profile-icon">
                        <i className="bi bi-person-circle fs-4 text-white"></i>
                    </Nav.Link>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
