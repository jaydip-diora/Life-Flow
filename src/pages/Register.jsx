import { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Register = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'donor',
        bloodGroup: '',
        contactNumber: ''
    });

    const { name, email, password, role, bloodGroup, contactNumber } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await register(formData);
            toast.success('Registration Successful! Please login.');
            navigate('/login');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration Failed');
        }
    };

    return (
        <Container className="py-5 animate-fade-in align-items-center d-flex mt-3">
            <Row className="w-100 justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="glass-card shadow border-0 p-4 rounded-4">
                        <Card.Body>
                            <div className="text-center mb-4">
                                <i className="bi bi-person-plus-fill text-primary-custom fs-1 mb-2"></i>
                                <h3 className="fw-bold mb-1">Join Life Flow</h3>
                                <p className="text-muted">Create an account to donate or request blood</p>
                            </div>
                            <Form onSubmit={onSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-semibold">Full Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter full name" name="name" value={name} onChange={onChange} required className="py-2" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-semibold">Email address</Form.Label>
                                            <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={onChange} required className="py-2" />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-semibold">Password</Form.Label>
                                            <Form.Control type="password" placeholder="Password (min 6 char)" name="password" value={password} onChange={onChange} required minLength="6" className="py-2" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-semibold">Contact Number</Form.Label>
                                            <Form.Control type="text" placeholder="Phone number" name="contactNumber" value={contactNumber} onChange={onChange} required className="py-2" />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-semibold">I want to register as</Form.Label>
                                            <Form.Select name="role" value={role} onChange={onChange} className="py-2">
                                                <option value="donor">A Blood Donor</option>
                                                <option value="patient">A Patient (Requesting Blood)</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-4">
                                            <Form.Label className="fw-semibold">Blood Group</Form.Label>
                                            <Form.Select name="bloodGroup" value={bloodGroup} onChange={onChange} required className="py-2">
                                                <option value="">Select Blood Group</option>
                                                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                                                    <option key={bg} value={bg}>{bg}</option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Button variant="primary" type="submit" className="w-100 py-2 fw-bold text-white fs-5 rounded-3 mb-3">
                                    Register Account
                                </Button>
                            </Form>
                            <div className="text-center mt-3">
                                <p className="mb-0">Already have an account? <Link to="/login" className="text-primary-custom fw-bold text-decoration-none">Login here</Link></p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
