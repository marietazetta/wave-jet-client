import './EditAircraftFormPage.css'
import { Container } from 'react-bootstrap'
import EditAircraftForm from "../../../components/Aircrafts/EditAircraftForm/EditAircraftForm"

const EditAircraftFormPage = () => {
    return (
        <div className='edit-form-page full-height font-family'>
            <Container>
                <EditAircraftForm />
            </Container>
        </div>
    )
}

export default EditAircraftFormPage


