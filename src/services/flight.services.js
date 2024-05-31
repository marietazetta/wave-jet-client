import axios from 'axios'

class FlightServices {

    constructor() {

        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/flights`
        })
    }

    getAllFlights() {
        return this.axiosApp.get('/')
    }

    getOneFlight(flightId) {
        return this.axiosApp.get(`/${flightId}`)
    }

    saveFlight(flightData) {
        return this.axiosApp.post('/', flightData)
    }

    editFlight(flightId, flightData) {
        return this.axiosApp.put(`/${flightId}`, flightData)
    }

    deleteFlight(flightId) {
        return this.axiosApp.delete(`/${flightId}`)
    }
}

const flightServices = new FlightServices()

export default flightServices