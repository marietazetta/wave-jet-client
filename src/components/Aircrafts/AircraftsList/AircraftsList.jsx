import './AircraftsList.css'
import { Container } from "react-bootstrap";
import AircraftCard from "../AircraftCard/AircraftCard";

const AircraftsList = ({ aircraft }) => {
    return (
        <Container className="mt-5 pt-5 pb-5">
            <AircraftCard
                _id={aircraft._id}
                mainImage={aircraft.mainImage}
                manufacturer={aircraft.manufacturer}
                manufacturerDescription={aircraft.manufacturerDescription}
            />
        </Container>
    );
};

export default AircraftsList;
