import BookingResultsCard from "../BookingResultsCard/BookingResultsCard";
import { Container } from "react-bootstrap";




const BookingResultsList = ({ bookingResults }) => {
    return (
        <>
            <Container className="mt-5 pt-5 pb-5">

                {
                    bookingResults.map(booking => <BookingResultsCard {...booking} />)
                }

            </Container>
        </>

    );
};

export default BookingResultsList;