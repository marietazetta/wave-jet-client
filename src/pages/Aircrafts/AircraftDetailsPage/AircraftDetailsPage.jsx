import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Button, Col, Card } from "react-bootstrap";
import aircraftServices from "../../../services/aircraft.services";
import { Link } from "react-router-dom";
import "./AirCraftDetailsPage.css";

const AircraftDetailsPage = () => {
    const { aircraftId } = useParams();
    const [aircraft, setAircraftData] = useState({});
    const [services, setServicesData] = useState(null);

    useEffect(() => {
        loadAircraftDetails();
    }, []);

    const loadAircraftDetails = () => {
        aircraftServices
            .getOneAircraft(aircraftId)
            .then(({ data }) => {
                setAircraftData(data);
                setServicesData(data.services);
            })
            .catch(err => console.log(err));
    };

    return (

        <div className="AircraftDetailsPage">

            <Container>
                <Row className="mb-4">
                    <h1 className="text">{aircraft.model}</h1>
                </Row>

                <Row className="aircraft-image">
                    <Card.Img variant="top"
                        src={aircraft.mainImage}
                        className="rounded-top equal-aspect-ratio"
                    />
                </Row>

                <Row className="mb-4">
                    <h5 className="text">{aircraft.description}</h5>
                </Row>

                <Row>
                    <Col>
                        <h5 className="text-center">Details</h5>
                        <table className="table table-striped table-custom">
                            <tbody>
                                <tr>
                                    <th className="text-center" scope="row">Manufacturer</th>
                                    <td className="text-center">{aircraft.manufacturer}</td>
                                </tr>
                                <tr>
                                    <th className="text-center" scope="row">Capacity</th>
                                    <td className="text-center">{aircraft.capacity}</td>
                                </tr>
                                <tr>
                                    <th className="text-center" scope="row">Range</th>
                                    <td className="text-center">{aircraft.range}</td>
                                </tr>
                                <tr>
                                    <th className="text-center" scope="row">Cabin Height</th>
                                    <td className="text-center">{aircraft.cabinHeight}</td>
                                </tr>
                                <tr>
                                    <th className="text-center" scope="row">Cabin Width</th>
                                    <td className="text-center">{aircraft.cabinWidth}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                    <Col>
                        <h5 className="text-center">Services</h5>
                        {services && (
                            <table className="table table-striped table-custom">
                                <tbody>
                                    <tr>
                                        <td className="text-center"><strong>Wifi</strong></td>
                                        <td className="text-center">{services.wifi ? "Available" : "Not Available"}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-center"><strong>Catering</strong></td>
                                        <td className="text-center">{services.catering ? "Available" : "Not Available"}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-center"><strong>Flight Attendant</strong></td>
                                        <td className="text-center">{services.flightAttendant ? "Available" : "Not Available"}</td>
                                    </tr>
                                </tbody>
                            </table>
                        )}
                    </Col>
                </Row>
                <Row className="collage-images mb-4">
                    {aircraft.imagesCarousel?.map((eachImage, index) => (
                        <Col key={index} xs={6} md={4} lg={3} className="mb-3">
                            <img
                                src={eachImage}
                                alt={`Image ${index}`}
                                className="fixed-size-image"
                            />
                        </Col>
                    ))}
                </Row>
                <Link to={`/fleet/edit/${aircraftId}`}>
                    <Button variant="secondary" size="md" className="custom-color-button">
                        Edit
                    </Button>
                </Link>
            </Container>

        </div>
    );
};

export default AircraftDetailsPage;
