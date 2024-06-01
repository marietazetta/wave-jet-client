import { Link } from "react-router-dom"
import "./Navigation.css"
import { Nav, Navbar, Container, Offcanvas, NavDropdown, Form, Button } from "react-bootstrap"
import { useContext } from 'react'
import { AuthContext } from "../../contexts/auth.context"

const Navigation = () => {

    const { loggedUser, logout } = useContext(AuthContext)

    return (
        <>
            {[false].map((expand) => (
                <Navbar key={expand} expand={expand} className="Navbar">
                    <Container>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />

                        <Link to="/fleet">
                            <Nav.Link href="/fleet" as="span">Fleet</Nav.Link>
                        </Link>
                        <Link to="/routes">
                            <Nav.Link href="/routes" as="span">Routes</Nav.Link>
                        </Link>

                        <Navbar.Brand className="logo" as={Link} to="/">
                            <img src="https://res.cloudinary.com/dzncdwx7u/image/upload/v1717236317/logoaircraft_bdmr4y.png"
                                style={{ width: "80px" }} />
                        </Navbar.Brand>

                        {
                            loggedUser ?
                                <>
                                    <Navbar.Text>Welcome, {loggedUser.username}!</Navbar.Text>
                                    <span onClick={logout} className='nav-link'>Cerrar sesión</span>
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

                        {/* <Navbar.Brand href="/">WAVE JET</Navbar.Brand> */}
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="start"
                            className="custom-offcanvas"
                        >
                            <Offcanvas.Header closeButton className="header-body">
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    WAVE JET
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body className="canvas-body">
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Nav.Link href="/fleet">Fleet</Nav.Link>
                                    <Nav.Link href="/about">About</Nav.Link>
                                    <NavDropdown
                                        title="Profile"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    >
                                        <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                                        <NavDropdown.Item href="#action4">
                                            Log Out
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action5">
                                            Something else here
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                                <Form className="d-flex">
                                    <Form.Control
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                    />
                                    <Button className="custom-color-button" variant="outline-success">Search</Button>
                                </Form>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    )
}

export default Navigation