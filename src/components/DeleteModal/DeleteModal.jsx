import './DeleteModal.css'
import { useNavigate } from 'react-router-dom'
import flightServices from '../../services/flight.services'
import { Modal, Button } from 'react-bootstrap'

const DeleteModal = ({ show, handleClose, flightId, loadFlights }) => {

    const navigate = useNavigate()

    const deleteFlight = () => {

        flightServices
            .deleteFlight(flightId)
            .then(() => {
                loadFlights()
                handleClose()
                navigate(`/routes`)
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Modal className="ModalDelete font-family" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>This action will delete the selected route</Modal.Body>
                <Modal.Footer>
                    <Button className='custom-color-button' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className='custom-color-button' onClick={deleteFlight}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteModal