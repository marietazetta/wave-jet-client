import axios from 'axios'

class AircraftServices {

    constructor() {

        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/aircrafts`
        })

        this.axiosApp.interceptors.request.use(config => {

            const storedToken = localStorage.getItem('authToken');

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` };
            }

            return config
        })
    }

    getAllAircrafts() {
        return this.axiosApp.get('/')
    }

    getOneAircraft(aircraftId) {
        return this.axiosApp.get(`/${aircraftId}`)
    }

    saveAircraft(aircraftData) {
        return this.axiosApp.post('/', aircraftData)
    }

    editAircraft(aircraftId, aircraftData, servicesData) {
        return this.axiosApp.put(`/${aircraftId}`, aircraftData, servicesData)
    }

}

const aircraftServices = new AircraftServices()

export default aircraftServices