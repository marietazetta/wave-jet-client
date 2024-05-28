import { useContext } from "react"
import { AuthContext } from '../../contexts/auth.context'


const ProfilePage = () => {
    const { user } = useContext(AuthContext)

    return (
        <h1>Profile, {user.username}</h1>

    )
}

export default ProfilePage