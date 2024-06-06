import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './PopularDestinations.css';
import ibizaimg from "../../../public/assets/ibiza.jpg"
import menorcaimg from "../../../public/assets/menorca.jpg"
import naplesimg from "../../../public/assets/naples.jpg"

const PopularDestinations = () => {
    const destinations = [
        {
            name: "Ibiza",
            image: ibizaimg,
            description: "Ibiza, one of the Balearic Islands, is renowned for its vibrant nightlife, beautiful beaches, and stunning sunsets. It's a paradise for party-goers and nature lovers alike."
        },
        {
            name: "Menorca",
            image: menorcaimg,
            description: "Menorca, a serene island in the Balearic archipelago, is known for its crystal-clear waters, hidden coves, and rich historical sites. Perfect for a peaceful and scenic getaway."
        },
        {
            name: "Naples",
            image: naplesimg,
            description: "Naples, a historic city in southern Italy, offers a blend of ancient ruins, vibrant street life, and world-renowned cuisine. Explore the rich culture and enjoy authentic Italian experiences."
        }
    ];

    return (
        <Container className="popular-destinations my-5">
            <h2 className="text-center mb-4">Luxury Escapes</h2>
            <Row>
                {destinations.map((destination, index) => (
                    <Col key={index} xs={12} md={4} className="mb-4">
                        <Card className="destination-card">
                            <Card.Img variant="top" src={destination.image} alt={destination.name} className="destination-image" />
                            <Card.Body>
                                <Card.Title>{destination.name}</Card.Title>
                                <Card.Text>{destination.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default PopularDestinations;
