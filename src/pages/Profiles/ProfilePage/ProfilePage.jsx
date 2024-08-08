import { useContext, useEffect, useState } from "react";
import { AuthContext } from '../../../contexts/auth.context';
import bookingServices from "../../../services/booking.services";
import profileServices from "../../../services/profile.services";
import Loader from "../../../components/Loader/Loader";
import BookingList from "../../../components/Bookings/BookingList/BookingList";
import ProfileList from "../../../components/Profiles/ProfileList/ProfileList";
import PopularDestinations from "../../../components/PopularDestinations/PopularDestinations";
import { Container, Row, Col } from "react-bootstrap";
import "./ProfilePage.css";
import Chat from "../../../components/Chat/Chat";

const ProfilePage = () => {
    const { loggedUser } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (loggedUser) {
            loadBookings();
            loadProfiles();
        }
    }, [loggedUser]);

    const loadBookings = () => {
        bookingServices
            .getBookingsByOwner(loggedUser._id)
            .then(({ data }) => {
                setBookings(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    };

    const loadProfiles = () => {
        profileServices
            .getProfilesByOwner(loggedUser._id)
            .then(({ data }) => {
                const transformedData = data.map(profile => ({
                    _id: profile._id,
                    mobile: profile.mobile,
                    fullName: profile.fullName,
                    favAirport: profile.favAirport,
                    specialDiet: profile.specialDiet,
                    owner: profile.owner._id,
                }));
                setProfiles(transformedData);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Error loading profiles:", err.response ? err.response.data : err);
                setIsLoading(false);
            });
    };

    return (
        <div className="ProfilePage">
            <Container>
                <Row className="full-height font-family">
                    {loggedUser.role === "Admin" ? (
                        <>
                            <Col md={4}>
                                <h3>Chat with users</h3>
                                <Chat />
                            </Col>
                            <Col md={8}>
                                {isLoading ? (
                                    <Loader />
                                ) : (
                                    <>
                                        <ProfileList profiles={profiles} />
                                        <p>{loggedUser.role === 'User' ? `Email address: ${loggedUser.email}` : null}</p>
                                        {loggedUser.role === "User" && (
                                            <>
                                                <h3>My Bookings</h3>
                                                <BookingList bookings={bookings} />
                                            </>
                                        )}
                                    </>
                                )}
                            </Col>
                        </>
                    ) : (
                        <>
                            <Col md={8}>
                                {isLoading ? (
                                    <Loader />
                                ) : (
                                    <>
                                        <ProfileList profiles={profiles} />
                                        <p>{loggedUser.role === 'User' ? `Email address: ${loggedUser.email}` : null}</p>
                                        {loggedUser.role === "User" && (
                                            <>
                                                <h3>My Bookings</h3>
                                                <BookingList bookings={bookings} />
                                            </>
                                        )}
                                    </>
                                )}
                            </Col>
                            <Col md={4}>
                                <h3>{loggedUser.role === "User" ? "Chat with us" : "Check your inbox"}</h3>
                                <Chat />
                            </Col>
                        </>
                    )}
                    <PopularDestinations />
                </Row>
            </Container>
        </div>
    );
};

export default ProfilePage;
