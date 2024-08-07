import axios from 'axios';

class AuthServices {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/auth`
        });

        this.axiosApp.interceptors.request.use(config => {
            const storedToken = localStorage.getItem('authToken');
            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` };
            }
            return config;
        });
    }

    getAllUsers() {
        return this.axiosApp.get('/');
    }

    signupUser(userData) {
        return this.axiosApp.post('/signup', userData);
    }

    loginUser(userData) {
        return this.axiosApp.post('/login', userData);
    }

    verifyUser() {
        return this.axiosApp.get('/verify');
    }

    updateUser(userId, userData) {
        return this.axiosApp.put(`/users/${userId}`, userData);
    }
}

const authServices = new AuthServices();
export default authServices;
