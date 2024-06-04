import { useEffect, useState } from "react";
import "./FlightSearch.css";
import { Form, Button, InputGroup } from 'react-bootstrap';
import { RiMapPinLine, RiUser3Line, RiCalendarLine } from "react-icons/ri";
import flightServices from "../../services/flight.services";
import { FaPlaneDeparture } from "react-icons/fa";

const FlightSearch = ({ setSearchResults }) => {

    const [flightSearchData, setFlightData] = useState({
        fromDestination: 'Madrid',
        toDestination: 'Ibiza',
        departureDate: '2024-06-11',
        returnDate: '2024-06-12',
        travellers: 1
    })

    const [originOptions, setOriginOptions] = useState([]);
    const [destinationOptions, setDestinationOptions] = useState([]);

    useEffect(() => {

        const promises = [
            flightServices.getAllOrigins(),
            flightServices.getAllDestinations()
        ]

        Promise
            .all(promises)
            .then(([origins, destinations]) => {
                setOriginOptions(origins.data)
                setDestinationOptions(destinations.data)
            })
            .catch(err => console.log(err))


    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFlightData({
            ...flightSearchData,
            [name]: value
        });
    }

    const handleSearch = e => {
        e.preventDefault();

        flightServices
            .searchFlight(flightSearchData)
            .then(({ data }) => {
                setSearchResults(data)
            })
            .catch(err => console.log(err));
    };

    return (
        <section className="section__container booking__container">
            <Form onSubmit={handleSearch}>
                <Form.Group className="form__group">
                    <InputGroup>
                        <InputGroup.Text><RiMapPinLine /></InputGroup.Text>
                        <Form.Control
                            as="select"
                            name="fromDestination"
                            value={flightSearchData.fromDestination}
                            onChange={handleInputChange}
                        >
                            <option value="" disabled>Select Departure City</option>
                            {originOptions.map((eachOrigin, index) => (
                                <option
                                    key={index}
                                    value={eachOrigin}
                                >
                                    {eachOrigin}
                                </option>
                            ))}
                        </Form.Control>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="form__group">
                    <InputGroup>
                        <InputGroup.Text><RiMapPinLine /></InputGroup.Text>
                        <Form.Control
                            as="select"
                            name="toDestination"
                            value={flightSearchData.toDestination}
                            onChange={handleInputChange}
                        >
                            <option value="" disabled>Select Destination City</option>
                            {destinationOptions.map((eachDestination, index) => (
                                <option key={index} value={eachDestination} >{eachDestination} </option>
                            ))}
                        </Form.Control>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="form__group">
                    <InputGroup>
                        <InputGroup.Text ><RiCalendarLine /></InputGroup.Text>
                        <Form.Control
                            type="date"
                            name="departureDate"
                            value={flightSearchData.departureDate}
                            onChange={handleInputChange}
                            placeholder="Departure"
                        />
                    </InputGroup>
                    <Form.Text className="text-muted">Departure</Form.Text>
                </Form.Group>

                <Form.Group className="form__group">
                    <InputGroup>
                        <InputGroup.Text><RiCalendarLine /></InputGroup.Text>
                        <Form.Control
                            type="date"
                            name="returnDate"
                            value={flightSearchData.returnDate}
                            onChange={handleInputChange}
                            placeholder="Return"
                        />
                    </InputGroup>
                    <Form.Text className="text-muted">Return</Form.Text>
                </Form.Group>

                <Form.Group className="form__group">
                    <InputGroup>
                        <InputGroup.Text><RiUser3Line /></InputGroup.Text>
                        <Form.Control
                            type="number"
                            name="travellers"
                            value={flightSearchData.travellers}
                            onChange={handleInputChange}
                            placeholder="Travellers"
                        />
                    </InputGroup>

                </Form.Group>

                <div className="text-center">
                    <Button variant="primary" type="submit" className="custom-btn">
                        <Form.Text className="text-muted">EXPLORE</Form.Text> <FaPlaneDeparture />
                    </Button>
                </div>
            </Form>
        </section>
    );
};

export default FlightSearch;
