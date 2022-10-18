import Axios from './callerService'


/************************************************* */
/************** Requêtes des posts *************** */


const getAllPosts = () => {
    return Axios.get('/posts')
}
const createPost = (post) => {
    return Axios.post('/posts', post)
}
const updatePost = (post, id) => {
    return Axios.put(`/auth/profile/${id}`, post)
}
const deletePost = (id) => {
    return Axios.delete(`/posts/${id}`)
}


const getComments = (id) => {
    return Axios.get(`/comments/${id}`)
} 
const createComment = (feedback, id) => {
    return Axios.post(`/comments/${id}`, feedback)
}
const updateComment = (feedback, id) => {
    return Axios.put(`/auth/profile/${id}`, feedback)
}
const deleteComment = (id) => {
    return Axios.delete(`/comments/${id}`)
}


const likedPost = (id) => {
    return Axios.post(`/likes/${id}`)
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
    likedPost
}