import axios from 'axios'

class UploadServices {

    constructor() {

        this.api = axios.create({
            // baseURL: `${import.meta.env.VITE_API_URL}/upload`
            baseURL: `${process.env.REACT_APP_API_URL}/upload`
        })
    }

    uploadimage(imageForm) {
        return this.api.post('/image', imageForm)
    }
}

const uploadServices = new UploadServices()

export default uploadServices