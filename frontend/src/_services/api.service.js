import axios from 'axios'
import {authService} from './auth.service'

const Axios = axios.create({
    baseURL: "http://localhost:3001"
});

Axios.interceptors.request.use(request => {
    if (authService.isLogged()) {
        request.headers.Authorization = 'Bearer ' + authService.getToken()
    }
    return request
})

// Intercepteur de réponse API pour vérification de la session
Axios.interceptors.response.use(response => {
    return response
}, error => {
    if (error.response.status === 400) {
        authService.logout()
        window.location = '/connexion/login'
    } else {
        return Promise.reject(error)
    }
})

export default Axios