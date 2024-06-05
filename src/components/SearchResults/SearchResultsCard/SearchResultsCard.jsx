import "./SearchResultsCard.css"
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import { FaRegClock } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { MdOutlineEuro } from "react-icons/md";
import { Link } from "react-router-dom";

const SearchResultsCard = ({ aircraftId, flightTime, requestBooking }) => {

    const handleRequest = (aircraftId) => {
        const bookingData = {
            aircraftId
        }
        requestBooking(bookingData)
    }

    return (
        <div className="SearchResultsCard font-family">

            <Container fluid className="mt-5">
                {
                    aircraftId.map(aircraft => (
                        <Row key={aircraft._id} className="d-flex align-items-center mb-4">
                            <Col lg={12}>
                                <div className="custom-card">
                                    <img
                                        src={aircraft.mainImage}
                                        alt={aircraft.model}
                                        className="card-img"
                                    />
                                    <div className="card-content">
                                        <h3>{aircraft.model}</h3>
                                        <div className="card-details">
                                            <div className="detail-item">
                                                <FaRegClock />
                                                <span>{flightTime}h</span>
                                            </div>
                                            <div className="separator"></div>
                                            <div className="detail-item">
                                                <MdOutlineEuro />
                                                <span>{aircraft.hourlyRate * flightTime}</span>
                                            </div>
                                            <div className="separator"></div>
                                            <div className="detail-item">
                                                <IoPersonSharp />
                                                <span>{aircraft.capacity}</span>
                                            </div>

                                            <Button className="button-request-flight" onClick={() => handleRequest(aircraft._id)}>
                                                Request Flight
                                            </Button>
                                            <Link to={`/fleet/${aircraft._id}`} className="button-request-flight">
                                                Aircraft Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    ))
                }
            </Container>

        </div >
    )
}

export default SearchResultsCard
