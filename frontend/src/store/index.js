import { createStore } from 'vuex'
//importation du module pour la persistance de vuex pendant les rechargements
import createPersistedState from "vuex-persistedstate"
//import de secureLS pour crypter les données dans le localstorage
import SecureLS from 'secure-ls'
const ls = new SecureLS({ isCompression: false })
//import des service axios pour les requêtes http
import { postService, userService } from '@/services'


export default createStore({
    state: {
        userId: "",
        admin: "",
        user: {},
        posts: [],
        comments: [],
    },
    getters: {
        //données de connexion utilisateur
        userId(state) {
            return state.userId
        },
        admin(state) {
            return state.admin
        },
        user(state) {
            return state.user
        },
        // données db posts
        posts(state) {
            return state.posts
        },
        comments(state) {
            return state.comments
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
        GET_USER_BY_ID(state, user) {
            state.user = user
        },

        //données db posts
        GET_POSTS(state, posts) {
            state.posts = posts
        },
        GET_COMMENTS(state, comments) {
            state.comments = comments
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

        getComments({ commit }, postId) {
            postService.getComments(postId)
                .then((res) => {
                    const comments = res.data
                    commit("GET_COMMENTS", comments)
                })
        },
    },

    // persistance de la connexion en stockant dans les infos utlisateur de façon crypté le local storage
    plugins: [createPersistedState({
        paths: ['userId', 'user', 'admin'],
        storage: {
            key: 'secure_store',
            getItem: (key) => ls.get(key),
            setItem: (key, value) => ls.set(key, value),
            removeItem: (key) => ls.remove(key),
        }
    })
    ]
})

