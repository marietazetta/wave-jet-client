import { Card, Row, Col, Container } from "react-bootstrap";
import "./SearchResultsCard.css"

const SearchResultsCard = ({ aircraftId, flights }) => {

    return (
        <div className="SearchResultsCard font-family">

            <Container fluid className="mt-5">

                <Row className="d-flex align-items-center">

                    {aircraftId.map(aircraft => (

                        <Col key={aircraft._id} lg={6} md={8}>
                            <h2>{aircraft.model}</h2>
                            <Card.Img variant="top"
                                src={aircraft.mainImage} />
                        </Col>

                    ))}

                    {/* 
                    {flights.map(flight => (

                        <Col lg={6} md={8}>

                            <h6 key={flight._id}>{flight.flightTime}</h6>

                            {aircrafts.map(aircraft => {
                                if (flight.aircraftId.includes(aircraft._id)) {
                                    const pricePerFlight = flight.flightTime * aircraft.hourlyRate;
                                    return <h5 key={aircraft._id}> ${pricePerFlight.toFixed(2)}</h5>;
                                }

                            })}

                        </Col>

                    ))} */}

                </Row>
            </Container>
        </div >
    )
}

export default SearchResultsCard
