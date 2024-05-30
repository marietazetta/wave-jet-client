import AircraftCard from "../AircraftCard/AircraftCard";
import { Col, Row } from "react-bootstrap";

const AircraftsList = ({ aircraft }) => {
    return (
        <Row className="justify-content-center">
            <Col lg={6} md={8}>
                <AircraftCard {...aircraft} />
            </Col>
        </Row>
    );
};

export default AircraftsList;
