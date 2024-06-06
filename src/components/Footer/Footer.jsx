import './Footer.css';
import { Container, Row, Col } from 'react-bootstrap';
import { FaEnvelope, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="Footer font-family">
            <Container>
                <Row className="title-section">
                    <h5>WAVE JET🛩️</h5>
                </Row>
                <Row>
                    <Col xs={12} md={4}>
                        <div className="footer-section">
                            <h5>Contact Us</h5>
                            <p>
                                <a href="mailto:info@wavejet.com">
                                    <FaEnvelope /> info@wavejet.com
                                </a>
                            </p>
                            <p>+1 (555) 555-5555</p>
                        </div>
                    </Col>
                    <Col xs={12} md={4}>
                        <div className="footer-section">
                            <h5>Follow Us</h5>
                            <ul className="social-icons">
                                <li>
                                    <a href="https://github.com/" target="_blank" rel="noreferrer">
                                        <FaGithub />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                                        <FaLinkedinIn />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col xs={12} md={4}>
                        <div className="footer-section">
                            <h5>Work with Us</h5>
                            <p>
                                <Link to="/careers">Explore Careers</Link>
                            </p>
                            <p>
                                <a href="mailto:careers@wavejet.com">
                                    <FaEnvelope /> careers@wavejet.com
                                </a>
                            </p>
                        </div>
                    </Col>
                </Row>
                <div className="copyright">
                    <p>&copy; All rights reserved {new Date().getFullYear()}</p>
                </div>
            </Container>
        </div>
    );
}

export default Footer;
