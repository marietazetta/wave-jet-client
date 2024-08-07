import React, { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import profileServices from '../../../services/profile.services';

const UsersList = ({ users, profiles, setProfiles }) => {
    const [editingProfileId, setEditingProfileId] = useState(null);
    const [editableProfileData, setEditableProfileData] = useState({});


    const handleEditClick = (profile) => {
        setEditingProfileId(profile._id);
        setEditableProfileData(profile);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableProfileData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSaveClick = async () => {
        try {
            const response = await profileServices.editProfile(editableProfileData._id, editableProfileData);
            console.log('Updated profile response:', response.data);

            const updatedProfiles = { ...profiles };
            const profileIndex = updatedProfiles[editableProfileData._id].findIndex(p => p._id === editableProfileData._id);
            if (profileIndex > -1) {
                updatedProfiles[editableProfileData._id][profileIndex] = response.data;
            } else {
                updatedProfiles[response.data._id] = [response.data];
            }

            setProfiles(updatedProfiles);
            setEditingProfileId(null);

        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleCancelClick = () => {
        setEditingProfileId(null);
    };

    const filteredUsers = users.filter(user => user.role !== 'Admin');
    const sortedUsers = [...filteredUsers].sort((a, b) => a.username.localeCompare(b.username));

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Full Name</th>
                    <th>Favourite Airport</th>
                    <th>Special Diet</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {sortedUsers.map(user => (
                    profiles[user._id] && profiles[user._id].length > 0 ? (
                        profiles[user._id].map(profile => (
                            <tr key={profile._id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    {editingProfileId === profile._id ? (
                                        <Form.Control
                                            type="text"
                                            name="fullName"
                                            value={editableProfileData.fullName || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        profile.fullName
                                    )}
                                </td>
                                <td>
                                    {editingProfileId === profile._id ? (
                                        <Form.Control
                                            type="text"
                                            name="favAirport"
                                            value={editableProfileData.favAirport || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        profile.favAirport
                                    )}
                                </td>
                                <td>
                                    {editingProfileId === profile._id ? (
                                        <Form.Control
                                            type="text"
                                            name="specialDiet"
                                            value={editableProfileData.specialDiet || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        profile.specialDiet
                                    )}
                                </td>
                                <td>
                                    {editingProfileId === profile._id ? (
                                        <>
                                            <Button variant="success" onClick={handleSaveClick}>
                                                Save
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                onClick={handleCancelClick}
                                            >
                                                Cancel
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            variant="primary"
                                            onClick={() => handleEditClick(profile)}
                                        >
                                            Edit
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr key={user._id}>
                            <td colSpan="6">No profiles available</td>
                        </tr>
                    )
                ))}
            </tbody>
        </Table>
    );
};

export default UsersList;
