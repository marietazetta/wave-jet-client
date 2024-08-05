import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './AircraftCard.css';

const AircraftCard = ({ _id, mainImage, manufacturer, manufacturerDescription }) => {
    return (
        <>
            <Card className="AircraftCard font-family h-100">
                <Card.Img variant="top" src={mainImage} />
                <Card.Body className="d-flex flex-column">
                    <Card.Title>{manufacturer}</Card.Title>
                    <Card.Text className="flex-grow-1">{manufacturerDescription}</Card.Text>
                </Card.Body>
            </Card>
            <Link to={`/fleet/${_id}`} className="custom-btn-link mt-auto">
                <Button type="submit" size="sm" className="custom-btn">
                    Discover {manufacturer} Jets
                </Button>
            </Link>
            <hr>
            </hr>


        </>
    );
}

export default AircraftCard;
