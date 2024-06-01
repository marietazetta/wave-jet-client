import { useParams, Link } from "react-router-dom"
import flightServices from "../../../services/flight.services"
import { useEffect, useState } from "react"
import "./FlightDetailsPage.css"
import { Container, Row, Col } from "react-bootstrap"

const FlightDetailsPage = () => {

    const { flightId } = useParams()

    const [flight, setFlight] = useState({})

    useEffect(() => {
        loadFlightDetails()
    }, [])

    const loadFlightDetails = () => {
        flightServices
            .getOneFlight(flightId)
            .then(({ data }) => setFlight(data))
            .catch(err => console.log(err))
    }

    return (

        <div className="FlightDetailsPage full-height font-family">
            <Container>

                <h1 className="mb-4">{flight.fromDestination} - {flight.toDestination}</h1>
                <hr />

                <Row>

                    <Col md={{ span: 6, offset: 1 }}>
                        <h3> Details</h3>
                        <p>Description</p>
                        <ul>
                            <li>Flightime: {flight.flightTime} hours</li>

                        </ul>
                        <hr />

                        <Link to="/routes" className="btn btn-dark">Back to Routes</Link>
                    </Col>

                    <Col md={{ span: 4 }}>
                        <img src={flight.imageUrl} style={{ width: '100%' }} />
                    </Col>

                </Row>

            </Container >
        </div>


    )
}

export default FlightDetailsPage