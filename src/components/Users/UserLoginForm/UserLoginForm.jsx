import { useContext, useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import authServices from "../../../services/auth.services"
import { AuthContext } from "../../../contexts/auth.context"
import './UserLoginForm.css'

const UserLoginForm = () => {

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const { authenticateUser } = useContext(AuthContext)


    const handleInputChange = e => {
        const { value, name } = e.target
        setLoginData({ ...loginData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        authServices
            .loginUser(loginData)
            .then(({ data }) => {
                const newTokenGenerated = data.authToken
                localStorage.setItem('authToken', newTokenGenerated)

                authenticateUser()
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="user-login-form-container font-family">
            <Form onSubmit={handleSubmit} className="user-login-form">

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={loginData.email} onChange={handleInputChange} name="email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={loginData.password} onChange={handleInputChange} name="password" />
                </Form.Group>

                <div className="d-grid">
                    <Button className="custom-button" variant="dark" type="submit">Log In</Button>
                </div>

            </Form>
        </div>
    )
}

export default UserLoginForm
