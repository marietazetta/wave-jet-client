import './AircraftsPage.css';
import AircraftsList from "../../../components/Aircrafts/AircraftsList/AircraftsList";
import aircraftServices from "../../../services/aircraft.services";
import { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';

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
            <Container className='full-height font-family'>

                <h2>Your private jet fleet.</h2>

                <Row xs={1} md={2} lg={2} className="g-4">
                    {aircrafts.map((aircraft) => (
                        <AircraftsList
                            key={aircraft._id}
                            aircraft={aircraft}
                        />
                    ))}
                </Row>

            </Container>
        </div>
    );
};

export default AircraftsPage;
