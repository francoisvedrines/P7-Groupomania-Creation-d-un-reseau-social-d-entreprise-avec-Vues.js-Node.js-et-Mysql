import { createStore } from 'vuex'
//importation du module pour la persistance de vuex pendant les rechargements
import createPersistedState from "vuex-persistedstate"
//import des service axios pour les requêtes http
import { postService, userService } from '@/services'


export default createStore({
    state: {
        //données de connexion utilisateur
        userId: "",
        admin: "",
        // données db utilisateurs
        user: {},
        users: [],
        // données db posts
        posts: [],


    },
    getters: {
        //données de connexion utilisateur
        userId(state) {
            return state.userId
        },
        admin(state) {
            return state.admin
        },
        // données db utilisateurs
        users(state) {
            return state.users
        },
        user(state) {
            return state.user
        },
        // données db posts
        posts(state) {
            return state.posts
        },
        

       
    },
    mutations: {
        //données de connexion utilisateur
        SET_USER(state, userId) {
            state.userId = userId
        },
        SET_ADMIN(state, admin) {
            state.admin = admin
        },
        //données db utilisateurs
        GET_USERS(state, users) {
            state.users = users
        },
        GET_USER_BY_ID(state, user) {
            state.user = user
        },

        //données db posts
        GET_POSTS(state, posts) {
            state.posts = posts
        },
       
    
    },
    actions: {
        //données connexion utilisateur
        setUserId({ commit }, userId) {
            commit("SET_USER", userId)
        },
        setIsAdmin({ commit }, admin) {
            commit("SET_ADMIN", admin)
        },
        //données db utilisateurs
        getUsers({ commit }) {
            userService.getUsers()
                .then((res) => {
                    const users = res.data
                    commit("GET_USERS", users)
                })
        },
        getUserById({ commit }) {
            const id = this.state.userId
            userService.getUserById(id)
                .then((res) => {
                    const user = res.data[0]
                    commit("GET_USER_BY_ID", user)
                })
        },
        //données db Posts
        getAllPosts({ commit }) {
            postService.getAllPosts()
                .then((res) => {
                    const posts = res.data
                    commit("GET_POSTS", posts)
                })
        },

       
    },

    // stockage des données de le session storage
    plugins: [createPersistedState({
        storage: window.sessionStorage,
        paths: ['userId', 'admin', 'user']
    })
    ],
})

