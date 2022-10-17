//importation des pages pour router
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
import Profile from '@/views/profile.vue'

import { createRouter, createWebHistory } from 'vue-router'

//définiton des liens de routage
const routes = [
    { path: '/login', component: Login },
    { path: '/', component: Home },
    //route profile contenant un regex chiffre uniquement sur l'id et usage de props
    { path: '/profile/:id', component: Profile},
    //route pour rediriger vers la page d'accueil si url n'existe pas
    { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

//fonction router guard pour renvoyer sur la page login si l'utilisateur n'est pas connecté
router.beforeEach((to, from) => {
    const loginView = "/login"
    // si l'user est sur unne autre page que login et qu'il n'est pas identifié, alors affichage de la page login
    if (to.path !== loginView && localStorage.getItem("token") === null) {
        router.push("/login")
    }
})



export default router 