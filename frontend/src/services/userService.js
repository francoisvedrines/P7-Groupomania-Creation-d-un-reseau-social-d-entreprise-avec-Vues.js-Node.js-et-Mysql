import Axios from './callerService'


/************************************************* */
/*********** Requêtes utilisateurs *************** */


//requête pour obtenir tout les utilisitateurs
const getAllUsers = () => {
    return Axios.get('/auth/profile')
}

const getUserById = (id) => {
    return Axios.get(`/auth/profile/${id}`)
}

const updateUser = (data, id) => {
    return Axios.put(`/auth/profile/${id}`, data)
}

const updatePassword = (password, id) => {
    return Axios.put(`/auth/password/${id}`, password)
}
export const userService = {
    getAllUsers,
    getUserById,
    updateUser,
    updatePassword
}