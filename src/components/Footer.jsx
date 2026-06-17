import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer-section mt-auto pt-5 pb-3">
            <Container>
                <Row className="gy-4 mb-5">
                    {/* Brand & Logo Section */}
                    <Col lg={4} md={12}>
                        <div className="footer-brand mb-4">
                            <div className="footer-logo-container mb-3">
                                <div className="logo-pattern">
                                    <div className="shape square"></div>
                                    <div className="shape diamond"></div>
                                    <div className="shape square"></div>
                                    <div className="shape diamond"></div>
                                    <div className="shape diamond active"></div>
                                    <div className="shape diamond"></div>
                                    <div className="shape square"></div>
                                    <div className="shape diamond"></div>
                                    <div className="shape square"></div>
                                </div>
                            </div>
                            <h2 className="fw-bold fs-3 tracking-wide mb-1">
                                <span className="text-primary-custom">Life</span> <span style={{ color: '#0284c7' }}>Flow</span>
                            </h2>
                            <p className="text-muted pe-lg-5">
                                Connecting heroes with those in need. Every drop counts in our mission to save lives across the globe.
                            </p>
                        </div>
                    </Col>

                    {/* Quick Access Column */}
                    <Col lg={2} md={4} sm={6}>
                        <h5 className="fw-bold mb-4">About Us</h5>
                        <ul className="list-unstyled footer-links">
                            <li><Link to="/">Mission</Link></li>
                            <li><Link to="/">Our Team</Link></li>
                            <li><Link to="/">Newsletter</Link></li>
                            <li><Link to="/feedback">Feedback</Link></li>
                        </ul>
                    </Col>

                    {/* Support Column */}
                    <Col lg={2} md={4} sm={6}>
                        <h5 className="fw-bold mb-4">Support</h5>
                        <ul className="list-unstyled footer-links">
                            <li><Link to="/">Contact us</Link></li>
                            <li><Link to="/">Refund Policy</Link></li>
                            <li><Link to="/">FAQ's</Link></li>
                        </ul>
                    </Col>

                    {/* Role-Based Logins Column */}
                    <Col lg={2} md={4} sm={6}>
                        <h5 className="fw-bold mb-4">Portals</h5>
                        <ul className="list-unstyled footer-links">
                            <li><Link to="/login" className="role-link">Admin Login</Link></li>
                            <li><Link to="/login" className="role-link">Donor Login</Link></li>
                            <li><Link to="/login" className="role-link">Patient Login</Link></li>
                        </ul>
                    </Col>

                    {/* Social Column */}
                    <Col lg={2} md={4} sm={6}>
                        <h5 className="fw-bold mb-4">Social</h5>
                        <ul className="list-unstyled footer-links">
                            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                            <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a></li>
                        </ul>
                    </Col>
                </Row>

                <hr className="footer-divider mb-4" />

                <div className="footer-bottom d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <p className="mb-md-0 text-muted">
                        Copyright &copy; {new Date().getFullYear()} Life Flow
                    </p>
                    <div className="footer-bottom-links mb-3 mb-md-0">
                        <Link to="/" className="text-muted text-decoration-none me-4">Terms of Service</Link>
                        <Link to="/" className="text-muted text-decoration-none">Privacy Policy</Link>
                    </div>
                    <button 
                        onClick={scrollToTop} 
                        className="back-to-top btn d-flex align-items-center gap-2"
                        aria-label="Back to top"
                    >
                        <span>Back to top</span>
                        <div className="back-to-top-icon">
                            <i className="bi bi-arrow-up"></i>
                        </div>
                    </button>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
