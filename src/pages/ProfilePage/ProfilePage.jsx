import { useContext, useEffect, useState } from "react"
import { AuthContext } from '../../contexts/auth.context'
import bookingServices from "../../services/booking.services"
import Loader from "../../components/Loader/Loader"
import BookingList from "../../components/Bookings/BookingList/BookingList"
import { Container, Row, Col } from "react-bootstrap"
import "./ProfilePage.css"

const ProfilePage = () => {
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
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            })
    }

    return (

        <div className="ProfilePage">
            <Container>
                <Row>
                    <Col>
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <div className="profile-page full-height font-family">
                                <h1>Welcome, {loggedUser.username}</h1>
                                <hr />
                                <BookingList bookings={bookings} />
                            </div>
                        )}
                    </Col>

                </Row>

            </Container>
        </div>
    )
}

export default ProfilePage
