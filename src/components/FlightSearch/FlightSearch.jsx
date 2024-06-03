import "./FlightSearch.css"
import { Form, Button, InputGroup } from 'react-bootstrap';
import { RiMapPinLine } from "react-icons/ri";
import { RiUser3Line } from "react-icons/ri";
import { RiCalendarLine } from "react-icons/ri";
import { RiSearchLine } from "react-icons/ri";


const FlightSearch = () => {


    return (
        <section className="section__container booking__container">
            <Form>
                <Form.Group className="form__group">
                    <InputGroup>
                        <InputGroup.Text><RiMapPinLine /></InputGroup.Text>
                        <Form.Control type="text" placeholder="From" />
                    </InputGroup>
                    <Form.Text className="text-muted">Departure city</Form.Text>
                </Form.Group>

                <Form.Group className="form__group">
                    <InputGroup>
                        <InputGroup.Text><RiMapPinLine /></InputGroup.Text>
                        <Form.Control type="text" placeholder="To" />
                    </InputGroup>
                    <Form.Text className="text-muted">Destination city</Form.Text>
                </Form.Group>

                <Form.Group className="form__group">
                    <InputGroup>
                        <InputGroup.Text><RiCalendarLine /></InputGroup.Text>
                        <Form.Control type="date" placeholder="Departure" />
                    </InputGroup>
                    <Form.Text className="text-muted">Departure</Form.Text>
                </Form.Group>

                <Form.Group className="form__group">
                    <InputGroup>
                        <InputGroup.Text><RiCalendarLine /></InputGroup.Text>
                        <Form.Control type="date" placeholder="Return" />
                    </InputGroup>
                    <Form.Text className="text-muted">Return</Form.Text>
                </Form.Group>

                <Form.Group className="form__group">
                    <InputGroup>
                        <InputGroup.Text><RiUser3Line /></InputGroup.Text>
                        <Form.Control type="number" placeholder="Travellers" />
                    </InputGroup>
                    <Form.Text className="text-muted">Add guests</Form.Text>
                </Form.Group>



                <div className="text-center">
                    <Button variant="primary" type="submit" className="custom-btn">
                        <RiSearchLine className="search-icon" />
                    </Button>
                </div>
            </Form>
        </section>

    )
}

export default FlightSearch