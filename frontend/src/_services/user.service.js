import Axios from './api.service'

let getAllUsers = () => {
    return Axios.get('/api/users/all-users')
}

let getUser = (token) => {
    return Axios.get('/api/users/' + token, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
}

let updateUser = (user) => {
    return Axios.patch('/api/users/:' + user.id, user)
}


let deleteUser = (user) => {
    return Axios.delete('/api/users/:' + user._id)
}

export const userService = {
    getAllUsers, getUser, updateUser, deleteUser
}