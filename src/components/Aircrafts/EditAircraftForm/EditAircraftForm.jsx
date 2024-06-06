import './EditAircraftForm.css'
import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { Form, Row, Col, InputGroup, Button, Image } from "react-bootstrap"
import uploadServices from '../../../services/upload.services'
import aircraftServices from '../../../services/aircraft.services'

const EditAircraftForm = () => {

    const [aircraftData, setAircraftData] = useState({
        model: '',
        manufacturer: '',
        manufacturerDescription: '',
        tailNumber: '',
        capacity: 0,
        mainImage: '',
        imagesCarousel: [''],
        range: 0,
        homebase: 'LEMD',
        cabinWidth: 0,
        cabinHeight: 0,
        hourlyRate: 0,
        availability: true,
        description: ''
    })

    const [servicesData, setServicesData] = useState({
        flight_attendant: false,
        catering: false,
        wifi: false,
    })

    const navigate = useNavigate()

    useEffect(() => {
        loadFormData()
    }, [])

    const { aircraftId } = useParams()

    const loadFormData = () => {
        aircraftServices
            .getOneAircraft(aircraftId)
            .then(({ data }) => {
                setAircraftData(data)
                setServicesData(data.services)
            })
            .catch(err => console.log(err))
    }

    const handleAvailabilityClick = () => {
        setAircraftData({ ...aircraftData, availability: !aircraftData.availability })
    }

    const handleServiceSelect = event => {
        const { value, checked } = event.target
        setServicesData({
            ...servicesData,
            [value]: checked
        })
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.currentTarget;
        const updatedValue = type === 'checkbox' ? checked : value;
        setAircraftData({ ...aircraftData, [name]: updatedValue });

        if (name === 'availability') {
            setAircraftData({
                ...aircraftData,
                availability: updatedValue,
                availabilityEmoji: updatedValue ? '🟢' : '🔴',
            });
        }
    };

    const addNewImageField = () => {
        const newImages = [...aircraftData.imagesCarousel]
        newImages.push('')
        setAircraftData({
            ...aircraftData,
            imagesCarousel: newImages
        })
    }

    const handleAircraftFormSubmit = e => {
        e.preventDefault()

        const updatedData = { ...aircraftData, services: servicesData }

        aircraftServices
            .editAircraft(aircraftId, updatedData)
            .then(() => navigate(`/dashboard`))
            .catch(err => console.log(err))
    }

    const handleMainImageUpload = e => {

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setAircraftData({ ...aircraftData, mainImage: res.data.cloudinary_url })
            })
            .catch(err => console.log(err))
    }

    const handleGalleryUpload = (e, index) => {

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(res => {
                let imagesCarouselCopy = [...aircraftData.imagesCarousel]
                imagesCarouselCopy[index] = res.data.cloudinary_url

                setAircraftData({ ...aircraftData, imagesCarousel: imagesCarouselCopy })
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="form-container EditAircraftForm">
            <Form onSubmit={handleAircraftFormSubmit}>
                <Form.Group as={Col} className="mb-3" controlId="Availability.Input">
                    <span onClick={handleAvailabilityClick} className="availability-emoji">
                        {aircraftData.availability ?
                            `🟢${aircraftData.model} | available` :
                            `🔴${aircraftData.model} | out of service`}
                    </span>
                </Form.Group>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="Manufacturer.Input">
                        <Form.Label>Manufacturer</Form.Label>
                        <Form.Control
                            size="md"
                            type="text"
                            placeholder="Manufacturer"
                            name="manufacturer"
                            value={aircraftData.manufacturer}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="Model.Input">
                        <Form.Label>Aircraft Model</Form.Label>
                        <Form.Control
                            size="md"
                            type="text"
                            placeholder="Model"
                            name="model"
                            value={aircraftData.model}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Row>
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
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="cabinHeight.input">
                        <Form.Label>Cabin Height</Form.Label>
                        <Form.Control type="number" placeholder="mts"
                            name="cabinHeight"
                            value={aircraftData.cabinHeight}
                            onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="cabinWidth.input">
                        <Form.Label>Cabin Width</Form.Label>
                        <Form.Control type="number" placeholder="mts"
                            name="cabinWidth"
                            value={aircraftData.cabinWidth}
                            onChange={handleInputChange} />
                    </Form.Group>
                </Row>
                <Form.Label htmlFor="basic-url">Cover Image</Form.Label>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon3">Image URL</InputGroup.Text>
                    <Form.Control id="basic-url" aria-describedby="basic-addon3"
                        name="mainImage"
                        type="file"
                        onChange={handleMainImageUpload}
                    />
                </InputGroup>
                <Form.Group controlId="ImagesGallery" className="mb-3 ">
                    <Form.Label>Images Gallery</Form.Label>
                    <div className='d-flex flex-wrap'>
                        {
                            aircraftData.imagesCarousel?.map((eachField, idx) => (
                                <Image src={eachField} alt={aircraftData.model} key={idx}
                                    style={{ marginLeft: 10, width: 100, marginBottom: 10 }} />
                            ))
                        }
                    </div>
                    {aircraftData.imagesCarousel?.map((eachField, idx) => (
                        <Form.Control
                            key={idx}
                            className="mb-3"
                            type="file"
                            placeholder={`Place your image here`}
                            onChange={event => handleGalleryUpload(event, idx)} />
                    ))}
                    <Button size="sm" className="custom-button" variant="dark" onClick={addNewImageField}>Add more</Button>
                </Form.Group>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="range.input">
                        <Form.Label>Range</Form.Label>
                        <Form.Control type="number" placeholder="Km"
                            name="range"
                            value={aircraftData.range}
                            onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="hourlyRate.input">
                        <Form.Label>Hourly Rate</Form.Label>
                        <Form.Control type="number" placeholder="$"
                            name="hourlyRate"
                            value={aircraftData.hourlyRate}
                            onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="homebase.input">
                        <Form.Label>Homebase</Form.Label>
                        <Form.Control type="text" placeholder="Ex. LEMD"
                            name="homebase"
                            disabled
                            value={aircraftData.homebase}
                            onChange={handleInputChange} />
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Label>Services</Form.Label>
                    <Row>
                        <Col>
                            <Form.Check
                                type="checkbox"
                                label="Flight Attendant"
                                name="services"
                                value="flight_attendant"
                                checked={servicesData.flight_attendant}
                                onChange={handleServiceSelect}
                            />
                        </Col>
                        <Col>
                            <Form.Check
                                type="checkbox"
                                label="Wi-Fi"
                                name="services"
                                value="wifi"
                                checked={servicesData.wifi}
                                onChange={handleServiceSelect}
                            />
                        </Col>
                        <Col>
                            <Form.Check
                                type="checkbox"
                                label="Catering"
                                name="services"
                                value="catering"
                                checked={servicesData.catering}
                                onChange={handleServiceSelect}
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="mb-3" controlId="description.Input">
                    <Form.Label>Description</Form.Label>
                    <Form.Control size="md" as="textarea" rows={2}
                        name="description"
                        value={aircraftData.description}
                        onChange={handleInputChange} />
                </Form.Group>
                <Button className="custom-button" variant="dark" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default EditAircraftForm
