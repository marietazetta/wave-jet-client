import "./SearchResultsCard.css"
import { Card, Row, Col, Container } from "react-bootstrap";
import { FaRegClock } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { MdOutlineEuro } from "react-icons/md";
import { Link } from "react-router-dom";

const SearchResultsCard = ({ aircraftId, flightTime }) => {

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

                                            <Link to="/bookings" className="button-request-flight">
                                                Request Flight
                                            </Link>
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

            {/* <Container fluid className="mt-5">
                <Row className="d-flex align-items-center">
                    {
                        aircraftId.map(aircraft => (
                            <Col key={aircraft._id} lg={8} md={6}>
                                <Card className="card">
                                    <Card.Img variant="top"
                                        src={aircraft.mainImage}
                                        alt={aircraft.model}
                                        className="card-img" />
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
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </Container> */}
        </div >
    )
}

export default SearchResultsCard
