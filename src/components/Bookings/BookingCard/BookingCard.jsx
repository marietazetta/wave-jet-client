import React from "react"
import "./BookingCard.css"
import { Row, Col, Card } from "react-bootstrap"
import { MdOutlineEuro } from "react-icons/md"
import { LiaPlaneArrivalSolid, LiaPlaneDepartureSolid } from "react-icons/lia"
import { GrStatusWarning } from "react-icons/gr"
import { PiAirplaneInFlightLight } from "react-icons/pi"



const BookingCard = ({ fromDestination, toDestination, departureDate, returnDate, status, aircraftId, flightId }) => {

    return (
        <div className="BookingCard font-family">

            <Card className="custom-card">
                <Card.Body>
                    <Card.Title className="mb-4">
                        <h3>{fromDestination} - {toDestination}</h3>
                    </Card.Title>
                    <Row className="card-details">
                        <Col md={4} className="detail-item">
                            <LiaPlaneDepartureSolid className="icon" />
                            <p>Departure: {new Date(departureDate).toLocaleDateString()}</p>
                        </Col>
                        <Col md={4} className="detail-item">
                            <LiaPlaneArrivalSolid className="icon" />
                            <p>Return: {new Date(returnDate).toLocaleDateString()}</p>
                        </Col>

                        <Col md={4} className="detail-item">
                            <MdOutlineEuro className="icon" />
                            <span>{aircraftId.hourlyRate * flightId?.flightTime}</span>
                        </Col>
                        <Col md={4} className="detail-item mt-3">
                            <GrStatusWarning className="icon" />
                            <span>{status}</span>
                        </Col>
                        <Col md={4} className="detail-item mt-3">
                            <PiAirplaneInFlightLight className="icon" />
                            <span>{aircraftId.model}</span>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

        </div>
    )
}

export default BookingCard
