import axios from 'axios'
import { accountService } from '@/services'
import router from '@/router/router.js'

//création de l'instance Axios avec définition de l'url de base
const Axios = axios.create({
    baseURL: 'http://localhost:3000/api'
  
})


//interception de toute les requêtes pour contrôler la présence d'un token
Axios.interceptors.request.use(request => {
    // vérification si utilistateur connecté, si oui on insère le token dans l'entête
    const token = accountService.getToken()
    if (accountService.isLogged()) {
        request.headers.Authorization = `Bearer ${token}`
    }
    return request
})

//interception de toute les requêtes pour contrôler si le token est périmé
Axios.interceptors.response.use(response => {
    return response
}, error => {
 if(error.response.status === 401){
    accountService.logout()
    router.push('login')
 }
})

export default Axios