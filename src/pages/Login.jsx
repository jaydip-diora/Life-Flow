import { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const user = await login(email, password);
            toast.success('Login Successful!');
            if (user.role === 'admin') navigate('/admin/dashboard');
            else if (user.role === 'patient') navigate('/patient/dashboard');
            else if (user.role === 'donor') navigate('/donor/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login Failed');
        }
    };

    return (
        <Container className="py-5 animate-fade-in align-items-center d-flex my-5">
            <Row className="w-100 justify-content-center">
                <Col md={6} lg={5}>
                    <Card className="glass-card shadow border-0 p-4 rounded-4">
                        <Card.Body>
                            <div className="text-center mb-4">
                                <i className="bi bi-droplet-fill text-primary-custom fs-1 mb-3"></i>
                                <h3 className="fw-bold mb-1">Welcome Back</h3>
                                <p className="text-muted">Login to manage your account</p>
                            </div>
                            <Form onSubmit={onSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className="fw-semibold">Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={onChange} required className="py-2" />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formBasicPassword">
                                    <Form.Label className="fw-semibold">Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={onChange} required className="py-2" />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100 py-2 fw-bold text-white fs-5 rounded-3 mb-3">
                                    Login
                                </Button>
                            </Form>
                            <div className="text-center mt-3">
                                <p className="mb-0">Don't have an account? <Link to="/register" className="text-primary-custom fw-bold text-decoration-none">Register here</Link></p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
