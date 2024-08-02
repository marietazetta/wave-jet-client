import { useContext, useEffect, useState } from "react";
import { AuthContext } from '../../contexts/auth.context';
import bookingServices from "../../services/booking.services";
import profileServices from "../../services/profile.services";
import Loader from "../../components/Loader/Loader";
import BookingList from "../../components/Bookings/BookingList/BookingList";
<<<<<<< HEAD
import { Container, Row, Col } from "react-bootstrap";
import "./ProfilePage.css";
import Chat from "../../components/Chat/Chat";
import ProfileList from "../../components/Profile/ProfileList/ProfileList";
import { useParams } from "react-router-dom";
=======
import ProfileList from "../../components/Profiles/ProfileList/ProfileList";
import { Container, Row, Col } from "react-bootstrap";
import "./ProfilePage.css";
import Chat from "../../components/Chat/Chat";
>>>>>>> diego

const ProfilePage = () => {
    const { loggedUser } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
<<<<<<< HEAD
    const [profile, setProfile] = useState(null);
    const [isLoadingBookings, setIsLoadingBookings] = useState(true);
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);
    const { profileId } = useParams();

    useEffect(() => {
        loadBookings();
    }, []);

    useEffect(() => {
        if (profileId) {
            console.log("profileId:", profileId);  // Debug log to check profileId
            loadProfile();
        } else {
            setIsLoadingProfile(false);
        }
    }, [profileId]);
=======
    const [profiles, setProfiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (loggedUser) {
            loadBookings();
            loadProfiles();
        }
    }, [loggedUser]);
>>>>>>> diego

    const loadBookings = () => {
        bookingServices
            .getBookingsByOwner(loggedUser._id)
            .then(({ data }) => {
                setBookings(data);
<<<<<<< HEAD
                setIsLoadingBookings(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoadingBookings(false);
            });
    };

    const loadProfile = () => {
        profileServices
            .getProfileByOwner(loggedUser._id)
            .then(({ data }) => {
                setProfile(data);
                setIsLoadingProfile(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoadingProfile(false);
=======
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
>>>>>>> diego
            });
    };

    return (
        <div className="ProfilePage">
            <Container>
                <Row>
                    <Col>
                        {(isLoadingProfile || isLoadingBookings) ? (
                            <Loader />
                        ) : (
                            <div className="profile-page full-height font-family">
<<<<<<< HEAD
                                <h1>Welcome, {loggedUser.username}</h1>
                                <hr />
                                {profile && <ProfileList profile={profile} />}
=======
                                <Row>
                                    <Col>
                                        <ProfileList profiles={profiles} />
                                        <p>Email Address - {loggedUser.email}</p>
                                    </Col>
                                    <Col>
                                        {/* Additional user details or actions */}
                                    </Col>
                                </Row>
>>>>>>> diego
                                <hr />
                                <h3>My Bookings</h3>
                                <BookingList bookings={bookings} />
                            </div>
                        )}
                    </Col>
                    <Col>
                        <Chat />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ProfilePage;
