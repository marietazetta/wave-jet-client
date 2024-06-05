import { useContext, useEffect, useState } from "react"
import { AuthContext } from '../../contexts/auth.context'
import bookingServices from "../../services/booking.services"
import Loader from "../../components/Loader/Loader"


const BookingsPage = () => {
    const { loggedUser } = useContext(AuthContext)
    const [bookings, setBookings] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        loadBookings()
    }, [])


    const loadBookings = () => {
        bookingServices
            .getBookingsByOwner(loggedUser._id)
            .then(({ data }) => {
                setBookings(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className="profile-page full-height font-family">
                <h1> Welcome, {loggedUser.username}</h1>
                <hr />
                {isLoading ?
                    <Loader /> :

                    bookings.length ? (
                        bookings.map((booking) => (
                            <div key={booking._id}>
                                <h2>From: {booking.fromDestination}</h2>
                                <p>To: {booking.toDestination}</p>
                                <p>Departure: {new Date(booking.departureDate).toLocaleDateString()}</p>
                                <p>Return: {new Date(booking.returnDate).toLocaleDateString()}</p>
                                <p>Status: {booking.status}</p>
                            </div>
                        ))
                    ) : (
                        <p>No bookings found</p>
                    )
                }
            </div>
        </>
    )
}

export default BookingsPage
