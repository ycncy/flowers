import Axios from './api.service'

let create = (postDetail) => {
    return Axios.post("/api/posts/create", postDetail);
}

let getById = (_id) => {
    return Axios.get("/api/posts/" + _id);
}

let userPosts = (username) => {
    return Axios.get("/api/posts/byusername/" + username);
}

let postComments = (_id) => {
    return Axios.get("/api/posts/comments/" + _id);
}

let postLikes = (_id) => {
    return Axios.get("/api/posts/likes/" + _id);
}

let updatePost = (_id, postDetail) => {
    return Axios.patch("/api/posts/" + _id, postDetail);
}

let addComment = (postId, commentId) => {
    return Axios.post("/api/posts/comment/" + postId, commentId);
}

let addLike = (postId, likerId) => {
    return Axios.post("/api/posts/like/" + postId, likerId);
}

let deletePost = (_id) => {
    return Axios.delete("/api/posts/" + _id);
}

let deleteCommentFromPost = (postId, commentId) => {
    return Axios.delete("/api/posts/comment/" + postId, commentId);
}

let deleteLikeFromPost = (postId, likerId) => {
    return Axios.delete("/api/posts/comment/" + postId, likerId);
}

export const postService = {
    create,
    getById,
    userPosts,
    postComments,
    postLikes,
    updatePost,
    addComment,
    addLike,
    deletePost,
    deleteCommentFromPost,
    deleteLikeFromPost
}