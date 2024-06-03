import { Container, Col } from "react-bootstrap"
import UserSignUpForm from "../../../components/Users/UserSignUpForm/UserSignUpForm"
import "./SignUpPage.css"


const SignUpPage = () => {
    return (
        <>
            <div className="sign-up full-height font-family">
                <Container className='pt-5'>
                    <Col>
                        <UserSignUpForm />
                    </Col>
                </Container>
            </div>

        </>

    )
}

export default SignUpPage