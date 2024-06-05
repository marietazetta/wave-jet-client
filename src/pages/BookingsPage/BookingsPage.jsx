import { useContext } from "react"
import { AuthContext } from '../../contexts/auth.context'


const BookingsPage = () => {
    const { loggedUser } = useContext(AuthContext)

    return (
        <>
            <div className="profile-page full-height font-family">
                <h1> Welcome, {loggedUser.username}</h1>

                <hr />

                <h2>My bookings</h2>
            </div>
        </>
    )
}

export default BookingsPage