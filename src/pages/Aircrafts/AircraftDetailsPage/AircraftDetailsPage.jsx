import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import aircraftServices from "../../../services/aircraft.services";
import "./AirCraftDetailsPage.css";

const AircraftDetailsPage = () => {
    const { aircraftId } = useParams();
    const [aircraft, setAircraftData] = useState({});
    const [services, setServicesData] = useState({});

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
            <Container className="full-height font-family">
                <Row className="my-4">
                    <Col>
                        <h1 className="text">{aircraft.model}</h1>
                    </Col>
                </Row>

                <Row className="aircraft-image mb-4 justify-content-center">
                    <Col xs={12} className="d-flex justify-content-center">
                        <Image
                            alt="Aircraft main"
                            src={aircraft.mainImage}
                            className="rounded-top img-fluid aircraft-main-image"
                        />
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col>
                        <h5 className="text">{aircraft.description}</h5>
                    </Col>
                </Row>

                <Row className="collage-images mb-4">
                    {aircraft.imagesCarousel?.map((eachImage, index) => (
                        <Col key={index} xs={6} md={4} lg={3} className="mb-3">
                            <div className="img-screen">
                                <img
                                    src={eachImage}
                                    alt={`Image ${index}`}
                                    className="img-fluid"
                                />
                            </div>
                        </Col>
                    ))}
                </Row>
                <Row>
                    <Col md={6}>
                        <h5 className="text-center details-title">Details</h5>
                        <table className="table table-striped table-custom">
                            <tbody>
                                <tr>
                                    <th>Manufacturer</th>
                                    <td>{aircraft.manufacturer}</td>
                                </tr>
                                <tr>
                                    <th>Capacity</th>
                                    <td>{aircraft.capacity} pax</td>
                                </tr>
                                <tr>
                                    <th>Range</th>
                                    <td>{aircraft.range} Nm</td>
                                </tr>
                                <tr>
                                    <th>Cabin Height</th>
                                    <td>{aircraft.cabinHeight} feet</td>
                                </tr>
                                <tr>
                                    <th>Cabin Width</th>
                                    <td>{aircraft.cabinWidth} feet</td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                    <Col md={6}>
                        <h5 className="text-center services-title">Services</h5>
                        {services && (
                            <table className="table table-striped table-custom">
                                <tbody>
                                    <tr>
                                        <td><strong>Wifi</strong></td>
                                        <td>{services.wifi ? "Available" : "Not Available"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Catering</strong></td>
                                        <td>{services.catering ? "Available" : "Not Available"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Flight Attendant</strong></td>
                                        <td>{services.flightAttendant ? "Available" : "Not Available"}</td>
                                    </tr>
                                </tbody>
                            </table>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AircraftDetailsPage;
