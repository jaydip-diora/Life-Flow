import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'donor',
        contactNumber: '',
        bloodGroup: 'Unknown'
    });

    const roles = ['donor', 'patient'];
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'];

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5051/api/admin/users', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(res.data);
        } catch (error) {
            toast.error('Failed to load users');
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5051/api/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('User deleted successfully');
            fetchUsers();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete user');
        }
    };

    const handleOpenEdit = (user) => {
        setSelectedUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            role: user.role,
            contactNumber: user.contactNumber || '',
            bloodGroup: user.bloodGroup || 'Unknown'
        });
        setEditMode(true);
        setShowModal(true);
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5051/api/admin/users/${selectedUser._id}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('User updated successfully');
            setShowModal(false);
            setEditMode(false);
            setSelectedUser(null);
            fetchUsers();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update user');
        }
    };

    return (
        <Container fluid className="py-4 animate-fade-in px-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">Manage Users</h2>
                <div>
                    <Link to="/admin/dashboard" className="btn btn-outline-secondary me-2">Back to Dashboard</Link>
                </div>
            </div>

            <Row>
                <Col lg={12} className="mx-auto">
                    <Card className="border-0 shadow-sm rounded-4 glass-card">
                        <Card.Body className="p-4">
                            <Card.Title className="fw-bold mb-4">All Users (Donors & Patients)</Card.Title>
                            <div className="table-responsive">
                                <Table hover className="align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Contact Number</th>
                                            <th>Blood Group</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(user => (
                                            <tr key={user._id}>
                                                <td className="fw-semibold">{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <Badge bg={user.role === 'donor' ? 'info' : 'warning'} className="text-uppercase text-dark px-2">
                                                        {user.role}
                                                    </Badge>
                                                </td>
                                                <td>{user.contactNumber || 'N/A'}</td>
                                                <td>
                                                    {user.bloodGroup ? (
                                                        <Badge bg="danger" pill className="fs-6 px-3">{user.bloodGroup}</Badge>
                                                    ) : (
                                                        'N/A'
                                                    )}
                                                </td>
                                                <td>
                                                    <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleOpenEdit(user)}>
                                                        <i className="bi bi-pencil"></i> Edit
                                                    </Button>
                                                    <Button variant="outline-danger" size="sm" onClick={() => handleDeleteUser(user._id)}>
                                                        <i className="bi bi-trash"></i> Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                        {users.length === 0 && (
                                            <tr>
                                                <td colSpan="6" className="text-center py-4 text-muted">No users found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal show={showModal} onHide={() => { setShowModal(false); setEditMode(false); }} centered>
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="fw-bold">{editMode ? 'Edit User' : 'User'}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleUpdateUser}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Role</Form.Label>
                            <Form.Select 
                                value={formData.role}
                                onChange={(e) => setFormData({...formData, role: e.target.value})}
                                required
                            >
                                {roles.map(r => (
                                    <option key={r} value={r}>{r}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Contact Number</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={formData.contactNumber}
                                onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Blood Group</Form.Label>
                            <Form.Select 
                                value={formData.bloodGroup}
                                onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
                            >
                                {bloodGroups.map(bg => (
                                    <option key={bg} value={bg}>{bg}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer className="border-0 pt-0">
                        <Button variant="light" onClick={() => { setShowModal(false); setEditMode(false); }}>Cancel</Button>
                        <Button variant="primary" type="submit">Update</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
};

export default AdminUsers;
