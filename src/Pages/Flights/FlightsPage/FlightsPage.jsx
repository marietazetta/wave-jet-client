import { useContext, useEffect, useState } from "react"
import FlightsList from "../../../components/Flights/FlightsList/FlightsList"
import FlightServices from "../../../services/flight.services"
import { AuthContext } from "../../../contexts/auth.context"
import { Link } from 'react-router-dom'
import { Container } from "react-bootstrap"



const FlightsPage = () => {

    const [flights, setFlights] = useState([])

    const { loggedUser } = useContext(AuthContext)

    useEffect(() => {
        loadFlights()
    }, [])

    const loadFlights = () => {

        FlightServices
            .getAllFlights()
            .then(({ data }) => setFlights(data))
            .catch(err => console.log(err))
    }

    return (

        <div className="FlightsPage">
            <Container>

                <p>Our Summer Routes</p>

                {
                    loggedUser && <Link className="btn btn-sm btn-dark" to={'/flights/add'}>New Route</Link>
                }
                <hr />

                <FlightsList flights={flights} />

            </Container>
        </div>


    )
}

export default FlightsPage