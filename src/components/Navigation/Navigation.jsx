import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import { AuthContext } from '../../contexts/auth.context';
import navbarlogo from './../../../public/assets/icons/navbarlogo.svg';
import { FaLinkedin, FaTiktok } from 'react-icons/fa';
import './Navigation.css';

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
        <Navbar className={`Navbar font-family ${scrolled ? 'navbar-scrolled' : ''}`} expand="lg" sticky="top">
            <Container fluid>
                <Navbar.Brand className="navbar-brand mx-3" as={Link} to="/">
                    <img src={navbarlogo} alt="wavejetlogo" className="navbar-logo" />
                    Wave Jet
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto nav-links">
                        <Link to="/fleet" className="nav-link">Fleet</Link>
                        <Link to="/about" className="nav-link">Meet the team</Link>
                    </Nav>
                    <Nav className="nav-link">
                        {loggedUser ? (
                            <NavDropdown title={`Welcome, ${loggedUser.username}`} id="navbarScrollingDropdown">
                                {loggedUser.role === "Admin" ? (
                                    <>
                                        <NavDropdown.Item as={Link} to="/profile">My Profile</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/dashboard">Dashboard</NavDropdown.Item>
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
                                <NavDropdown.Item onClick={logout}>Log Out</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <>
                                <Link to="/signup" className="nav-link">Sign Up</Link>
                                <Link to="/login" className="nav-link">Log In</Link>
                            </>
                        )}
                        <FaLinkedin className="social-icon" />
                        <FaTiktok className="social-icon" />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
