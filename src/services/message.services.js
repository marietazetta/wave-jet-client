import axios from 'axios';

class MessageServices {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/messages`
        });

        this.axiosApp.interceptors.request.use(config => {
            const storedToken = localStorage.getItem('authToken');
            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` };
            }
            return config;
        });
    }

    getAllMessages() {
        return this.axiosApp.get('/');
    }

    saveMessage(messageData) {
        return this.axiosApp.post('/', messageData);
    }
}

const messageServices = new MessageServices();
export default messageServices;
