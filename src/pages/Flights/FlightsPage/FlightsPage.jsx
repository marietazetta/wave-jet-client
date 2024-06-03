import { useContext, useEffect, useState } from "react"
import FlightServices from "../../../services/flight.services"
import AircfraftServices from "../../../services/aircraft.services"
import { AuthContext } from "../../../contexts/auth.context"
import { Link } from 'react-router-dom'
import { Container } from "react-bootstrap"
import Loader from "../../../components/Loader/Loader"
import DashboardFlights from "../../../components/DashboardFlights/DashboardFlights"
import "./FlightsPage.css"

const FlightsPage = () => {

    const [flights, setFlights] = useState([])
    const [aircrafts, setAircrafts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const { loggedUser } = useContext(AuthContext)

    useEffect(() => {
        loadFlights()
        loadAircrafts()
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

    const loadAircrafts = () => {

        AircfraftServices
            .getAllAircrafts()
            .then(({ data }) => {
                setAircrafts(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    return (
        <>        <div className="flights-page full-height font-family">
            <Container>

                {
                    loggedUser && <Link className="btn btn-sm btn-dark" to={'/routes/add'}>New Route</Link>
                }

                {
                    isLoading ? <Loader /> : <DashboardFlights aircrafts={aircrafts} flights={flights} />
                }

                <hr />


            </Container>
        </div>
        </>


    )
}

export default FlightsPage