import axios from 'axios'

class BookingServices {

    constructor() {

        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/bookings`
        })

        this.axiosApp.interceptors.request.use(config => {

            const storedToken = localStorage.getItem('authToken');

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` };
            }

            return config
        })
    }

    getAllBookings() {
        return this.axiosApp.get('/')
    }

    getOneBooking(bookingId) {
        return this.axiosApp.get(`/${bookingId}`)
    }

    saveBooking(bookingData) {
        return this.axiosApp.post('/', bookingData)
    }

    editBooking(bookingId, bookingData) {
        return this.axiosApp.put(`/${bookingId}`, bookingData)
    }

    deleteBooking(bookingId) {
        return this.axiosApp.delete(`/${bookingId}`)
    }

    getBookingsByOwner(ownerId) {
        return this.axiosApp.get(`/owner/${ownerId}`)
    }
}

const bookingServices = new BookingServices()

export default bookingServices
