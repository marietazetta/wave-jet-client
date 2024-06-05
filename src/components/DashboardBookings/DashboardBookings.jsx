import React, { useEffect, useState } from 'react';
import { Row, Table, Col, Container, Button } from "react-bootstrap";
import './DashboardBookings.css';
import bookingServices from "../../services/booking.services"

const DashboardBookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = () => {
        bookingServices
            .getAllBookings()
            .then(response => {
                setBookings(response.data);
            })
            .catch(error => {
                console.error('Error fetching bookings:', error);
            });
    };

    const updateBookingStatus = (bookingId, status) => {
        bookingServices
            .editBooking(bookingId, { status })
            .then(() => {
                setBookings(prevBookings =>
                    prevBookings.map(booking =>
                        booking._id === bookingId ? { ...booking, status } : booking
                    )
                );
            })
            .catch(error => {
                console.error('Error updating booking status:', error);
            });
    };

    const handleApprove = (bookingId) => {
        updateBookingStatus(bookingId, 'Approved');
    };

    const handlePending = (bookingId) => {
        updateBookingStatus(bookingId, 'Pending');
    };

    const handleReject = (bookingId) => {
        updateBookingStatus(bookingId, 'Rejected');
    };

    return (
        <Container className="dashboard-flights">
            <Row>
                <Col>
                    <h1 style={{ color: 'black' }}>Bookings Overview</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover responsive className="flights-table">
                        <thead>
                            <tr>
                                <th>Flight Route</th>
                                <th>Departure Date</th>
                                <th>Return Date</th>
                                <th>Travellers</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(booking => (
                                <tr key={booking._id}>
                                    <td>{booking.fromDestination} - {booking.toDestination}</td>
                                    <td>{new Date(booking.departureDate).toLocaleDateString()}</td>
                                    <td>{new Date(booking.returnDate).toLocaleDateString()}</td>
                                    <td>{booking.travellers}</td>
                                    <td>{booking.status}</td>
                                    <td>
                                        <Button
                                            variant="success"
                                            size="sm"
                                            onClick={() => handleApprove(booking._id)}
                                            className="me-2"
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            variant="warning"
                                            size="sm"
                                            onClick={() => handlePending(booking._id)}
                                            className="me-2"
                                        >
                                            Pending
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleReject(booking._id)}
                                        >
                                            Reject
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default DashboardBookings;
