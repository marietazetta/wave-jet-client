import { Container } from "react-bootstrap"
import EditFlightForm from "../../../components/Flights/EditFlightForm/EditFlightForm"
import './EditFlightFormPage.css'

import { Link } from "react-router-dom"

const EditFlightFormPage = () => {

    return (
        <div className="edit-flight-form full-height font-family">
            <Container>
                <h1 style={{ color: 'black' }}>Modify Flight details</h1>
                <hr style={{ color: 'black' }}></hr>
                <Link to="/dashboard" className="btn btn-dark">Back to Dashboard</Link>
                <EditFlightForm />
            </Container>
        </div>

    )
}

export default EditFlightFormPage

