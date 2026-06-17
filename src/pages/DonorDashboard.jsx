import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Badge, Modal, FormCheck } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

const DonorDashboard = () => {
    const { user, setUser } = useContext(AuthContext);
    const [donations, setDonations] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [scheduleDate, setScheduleDate] = useState('');

    useEffect(() => {
        fetchDonations();
    }, []);

    const fetchDonations = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5051/api/donor/donations', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDonations(res.data);
        } catch (error) {
            toast.error('Failed to load donation history');
        }
    };

    const handleScheduleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5051/api/donor/donations', { date: scheduleDate, bloodGroup: user.bloodGroup }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Donation scheduled successfully!');
            setShowModal(false);
            setScheduleDate('');
            fetchDonations();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to schedule donation');
        }
    };

    const toggleAvailability = async (e) => {
        const newStatus = e.target.checked;
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:5051/api/donor/availability', { availability: newStatus }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser({ ...user, availability: newStatus });
            toast.success(`Availability updated to ${newStatus ? 'Available' : 'Unavailable'}`);
        } catch (error) {
            toast.error('Failed to update availability');
        }
    };

    const handleDownloadCertificate = (don) => {
        const certificateWindow = window.open('', '_blank');
        certificateWindow.document.write(`
            <html>
            <head>
                <title>Donation Certificate</title>
                <style>
                    body { font-family: 'Times New Roman', serif; text-align: center; margin: 0; padding: 40px; background: #fff; }
                    .cert-container { border: 12px double #d9534f; padding: 60px; max-width: 800px; margin: 0 auto; background: #fdfaf6; box-shadow: 0 0 15px rgba(0,0,0,0.1); }
                    .title { font-size: 45px; font-weight: bold; color: #b52b27; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 25px; }
                    .subtitle { font-size: 24px; color: #555; margin-bottom: 35px; font-style: italic; }
                    .name { font-size: 40px; font-weight: bold; color: #222; margin: 20px 0; border-bottom: 2px solid #ccc; display: inline-block; padding-bottom: 5px; }
                    .description { font-size: 20px; color: #444; line-height: 1.8; margin: 30px 0; }
                    .details { border-top: 1px dashed #d9534f; border-bottom: 1px dashed #d9534f; padding: 20px 0; font-size: 22px; font-weight: bold; color: #d9534f; margin: 40px 0; }
                    .footer { font-size: 16px; color: #777; margin-top: 50px; font-weight: bold; }
                    .stamp { margin-top: 40px; font-size: 20px; color: #d9534f; border: 3px solid #d9534f; border-radius: 50%; width: 120px; height: 120px; display: inline-flex; align-items: center; justify-content: center; transform: rotate(-15deg); opacity: 0.8; font-weight: bold; }
                </style>
            </head>
            <body>
                <div class="cert-container">
                    <div class="title">Certificate of Appreciation</div>
                    <div class="subtitle">Proudly Presented To</div>
                    <div class="name">${user?.name}</div>
                    <div class="description">
                        For your selfless, generous, and life-saving contribution. Your noble act of donating blood plays a crucial role in saving lives and bringing hope to those in critical need.
                    </div>
                    <div class="details">
                        Blood Group Donated: <span>${don.bloodGroup}</span><br>
                        Date of Donation: <span>${new Date(don.date).toLocaleDateString()}</span>
                    </div>
                    <div class="stamp">LIFE FLOW</div>
                    <div class="footer">
                        Life Flow - Blood Bank Management System<br>
                        Certificate ID: <small>${don._id}</small>
                    </div>
                </div>
                <script>
                    window.onload = function() { window.print(); }
                </script>
            </body>
            </html>
        `);
        certificateWindow.document.close();
    };

    return (
        <Container fluid className="py-4 animate-fade-in px-4">
            <Row className="mb-4 align-items-center">
                <Col>
                    <h2 className="fw-bold mb-0">Donor Dashboard</h2>
                    <p className="text-muted mb-0">Manage your donations and profile</p>
                </Col>
                <Col className="text-end">
                    <Button variant="danger" onClick={() => setShowModal(true)} className="rounded-pill shadow-sm px-4 fw-bold">
                        <i className="bi bi-calendar-plus me-2"></i> Schedule Donation
                    </Button>
                </Col>
            </Row>

            <Row className="g-4">
                {/* Profile Card */}
                <Col lg={4}>
                    <Card className="border-0 shadow-sm rounded-4 h-100 p-3 glass-card text-center">
                        <Card.Body>
                            <div className="mb-4">
                                <div className="bg-danger text-white rounded-circle d-inline-flex align-items-center justify-content-center shadow" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                                    <i className="bi bi-heart-fill"></i>
                                </div>
                            </div>
                            <Card.Title className="fw-bold fs-4 mb-0">{user?.name}</Card.Title>
                            <div className="mt-2 mb-3">
                                <Badge bg="danger" pill className="fs-6 px-3 shadow-sm">Blood Group {user?.bloodGroup}</Badge>
                            </div>

                            <hr />

                            <div className="d-flex justify-content-between px-3 text-start mb-4">
                                <div>
                                    <p className="text-muted mb-1 fs-7 fw-semibold">Email</p>
                                    <h6 className="fw-bold">{user?.email}</h6>
                                </div>
                                <div>
                                    <p className="text-muted mb-1 fs-7 fw-semibold">Contact</p>
                                    <h6 className="fw-bold">{user?.contactNumber}</h6>
                                </div>
                            </div>

                            <div className="bg-light p-3 rounded-3 mt-3 d-flex align-items-center justify-content-between">
                                <span className="fw-semibold text-dark">Donation Availability</span>
                                <FormCheck
                                    type="switch"
                                    id="availability-switch"
                                    checked={user?.availability !== false} // Default to true if undefined
                                    onChange={toggleAvailability}
                                    className="fs-4 m-0"
                                />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Donation History */}
                <Col lg={8}>
                    <Card className="border-0 shadow-sm rounded-4 h-100 glass-card">
                        <Card.Body className="p-4">
                            <Card.Title className="fw-bold mb-4 d-flex justify-content-between align-items-center">
                                Donation History
                                <Badge bg="light" text="dark" className="border px-3 py-2 rounded-pill shadow-sm">{donations.length} Donations</Badge>
                            </Card.Title>
                            <div className="table-responsive">
                                <Table hover className="align-middle text-center">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Scheduled Date & Time</th>
                                            <th>Blood Group Donated</th>
                                            <th>Status</th>
                                            <th>Certificate</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {donations.length > 0 ? donations.map(don => (
                                            <tr key={don._id}>
                                                <td className="fw-semibold text-dark">{new Date(don.date).toLocaleString([], { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                                                <td><Badge bg="danger" pill className="fs-6 px-3">{don.bloodGroup}</Badge></td>
                                                <td>
                                                    <Badge bg={don.status === 'Completed' ? 'success' : don.status === 'Cancelled' ? 'danger' : 'warning'} className="px-3 rounded-pill text-uppercase">
                                                        {don.status}
                                                    </Badge>
                                                </td>
                                                <td>
                                                    {don.status === 'Completed' ? (
                                                        <Button variant="outline-danger" size="sm" onClick={() => handleDownloadCertificate(don)} className="rounded-pill px-3 fw-bold shadow-sm">
                                                            <i className="bi bi-award me-1"></i> Get
                                                        </Button>
                                                    ) : '-'}
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="3" className="text-center text-muted py-5">
                                                    <i className="bi bi-calendar-x fs-1 d-block mb-3 opacity-50"></i>
                                                    No donation history found. Schedule a donation to save a life!
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

            {/* Schedule Donation Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered backdrop="static">
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="fw-bold text-danger">Schedule a Donation</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleScheduleSubmit}>
                    <Modal.Body className="pt-3 pb-4">
                        <p className="text-muted mb-4">Choose a suitable date for your next blood donation appointment.</p>
                        <Form.Group>
                            <Form.Label className="fw-semibold">Select Date & Time</Form.Label>
                            <Form.Control type="datetime-local" name="date" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} required min={new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16)} className="py-2 bg-light form-control-lg" />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer className="border-0 pt-0">
                        <Button variant="light" onClick={() => setShowModal(false)} className="px-4 fw-bold rounded-pill">Cancel</Button>
                        <Button variant="danger" type="submit" className="px-4 fw-bold rounded-pill shadow-sm">Confirm Booking</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

        </Container>
    );
};

export default DonorDashboard;
