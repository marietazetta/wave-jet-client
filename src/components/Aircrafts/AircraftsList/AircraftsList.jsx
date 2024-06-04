import "./AircraftsList"
import { Container } from "react-bootstrap";
import AircraftCard from "../AircraftCard/AircraftCard";



const AircraftsList = () => {
    return (
        <>
            <Container className="mt-5 pt-5 pb-5">

                <AircraftCard />

            </Container>
        </>

    );
};

export default AircraftsList;
