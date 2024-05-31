import UserCard from "../UserCard/UserCard"
import { Col, Container, Row } from "react-bootstrap";

const UsersList = ({ users }) => {
    return (
        <Container>
            <Col>
                <Row>
                    <h1>Active users</h1>
                    {
                        users.map(elm => {
                            return (
                                <Col lg={{ span: 4 }} md={{ span: 6 }} key={elm._id}>
                                    <UserCard {...elm} />
                                </Col>
                            )
                        })
                    }
                </Row>
            </Col>

        </Container>

    );
};

export default UsersList;
