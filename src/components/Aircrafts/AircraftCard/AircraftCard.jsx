import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import './AircraftCard.css';

const AircraftCard = ({ _id, mainImage, manufacturer, manufacturerDescription, isLeft }) => {


    const justifyContent = isLeft ? 'flex-start' : 'flex-end';


    return (
        <div className="AircraftCard font-family">

            <Container fluid className="mt-5">
                <Row className="d-flex align-items-center" style={{ justifyContent }}>
                    <Col lg={6} md={8}>
                        <h2>{manufacturer}</h2>
                        <p>{manufacturerDescription}</p>
                        <Link to={`/fleet/${_id}`}>
                            <Button variant="light" size="sm" className="custom-button">

                                Discover {manufacturer} Jets

                            </Button>
                        </Link>
                    </Col>
                    <Col lg={6} md={8}>
                        <Link to={`/fleet/${_id}`}>
                            <Card.Img variant="top"
                                src={mainImage}
                            // className="rounded-top equal-aspect-ratio"
                            />
                        </Link>
                    </Col>

                </Row>
            </Container>


        </div >
    )
}

export default AircraftCard
