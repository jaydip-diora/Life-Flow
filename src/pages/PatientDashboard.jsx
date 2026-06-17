import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Badge, Modal } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

const PatientDashboard = () => {
    const { user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        bloodGroup: '',
        quantity: 1,
        hospital: '',
        urgency: 'Normal'
    });

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5051/api/patient/requests', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRequests(res.data);
        } catch (error) {
            toast.error('Failed to load request history');
        }
    };

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5051/api/patient/requests', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Blood request submitted successfully!');
            setShowModal(false);
            setFormData({ bloodGroup: '', quantity: 1, hospital: '', urgency: 'Normal' });
            fetchRequests();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to submit request');
        }
    };

    return (
        <Container fluid className="py-4 animate-fade-in px-4">
            <Row className="mb-4 align-items-center">
                <Col>
                    <h2 className="fw-bold mb-0">Patient Dashboard</h2>
                    <p className="text-muted mb-0">Manage your blood requests and profile</p>
                </Col>
                <Col className="text-end">
                    <Button variant="primary" onClick={() => setShowModal(true)} className="rounded-pill shadow-sm px-4 fw-bold">
                        <i className="bi bi-droplet me-2"></i> Request Blood
                    </Button>
                </Col>
            </Row>

            <Row className="g-4">
                {/* Profile Card */}
                <Col lg={4}>
                    <Card className="border-0 shadow-sm rounded-4 h-100 p-3 glass-card text-center">
                        <Card.Body>
                            <div className="mb-4">
                                <div className="bg-primary-custom text-white rounded-circle d-inline-flex align-items-center justify-content-center shadow" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <Card.Title className="fw-bold fs-4 mb-1">{user?.name}</Card.Title>
                            <p className="text-muted mb-3">{user?.email}</p>
                            <hr />
                            <div className="d-flex justify-content-between px-3 text-start">
                                <div>
                                    <p className="text-muted mb-1 fs-7 fw-semibold">Blood Group</p>
                                    <h5 className="fw-bold text-danger">{user?.bloodGroup || 'Not set'}</h5>
                                </div>
                                <div>
                                    <p className="text-muted mb-1 fs-7 fw-semibold">Contact</p>
                                    <h5 className="fw-bold">{user?.contactNumber}</h5>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Request History */}
                <Col lg={8}>
                    <Card className="border-0 shadow-sm rounded-4 h-100 glass-card">
                        <Card.Body className="p-4">
                            <Card.Title className="fw-bold mb-4 d-flex justify-content-between align-items-center">
                                Request History
                                <Badge bg="light" text="dark" className="border px-3 py-2 rounded-pill shadow-sm">{requests.length} Requests</Badge>
                            </Card.Title>
                            <div className="table-responsive">
                                <Table hover className="align-middle text-center">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Date</th>
                                            <th>Blood Group</th>
                                            <th>Units</th>
                                            <th>Hospital</th>
                                            <th>Urgency</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {requests.length > 0 ? requests.map(req => (
                                            <tr key={req._id}>
                                                <td className="text-muted">{new Date(req.createdAt).toLocaleDateString()}</td>
                                                <td><Badge bg="danger" pill className="fs-6 px-3">{req.bloodGroup}</Badge></td>
                                                <td className="fw-bold">{req.quantity}</td>
                                                <td className="text-start">{req.hospital}</td>
                                                <td>
                                                    <Badge bg={req.urgency === 'Emergency' ? 'danger' : req.urgency === 'Urgent' ? 'warning' : 'info'} className="px-3 rounded-pill text-uppercase">
                                                        {req.urgency}
                                                    </Badge>
                                                </td>
                                                <td>
                                                    <Badge bg={req.status === 'Approved' ? 'success' : req.status === 'Rejected' ? 'danger' : 'secondary'} className="px-3 rounded-pill text-uppercase">
                                                        {req.status}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="6" className="text-center text-muted py-5">
                                                    <i className="bi bi-inbox fs-1 d-block mb-3 opacity-50"></i>
                                                    No blood requests found. Click "Request Blood" to make a new request.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Request Blood Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered backdrop="static">
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="fw-bold text-primary-custom">Request Blood Form</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body className="pt-3">
                        <Row className="g-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="fw-semibold">Blood Group Needed</Form.Label>
                                    <Form.Select name="bloodGroup" value={formData.bloodGroup} onChange={onChange} required className="py-2 bg-light">
                                        <option value="">Select Group</option>
                                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                                            <option key={bg} value={bg}>{bg}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="fw-semibold">Quantity (Units/Pints)</Form.Label>
                                    <Form.Control type="number" min="1" name="quantity" value={formData.quantity} onChange={onChange} required className="py-2 bg-light" />
                                </Form.Group>
                            </Col>
                            <Col md={12}>
                                <Form.Group>
                                    <Form.Label className="fw-semibold">Hospital Name & Location</Form.Label>
                                    <Form.Control type="text" name="hospital" value={formData.hospital} onChange={onChange} required placeholder="Enter full hospital details" className="py-2 bg-light" />
                                </Form.Group>
                            </Col>
                            <Col md={12}>
                                <Form.Group>
                                    <Form.Label className="fw-semibold">Urgency Level</Form.Label>
                                    <Form.Select name="urgency" value={formData.urgency} onChange={onChange} className="py-2 bg-light">
                                        <option value="Normal">Normal (Within 2-3 days)</option>
                                        <option value="Urgent">Urgent (Within 24 hours)</option>
                                        <option value="Emergency">Emergency (Immediate)</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer className="border-0 pt-0">
                        <Button variant="light" onClick={() => setShowModal(false)} className="px-4 fw-bold rounded-pill">Cancel</Button>
                        <Button variant="primary" type="submit" className="px-4 fw-bold rounded-pill shadow-sm">Submit Request</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
};

export default PatientDashboard;
