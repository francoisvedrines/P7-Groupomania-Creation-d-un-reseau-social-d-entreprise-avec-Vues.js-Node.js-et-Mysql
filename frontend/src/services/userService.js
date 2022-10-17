import Axios from './callerService'


/************************************************* */
/*********** Requêtes utilisateurs *************** */


//requête pour obtenir tout les utilisitateurs
const getAllUsers = () => {
    return Axios.get('/auth/profile')
}

const getUserById = (id) => {
    return Axios.get('/auth/profile/' + id)
}

export const userService = {
    getAllUsers,
    getUserById
}