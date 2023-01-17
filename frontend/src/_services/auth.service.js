import Axios from "./api.service";

let saveToken = (token) => {
    localStorage.setItem('token', token);
}

let register = (credentials) => {
    return Axios.post('/api/users/register', credentials)
}

let login = (credentials) => {
    return Axios.post('/api/users/login', credentials)
}

let logout = () => {
    localStorage.removeItem('token');
}

let isLogged = () => {
    let token = localStorage.getItem('token');
    return !!token;
}

const getToken = () => {
    return localStorage.getItem('token');
}

export const authService = {
    saveToken, logout, isLogged, getToken, login, register
}