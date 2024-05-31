import { useState, useEffect } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useNavigate, useParams } from 'react-router-dom'
import uploadServices from "../../../services/upload.services"
import flightServices from "../../../services/flight.services"

const EditFlightForm = () => {

    const navigate = useNavigate()

    const [flightData, setFlightData] = useState({
        fromDestination: '',
        toDestination: '',
        flightTime: 0,
        miles: 0,
        imageUrl: ''
    })

    const { flightId } = useParams()

    const loadFormData = () => {
        flightServices
            .getOneFlight(flightId)
            .then(({ data }) => {
                setFlightData(data)

            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        loadFormData()
    }, [])


    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        setFlightData({ ...flightData, [name]: value })
    }

    const handleFlightSubmit = e => {

        e.preventDefault()

        flightServices
            .editFlight(flightId, flightData)
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

    return (

        <div className="EditFlightFormshadow-lg p-4 mb-2 bg-white rounded">
            <Form onSubmit={handleFlightSubmit}>
                <Form.Group className="mb-3" controlId="From">
                    <Form.Label>From</Form.Label>
                    <Form.Control type="text" value={flightData.fromDestination} name="fromDestination" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="To">
                    <Form.Label>To</Form.Label>
                    <Form.Control type="text" value={flightData.toDestination} name="toDestination" onChange={handleInputChange} />
                </Form.Group>

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

                    <Col>
                        <Form.Group className="mb-3" controlId="image">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" onChange={handleFileUpload} />
                        </Form.Group>
                    </Col>
                </Row>

                <div className="d-grid">
                    <Button variant="dark" type="submit" >Submit</Button>
                </div>
            </Form>
        </div>

    )
}

export default EditFlightForm