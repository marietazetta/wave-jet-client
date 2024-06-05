import { Col, Row } from "react-bootstrap"
import BookingCard from "../BookingCard/BookingCard"
import "./BookingList.css"



const BookingList = ({ bookings, loadBookings }) => {


    return (
        <>
            <Row>
                {
                    bookings.map(elm => {
                        return (
                            <Col lg={{ span: 6 }} md={{ span: 6 }} key={elm._id}>
                                <BookingCard {...elm} loadBookings={loadBookings} />
                            </Col>
                        )
                    })
                }
            </Row>
        </>

    )

}
export default BookingList