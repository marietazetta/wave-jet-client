import { useContext } from "react"
import { Outlet, Navigate } from "react-router-dom"
import Loader from "../components/Loader/Loader"
import { AuthContext } from "../contexts/auth.context"

const PrivateRoute = ({ onlyAdmin }) => {

    const { loggedUser, isLoading } = useContext(AuthContext)

    if (isLoading) {
        return <Loader />
    }

    if (!loggedUser) {
        return <Navigate to="/login" />
    }


    if (loggedUser.role != 'Admin' && onlyAdmin === true) {
        return <Navigate to="/404" />

    }


    return <Outlet />
}

export default PrivateRoute