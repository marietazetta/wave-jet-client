import { useContext } from "react"
import { Outlet, Navigate } from "react-router-dom"
import Loader from "../components/Loader/Loader"
import { AuthContext } from "../contexts/auth.context"

const PrivateRoute = ({ onlyAdmin }) => {

    const { loggedUser, isLoading } = useContext(AuthContext)

    if (isLoading) {
        return <Loader />
    }

    if (loggedUser.role != 'Admin' && onlyAdmin === true) {

    }

    if (!loggedUser) {
        return <Navigate to="/login" />
    }

    return <Outlet />
}

export default PrivateRoutede