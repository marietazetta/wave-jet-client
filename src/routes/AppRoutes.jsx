import HomePage from "../Pages/HomePage/HomePage"
import AircraftsPage from "../Pages/Aircrafts/AircraftsPage/AircraftsPage"
import AircraftDetailsPage from "../Pages/Aircrafts/AircraftDetailsPage/AircraftDetailsPage"
import FlightsPage from "../Pages/Flights/FlightsPage/FlightsPage"
import FlightDetailsPage from "../Pages/Flights/FlightDetailsPage/FlightDetailsPage"
import EditAircraftFormPage from "../Pages/Aircrafts/EditAircraftFormPage/EditAircraftFormPage"
import EditFlightFormPage from "../Pages/Flights/EditFlightFormPage/EditFlightFormPage"
import AboutPage from "../Pages/AboutPage/AboutPage"
import SignupPage from "../Pages/Users/SignUpPage/SignUpPage"
import LoginPage from "../Pages/Users/LoginPage/LoginPage"
import ProfilePage from "../Pages/ProfilePage/ProfilePage"
import PrivateRoute from "./PrivateRoute"
import { Route, Routes } from "react-router-dom"



const Approutes = () => {



    return (

        <Routes>
            <Route path={'/'} element={<HomePage />} />
            <Route path={'/fleet'} element={< AircraftsPage />} />
            <Route path={'/fleet/:aircraftId'} element={< AircraftDetailsPage />} />

            {/* ADMIN RIGHTS */}
            <Route path={'/flights'} element={< FlightsPage />} />
            <Route path={'/flights/:flightId'} element={< FlightDetailsPage />} />
            <Route path={'/fleet/edit/:aircraftId'} element={< EditAircraftFormPage />} />
            <Route path={'/flights/edit/:flighttId'} element={< EditFlightFormPage />} />


            <Route path={'/about'} element={<AboutPage />} />
            <Route path={'/signup'} element={<SignupPage />} />
            <Route path={'/login'} element={<LoginPage />} />

            <Route element={<PrivateRoute />}>
                <Route path={'/profile'} element={<ProfilePage />} />
            </Route>


            <Route path={'*'} element={<p>EL ERROR</p>} />
        </Routes>
    )

}
export default Approutes