import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './AircraftCard.css';

const AircraftCard = ({ _id, mainImage, manufacturer, manufacturerDescription }) => {
    return (
        <Card className="AircraftCard font-family" style={{ width: '35rem', height: "100%" }}>
            <Card.Img variant="top" src={mainImage} />
            <Card.Body>
                <Card.Title>{manufacturer}</Card.Title>
                <Card.Text>{manufacturerDescription}</Card.Text>
                <Link to={`/fleet/${_id}`}>
                    <Button variant="light" size="sm" className="custom-button">
                        Discover {manufacturer} Jets
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default AircraftCard;
