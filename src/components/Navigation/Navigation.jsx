import { Link } from "react-router-dom"
import "./Navigation.css"
import { Nav, Navbar, Container, Offcanvas, NavDropdown, Form, Button } from "react-bootstrap"
import { useContext } from 'react'
import { AuthContext } from "../../contexts/auth.context"
import linkedin from "./../../../public/assets/icons/linkedin.svg"
import twitter from "./../../../public/assets/icons/twitter.svg"
import navbarlogo from "./../../../public/assets/icons/navbarlogo.svg"


const Navigation = () => {

    const { loggedUser, logout } = useContext(AuthContext)

    return (
        <>

            < Navbar className="Navbar font-family" expand="lg" sticky='top' >
                <Container className="justify-content-between">

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Nav style={{ justifyContent: 'start' }}>
                        <Nav.Link href="/fleet">Fleet</Nav.Link>
                    </Nav>

                    <Nav >
                        <img src={navbarlogo} alt="wavejetlogo"></img>
                        <Navbar.Brand href="/" > Wave Jet</Navbar.Brand>
                    </Nav>




                    {
                        loggedUser ?
                            <>
                                <NavDropdown.Item>Welcome, {loggedUser.username}!</NavDropdown.Item>
                                <NavDropdown title="Profile" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>

                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/">
                                        <span onClick={logout} className='nav-link'>Log Out</span>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                            :
                            <>
                                <Link to="/signup">
                                    <Nav.Link href="/signup" as="span">Sign Up</Nav.Link>
                                </Link>
                                <Link to="/login">
                                    <Nav.Link href="/login" as="span">Log In</Nav.Link>
                                </Link>
                            </>
                    }



                    <Nav style={{ gap: '0.5rem', alignItems: 'center' }}>
                        <img src={twitter} alt='twitter'></img>
                        <img src={linkedin} alt='linkedin'></img>
                    </Nav>


                </Container>
            </Navbar >

        </>
    )
}

export default Navigation