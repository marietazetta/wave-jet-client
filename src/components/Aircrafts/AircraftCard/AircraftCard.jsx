import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import './AircraftCard.css';

const AircraftCard = ({ _id, model, mainImage }) => {

    return (
        <div className="AircraftCard">
            <Card className="shadow-sm border-0">
                <Card.Body>
                    <Row>

                        <Col>
                            <Link to={`/fleet/${_id}`}>
                                <Card.Img variant="top"
                                    src={mainImage}
                                    className="rounded-top equal-aspect-ratio"
                                />
                            </Link>
                        </Col>

                    </Row>


                    <Row className="mt-4">
                        <Col xs={4}>
                            <Link to={`/fleet/${_id}`}>
                                <Button variant="secondary" size="md" className="custom-button">
                                    Learn More about the {model}
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
