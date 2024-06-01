import { Container } from "react-bootstrap"
import UserSignUpForm from "../../../components/Users/UserSignUpForm/UserSignUpForm"


const SignUpPage = () => {
    return (
        <>
            <div className="sign-up full-height font-family">
                <Container className='pt-5'>

                    <UserSignUpForm />

                </Container>
            </div>

        </>

    )
}

export default SignUpPage