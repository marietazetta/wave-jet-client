import { useEffect, useState } from "react"
import FlightServices from "../../services/flight.services"
import AircfraftServices from "../../services/aircraft.services"
import BookingServices from "../../services/booking.services"
import DashboardFlights from "../../components/DashboardFlights/DashboardFlights"
import DashboardBookings from "../../components/DashboardBookings/DashboardBookings"
import Loader from "../../components/Loader/Loader"
import { Container } from "react-bootstrap"
import "./DashboardPage.css"

const DashboardPage = () => {

    const [flights, setFlights] = useState([])
    const [aircrafts, setAircrafts] = useState([])
    const [bookings, setBookings] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        loadFlights()
        loadAircrafts()
        loadBookings()
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

    const loadBookings = () => {

        BookingServices
            .getAllBookings()
            .then(({ data }) => {
                setBookings(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }


    return (
        <>        <div className="dashboard-page full-height font-family">
            <Container>


                {
                    isLoading ? <Loader /> :
                        <>
                            <DashboardBookings bookings={bookings} />

                            <DashboardFlights aircrafts={aircrafts} flights={flights} />

                        </>

                }


            </Container>
        </div>
        </>


    )
}

export default DashboardPage