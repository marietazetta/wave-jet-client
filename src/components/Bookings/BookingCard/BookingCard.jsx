import React from "react";
import "./BookingCard.css";
import { Table } from "react-bootstrap";
import { MdOutlineEuro } from "react-icons/md";
import { LiaPlaneArrivalSolid, LiaPlaneDepartureSolid } from "react-icons/lia";
import { GrStatusWarning } from "react-icons/gr";
import { PiAirplaneInFlightLight } from "react-icons/pi";

const BookingCard = ({ fromDestination, toDestination, departureDate, returnDate, status, aircraftId, flightId }) => {
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
                            <span> Cost: {aircraftId.hourlyRate * flightId?.flightTime}</span>
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
                </tbody>
            </Table>
        </div>
    );
};

export default BookingCard;
