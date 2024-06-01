import './AddAircraftFormPage.css'
import NewAircraftForm from "../../../components/Aircrafts/NewAircraftForm/NewAircraftForm"
import { Container } from 'react-bootstrap'

const AddAircraftFormPage = () => {
    return (
        <>
            <div className='add-form-page full-height font-family'>
                <Container>
                    <NewAircraftForm />
                </Container>
            </div>
        </>

    )
}

export default AddAircraftFormPage