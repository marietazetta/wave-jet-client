import './AddAircraftFormPage.css'
import NewAircraftForm from "../../../components/Aircrafts/NewAircraftForm/NewAircraftForm"
import { Container } from 'react-bootstrap'

const AddAircraftFormPage = () => {
    return (
        <>
            <Container>
                <NewAircraftForm />
            </Container>
        </>

    )
}

export default AddAircraftFormPage