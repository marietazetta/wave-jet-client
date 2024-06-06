import './DashboardFlights.css';
import React, { useContext, useState } from "react";
import { Row, Table, Button, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import DeleteModal from "../DeleteModal/DeleteModal";
import { AuthContext } from "../../contexts/auth.context";
import { FaEdit } from "react-icons/fa";
import { GiCommercialAirplane } from "react-icons/gi";
import { MdDeleteForever } from "react-icons/md";
import { FiPlusSquare } from 'react-icons/fi';

const DashboardFlights = ({ aircrafts, flights, loadFlights }) => {
    const [show, setShow] = useState(false);
    const [selectedFlightId, setSelectedFlightId] = useState(null);
    const { loggedUser } = useContext(AuthContext);

    const handleClose = () => setShow(false);
    const showConfirmModal = (flightId) => {
        setSelectedFlightId(flightId);
        setShow(true);
    };

    return (
        <Container fluid className="dashboard-flights">
            <Row>
                <Col>
                    <h1>Aircrafts and Flights Overview</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover responsive className="flights-table">
                        <thead>
                            <tr>
                                <th className="wide-header" rowSpan="2">Route
                                    {loggedUser && <Link to={'/routes/add'}>
                                        <FiPlusSquare className="edit-aircraft-icon" title="Add Route" />
                                    </Link>}
                                </th>
                                <th className="wide-header" rowSpan="2">Range</th>
                                <th className="wide-header" rowSpan="2">Flight Time</th>
                                {aircrafts.map(aircraft => (
                                    <th key={aircraft._id} colSpan="2">{aircraft.model}</th>
                                ))}
                                <th className="wide-header" rowSpan="2">Actions</th>
                            </tr>
                            <tr>
                                {aircrafts.map(aircraft => (
                                    <th key={aircraft._id} colSpan="2">
                                        <Link to={`/fleet/edit/${aircraft._id}`}>
                                            <GiCommercialAirplane className="edit-aircraft-icon" title="Edit Aircraft" />
                                        </Link>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {flights.map(flight => (
                                <tr key={flight._id}>
                                    <td>{flight.fromDestination} - {flight.toDestination}</td>
                                    <td>{flight.miles} nm</td>
                                    <td>{flight.flightTime} hs</td>
                                    {aircrafts.map(aircraft => {
                                        if (flight.aircraftId.includes(aircraft._id)) {
                                            const pricePerFlight = flight.flightTime * aircraft.hourlyRate;
                                            return <td key={aircraft._id} colSpan="2">${pricePerFlight.toFixed(2)}</td>;
                                        }
                                        return <td key={aircraft._id} colSpan="2">N/A</td>;
                                    })}
                                    <td className="actions-column">
                                        <Link to={`/routes/edit/${flight._id}`}>
                                            <FaEdit className="edit-aircraft-icon" title="Edit Route" />
                                        </Link>
                                        <MdDeleteForever className="edit-aircraft-icon" title="Delete Route" onClick={() => showConfirmModal(flight._id)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <DeleteModal show={show} handleClose={handleClose} flightId={selectedFlightId} loadFlights={loadFlights} />
        </Container>
    );
};

export default DashboardFlights;
