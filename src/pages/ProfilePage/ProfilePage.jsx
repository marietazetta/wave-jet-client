import { useContext, useEffect, useState } from "react"
import { AuthContext } from '../../contexts/auth.context'
import bookingServices from "../../services/booking.services"
import profileServices from "../../services/profile.services"
import Loader from "../../components/Loader/Loader"
import BookingList from "../../components/Bookings/BookingList/BookingList"
import { Container, Row, Col } from "react-bootstrap"
import "./ProfilePage.css"
import ProfileList from "../../components/Profile/ProfileList/ProfileList"
import { useParams } from "react-router-dom"

const ProfilePage = () => {

    const { loggedUser } = useContext(AuthContext)
    const [bookings, setBookings] = useState([])
    const [profile, setProfile] = useState()
    const [isLoadingBookings, setIsLoadingBookings] = useState(true)
    const [isLoadingProfile, setIsLoadingProfile] = useState(true)
    const { profileId } = useParams()

    useEffect(() => {
        loadBookings()

    }, [])


    useEffect(() => {
        loadProfile()

    }, [])


    const loadBookings = () => {
        bookingServices
            .getBookingsByOwner(loggedUser._id)
            .then(({ data }) => {
                setBookings(data)
                setIsLoadingBookings(false)
            })
            .catch(err => {
                console.log(err)
                setIsLoadingBookings(false)
            })
    }


    const loadProfile = () => {
        profileServices
            .getProfileByOwner(loggedUser._id)
            .then(({ data }) => {
                setProfile(data)
                setIsLoadingProfile(false)
            })
            .catch(err => {
                console.log(err)
                setIsLoadingProfile(false)
            })
    }

    return (

        <div className="ProfilePage">
            <Container>

                <Row>
                    <Col>
                        {(isLoadingProfile || isLoadingBookings) ? (
                            <Loader />
                        ) : (
                            <div className="profile-page full-height font-family">
                                <h1>Welcome, {loggedUser.username}</h1>
                                <hr />
                                <ProfileList profile={profile} />

                                {/* <Row>
                                    <Col>
                                        <h5>Personal Details</h5>
                                        <p>Full Name - {loggedUser.username}</p>
                                        <p>Email Address - {loggedUser.email}</p>
                                        <p>Mobile - {loggedUser.mobile}</p>
                                    </Col>
                                    <Col>
                                        <p>una columna</p>
                                    </Col>
                                </Row> */}

                                <hr />
                                <h3>My Bookings</h3>
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
