import "./BookingCard.css"
import { Container, Row, Col } from "react-bootstrap"
import { MdOutlineEuro } from "react-icons/md"
import { LiaPlaneArrivalSolid, LiaPlaneDepartureSolid } from "react-icons/lia"
import { GrStatusWarning } from "react-icons/gr"


const BookingCard = ({ fromDestination, toDestination, departureDate, returnDate, status, aircraftId, flightId }) => {



    return (
        <div className="BookingCard font-family">

            <Container fluid className="mt-5">

                <Row className="d-flex align-items-center mb-4">
                    <Col lg={12}>
                        <div className="custom-card">

                            <div className="card-content">
                                <h3>{fromDestination} - {toDestination}</h3>
                                <div className="card-details">
                                    <div className="detail-item">

                                        <LiaPlaneDepartureSolid />
                                        <p>Departure:{new Date(departureDate).toLocaleDateString()}</p>
                                        <LiaPlaneArrivalSolid />
                                        <p>Return: {new Date(returnDate).toLocaleDateString()}</p>

                                    </div>
                                    <div className="separator"></div>
                                    <div className="detail-item">
                                        <MdOutlineEuro />
                                        <span>{aircraftId.hourlyRate * flightId.flightTime}</span>
                                    </div>
                                    <div className="separator"></div>
                                    <div className="detail-item">
                                        <GrStatusWarning />
                                        <span>{status}</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

            </Container>
        </div>

    )

}
export default BookingCard