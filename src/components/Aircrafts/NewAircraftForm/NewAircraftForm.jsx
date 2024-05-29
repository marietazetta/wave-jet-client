import './NewAircraftForm.css'
import { useState, useEffect } from "react"
import { Form, Row, Col, InputGroup, Button, Spinner } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import aircraftServices from '../../../services/aircraft.services'

const NewAircraftForm = () => {

    const navigate = useNavigate()
    const [isLoading, setIsloading] = useState([])

    useEffect(() => {
        setIsloading()
    }, [])


    const [aircraftData, setAircraftData] = useState({
        model: '',
        manufacturer: '',
        tailNumber: '',
        capacity: 0,
        mainImage: '',
        images: [''],
        range: 0,
        homebase: '',
        cabinWidth: 0,
        cabinHeight: 0,
        hourlyRate: 0,
        availability: true,
        description: ''
    })


    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        setAircraftData({ ...aircraftData, [name]: value })
    }

    const addNewImageField = () => {

        const newImages = [...aircraftData.images]

        newImages.push('')

        setAircraftData({
            ...aircraftData,
            images: newImages
        })
    }

    const handleGalleryChange = (event, index) => {
        const { value } = event.target
        const newImages = [...aircraftData.images]
        newImages[index] = value
        setAircraftData({
            ...aircraftData,
            images: newImages
        })

    }

    const handleAircraftFormSubmit = e => {

        e.preventDefault()

        aircraftServices
            .saveAircraft(aircraftData)
            .then(() => navigate('/fleet'))
            .catch(err => console.log(err))
    }



    return (

        <div className="NewAircraftForm">
            {
                isLoading
                    ?
                    <Spinner animation="grow" variant="dark" />
                    :
                    <Form className="NewAircraftForm" onSubmit={handleAircraftFormSubmit}>

                        <Row className="mb-3">

                            <Form.Group as={Col} className="mb-3" controlId="Model.Input">
                                <Form.Label>Aircraft Model</Form.Label>
                                <Form.Control size="md" type="text" placeholder="Model"
                                    name="model"
                                    value={aircraftData.model}
                                    onChange={handleInputChange}
                                />

                            </Form.Group>


                        </Row>

                        <Form.Group className="mb-3" controlId="Manufacturer.Input">
                            <Form.Label>Manufacturer</Form.Label>
                            <Form.Control size="md" type="text" placeholder="Manufacturer"
                                name="manufacturer"
                                value={aircraftData.manufacturer}
                                onChange={handleInputChange} />
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="Registration.Input">
                                <Form.Label>Registration</Form.Label>
                                <Form.Control type="text" placeholder="Ex. EC-MRL"
                                    name="tailNumber"
                                    value={aircraftData.tailNumber}
                                    onChange={handleInputChange} />
                            </Form.Group>


                            <Form.Group as={Col} controlId="paxCapacity.Input">
                                <Form.Label>Passenger Capacity</Form.Label>
                                <Form.Control type="number" placeholder="10"
                                    min={1}
                                    max={25}
                                    name="capacity"
                                    value={aircraftData.capacity}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Row>

                        <Form.Label htmlFor="basic-url">Cover Image</Form.Label>

                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon3">
                                Image URL
                            </InputGroup.Text>
                            <Form.Control id="basic-url" aria-describedby="basic-addon3"
                                name="mainImage"
                                value={aircraftData.mainImage}
                                onChange={handleInputChange} />
                        </InputGroup>

                        <Form.Group controlId="ImagesGallery" className="mb-3">
                            <Form.Label>Images Gallery</Form.Label>

                            {
                                aircraftData.images.map((eachField, idx) => {
                                    return (
                                        <Form.Control
                                            key={idx}
                                            className="mb-3"
                                            type="url"
                                            placeholder={`Place your image here`}
                                            value={aircraftData.images[idx]}
                                            onChange={event => handleGalleryChange(event, idx)} />
                                    )
                                })
                            }
                            <Button size="sm" variant="dark" onClick={addNewImageField}>Add more</Button>
                        </Form.Group>


                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="range.input">
                                <Form.Label>Range</Form.Label>
                                <Form.Control type="number" placeholder="Km"
                                    name="range"
                                    value={aircraftData.range}
                                    onChange={handleInputChange} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="homebase.input">
                                <Form.Label>Homebase</Form.Label>
                                <Form.Control type="text" placeholder="Ex. LEMD"
                                    name="homebase"
                                    value={aircraftData.homebase}
                                    onChange={handleInputChange} />
                            </Form.Group>

                        </Row>



                        <Form.Group className="mb-3" controlId="description.Input">
                            <Form.Label>Description</Form.Label>
                            <Form.Control size="md" as="textarea" rows={2}
                                name="description"
                                value={aircraftData.description}
                                onChange={handleInputChange} />
                        </Form.Group>

                        <Button variant="dark" type="submit">
                            Submit
                        </Button>
                    </Form>
            }
        </div>

    )
}
export default NewAircraftForm 