import { Container } from 'react-bootstrap'
import './HomePage.css'
import FlightSearch from "../../components/FlightSearch/FlightSearch"

const HomePage = () => {
    return (
        <>

            <div className='home-page full-height font-family'>
                <video
                    className='background-video'
                    src="https://res.cloudinary.com/dzncdwx7u/video/upload/v1717084577/homepagevideo_tessr8.mp4"
                    width='120%'
                    autoPlay
                    muted
                    loop
                />



            </div>


            <div className='overlay'>
                <Container className='text-container'>
                    <h4>PLAN A FLIGHT</h4>
                    <p>Enter your flight details below and our team will contact you shortly. Private jet charter flight prices are subject to the market rate and start from $5,000 per hour.</p>
                    <FlightSearch className='mt-5' />
                </Container>
            </div>

        </>

    )
}

export default HomePage