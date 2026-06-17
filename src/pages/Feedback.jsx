import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';

const Feedback = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        rating: 5
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:5051/api/feedback/submit', formData);
            toast.success('Thank you! Your feedback has been submitted successfully.');
            setFormData({ name: '', email: '', subject: '', message: '', rating: 5 });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to submit feedback. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={10} lg={8} xl={6}>
                    <Card className="shadow-lg border-0 rounded-4 p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)' }}>
                        <Card.Body>
                            <h2 className="text-center fw-bold mb-3" style={{ color: '#0284c7' }}>Share Your Feedback</h2>
                            <p className="text-center text-muted mb-4">We value your input to help improve Life Flow. Let us know how we can do better!</p>

                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-semibold">Full Name</Form.Label>
                                            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter your name" className="py-2" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-semibold">Email Address</Form.Label>
                                            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email" className="py-2" />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-semibold">Subject</Form.Label>
                                    <Form.Control type="text" name="subject" value={formData.subject} onChange={handleChange} required placeholder="What is this regarding?" className="py-2" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-semibold">Feedback Message</Form.Label>
                                    <Form.Control as="textarea" rows={4} name="message" value={formData.message} onChange={handleChange} required placeholder="Tell us what you loved or how we can improve..." />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-semibold">Rate Your Experience</Form.Label>
                                    <Form.Select name="rating" value={formData.rating} onChange={handleChange} className="py-2 border-0 shadow-sm">
                                        <option value="5">⭐⭐⭐⭐⭐ Excellent (5)</option>
                                        <option value="4">⭐⭐⭐⭐ Good (4)</option>
                                        <option value="3">⭐⭐⭐ Average (3)</option>
                                        <option value="2">⭐⭐ Poor (2)</option>
                                        <option value="1">⭐ Terrible (1)</option>
                                    </Form.Select>
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100 fw-bold py-2 rounded-3 shadow-sm pt-3 pb-3" style={{ backgroundColor: '#0284c7' }} disabled={loading}>
                                    {loading ? 'Submitting Feedback...' : 'Submit Feedback'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Feedback;
