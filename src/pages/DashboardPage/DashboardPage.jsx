import { useContext, useEffect, useState } from "react"
import FlightServices from "../../services/flight.services"
import AircfraftServices from "../../services/aircraft.services"
import { AuthContext } from "../../contexts/auth.context"
import { Container } from "react-bootstrap"
import Loader from "../../components/Loader/Loader"
import DashboardFlights from "../../components/DashboardFlights/DashboardFlights"
import "./DashboardPage.css"

const DashboardPage = () => {

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
        <>        <div className="dashboard-page full-height font-family">
            <Container>


                {
                    isLoading ? <Loader /> : <DashboardFlights aircrafts={aircrafts} flights={flights} />
                }

                <hr />


            </Container>
        </div>
        </>


    )
}

export default DashboardPage