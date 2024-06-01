import { useContext, useEffect, useState } from "react"
import FlightsList from "../../../components/Flights/FlightsList/FlightsList"
import FlightServices from "../../../services/flight.services"
import { AuthContext } from "../../../contexts/auth.context"
import { Link } from 'react-router-dom'
import { Container } from "react-bootstrap"
import Loader from "../../../components/Loader/Loader"

const FlightsPage = () => {

    const [flights, setFlights] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const { loggedUser } = useContext(AuthContext)

    useEffect(() => {
        loadFlights()
    }, [])

    const loadFlights = () => {

        FlightServices
            .getAllFlights()
            .then(({ data }) => {
                setFlights(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    return (

        <div className="FlightsPage full-height font-family">
            <Container>

                <p>Our Summer Routes</p>

                {
                    isLoading ? <Loader /> : <FlightsList flights={flights} loadFlights={loadFlights} />
                }

                {
                    loggedUser && <Link className="btn btn-sm btn-dark" to={'/routes/add'}>New Route</Link>
                }
                <hr />

            </Container>
        </div>


    )
}

export default FlightsPage