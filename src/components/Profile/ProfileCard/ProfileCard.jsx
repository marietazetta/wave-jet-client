import "./ProfileCard.css"
import { Row, Col, Card } from "react-bootstrap"



const ProfileCard = ({ mobile, fullName, favAirport, specialDiet }) => {

    return (
        <div className="BookingCard font-family">

            <Card className="custom-card">
                <Card.Body>
                    <Card.Title className="mb-4">
                        <h3>{fullName}</h3>
                    </Card.Title>
                    <Row className="card-details">
                        <Col md={4} className="detail-item">
                            <p>Phone Number: {mobile}</p>
                        </Col>
                        <Col md={4} className="detail-item">
                            <p>Preferred Airport: {favAirport}</p>
                        </Col>

                        <Col md={4} className="detail-item mt-3">
                            <span>{specialDiet}</span>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

        </div>
    )
}

export default ProfileCard
