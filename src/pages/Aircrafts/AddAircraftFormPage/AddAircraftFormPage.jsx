import './AddAircraftFormPage.css'
import NewAircraftForm from "../../../components/Aircrafts/NewAircraftForm/NewAircraftForm"
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const AddAircraftFormPage = () => {
    return (
        <>
            <div className='add-form-page full-height font-family'>
                <Container>
                    <h1 style={{ color: 'black' }}>Add a new aircraft to the fleet</h1>
                    <hr style={{ color: 'black' }}></hr>
                    <Link to="/dashboard" className="btn btn-dark">Back to Dashboard</Link>
                    <NewAircraftForm />
                </Container>
            </div>
        </>

    )
}

export default AddAircraftFormPage