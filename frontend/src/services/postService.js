import Axios from './callerService'


/************************************************* */
/************** Requêtes des posts *************** */


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

const likedPost = (id) => {
    return Axios.post(`/likes/${id}`)
}


export const postService = {
    getAllPosts,
    createPost,
    deletePost,
    getComments,
    createComment,
    likedPost
}