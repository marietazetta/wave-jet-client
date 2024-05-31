import { Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import './FlightCard.css'
import DeleteModal from "../../DeleteModal/DeleteModal"
import { useState } from "react"

const FlightCard = ({ _id, toDestination, flightTime, fromDestination, loadFlights }) => {

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const showConfirmModal = () => setShow(true)

    return (
        <>
            <div className="FlightCard">

                <Card className="shadow-sm border-0">

                    <Card.Body >
                        <Card.Title>{fromDestination} - {toDestination}</Card.Title>
                        <Card.Text >
                            {flightTime} hours
                        </Card.Text>
                        <Link to={`/routes/edit/${_id}`}>
                            <Button variant="secondary" size="md" className="custom-color-button">
                                Edit Route
                            </Button>
                        </Link>

                        <Link to={`/routes/${_id}`}>
                            <Button variant="secondary" size="md" className="custom-color-button">
                                View
                            </Button>
                        </Link>


                        <Button onClick={showConfirmModal} className="custom-color-button">Delete</Button>
                        <DeleteModal show={show} handleClose={handleClose} flightId={_id} loadFlights={loadFlights} />

                    </Card.Body>

                </Card>


            </div>



        </>
    )
}

export default FlightCard