// import { useContext, useEffect, useState } from "react"
// import FlightsList from "../../../components/Flights/FlightsList/FlightsList"
// import FlightServices from "../../../services/flight.services"
// import { AuthContext } from "../../../contexts/auth.context"
// import { Link } from 'react-router-dom'
// import { Container } from "react-bootstrap"
// import Loader from "../../../components/Loader/Loader"
// import authServices from "../../../services/auth.services"



// const UsersPage = () => {

//     const [users, setUsers] = useState([])
//     const [isLoading, setIsLoading] = useState(true)

//     const { loggedUser } = useContext(AuthContext)

//     useEffect(() => {
//         loadUsers()
//     }, [])

//     const loadUsers = () => {

//         authServices
//             .getAllUsers()
//             .then(({ data }) => {
//                 setUsers(data)
//                 setIsLoading(false)
//             })
//             .catch(err => console.log(err))
//     }

//     return (

//         <div className="FlightsPage">
//             <Container>

//                 <p>Our Summer Routes</p>

//                 {
//                     isLoading ? <Loader /> : <FlightsList flights={flights} />
//                 }

//                 {
//                     loggedUser && <Link className="btn btn-sm btn-dark" to={'/flights/add'}>New Route</Link>
//                 }
//                 <hr />

//             </Container>
//         </div>


//     )
// }

// export default UsersPage