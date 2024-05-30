import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Button } from "react-bootstrap"
import aircraftServices from "../../../services/aircraft.services"
import { Link } from "react-router-dom"

const aircraftDetailsPage = () => {

    const { aircraftId } = useParams()

    const [aircraft, setAircraftData] = useState({})
    const [services, setServicesData] = useState(null)

    useEffect(() => {
        loadAircraftDetails()
    }, [])

    const loadAircraftDetails = () => {
        aircraftServices
            .getOneAircraft(aircraftId)
            .then(({ data }) => {
                setAircraftData(data)
                setServicesData(data.services)
            })
            .catch(err => console.log(err))
    }

    return (
        <Container>

            <h2 className="text-center">Check our {aircraft.model}</h2>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th className="text-center" colSpan="2">
                            <img src={aircraft.mainImage} alt="airplaneImage" style={{ maxWidth: '60%', height: 'auto' }} />
                        </th>
                    </tr>
                </thead>
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


            <Row>

                <h5 className="text-center">Services</h5>

                {services && (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th className="text-center" scope="col">Wifi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-center">{services.wifi ? "Available" : "Not Available"}</td>
                            </tr>
                        </tbody>
                        <thead>
                            <tr>
                                <th className="text-center" scope="col">Catering</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-center">{services.catering ? "Available" : "Not Available"}</td>
                            </tr>
                        </tbody>
                        <thead>
                            <tr>
                                <th className="text-center" scope="col">Flight Attendant</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-center">{services.flightAttendant ? "Available" : "Not Available"}</td>
                            </tr>
                        </tbody>
                    </table>

                )}
            </Row>
            <Link to={`/fleet/edit/${aircraftId}`}>
                <Button variant="secondary" size="md" className="custom-color-button">
                    Edit
                </Button>
            </Link>
        </Container>

    )
}

export default aircraftDetailsPage
