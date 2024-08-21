import { Link } from "react-router-dom"
import { FaPlaneArrival } from "react-icons/fa"


const CancelPaymentsPage = () => {
    return (
        <div className="error-page">
            <div className="content-container">
                <div className="content">
                    <div className="error-code"></div>
                    <h1 className="error-message">
                        Payment Cancelled!
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

export default CancelPaymentsPage
