import './LoginPage.css'
import UserLoginForm from "../../../components/Users/UserLoginForm/UserLoginForm"
import { Container } from 'react-bootstrap'

const LoginPage = () => {
    return (
        <>
            <Container className='pt-5'>

                <UserLoginForm />

            </Container>

        </>

    )
}

export default LoginPage