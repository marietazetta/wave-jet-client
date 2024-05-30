import './AircraftsPage.css';
import AircraftsList from "../../../components/Aircrafts/AircraftsList/AircraftsList";
import aircraftServices from "../../../services/aircraft.services";
import { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';

const AircraftsPage = () => {
    const [aircrafts, setAircrafts] = useState([]);

    useEffect(() => {
        loadAircrafts();
    }, []);

    const loadAircrafts = () => {
        aircraftServices
            .getAllAircrafts()
            .then(({ data }) => setAircrafts(data))
            .catch(err => console.log(err));
    };

    return (
        <div className='AircraftsPage'>
            <Carousel className="carousel-dark custom-carousel">
                {
                    aircrafts.map(aircraft => (
                        <Carousel.Item key={aircraft._id}>
                            <AircraftsList aircraft={aircraft} />
                        </Carousel.Item>
                    ))}
            </Carousel>
        </div>
    );
};

export default AircraftsPage;
