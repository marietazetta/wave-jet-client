import './DashboardBookings.css';
import React, { useEffect, useState } from 'react';
import { Row, Table, Col, Container, Button } from "react-bootstrap";
import { GrStatusGood, GrStatusUnknown, GrStatusCritical } from 'react-icons/gr';
import bookingServices from "../../services/booking.services";
import authServices from '../../services/auth.services';

const DashboardBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [userMap, setUserMap] = useState({});

    useEffect(() => {
        loadBookings();
        loadUsers();
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

    const loadUsers = () => {
        authServices
            .getAllUsers()
            .then(response => {
                const users = response.data;
                const userMap = {};
                users.forEach(user => {
                    userMap[user._id] = { username: user.username, email: user.email };
                });
                setUserMap(userMap);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    };

    const updateBookingStatus = (bookingId, status) => {
        bookingServices
            .editBooking(bookingId, { status })
            .then(() => {
                setBookings(bookings =>
                    bookings.map(booking =>
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

    // const handlePayment = (bookingId) => {
    //     updateBookingStatus(bookingId, 'Pay💳');
    // };

    return (
        <Container className="dashboard-flights">
            <Row>
                <Col>
                    <h1 className="dashboard-title">Bookings Overview</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover responsive className="flights-table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Email</th>
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
                                    <td>{userMap[booking.owner]?.username || 'Unknown User'}</td>
                                    <td>{userMap[booking.owner]?.email || 'Unknown Email'}</td>
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
                                            <GrStatusGood />
                                        </Button>
                                        <Button
                                            variant="warning"
                                            size="sm"
                                            onClick={() => handle(booking._id)}
                                            className="me-2"
                                        >
                                            <GrStatusUnknown />
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleReject(booking._id)}
                                        >
                                            <GrStatusCritical />
                                        </Button>

                                        {/* <Button
                                            size='md'
                                            onClick={() => handlePayment()}

                                        >
                                        </Button> */}
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
