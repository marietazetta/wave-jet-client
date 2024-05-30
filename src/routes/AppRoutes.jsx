import HomePage from "../pages/HomePage/HomePage"
import AircraftsPage from "../pages/Aircrafts/AircraftsPage/AircraftsPage"
import AircraftDetailsPage from "../pages/Aircrafts/AircraftDetailsPage/AircraftDetailsPage"
import FlightsPage from "../pages/Flights/FlightsPage/FlightsPage"
import FlightDetailsPage from "../pages/Flights/FlightDetailsPage/FlightDetailsPage"
import AddFlightFormPage from "../pages/Flights/AddFlightFormPage/AddFlightFormPage"
import EditAircraftFormPage from "../pages/Aircrafts/EditAircraftFormPage/EditAircraftFormPage"
import AddAircraftFormPage from "../pages/Aircrafts/AddAircraftFormPage/AddAircraftFormPage"
import EditFlightFormPage from "../pages/Flights/EditFlightFormPage/EditFlightFormPage"
import AboutPage from "../pages/AboutPage/AboutPage"
import SignupPage from "../pages/Users/SignUpPage/SignUpPage"
import LoginPage from "../pages/Users/LoginPage/LoginPage"
import ProfilePage from "../pages/ProfilePage/ProfilePage"
import PrivateRoute from "./PrivateRoute"
import { Route, Routes } from "react-router-dom"




const Approutes = () => {



    return (

        <Routes>
            <Route path={'/'} element={<HomePage />} />
            <Route path={'/fleet'} element={<AircraftsPage />} />
            <Route path={'/fleet/:aircraftId'} element={<AircraftDetailsPage />} />

            {/* ADMIN RIGHTS */}

            <Route path={'/routes'} element={<FlightsPage />} />
            <Route path={'/routes/:flightId'} element={<FlightDetailsPage />} />
            <Route path={'/routes/add'} element={<AddFlightFormPage />} />
            <Route path={'/fleet/edit/:aircraftId'} element={<EditAircraftFormPage />} />
            <Route path={'/fleet/add'} element={<AddAircraftFormPage />} />
            <Route path={'/routes/edit/:flightId'} element={<EditFlightFormPage />} />

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