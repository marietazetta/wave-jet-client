import { useEffect, useState } from "react";
import UsersList from "../../../components/Users/UsersList/UsersList";
import { Container } from "react-bootstrap";
import Loader from "../../../components/Loader/Loader";
import authServices from "../../../services/auth.services";
import profileServices from "../../../services/profile.services";

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [profiles, setProfiles] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = () => {
        authServices
            .getAllUsers()
            .then(({ data }) => {
                setUsers(data);
                return Promise.all(data.map(user => profileServices.getProfilesByOwner(user._id)));
            })
            .then(responses => {
                const profilesData = responses.reduce((acc, response) => {
                    response.data.forEach(profile => {
                        acc[profile.owner] = [...(acc[profile.owner] || []), profile];
                    });
                    return acc;
                }, {});
                setProfiles(profilesData);
                setIsLoading(false);
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <div className="users-page full-height font-family">
                <Container>
                    {isLoading ? <Loader /> : <UsersList users={users} profiles={profiles} />}
                    <hr />
                </Container>
            </div>

        </>
    );
};

export default UsersPage;
