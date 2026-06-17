import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navigation = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Determine target dashboard based on role, or fallback to login
    const profileLink = user
        ? (user.role === 'admin' ? '/admin/dashboard' : user.role === 'patient' ? '/patient/dashboard' : '/donor/dashboard')
        : '/login';

    return (
        <Container className="pt-4">
            <Navbar expand="lg" className="glass-header d-flex justify-content-between align-items-center">
                <Navbar.Brand as={Link} to="/" className="fw-bolder fs-4 mb-0" style={{ letterSpacing: '-0.5px' }}>
                    <span className="text-primary-custom">Life</span> <span className="text-primary-custom" style={{ color: '#0284c7' }}>Flow</span>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none" />

                <Navbar.Collapse id="basic-navbar-nav" className="w-100 mt-2 mt-lg-0">
                    <Nav className="mx-auto align-items-center gap-1">
                        <Nav.Link as={Link} to="/" className={location.pathname === '/' ? 'nav-link-active' : ''}>Home</Nav.Link>
                        {(!user || user.role === 'admin' || user.role === 'donor') && (
                            <Nav.Link as={Link} to={user ? '/donor/dashboard' : '/register'} className={(location.pathname === '/register' || location.pathname === '/donor/dashboard') ? 'nav-link-active' : ''}>Donate Blood</Nav.Link>
                        )}
                        {(!user || user.role === 'admin' || user.role === 'patient') && (
                            <Nav.Link as={Link} to={user ? '/patient/dashboard' : '/login'} className={(location.pathname === '/login' || location.pathname === '/patient/dashboard') ? 'nav-link-active' : ''}>Blood Request</Nav.Link>
                        )}
                        <Nav.Link href="#about">About Us</Nav.Link>
                        <Nav.Link as={Link} to="/feedback" className={location.pathname === '/feedback' ? 'nav-link-active' : ''}>Feedback</Nav.Link>
                    </Nav>

                    <Nav className="align-items-center mt-3 mt-lg-0">
                        {user ? (
                            <NavDropdown 
                                title={<div className="user-icon-btn"><i className="bi bi-person fs-5"></i></div>} 
                                id="user-dropdown" 
                                align="end" 
                                className="border-0 user-dropdown-nav"
                            >
                                <NavDropdown.Header className="fw-bold border-bottom pb-2 mb-2 text-dark">
                                    {user.name} <br/>
                                    <small className="text-muted fw-normal">{user.role}</small>
                                </NavDropdown.Header>
                                <NavDropdown.Item as={Link} to={profileLink} className="py-2">
                                    <i className="bi bi-grid-fill me-2"></i> My Dashboard
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout} className="text-danger py-2">
                                    <i className="bi bi-box-arrow-right me-2"></i> Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Link to="/login" className="user-icon-btn d-flex align-items-center justify-content-center text-dark text-decoration-none">
                                <i className="bi bi-person fs-5"></i>
                            </Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
};

export default Navigation;
