import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const [searchBg, setSearchBg] = useState('');
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const handleSearch = () => {
        if (!searchBg) {
            toast.warning('Please select a blood group first');
            return;
        }
        
        if (user && user.role === 'donor') {
            toast.error('Donors cannot request blood.');
            return;
        }

        if (user) {
            navigate(user.role === 'admin' ? '/admin/dashboard' : '/patient/dashboard');
        } else {
            toast.info('Please Login or Register to search and request blood.');
            navigate('/login');
        }
    };

    return (
        <div className="home-page animate-fade-in">
            {/* Hero Section */}
            <section className="hero-section position-relative d-flex align-items-center" style={{ minHeight: '85vh', overflow: 'hidden' }}>
                {/* Background Shapes for modern look */}
                <div className="position-absolute top-0 start-0 w-100 h-100 hero-bg">
                    <div className="blob-1"></div>
                    <div className="blob-2"></div>
                </div>

                <Container className="position-relative z-index-1 mt-5">
                    <Row className="align-items-center mb-5">
                        <Col lg={6} className="text-center text-lg-start mb-5 mb-lg-0">
                            <h1 className="display-3 fw-bolder mb-4 hero-title">
                                Give the <span className="text-primary-custom gradient-text">Gift of Life</span>. <br />
                                Donate Blood.
                            </h1>
                            <p className="lead mb-5 text-muted fw-normal" style={{ fontSize: '1.2rem', maxWidth: '600px' }}>
                                Life Flow is a modern, seamless platform connecting blood donors with those in urgent need. Join our community today and make a real difference.
                            </p>

                            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
                                {(!user || user.role === 'admin' || user.role === 'donor') && (
                                    <Link to={user ? '/donor/dashboard' : '/register'} className="btn btn-primary btn-lg rounded-pill px-5 py-3 shadow-lg fw-bold btn-hover-elevate">
                                        Become a Donor <i className="bi bi-heart-pulse ms-2"></i>
                                    </Link>
                                )}
                                {(!user || user.role === 'admin' || user.role === 'patient') && (
                                    <Link to={user ? '/patient/dashboard' : '/login'} className="btn btn-light border-danger text-danger btn-lg rounded-pill px-5 py-3 shadow-sm fw-bold btn-hover-elevate bg-white">
                                        Request Blood <i className="bi bi-droplet-half ms-2"></i>
                                    </Link>
                                )}
                            </div>

                            <div className="mt-5 d-flex align-items-center justify-content-center justify-content-lg-start gap-4">
                                <div className="text-center">
                                    <h3 className="fw-bolder text-dark mb-0 fs-2">10k+</h3>
                                    <p className="text-muted small mb-0 fw-semibold text-uppercase tracking-wide">Active Donors</p>
                                </div>
                                <div className="vr bg-secondary opacity-25"></div>
                                <div className="text-center">
                                    <h3 className="fw-bolder text-dark mb-0 fs-2">50k+</h3>
                                    <p className="text-muted small mb-0 fw-semibold text-uppercase tracking-wide">Lives Saved</p>
                                </div>
                                <div className="vr bg-secondary opacity-25"></div>
                                <div className="text-center">
                                    <h3 className="fw-bolder text-dark mb-0 fs-2">24/7</h3>
                                    <p className="text-muted small mb-0 fw-semibold text-uppercase tracking-wide">Support</p>
                                </div>
                            </div>
                        </Col>

                        <Col lg={6} className="position-relative d-none d-lg-block">
                            <div className="hero-image-wrapper position-relative">
                                {/* Glassmorphism floating cards */}
                                <div className="glass-card position-absolute top-0 start-0 p-3 rounded-4 shadow-lg heartbeat-anim z-index-2" style={{ transform: 'translate(-20%, -20%)' }}>
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="bg-danger text-white rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                            <i className="bi bi-droplet-fill"></i>
                                        </div>
                                        <div>
                                            <p className="mb-0 fw-bold fs-6">A+ Blood Needed!</p>
                                            <small className="text-muted">City Hospital - Urgent</small>
                                        </div>
                                    </div>
                                </div>

                                <div className="glass-card position-absolute bottom-0 end-0 p-3 rounded-4 shadow-lg float-anim z-index-2" style={{ transform: 'translate(10%, 20%)' }}>
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="bg-success text-white rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                            <i className="bi bi-check-lg"></i>
                                        </div>
                                        <div>
                                            <p className="mb-0 fw-bold fs-6">Request Fulfilled</p>
                                            <small className="text-muted">Thanks to John Doe</small>
                                        </div>
                                    </div>
                                </div>

                                <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800" alt="Blood Donation" className="img-fluid rounded-4 shadow-xl object-fit-cover" style={{ height: '500px', width: '100%', objectPosition: 'center' }} />
                                {/* Overlay gradient */}
                                <div className="position-absolute top-0 start-0 w-100 h-100 rounded-4" style={{ background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(255, 255, 255, 0) 100%)' }}></div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Quick Urgent Request Search */}
            <section className="py-5 bg-white position-relative" style={{ marginTop: '-50px', zIndex: 10 }}>
                <Container>
                    <Card className="glass-card border-0 shadow-lg rounded-4 p-2 mx-auto" style={{ maxWidth: '900px' }}>
                        <Card.Body className="p-4 d-flex flex-column flex-md-row align-items-center gap-4">
                            <div className="d-flex align-items-center gap-3 me-md-4">
                                <div className="bg-danger-subtle text-danger rounded-circle p-3 fs-3">
                                    <i className="bi bi-search"></i>
                                </div>
                                <div>
                                    <h5 className="fw-bold mb-0">Find Donors</h5>
                                    <small className="text-muted">Search available stock</small>
                                </div>
                            </div>
                            <div className="flex-grow-1 d-flex flex-column flex-sm-row gap-2 w-100">
                                <Form.Select
                                    className="py-3 bg-light border-0 fw-semibold rounded-pill form-select-lg px-4"
                                    aria-label="Select Blood Group"
                                    value={searchBg}
                                    onChange={(e) => setSearchBg(e.target.value)}
                                >
                                    <option value="">Select Blood Group</option>
                                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                                </Form.Select>
                                <Button
                                    variant="danger"
                                    className="py-3 px-5 rounded-pill fw-bold btn-hover-elevate flex-shrink-0"
                                    onClick={handleSearch}
                                >
                                    Search Stock
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>
            </section>

            {/* How it Works / Features */}
            <section className="py-5 my-5">
                <Container>
                    <div className="text-center mb-5 mw-md-50 mx-auto">
                        <span className="text-primary-custom fw-bold tracking-wide text-uppercase small bg-danger-subtle px-3 py-1 rounded-pill">Process</span>
                        <h2 className="display-5 fw-bolder mt-3 mb-3">How Life Flow Works</h2>
                        <p className="text-muted lead">A seamless process designed to connect donors and patients in record time.</p>
                    </div>

                    <Row className="g-5 mt-4">
                        <Col lg={4}>
                            <Card className="h-100 border-0 shadow-sm glass-card rounded-4 feature-card text-center p-4">
                                <Card.Body>
                                    <div className="feature-icon-wrapper mx-auto mb-4 bg-primary-custom text-white d-flex align-items-center justify-content-center shadow-lg" style={{ width: '80px', height: '80px', borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}>
                                        <i className="bi bi-person-fill-add fs-1"></i>
                                    </div>
                                    <Card.Title className="fw-bolder fs-4 mb-3">1. Register Profile</Card.Title>
                                    <Card.Text className="text-muted">
                                        Sign up as a donor or patient. Fill your medical details accurately to help our matching engine.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={4}>
                            <Card className="h-100 border-0 shadow-sm glass-card rounded-4 feature-card text-center p-4 position-relative" style={{ top: '20px' }}>
                                <Card.Body>
                                    <div className="feature-icon-wrapper mx-auto mb-4 bg-danger text-white d-flex align-items-center justify-content-center shadow-lg" style={{ width: '80px', height: '80px', borderRadius: '70% 30% 30% 70% / 30% 70% 30% 70%' }}>
                                        <i className="bi bi-broadcast fs-1"></i>
                                    </div>
                                    <Card.Title className="fw-bolder fs-4 mb-3">2. Smart Matching</Card.Title>
                                    <Card.Text className="text-muted">
                                        When a patient requests blood, our system notifies compatible nearby donors instantly.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={4}>
                            <Card className="h-100 border-0 shadow-sm glass-card rounded-4 feature-card text-center p-4">
                                <Card.Body>
                                    <div className="feature-icon-wrapper mx-auto mb-4 bg-success text-white d-flex align-items-center justify-content-center shadow-lg" style={{ width: '80px', height: '80px', borderRadius: '50%' }}>
                                        <i className="bi bi-heart-pulse-fill fs-1"></i>
                                    </div>
                                    <Card.Title className="fw-bolder fs-4 mb-3">3. Save a Life</Card.Title>
                                    <Card.Text className="text-muted">
                                        Connect safely, schedule the donation at the hospital, and experience the joy of saving a life.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* About Us Section */}
            <section id="about" className="py-5 bg-light my-5">
                <Container>
                    <div className="text-center mb-5 mw-md-50 mx-auto">
                        <span className="text-primary-custom fw-bold tracking-wide text-uppercase small bg-danger-subtle px-3 py-1 rounded-pill">About Us</span>
                        <h2 className="display-5 fw-bolder mt-3 mb-3">Who We Are</h2>
                        <p className="text-muted lead mx-auto" style={{ maxWidth: '800px' }}>
                            The Blood Link is a web-based blood bank management platform dedicated to bridging the gap between blood donors, patients in need, and healthcare administrators. We believe that no life should be lost due to the unavailability of blood or the inefficiency of outdated systems. Our platform was built with a single mission — to make the process of donating and receiving blood faster, simpler, and more reliable.
                        </p>
                    </div>

                    <Row className="g-4">
                        <Col lg={4}>
                            <Card className="h-100 border-0 bg-white shadow-sm rounded-4 p-4 hover-elevate transition-all glass-card">
                                <Card.Body>
                                    <div className="mb-4 text-primary fs-1">
                                        <i className="bi bi-bullseye"></i>
                                    </div>
                                    <Card.Title className="fw-bolder fs-4 mb-3">Our Mission</Card.Title>
                                    <Card.Text className="text-muted">
                                        Our mission is to digitise and streamline the blood donation ecosystem by providing a centralised platform where donors can register and schedule donations, patients can submit and track blood requests, and administrators can manage inventory and approvals in real time. We aim to replace time-consuming manual processes with an efficient, transparent, and accessible digital solution.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={4}>
                            <Card className="h-100 border-0 bg-white shadow-sm rounded-4 p-4 hover-elevate transition-all glass-card">
                                <Card.Body>
                                    <div className="mb-4 text-warning fs-1">
                                        <i className="bi bi-eye"></i>
                                    </div>
                                    <Card.Title className="fw-bolder fs-4 mb-3">Our Vision</Card.Title>
                                    <Card.Text className="text-muted">
                                        We envision a future where every hospital, blood bank, and healthcare institution operates with complete visibility of blood availability, and where donors and patients are connected instantly without barriers. The Blood Link strives to be the most trusted digital bridge in critical healthcare scenarios across communities.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={4}>
                            <Card className="h-100 border-0 bg-white shadow-sm rounded-4 p-4 hover-elevate transition-all glass-card">
                                <Card.Body>
                                    <div className="mb-4 text-success fs-1">
                                        <i className="bi bi-shield-check"></i>
                                    </div>
                                    <Card.Title className="fw-bolder fs-4 mb-3">Our Commitment</Card.Title>
                                    <Card.Text className="text-muted">
                                        We are committed to continuous improvement, user privacy, and the highest standards of data security. Every feature of The Blood Link has been designed with the end user in mind — from the patient waiting in a hospital to the donor who wants to make a difference. Together, we can save lives, one drop at a time.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    
                    <Row className="g-4 mt-2">
                        <Col lg={6}>
                            <Card className="h-100 border-0 bg-white shadow-sm rounded-4 p-4 hover-elevate transition-all glass-card">
                                <Card.Body>
                                    <div className="mb-4 text-info fs-1">
                                        <i className="bi bi-grid-1x2"></i>
                                    </div>
                                    <Card.Title className="fw-bolder fs-4 mb-3">What We Offer</Card.Title>
                                    <Card.Text className="text-muted">
                                        The Blood Link provides dedicated dashboards for three types of users. Patients can submit blood requests with urgency levels, specify their target hospital, and monitor request status in real time. Donors can manage their profiles, toggle their availability, schedule donation appointments, and view their complete donation history. Administrators gain a comprehensive control panel to oversee blood stock levels, manage pending requests, and maintain user accounts — all from one centralised interface.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={6}>
                            <Card className="h-100 border-0 bg-white shadow-sm rounded-4 p-4 hover-elevate transition-all glass-card">
                                <Card.Body>
                                    <div className="mb-4 text-danger fs-1">
                                        <i className="bi bi-heart"></i>
                                    </div>
                                    <Card.Title className="fw-bolder fs-4 mb-3">Why Choose The Blood Link</Card.Title>
                                    <Card.Text className="text-muted">
                                        Every second matters in a medical emergency. The Blood Link eliminates delays caused by manual processes, ensures accurate and up-to-date blood stock information, and connects the right donors with the right patients at the right time. Built on modern, secure technology, our platform is designed to be reliable, responsive, and easy to use for everyone involved in the blood donation process.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* CTA Section */}
            {!user && (
                <section className="py-5 position-relative overflow-hidden mb-5">
                    <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(45deg, var(--primary-color) 0%, #ff6b6b 100%)', zIndex: -1 }}></div>
                    {/* Decorative background circles */}
                    <div className="position-absolute rounded-circle bg-white opacity-10 blur-xl" style={{ width: '400px', height: '400px', top: '-100px', right: '-100px', zIndex: 0 }}></div>
                    <div className="position-absolute rounded-circle bg-white opacity-10 blur-xl" style={{ width: '300px', height: '300px', bottom: '-100px', left: '-100px', zIndex: 0 }}></div>

                    <Container className="position-relative z-index-1 text-center py-5">
                        <h2 className="display-4 fw-bolder text-white mb-4">Your Blood Can Bring a Smile.</h2>
                        <p className="lead text-white opacity-75 mb-5 mx-auto" style={{ maxWidth: '700px' }}>
                            Every 2 seconds, someone in the world needs blood. Your single donation can save up to three lives. Don't wait.
                        </p>
                        <Link to="/register" className="btn btn-light btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg btn-hover-elevate text-danger fs-5">
                            Register Now
                        </Link>
                    </Container>
                </section>
            )}
        </div>
    );
};

export default Home;
