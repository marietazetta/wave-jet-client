import { Container } from "react-bootstrap"
import EditFlightForm from "../../../components/Flights/EditFlightForm/EditFlightForm"
import './EditFlightFormPage.css'

const EditFlightFormPage = () => {

    return (
        <div className="edit-flight-form full-height font-family">
            <Container>
                <EditFlightForm />
            </Container>
        </div>

    )
}

export default EditFlightFormPage

