import Card from 'react-bootstrap/Card';
import './AircraftCard.css';

const UserCard = ({ userName, email }) => {

    return (

        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>User Name {userName}</Card.Title>
                <Card.Text>
                    Email {email}
                </Card.Text>
            </Card.Body>
        </Card>

    );
}

export default UserCard;
