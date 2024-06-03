import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import authServices from "../../../services/auth.services"
import "./UserSignUpForm.css"

const UserSignUpForm = () => {

    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const handleInputChange = e => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const navigate = useNavigate()

    const handleFormSubmit = e => {
        e.preventDefault()

        authServices
            .signupUser(signupData)
            .then(() => navigate('/login'))
            .catch(err => console.log(err))
    }

    return (
        <div className="user-signup-form-container">
            <Form onSubmit={handleFormSubmit} className="user-signup-form">

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={signupData.email} onChange={handleInputChange} name="email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" value={signupData.username} onChange={handleInputChange} name="username" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={signupData.password} onChange={handleInputChange} name="password" />
                </Form.Group>

                <div className="d-grid">
                    <Button className="custom-button" variant="dark" type="submit">Sign Up</Button>
                </div>

            </Form>
        </div>
    )
}

export default UserSignUpForm
