import axios from 'axios'

class ProfileServices {

    constructor() {

        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/profile`
        })

        this.axiosApp.interceptors.request.use(config => {

            const storedToken = localStorage.getItem('authToken');

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` };
            }

            return config
        })
    }

    getAllProfiles() {
        return this.axiosApp.get('/')
    }

    getOneProfile(profileId) {
        return this.axiosApp.get(`/${profileId}`)
    }

    saveProfile(profileData) {
        return this.axiosApp.post('/', profileData)
    }

    editProfile(profileId, profileData) {
        return this.axiosApp.put(`/${profileId}`, profileData)
    }

    getProfileByOwner(ownerId) {
        return this.axiosApp.get(`/owner/${ownerId}`)
    }

}

const profileServices = new ProfileServices()

export default profileServices