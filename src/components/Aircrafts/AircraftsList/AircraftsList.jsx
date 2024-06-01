import "./AircraftsList"
import { Container } from "react-bootstrap";
import AircraftCard from "../AircraftCard/AircraftCard";



const AircraftsList = ({ aircraft }) => {
    return (
        <>
            <Container className="mt-5 pt-5 pb-5">

                <AircraftCard {...aircraft} />

            </Container>
        </>

    );
};

export default AircraftsList;
