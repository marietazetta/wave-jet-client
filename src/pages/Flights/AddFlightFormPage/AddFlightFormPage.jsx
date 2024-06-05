import "./AddFlightFormPage.css"
import { Container } from "react-bootstrap"
import NewFlightForm from "../../../components/Flights/NewFlightForm/NewFlightForm"
import { Link } from "react-router-dom"


const AddFlightFormPage = () => {

    return (

        <div className="add-flight-page full-height font-family">
            <Container>
                <h1 style={{ color: 'black' }}>New Flight Route</h1>
                <hr style={{ color: 'black' }}></hr>
                <Link to="/dashboard" className="btn btn-dark">Back to Dashboard</Link>
                <NewFlightForm />

            </Container>
        </div >

    )
}

export default AddFlightFormPage

