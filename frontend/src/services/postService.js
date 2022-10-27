import Axios from './callerService'


/************************************************* */
/************** Requêtes des posts *************** */

//CRUD des posts
const getAllPosts = () => {
    return Axios.get('/posts')
}
const createPost = (post) => {
    return Axios.post('/posts', post)
}
const updatePost = (post, id) => {
    return Axios.put(`/posts/${id}`, post)
}
const deletePost = (id) => {
    return Axios.delete(`/posts/${id}`)
}

//CRUD des commentaires
const getComments = (id) => {
    return Axios.get(`/comments/${id}`)
} 
const createComment = (comment, id) => {
    return Axios.post(`/comments/${id}`, comment)
}
const updateComment = (comment, id) => {
    return Axios.put(`/comments/${id}`, comment)
}
const deleteComment = (id) => {
    return Axios.delete(`/comments/${id}`)
}

// creation du like et dislike
const likedPost = (id) => {
    return Axios.post(`/likes/${id}`)
}
//voir la liste de tout les likes d'un post
const listLikes = (id) => {
    return Axios.get(`/likes/${id}`)
}


export const postService = {
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
    getComments,
    createComment,
    updateComment,
    deleteComment,
    likedPost,
    listLikes
}