import { Row, Table, Button, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import DeleteModal from "../DeleteModal/DeleteModal";
import './DashboardFlights.css';
import { AuthContext } from "../../contexts/auth.context";

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
                    <h1 style={{ color: 'black' }}>Aircrafts and Flights Overview</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover responsive className="flights-table">
                        <thead>
                            <tr>
                                <th className="wide-header" rowSpan="2">Route
                                    {loggedUser && <Link className="btn btn-sm btn-dark" to={'/routes/add'}>New Route</Link>}
                                </th>
                                <th className="wide-header" rowSpan="2">Range (nm)</th>
                                <th className="wide-header" rowSpan="2">Flight Time</th>
                                {aircrafts.map(aircraft => (
                                    <th key={aircraft._id} colSpan="2">{aircraft.model} - {aircraft.tailNumber}</th>
                                ))}
                                <th className="wide-header" rowSpan="2">Actions</th>
                            </tr>
                            <tr>
                                {aircrafts.map(aircraft => (
                                    <th key={aircraft._id} colSpan="2">
                                        <Link to={`/fleet/edit/${aircraft._id}`}>
                                            <Button variant="secondary" size="sm" className="action-button">Edit Aircraft</Button>
                                        </Link>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {flights.map(flight => (
                                <tr key={flight._id}>
                                    <td>{flight.fromDestination} - {flight.toDestination}</td>
                                    <td>{flight.miles}</td>
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
                                            <Button variant="secondary" size="sm" className="action-button mr-2">Edit Route</Button>
                                        </Link>
                                        <Button variant="danger" size="sm" className="action-button" onClick={() => showConfirmModal(flight._id)}>Delete</Button>
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
