import { useEffect, useState } from "react"
import UsersList from "../../../components/Users/UsersList/UsersList"
import { Container } from "react-bootstrap"
import Loader from "../../../components/Loader/Loader"
import authServices from "../../../services/auth.services"

const UsersPage = () => {

    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = () => {

        authServices
            .getAllUsers()
            .then(({ data }) => {
                setUsers(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    return (

        <div className="users-page full-height font-family">
            <Container>


                {
                    isLoading ? <Loader /> : <UsersList users={users} />
                }

                <hr />

            </Container>
        </div>


    )
}

export default UsersPage