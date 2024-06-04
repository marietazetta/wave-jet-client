<<<<<<< HEAD
import { useEffect, useState } from "react";
import "./FlightSearch.css";
import { Form, Button, InputGroup } from 'react-bootstrap';
import { RiMapPinLine, RiUser3Line, RiCalendarLine, RiSearchLine } from "react-icons/ri";
import flightServices from "../../services/flight.services";
=======
import { FaPlaneDeparture } from "react-icons/fa";
import "./FlightSearch.css"
import { Form, Button, InputGroup } from 'react-bootstrap';
import { RiMapPinLine } from "react-icons/ri";
import { RiUser3Line } from "react-icons/ri";
import { RiCalendarLine } from "react-icons/ri";


>>>>>>> 49c00d63a8a21adcb0046c54c629ba61526a8055

const FlightSearch = () => {

    const [flightData, setFlightData] = useState({
        fromDestination: '',
        toDestination: '',
        departureDate: '',
        returnDate: '',
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
            ...flightData,
            [name]: value
        });
    }

    const handleSearch = e => {
        e.preventDefault()

        flightServices
            .searchFlight(flightData)
            .then(({ data }) => console.log('LOS VUELOS', data))
            .catch(err => console.log(err))
    }

    return (
        <section className="section__container booking__container">
            <Form onSubmit={handleSearch}>
                <Form.Group className="form__group">
                    <InputGroup>
                        <InputGroup.Text><RiMapPinLine /></InputGroup.Text>
                        <Form.Control
                            as="select"
                            name="fromDestination"
                            value={flightData.fromDestination}
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
                            value={flightData.toDestination}
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
                            value={flightData.departureDate}
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
                            value={flightData.returnDate}
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
                            value={flightData.travellers}
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
