import './AircraftsPage.css';
import AircraftsList from "../../../components/Aircrafts/AircraftsList/AircraftsList";
import aircraftServices from "../../../services/aircraft.services";
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

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

                <h2 className="cool-font">YOUR PRIVATE JET FLEET.</h2>

                <Row xs={1} sm={2} md={2} lg={2} className="g-4">
                    {aircrafts.map((aircraft) => (
                        <Col key={aircraft._id}>
                            <AircraftsList
                                aircraft={aircraft}
                            />
                        </Col>
                    ))}
                </Row>

            </Container>
        </div>
    );
};

export default AircraftsPage;
