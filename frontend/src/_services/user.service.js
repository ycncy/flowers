import Axios from './api.service'

let getAllUsers = () => {
    return Axios.get('/api/users/all-users')
}

let getUserById = (_id) => {
    return Axios.get('/api/users/id/' + _id)
}

let getUserByToken = (token) => {
    return Axios.get('/api/users/token/' + token);
}

let getUserFollow = (username) => {
    return Axios.get('/api/users/follows/' + username);
}

let updateUser = (user) => {
    return Axios.patch('/api/users/' + user.id, user)
}


let deleteUser = (user) => {
    return Axios.delete('/api/users/' + user._id)
}

export const userService = {
    getAllUsers,
    getUserById,
    getUserFollow,
    getUserByToken,
    updateUser,
    deleteUser
}