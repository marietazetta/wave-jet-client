import "./NewFlightForm.css"
import { useState, useEffect } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import FlightServices from "../../../services/flight.services"
import uploadServices from "../../../services/upload.services"
import AircraftServices from "../../../services/aircraft.services"

const NewFlightForm = () => {

    const [flightData, setFlightData] = useState({
        fromDestination: '',
        toDestination: '',
        flightTime: 0,
        miles: 0,
        imageUrl: '',
        aircraftId: []
    })

    const [aircraftOptions, setAircraftOptions] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        AircraftServices
            .getAllAircrafts()
            .then(response => setAircraftOptions(response.data))
            .catch(err => console.log(err))
    }, [])

    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        setFlightData({ ...flightData, [name]: value })
    }

    const handleFlightSubmit = e => {
        e.preventDefault()
        FlightServices
            .saveFlight(flightData)
            .then(() => navigate('/routes'))
            .catch(err => console.log(err))
    }

    const handleFileUpload = e => {
        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setFlightData({ ...flightData, imageUrl: res.data.cloudinary_url })
            })
            .catch(err => console.log(err))
    }

    const handleCheckboxChange = e => {
        const { value, checked } = e.target
        const updatedAircraftId = checked
            ? [...flightData.aircraftId, value]
            : flightData.aircraftId.filter(id => id !== value)
        setFlightData({ ...flightData, aircraftId: updatedAircraftId })
    }

    return (
        <div className="NewFlightForm">
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
                        <Form.Group className="mb-3" controlId="image">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" onChange={handleFileUpload} />
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

export default NewFlightForm
