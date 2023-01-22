import Axios from './api.service'

let create = async (postDetail) => {
    return await Axios.post("/api/posts/create", postDetail);
}

let getById = async (_id) => {
    return await Axios.get("/api/posts/" + _id);
}

let userPosts = async (username) => {
    return await Axios.get("/api/posts/byusername/" + username);
}

let postComments = async (_id) => {
    return await Axios.get("/api/posts/comments/" + _id);
}

let postLikes = async (_id) => {
    return await Axios.get("/api/posts/likes/" + _id);
}

let updatePost = async (_id, postDetail) => {
    return await Axios.patch("/api/posts/" + _id, postDetail);
}

let addComment = async (postId, commentId) => {
    return await Axios.post("/api/posts/comment/" + postId, {commentId});
}

let addLike = async (postId, uid) => {
    return await Axios.post("/api/posts/like/" + postId, {uid});
}

let deletePost = async (_id) => {
    return await Axios.delete("/api/posts/" + _id);
}

let deleteCommentFromPost = async (postId, commentId) => {
    return await Axios.post("/api/posts/delete-comment/" + postId, commentId);
}

let deleteLikeFromPost = async (postId, uid) => {
    return await Axios.post("/api/posts/delete-like/" + postId, {uid});
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