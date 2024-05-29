import { Container } from "react-bootstrap"
import NewFlightForm from "../../../components/Flights/NewFlightForm/NewFlightForm"


const AddFlightFormPage = () => {

    return (

        <div className="AddFlightFormPage">
            <Container>
                <h1>Add new Route</h1>
                <hr></hr>
                <NewFlightForm />
            </Container>
        </div>

    )
}

export default AddFlightFormPage