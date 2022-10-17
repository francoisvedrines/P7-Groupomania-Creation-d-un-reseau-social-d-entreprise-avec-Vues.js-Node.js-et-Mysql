import Axios from './callerService'


/************************************************* */
/************** Requêtes des posts *************** */


//requête pour obtenir tout les posts sur la page d'accueil
const getAllPosts = () => {
    return Axios.get('/posts')
}

const createPost = (post) => {
    return Axios.post('/posts', post)
}
const deletePost = () => {
    return Axios.delete('/post')
}

const getComments = (id) => {
    return Axios.get(`/comments/${id}`)
} 
const createComment = (feedback, id) => {
    return Axios.post(`/comments/${id}`, feedback)
}


export const postService = {
    getAllPosts,
    createPost,
    deletePost,
    getComments,
    createComment
}