import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './AircraftCard.css';

const AircraftCard = ({ _id, mainImage, manufacturer, manufacturerDescription }) => {
    return (
        <Card className="AircraftCard font-family">
            <Card.Img variant="top" src={mainImage} />
            <Card.Body>
                <Card.Title>{manufacturer}</Card.Title>
                <Card.Text>{manufacturerDescription}</Card.Text>
                <Link to={`/fleet/${_id}`} className="custom-btn-link">
                    <Button type="submit" size="sm" className="custom-btn">
                        Discover {manufacturer} Jets
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default AircraftCard;
