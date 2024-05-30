import './Footer.css'
import { Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'



const Footer = () => {

    return (
        <div className="Footer">

            <Container >

                <Link to={'/'} className='footer-link'><h6>WAVE JET 🛩️</h6></Link>
                <p>&copy; All rights reserved</p>

            </Container>

        </div>
    )
}

export default Footer