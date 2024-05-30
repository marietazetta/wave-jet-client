
import UserCard from "../UserCard/UserCard"
import { Col, Row } from "react-bootstrap";

const UsersList = ({ users }) => {
    return (
        <Row className="justify-content-center">
            <Col lg={6} md={8}>
                <UserCard {...users} />
            </Col>
        </Row>
    );
};

export default UsersList;
