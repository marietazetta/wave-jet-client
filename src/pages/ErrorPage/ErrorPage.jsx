import { Link } from "react-router-dom"
import { FaPlaneArrival } from "react-icons/fa"
import "./ErrorPage.css"


const ErrorPage = () => {
    return (
        <div className="error-page">
            <div className="content-container">
                <div className="content">
                    <div className="error-code">404</div>
                    <h1 className="error-message">
                        Oops, looks like you've hit some turbulence!
                    </h1>
                    <FaPlaneArrival className="plane-icon" />

                    <Link
                        to={`/`}
                        className="back-link"
                    >
                        Back to Hangar
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage
