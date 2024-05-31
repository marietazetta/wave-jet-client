import AircraftCard from "../AircraftCard/AircraftCard";
import { Col, Row } from "react-bootstrap";

const AircraftsList = ({ aircraft }) => {
    return (
        <Row className="justify-content-center">
            <Col lg={3} md={8}>
                <AircraftCard {...aircraft} />
            </Col>

            <Col>
                <h2>{aircraft.manufacturer}</h2>
            </Col>
        </Row>
    );
};

export default AircraftsList;
