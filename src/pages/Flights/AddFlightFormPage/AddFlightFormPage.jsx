import "./AddFlightFormPage.css"
import { Container } from "react-bootstrap"
import NewFlightForm from "../../../components/Flights/NewFlightForm/NewFlightForm"


const AddFlightFormPage = () => {

    return (

        <div className="add-flight-page full-height font-family">
            <Container>
                <h1 style={{ color: 'white' }}>New Flight Route</h1>
                <hr style={{ color: 'white' }}></hr>
                <NewFlightForm />
            </Container>
        </div >

    )
}

export default AddFlightFormPage

