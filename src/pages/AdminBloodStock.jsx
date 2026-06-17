import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AdminBloodStock = () => {
    const [stock, setStock] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        bloodGroup: 'A+',
        quantity: 1
    });

    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    useEffect(() => {
        fetchStock();
    }, []);

    const fetchStock = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5051/api/admin/blood-stock', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStock(res.data);
        } catch (error) {
            toast.error('Failed to load blood stock');
        }
    };

    const handleUpdateStock = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5051/api/admin/blood-stock', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Blood stock updated successfully');
            setShowModal(false);
            setFormData({ bloodGroup: 'A+', quantity: 1 });
            fetchStock();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update stock');
        }
    };

    return (
        <Container fluid className="py-4 animate-fade-in px-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">Manage Blood Stock</h2>
                <div>
                    <Link to="/admin/dashboard" className="btn btn-outline-secondary me-2">Back to Dashboard</Link>
                    <Button variant="danger" onClick={() => setShowModal(true)}>
                        <i className="bi bi-plus-lg me-2"></i>Update Stock
                    </Button>
                </div>
            </div>

            <Row>
                <Col lg={8} className="mx-auto">
                    <Card className="border-0 shadow-sm rounded-4 glass-card">
                        <Card.Body className="p-4">
                            <Card.Title className="fw-bold mb-4">Current Availability</Card.Title>
                            <div className="table-responsive">
                                <Table hover className="align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Blood Group</th>
                                            <th>Available Units (ml/pints)</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bloodGroups.map(bg => {
                                            const item = stock.find(s => s.bloodGroup === bg);
                                            const qty = item ? item.quantity : 0;
                                            return (
                                                <tr key={bg}>
                                                    <td>
                                                        <Badge bg="danger" pill className="fs-6 px-3">{bg}</Badge>
                                                    </td>
                                                    <td className="fw-semibold fs-5">{qty}</td>
                                                    <td>
                                                        {qty > 10 ? (
                                                            <Badge bg="success">Good</Badge>
                                                        ) : qty > 0 ? (
                                                            <Badge bg="warning">Low</Badge>
                                                        ) : (
                                                            <Badge bg="danger">Out of Stock</Badge>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="fw-bold">Update Stock</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleUpdateStock}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Blood Group</Form.Label>
                            <Form.Select 
                                value={formData.bloodGroup}
                                onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
                                required
                            >
                                {bloodGroups.map(bg => (
                                    <option key={bg} value={bg}>{bg}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Quantity to Add/Remove</Form.Label>
                            <Form.Control 
                                type="number" 
                                value={formData.quantity}
                                onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 0})}
                                required
                                placeholder="E.g., 5 to add, -2 to remove"
                            />
                            <Form.Text className="text-muted">
                                Use negative values to reduce stock manually.
                            </Form.Text>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer className="border-0 pt-0">
                        <Button variant="light" onClick={() => setShowModal(false)}>Cancel</Button>
                        <Button variant="danger" type="submit">Update</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
};

export default AdminBloodStock;
