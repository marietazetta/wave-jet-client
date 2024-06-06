import './EditAircraftFormPage.css'
import { Container } from 'react-bootstrap'
import EditAircraftForm from "../../../components/Aircrafts/EditAircraftForm/EditAircraftForm"
import { Link } from 'react-router-dom'

const EditAircraftFormPage = () => {
    return (
        <div className='edit-form-page full-height font-family'>
            <Container>
                <h1 style={{ color: 'black' }}>Modify Aircraft details</h1>
                <hr style={{ color: 'black' }}></hr>
                <Link to="/dashboard" className="btn btn-dark">Back to Dashboard</Link>
                <EditAircraftForm />
            </Container>
        </div>
    )
}

export default EditAircraftFormPage


