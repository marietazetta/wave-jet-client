import { Link } from "react-router-dom";
import "./Navigation.css";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../contexts/auth.context";
import linkedin from "./../../../public/assets/icons/linkedin.svg";
import twitter from "./../../../public/assets/icons/twitter.svg";
import navbarlogo from "./../../../public/assets/icons/navbarlogo.svg";

const Navigation = () => {
    const { loggedUser, logout } = useContext(AuthContext);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Navbar className={`Navbar font-family ${scrolled ? 'navbar-scrolled' : ''}`} expand="lg" sticky='top'>
            <Container fluid>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/fleet" className="nav-link">Fleet</Link>
                        <Link to="/signup" className="nav-link">Become a member</Link>
                    </Nav>

                    <Navbar.Brand className="mx-auto" as={Link} to="/">
                        <img src={navbarlogo} alt="wavejetlogo" style={{ width: "30px" }} />
                        Wave Jet
                    </Navbar.Brand>

                    <Nav className="ms-auto" style={{ gap: '0.5rem', alignItems: 'center' }}>
                        {loggedUser ? (
                            <>
                                <NavDropdown title={`Welcome, ${loggedUser.username}`} id="navbarScrollingDropdown">
                                    {loggedUser.role === "Admin" ? (
                                        <>
                                            <NavDropdown.Item as={Link} to="/routes">Routes</NavDropdown.Item>

                                            <NavDropdown.Item as={Link} to="/fleet/add">Add Aircraft</NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to="/routes/add">Add New Route</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                        </>
                                    ) : (
                                        <>
                                            <NavDropdown.Item as={Link} to="/profile">My Profile</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                        </>
                                    )}
                                    <NavDropdown.Item onClick={logout}>
                                        Log Out
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : (
                            <>
                                <Link to="/signup" className="nav-link">Sign Up</Link>
                                <Link to="/login" className="nav-link">Log In</Link>
                            </>
                        )}
                        <img src={twitter} alt='twitter' className="icon" />
                        <img src={linkedin} alt='linkedin' className="icon" />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
