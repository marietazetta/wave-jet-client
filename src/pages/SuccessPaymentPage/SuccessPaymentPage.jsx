import { Link } from "react-router-dom"
import { FaPlaneDeparture } from "react-icons/fa6";


const SuccessPaymentsPage = () => {
    return (
        <div className="error-page">
            <div className="content-container">
                <div className="content">
                    <div className="error-code"></div>
                    <h1 className="error-message">
                        Payment Accepted!
                    </h1>
                    <FaPlaneDeparture className="plane-icon" />

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

export default SuccessPaymentsPage
