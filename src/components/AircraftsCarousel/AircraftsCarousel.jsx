import { Carousel, Col } from "react-bootstrap"
import Loader from "../../components/Loader/Loader"


const AircraftCarousel = ({ _id, images, model }) => {


    return (



        !images ?
            <Loader />
            :

            <Col>
                <h1>{model}</h1>
                <Carousel>
                    {images.map((image, index) => (
                        <Carousel.Item key={index}>
                            <Link to={`/fleet/${_id}`}>
                                <img
                                    className="d-block w-100 rounded equal-aspect-ratio"
                                    src={image}
                                    alt={`Slide ${index}`}
                                />
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Col>
    )

}

export default AircraftCarousel

