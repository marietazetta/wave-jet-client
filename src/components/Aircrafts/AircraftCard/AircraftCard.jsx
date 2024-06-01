import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import './AircraftCard.css';

const AircraftCard = ({ _id, model, mainImage, manufacturer }) => {

    return (
        <div className="AircraftCard">
            <Card className="shadow-sm border-0">
                <Card.Body>
                    <Row>

                        <Col xs={6}>
                            <Link to={`/fleet/${_id}`}>
                                <Card.Img variant="top"
                                    src={mainImage}
                                    className="rounded-top equal-aspect-ratio"
                                />
                            </Link>
                        </Col>

                        <Col xs={6}>
                            <h2>{model}</h2>
                            <Link to={`/fleet/${_id}`}>
                                <Button variant="light" size="sm" className="custom-button">

                                    DISCOVER {manufacturer} JETS

                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    )
}

export default AircraftCard;
