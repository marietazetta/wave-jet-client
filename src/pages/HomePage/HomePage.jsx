import { Container } from 'react-bootstrap'
import './HomePage.css'
import FlightSearch from "../../components/FlightSearch/FlightSearch"
import { useState } from 'react'
import SearchResultsList from '../../components/SearchResults/SearchResultsList/SearchResultsList'
import BookingServices from "../../services/booking.services"
import { useNavigate } from 'react-router-dom'


const HomePage = () => {

    const navigate = useNavigate()

    const [searchResults, setSearchResults] = useState({
        items: [],
        searchData: {}
    })

    const requestBooking = ({ aircraftId, flightId }) => {

        const fullBookingData = {
            ...searchResults.searchData,
            aircraftId,
            flightId: searchResults.items[0]._id

        }



        BookingServices
            .saveBooking(fullBookingData)
            .then(() => navigate('/bookings'))
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className='home-page full-height font-family'>

                <video
                    className='background-video'
                    src="https://res.cloudinary.com/dzncdwx7u/video/upload/v1717535606/introVideo_lyphpi.mov"
                    width='120%'
                    autoPlay
                    muted
                    loop

                />

            </div>

            <h1 className='overlay'>WAVE JET</h1>

            <div >
                <Container className='text-container'>
                    <h4>PLAN A FLIGHT</h4>
                    <p>Enter your flight details below and our team will contact you shortly. Private jet charter flight prices are subject to the market rate and start from $5,000 per hour.</p>

                    <FlightSearch className='flightSearch' setSearchResults={setSearchResults} />

                    <SearchResultsList searchResults={searchResults.items} requestBooking={requestBooking} />

                </Container>
            </div>

        </>

    )
}

export default HomePage