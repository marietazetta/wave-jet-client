import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import './AircraftCard.css';

const AircraftCard = ({ _id, model, description, mainImage }) => {

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


                    <Card.Title className="mt-3">{model}</Card.Title>
                    <Row className="align-items-center">
                        <Col>
                            <Link to={`/fleet/${_id}`}>
                                <Button variant="secondary" size="md" className="custom-button">
                                    Learn More about the {model}
                                </Button>
                            </Link>
                        </Col>
                        <Col>
                            <Card.Text>
                                {description}
                            </Card.Text>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
}

export default AircraftCard;
