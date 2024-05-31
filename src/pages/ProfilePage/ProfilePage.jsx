import { useContext } from "react"
import { AuthContext } from '../../contexts/auth.context'


const ProfilePage = () => {
    const { loggedUser } = useContext(AuthContext)

    return (
        <>
            <h1> Welcome, {loggedUser.username}</h1>

            <hr />

            <h2>My bookings</h2>
        </>
    )
}

export default ProfilePage