import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import './UserCard.css';

const UserCard = ({ username, email }) => {

    return (
        <>

            <Card className='userCard'>
                <Table striped>
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{username}</td>
                            <td>{email}</td>
                        </tr>

                    </tbody>
                </Table>
            </Card>
        </>


    );
}

export default UserCard;
