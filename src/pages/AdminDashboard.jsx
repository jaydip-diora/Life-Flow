import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const AdminDashboard = () => {
    const [stats, setStats] = useState({});
    const [requests, setRequests] = useState([]);
    const [stock, setStock] = useState([]);
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };

            const [statsRes, requestsRes, stockRes, donationsRes] = await Promise.all([
                axios.get('http://localhost:5051/api/admin/dashboard', { headers }),
                axios.get('http://localhost:5051/api/admin/blood-requests', { headers }),
                axios.get('http://localhost:5051/api/admin/blood-stock', { headers }),
                axios.get('http://localhost:5051/api/admin/donations', { headers })
            ]);

            setStats(statsRes.data);
            setRequests(requestsRes.data);
            setStock(stockRes.data);
            setDonations(donationsRes.data);
        } catch (error) {
            toast.error('Failed to load dashboard data');
        }
    };

    const handleRequestStatus = async (id, status) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5051/api/admin/blood-requests/${id}/status`, { status }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success(`Request ${status}`);
            fetchData();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Action failed');
        }
    };

    const handleDonationStatus = async (id, status) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5051/api/admin/donations/${id}/status`, { status }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success(`Donation ${status}`);
            fetchData();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Action failed');
        }
    };

    // Chart Data Preparation
    const stockLabels = stock.map(s => s.bloodGroup);
    const stockQuantities = stock.map(s => s.quantity);

    const adminOpsData = {
        labels: ['Approve Requests', 'Manage Blood Stock', 'Review Feedback', 'Manage Users', 'Generate Reports'],
        datasets: [{
            axis: 'y',
            data: [requests.length, stock.length, stats.totalFeedback || 5, (stats.totalDonors || 0) + (stats.totalPatients || 0), 6],
            backgroundColor: ['#d9534f', '#1c2331', '#4b5563', '#ea580c', '#9ca3af'],
            borderRadius: 4,
        }]
    };

    const userEngageData = {
        labels: ['Submit Blood Request', 'Schedule Donation', 'Register / Login', 'Feedback / Contact'],
        datasets: [{
            axis: 'y',
            data: [stats.totalRequests || 0, stats.totalDonations || 0, (stats.totalDonors || 0) + (stats.totalPatients || 0), stats.totalFeedback || 0],
            backgroundColor: ['#1c2331', '#d9534f', '#374151', '#fca5a5'],
            borderRadius: 4,
        }]
    };

    const bloodStockData = {
        labels: stockLabels,
        datasets: [{
            label: 'Current inventory units per blood group',
            data: stockQuantities,
            backgroundColor: '#d9534f',
            borderRadius: 4,
        }]
    };

    const sysAnalysisData = {
        labels: ['Page Load Time', 'Server Response', 'Register/Login', 'Feedback/Contact', 'Query Optimization', 'User Feedback'],
        datasets: [{
            data: [20, 25, 10, 5, 30, 10], 
            backgroundColor: ['#3b82f6', '#1c2331', '#10b981', '#4b5563', '#d9534f', '#9ca3af'],
            borderWidth: 2,
        }]
    };

    return (
        <Container fluid className="py-4 animate-fade-in px-4">
            <h2 className="mb-4 fw-bold">Admin Dashboard</h2>

            {/* Stats Cards */}
            <Row className="g-4 mb-5">
                {[
                    { title: 'Total Donors', value: stats.totalDonors || 0, icon: 'bi-person-heart', color: 'text-primary-custom' },
                    { title: 'Total Patients', value: stats.totalPatients || 0, icon: 'bi-file-medical', color: 'text-info' },
                    { title: 'Blood Units (Total)', value: stats.totalStockUnits || 0, icon: 'bi-droplet-fill', color: 'text-danger' },
                    { title: 'Pending Requests', value: stats.pendingRequests || 0, icon: 'bi-clock-history', color: 'text-warning' }
                ].map((stat, idx) => (
                    <Col md={3} key={idx}>
                        <Card className="dashboard-stat-card border-0 shadow-sm h-100 rounded-3">
                            <Card.Body className="d-flex align-items-center justify-content-between p-4">
                                <div>
                                    <h6 className="text-muted fw-semibold mb-2">{stat.title}</h6>
                                    <h2 className="mb-0 fw-bold">{stat.value}</h2>
                                </div>
                                <div className={`fs-1 ${stat.color}`}>
                                    <i className={`bi ${stat.icon}`}></i>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <div className="mb-4 mt-5 d-flex justify-content-between align-items-center">
                <div>
                    <h6 className="text-danger fw-bold tracking-wide text-uppercase mb-1" style={{ letterSpacing: '2px', fontSize: '0.8rem' }}>Analytics</h6>
                    <h3 className="fw-bold fs-3 text-dark mb-4">Operational Graphs</h3>
                </div>
                <div>
                    <Link to="/admin/blood-stock" className="btn btn-danger me-2">
                        <i className="bi bi-droplet me-2"></i>Manage Blood Stock
                    </Link>
                    <Link to="/admin/users" className="btn btn-primary">
                        <i className="bi bi-people me-2"></i>Manage Users
                    </Link>
                </div>
            </div>

            <Row className="g-4 mb-5">
                <Col lg={6}>
                    <Card className="border-0 shadow-sm rounded-4 h-100 p-3 glass-card">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div>
                                    <Card.Title className="fw-bold mb-1">Graph 1: Admin Operations Analysis</Card.Title>
                                    <p className="text-muted small mb-0">Frequency of admin tasks per week</p>
                                </div>
                                <Badge bg="light" text="danger" className="border px-3 py-2 rounded-pill shadow-sm text-uppercase">Weekly</Badge>
                            </div>
                            <div style={{ height: '250px' }}>
                                <Bar data={adminOpsData} options={{ indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={6}>
                    <Card className="border-0 shadow-sm rounded-4 h-100 p-3 glass-card">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div>
                                    <Card.Title className="fw-bold mb-1">Graph 2: User Engagement Statistics</Card.Title>
                                    <p className="text-muted small mb-0">Average users per day by action</p>
                                </div>
                                <Badge bg="light" text="danger" className="border px-3 py-2 rounded-pill shadow-sm text-uppercase">Daily Avg</Badge>
                            </div>
                            <div style={{ height: '250px' }}>
                                <Bar data={userEngageData} options={{ indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={6}>
                    <Card className="border-0 shadow-sm rounded-4 h-100 p-3 glass-card">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div>
                                    <Card.Title className="fw-bold mb-1">Graph 3: Blood Stock Distribution</Card.Title>
                                    <p className="text-muted small mb-0">Current inventory units per blood group</p>
                                </div>
                                <Badge bg="light" text="danger" className="border px-3 py-2 rounded-pill shadow-sm text-uppercase">Inventory</Badge>
                            </div>
                            <div style={{ height: '250px' }}>
                                <Bar data={bloodStockData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={6}>
                    <Card className="border-0 shadow-sm rounded-4 h-100 p-3 glass-card">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div>
                                    <Card.Title className="fw-bold mb-1">Graph 4: Overall System Analysis</Card.Title>
                                    <p className="text-muted small mb-0">Key performance metrics (%)</p>
                                </div>
                                <Badge bg="light" text="danger" className="border px-3 py-2 rounded-pill shadow-sm text-uppercase">Performance</Badge>
                            </div>
                            <div style={{ height: '250px' }} className="d-flex justify-content-center">
                                <Doughnut data={sysAnalysisData} options={{ responsive: true, maintainAspectRatio: false, cutout: '65%', plugins: { legend: { position: 'right' } } }} />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="g-4">


                {/* Pending Requests Table */}
                <Col lg={12}>
                    <Card className="border-0 shadow-sm rounded-4 h-100 glass-card">
                        <Card.Body className="p-4">
                            <Card.Title className="fw-bold mb-4">Pending Blood Requests</Card.Title>
                            <div className="table-responsive">
                                <Table hover className="align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Patient Name</th>
                                            <th>Blood Group</th>
                                            <th>Units</th>
                                            <th>Urgency</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {requests.filter(r => r.status === 'Pending').length > 0 ? (
                                            requests.filter(r => r.status === 'Pending')
                                            .sort((a, b) => {
                                                if (a.urgency === 'Emergency' && b.urgency !== 'Emergency') return -1;
                                                if (b.urgency === 'Emergency' && a.urgency !== 'Emergency') return 1;
                                                const aIsDonor = a.patientId?.role === 'donor';
                                                const bIsDonor = b.patientId?.role === 'donor';
                                                if (aIsDonor && !bIsDonor) return -1;
                                                if (bIsDonor && !aIsDonor) return 1;
                                                return 0;
                                            })
                                            .map(req => (
                                                <tr key={req._id}>
                                                    <td className="fw-semibold">
                                                        {req.patientId?.name || 'Unknown'} 
                                                        {req.patientId?.role === 'donor' && <Badge bg="success" className="ms-2" style={{fontSize: '0.65rem'}}>Active Donor</Badge>}
                                                    </td>
                                                    <td><Badge bg="danger" pill className="fs-6 px-3">{req.bloodGroup}</Badge></td>
                                                    <td>{req.quantity}</td>
                                                    <td>
                                                        <Badge bg={req.urgency === 'Emergency' ? 'danger' : req.urgency === 'Urgent' ? 'warning' : 'info'}>
                                                            {req.urgency}
                                                        </Badge>
                                                    </td>
                                                    <td><Badge bg="secondary">{req.status}</Badge></td>
                                                    <td>
                                                        <Button size="sm" variant="success" className="me-2" onClick={() => handleRequestStatus(req._id, 'Approved')}>Approve</Button>
                                                        <Button size="sm" variant="outline-danger" onClick={() => handleRequestStatus(req._id, 'Rejected')}>Reject</Button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center text-muted py-4">No pending requests</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Pending Donor Requests Table */}
            <Row className="g-4 mt-2">
                <Col lg={12}>
                    <Card className="border-0 shadow-sm rounded-4 h-100 glass-card">
                        <Card.Body className="p-4">
                            <Card.Title className="fw-bold mb-4">Pending Donor Requests</Card.Title>
                            <div className="table-responsive">
                                <Table hover className="align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Donor Name</th>
                                            <th>Blood Group</th>
                                            <th>Scheduled Date</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {donations.filter(d => d.status === 'Pending').length > 0 ? (
                                            donations.filter(d => d.status === 'Pending').map(donation => (
                                                <tr key={donation._id}>
                                                    <td className="fw-semibold">{donation.donorId?.name || 'Unknown'}</td>
                                                    <td><Badge bg="danger" pill className="fs-6 px-3">{donation.donorId?.bloodGroup || donation.bloodGroup || 'N/A'}</Badge></td>
                                                    <td>{new Date(donation.date).toLocaleDateString()}</td>
                                                    <td><Badge bg="secondary">{donation.status}</Badge></td>
                                                    <td>
                                                        <Button size="sm" variant="success" className="me-2" onClick={() => handleDonationStatus(donation._id, 'Completed')}>Complete</Button>
                                                        <Button size="sm" variant="outline-danger" onClick={() => handleDonationStatus(donation._id, 'Cancelled')}>Cancel</Button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center text-muted py-4">No pending donor requests</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminDashboard;
