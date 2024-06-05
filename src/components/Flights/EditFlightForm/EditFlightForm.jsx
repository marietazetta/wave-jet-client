import "./EditFlightForm.css"
import { useState, useEffect } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useNavigate, useParams } from 'react-router-dom'
import uploadServices from "../../../services/upload.services"
import flightServices from "../../../services/flight.services"
import AircraftServices from "../../../services/aircraft.services"

const EditFlightForm = () => {
    const [flightData, setFlightData] = useState({
        fromDestination: '',
        toDestination: '',
        flightTime: 0,
        miles: 0,
        aircraftId: []
    })

    const [aircraftOptions, setAircraftOptions] = useState([])
    const navigate = useNavigate()
    const { flightId } = useParams()

    const loadFlightData = () => {
        flightServices
            .getOneFlight(flightId)
            .then(({ data }) => {
                setFlightData(data)
            })
            .catch(err => console.log(err))
    }

    const loadAircraftsData = () => {
        AircraftServices
            .getAllAircrafts()
            .then(response => setAircraftOptions(response.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        loadFlightData()
        loadAircraftsData()
    }, [])

    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        setFlightData({ ...flightData, [name]: value })
    }

    const handleFlightSubmit = e => {
        e.preventDefault()
        flightServices
            .editFlight(flightId, flightData)
            .then(() => navigate('/dashboard'))
            .catch(err => console.log(err))
    }


    const handleCheckboxChange = e => {
        const { value, checked } = e.target
        const aircraft = aircraftOptions.find(aircraft => aircraft._id === value)

        const updatedAircraftId = checked
            ? [...flightData.aircraftId, aircraft]
            : flightData.aircraftId.filter(id => id._id !== value)

        setFlightData({ ...flightData, aircraftId: updatedAircraftId })
    }

    const isAircraftSelected = (aircraftId) => {
        return flightData.aircraftId.some(eachAircraft => eachAircraft._id === aircraftId)
    }

    return (
        <div className="EditFlightForm">
            <Form onSubmit={handleFlightSubmit}>
                <Row>
                    <Col>
                        <Form.Group as={Col} className="mb-3" controlId="From">
                            <Form.Label>From</Form.Label>
                            <Form.Control type="text" value={flightData.fromDestination} name="fromDestination" onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="To">
                            <Form.Label>To</Form.Label>
                            <Form.Control type="text" value={flightData.toDestination} name="toDestination" onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="FlightTime">
                            <Form.Label>Flight Time</Form.Label>
                            <Form.Control type="number" value={flightData.flightTime} name="flightTime" onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="miles">
                            <Form.Label>Miles</Form.Label>
                            <Form.Control type="number" value={flightData.miles} name="miles" onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="aircraftSelect">
                            <Form.Label>Aircraft Models</Form.Label>
                            {aircraftOptions.map(aircraft => (
                                <Form.Check
                                    key={aircraft._id}
                                    type="checkbox"
                                    label={aircraft.model}
                                    value={aircraft._id}
                                    checked={isAircraftSelected(aircraft._id)}
                                    onChange={handleCheckboxChange}
                                />
                            ))}
                        </Form.Group>
                    </Col>
                </Row>
                <div className="d-grid">
                    <Button variant="dark" type="submit">Submit</Button>
                </div>
            </Form>
        </div>
    )
}

export default EditFlightForm
