import { Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import './FlightCard.css'

const FlightCard = ({ _id, toDestination, flightTime, fromDestination, imageUrl }) => {

    return (
        <>
            <div className="FlightCard">

                <Card className="shadow-sm border-0">
                    {/* <Link to={`/route/${_id}`}>
                        <Card.Img variant="top"
                            src={imageUrl}
                            className="rounded-top equal-aspect-ratio"
                        />
                    </Link> */}
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

                    </Card.Body>

                </Card>


            </div>



        </>
    )
}

export default FlightCard