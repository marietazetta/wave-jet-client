import React from "react";
import "./BookingCard.css";
import { Button, Table } from "react-bootstrap";
import { MdOutlineEuro } from "react-icons/md";
import { LiaPlaneArrivalSolid, LiaPlaneDepartureSolid } from "react-icons/lia";
import { GrStatusWarning } from "react-icons/gr";
import { PiAirplaneInFlightLight } from "react-icons/pi";
import { loadStripe } from "@stripe/stripe-js";

const stripeKey = import.meta.env.VITE_STRIPE_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

const BookingCard = ({ fromDestination, toDestination, departureDate, returnDate, status, aircraftId, flightId }) => {

    const bookings = {
        fromDestination,
        toDestination,
        departureDate,
        returnDate,
        aircraftId,
        cost: aircraftId.hourlyRate * flightId?.flightTime // Assuming cost is derived this way
    };

    const makePayment = async () => {
        try {
            const stripe = await loadStripe(stripeKey);
            const body = { bookingToPay: bookings };
            const headers = { "Content-Type": "application/json" };

            const response = await fetch(`${apiUrl}/stripe/create-checkout/session`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const session = await response.json();

            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) {
                console.log(result.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="BookingCard font-family">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th colSpan="2">
                            <h3>{fromDestination} - {toDestination}</h3>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <LiaPlaneDepartureSolid className="icon" />
                            <span> Departure: {new Date(departureDate).toLocaleDateString()}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <LiaPlaneArrivalSolid className="icon" />
                            <span> Return: {new Date(returnDate).toLocaleDateString()}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <MdOutlineEuro className="icon" />
                            <span> Cost: {bookings.cost}€</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <GrStatusWarning className="icon" />
                            <span> Status: {status}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <PiAirplaneInFlightLight className="icon" />
                            <span> Aircraft Model: {aircraftId.model}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Button onClick={makePayment}> Pay: {bookings.cost}€ • {fromDestination} - {toDestination}</Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default BookingCard;
