import { Container, Row, Col } from 'react-bootstrap';
import './HomePage.css';
import FlightSearch from '../../components/FlightSearch/FlightSearch';
import { useState } from 'react';
import SearchResultsList from '../../components/SearchResults/SearchResultsList/SearchResultsList';
import BookingServices from '../../services/booking.services';
import { useNavigate } from 'react-router-dom';
import PopularDestinations from '../../components/PopularDestinations/PopularDestinations';

const HomePage = () => {
    const navigate = useNavigate();

    const [searchResults, setSearchResults] = useState({
        items: [],
        searchData: {}
    });

    const requestBooking = ({ aircraftId, flightId }) => {
        const fullBookingData = {
            ...searchResults.searchData,
            aircraftId,
            flightId: searchResults.items[0]._id
        };

        BookingServices
            .saveBooking(fullBookingData)
            .then(() => navigate('/bookings'))
            .catch(err => console.log(err));
    };

    return (
        <>
            <Container fluid className="home-page-container p-0">
                <Row className="m-0">
                    <Col className="p-0">
                        <div className="home-page full-height font-family">
                            <video
                                className="background-video"
                                src="https://res.cloudinary.com/dzncdwx7u/video/upload/v1717535606/introVideo_lyphpi.mov"
                                autoPlay
                                muted
                                loop
                            />
                            <div className="overlay">
                                <h1>WAVE JET</h1>
                                <h3>Your Journey Begins Here</h3>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Container className="text-container py-4">
                <h4>PLAN A FLIGHT</h4>
                <p className="justified-text">
                    Enter your flight details below and our team will contact you shortly. Private jet charter flight prices are subject to the market rate and start from $5,000 per hour.
                </p>
                <FlightSearch className="flightSearch" setSearchResults={setSearchResults} />
                <SearchResultsList searchResults={searchResults.items} requestBooking={requestBooking} />
                <PopularDestinations />
            </Container>
        </>
    );
}

export default HomePage;
