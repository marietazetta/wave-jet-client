import './AircraftsPage.css';
import AircraftsList from "../../../components/Aircrafts/AircraftsList/AircraftsList";
import aircraftServices from "../../../services/aircraft.services";
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

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
        <Container className='AircraftsPage'>

            <h2>Your private jet fleet.</h2>

            <div className='AircraftsPage full-height font-family'>

                {
                    aircrafts.map(aircraft => (
                        <p key={aircraft._id}>
                            <AircraftsList aircraft={aircraft} />
                        </p>
                    ))}

            </div>
        </Container>
    );
};

export default AircraftsPage;
