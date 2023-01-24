import Axios from './api.service'

let create = (postDetail) => {
    return Axios.post("/api/posts/create", postDetail);
}

let allPosts = () => {
    return Axios.get('/api/posts/get/all-posts');
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
    return Axios.post("/api/posts/comment/" + postId, {commentId});
}

let addLike = (postId, uid) => {
    return Axios.post("/api/posts/like/" + postId, {uid});
}

let deletePost = (_id) => {
    return Axios.delete("/api/posts/" + _id);
}

let deleteCommentFromPost = (postId, commentId) => {
    return Axios.post("/api/posts/delete-comment/" + postId, commentId);
}

let deleteLikeFromPost = (postId, uid) => {
    return Axios.post("/api/posts/delete-like/" + postId, {uid});
}

export const postService = {
    allPosts,
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