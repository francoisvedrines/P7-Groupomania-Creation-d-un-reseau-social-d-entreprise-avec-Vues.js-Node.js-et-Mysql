import Axios from './callerService'

/************************************************* */
/************** Requêtes d'identification********* */


//requête post pur se connecter
const login = (credentials) => {
    return Axios.post('/auth/login' , credentials)
}

//requête post pour s'inscrire
const signup = (data) => {
    return Axios.post('/auth/signup' , data)
}

// function suppression du token dans le local storage lors de la déconnexion
const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('vuex')
    localStorage.removeItem('_secure__ls__metadata')
}

//function de stokage d'un token dans le local storage
const saveToken = (token) => {
    localStorage.setItem('token', token)
}
//fonction de récupération du token présent dans le local storage
const getToken = () => {
    return localStorage.getItem('token')
}
//function de vérification si l'utilisateur est connecté. Recherche du token, retourne en réponse un booléen
const isLogged = () => {
    return !!localStorage.getItem('token')
}


export const accountService = {
    login,
    signup,
    logout,
    saveToken,
    getToken,
    isLogged
}