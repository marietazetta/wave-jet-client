import { useEffect, useState } from "react";
import "./FlightSearch.css";
import { Form, Button, InputGroup, Row, Col } from 'react-bootstrap';
import { RiMapPinLine, RiUser3Line, RiCalendarLine } from "react-icons/ri";
import flightServices from "../../services/flight.services";
import { FaPlaneDeparture } from "react-icons/fa";

const FlightSearch = ({ setSearchResults }) => {

    const [flightSearchData, setFlightData] = useState({
        fromDestination: '',
        toDestination: '',
        departureDate: '',
        returnDate: '',
        travellers: 1
    });

    const [originOptions, setOriginOptions] = useState([]);
    const [destinationOptions, setDestinationOptions] = useState([]);

    useEffect(() => {
        const promises = [
            flightServices.getAllOrigins(),
            flightServices.getAllDestinations()
        ];

        Promise
            .all(promises)
            .then(([origins, destinations]) => {
                setOriginOptions(origins.data);
                setDestinationOptions(destinations.data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        const maxDepartureDate = new Date();
        maxDepartureDate.setDate(maxDepartureDate.getDate() + 30);
        const maxDeparture = maxDepartureDate.toISOString().split("T")[0];

        document.getElementsByName("departureDate")[0].setAttribute("min", today);
        document.getElementsByName("departureDate")[0].setAttribute("max", maxDeparture);

        if (flightSearchData.departureDate) {
            const selectedDepartureDate = new Date(flightSearchData.departureDate);
            const minReturnDate = selectedDepartureDate.toISOString().split("T")[0];
            const maxReturnDate = new Date(selectedDepartureDate);
            maxReturnDate.setDate(maxReturnDate.getDate() + 60);
            const maxReturn = maxReturnDate.toISOString().split("T")[0];

            document.getElementsByName("returnDate")[0].setAttribute("min", minReturnDate);
            document.getElementsByName("returnDate")[0].setAttribute("max", maxReturn);
        }
    }, [flightSearchData.departureDate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFlightData({
            ...flightSearchData,
            [name]: value
        });
    };

    const handleSearch = e => {
        e.preventDefault();

        flightServices
            .searchFlight(flightSearchData)
            .then(({ data }) => {
                const fullSearchData = {
                    searchData: flightSearchData,
                    items: data
                };

                setSearchResults(fullSearchData);
            })
            .catch(err => console.log(err));
    };

    return (
        <section className="section__container booking__container">
            <Form onSubmit={handleSearch}>
                <Row className="g-2 flex-wrap align-items-end justify-content-center"> {/* Single row with wrapping */}
                    <Col xs={12} md={2} className="form__group">
                        <Form.Label className="label-text">From</Form.Label>
                        <InputGroup>
                            <InputGroup.Text><RiMapPinLine /></InputGroup.Text>
                            <Form.Control
                                as="select"
                                name="fromDestination"
                                value={flightSearchData.fromDestination}
                                onChange={handleInputChange}
                                className="custom-select"
                            >
                                {originOptions.map((eachOrigin, index) => (
                                    <option key={index} value={eachOrigin}>{eachOrigin}</option>
                                ))}
                            </Form.Control>
                        </InputGroup>
                    </Col>
                    <Col xs={12} md={2} className="form__group">
                        <Form.Label className="label-text">To</Form.Label>
                        <InputGroup>
                            <InputGroup.Text><RiMapPinLine /></InputGroup.Text>
                            <Form.Control
                                as="select"
                                name="toDestination"
                                value={flightSearchData.toDestination}
                                onChange={handleInputChange}
                                className="custom-select"
                            >
                                {destinationOptions.map((eachDestination, index) => (
                                    <option key={index} value={eachDestination}>{eachDestination}</option>
                                ))}
                            </Form.Control>
                        </InputGroup>
                    </Col>
                    <Col xs={12} md={2} className="form__group">
                        <Form.Label className="label-text">Departure</Form.Label>
                        <InputGroup>
                            <InputGroup.Text><RiCalendarLine /></InputGroup.Text>
                            <Form.Control
                                type="date"
                                name="departureDate"
                                value={flightSearchData.departureDate}
                                onChange={handleInputChange}
                                className="custom-date"
                            />
                        </InputGroup>
                    </Col>
                    <Col xs={12} md={2} className="form__group">
                        <Form.Label className="label-text">Return</Form.Label>
                        <InputGroup>
                            <InputGroup.Text><RiCalendarLine /></InputGroup.Text>
                            <Form.Control
                                type="date"
                                name="returnDate"
                                value={flightSearchData.returnDate}
                                onChange={handleInputChange}
                                className="custom-date"
                            />
                        </InputGroup>
                    </Col>
                    <Col xs={12} md={2} className="form__group">
                        <Form.Label className="label-text">Passengers</Form.Label>
                        <InputGroup>
                            <InputGroup.Text><RiUser3Line /></InputGroup.Text>
                            <Form.Control
                                type="number"
                                name="travellers"
                                value={flightSearchData.travellers}
                                onChange={handleInputChange}
                                min="1"
                                max="16"
                                className="custom-number"
                            />
                        </InputGroup>
                    </Col>
                    <Col xs={12} md={2} className="text-end">
                        <Button variant="primary" type="submit" className="custom-btn">
                            <span className="explore-text">EXPLORE</span> <FaPlaneDeparture />
                        </Button>
                    </Col>
                </Row>
            </Form>
        </section>
    );
};

export default FlightSearch;
