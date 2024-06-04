import { Card, Row, Col, Container } from "react-bootstrap";
import "./SearchResultsCard.css"

const SearchResultsCard = ({ aircraftId, flightTime }) => {



    // console.log(pricePerFlight)

    return (
        <div className="SearchResultsCard font-family">

            <Container fluid className="mt-5">

                <Row className="d-flex align-items-center">

                    {
                        aircraftId.map(aircraft => (



                            <Col key={aircraft._id} lg={6} md={8}>
                                <h2>{aircraft.model}</h2>
                                <Card.Img variant="top"
                                    src={aircraft.mainImage} />


                                <p>Precio: {aircraft.hourlyRate * flightTime}</p>



                            </Col>


                        ))
                    }


                </Row>
            </Container>
        </div >
    )
}

export default SearchResultsCard
