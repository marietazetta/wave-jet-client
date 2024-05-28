import { Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const FlightCard = ({ _id, toDestination, flightTime, fromDestination }) => {

    return (
        <>
            <div className="FlightCard">

                <Card className="shadow-sm border-0">
                    {/* <Link to={`/flight/${_id}`}>
                        <Card.Img variant="top"
                            src={main_image}
                            className="rounded-top equal-aspect-ratio"
                        />
                    </Link> */}
                    <Card.Body >
                        <Card.Title>{fromDestination} - {toDestination}</Card.Title>
                        <Card.Text >
                            {flightTime} hours
                        </Card.Text>
                        <Link to={`/flights/edit/${_id}`}>
                            <Button variant="secondary" size="md" >
                                Edit Route
                            </Button>
                        </Link>
                    </Card.Body>

                </Card>
                {/* fromDestination, toDestination, flightTime, miles, aircraftId */}

            </div>



        </>
    )
}

export default FlightCard