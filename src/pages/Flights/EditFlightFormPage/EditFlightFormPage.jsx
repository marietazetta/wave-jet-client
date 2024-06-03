import { Container } from "react-bootstrap"
import EditFlightForm from "../../../components/Flights/EditFlightForm/EditFlightForm"
import './EditFlightFormPage.css'

import { Link } from "react-router-dom"

const EditFlightFormPage = () => {

    return (
        <div className="edit-flight-form full-height font-family">
            <Container>
                <EditFlightForm />
                <Link to="/routes" className="btn btn-dark">Back to Routes</Link>
            </Container>
        </div>

    )
}

export default EditFlightFormPage

