import React from "react";
import { FaMobileAlt, FaPlaneDeparture, FaLeaf, FaUserTag } from "react-icons/fa";

const ProfileCard = ({ mobile, fullName, favAirport, specialDiet, owner }) => {
    return (
        <div className="ProfileCard font-family">
            <div className="custom-list">
                <h4>{fullName}</h4>
                <ul className="list-unstyled">
                    <li className="detail-item">
                        <FaMobileAlt className="icon" />
                        <p>Mobile: {mobile}</p>
                    </li>
                    <li className="detail-item">
                        <FaPlaneDeparture className="icon" />
                        <p>Favorite Airport: {favAirport}</p>
                    </li>
                    <li className="detail-item">
                        <FaLeaf className="icon" />
                        <p>Special Diet: {specialDiet}</p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProfileCard;
