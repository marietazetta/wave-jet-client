import axios from 'axios'

class FlightServices {

    constructor() {

        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/flights`
        })

        this.axiosApp.interceptors.request.use(config => {

            const storedToken = localStorage.getItem('authToken');

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` };
            }

            return config
        })
    }

    getAllFlights() {
        return this.axiosApp.get('/')
    }

    getAllOrigins() {
        return this.axiosApp.get('/origin')
    }

    getAllDestinations() {
        return this.axiosApp.get('/destination')
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

    searchFlight(searchParams) {
        return this.axiosApp.get('/search',
            { params: searchParams }
        )
    }
}

const flightServices = new FlightServices()

export default flightServices