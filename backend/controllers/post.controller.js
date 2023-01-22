const postModel = require('../models/post.model');

//********************** CREATE **********************************************//

module.exports.create = async (req, res) => {
    const {image_url, author, description} = req.body;

    await postModel.create({image_url, author, description})
        .then(response => res.status(201).json(response))
        .catch(err => res.status(400).json({err}))
}

//********************** READ ************************************************//

module.exports.postDetail = async (req, res) => {
    const {_id} = req.params;

    await postModel.findById({_id})
        .then(response => res.status(201).json(response))
        .catch(err => res.status(400).json({err}))
}

//Renvoie tous les posts d'un utilisateur
module.exports.postsByUsername = async (req, res) => {
    const {username} = req.params;

    postModel.find({author: username})
        .then(response => res.status(201).json(response))
        .catch(err => res.status(400).json({err}))
}

//Renvoie les commentaires d'un post
module.exports.postComments = async (req, res) => {
    const {_id} = req.params;

    await postModel.findById({_id})
        .then(response => res.status(201).json(response))
        .catch(err => res.status(400).json({err}))
}

//Renvoie les likes d'un post
module.exports.postLikes = async (req, res) => {
    const {_id} = req.params;

    await postModel.findById({_id})
        .then(response => res.status(201).json(response))
        .catch(err => res.status(400).json({err}))
}

//********************** UPDATE **********************************************//

module.exports.update = async (req, res) => {
    const {_id, username} = req.params;
    const {image_url, description, author} = req.body;

    if (username !== req.session.username) res.status(400).send("Impossible de modifier")

    await postModel.findByIdAndUpdate(
        {_id},
        {image_url, description, author},
        {new: true}
    ).then(response => res.status(201).json(response))
        .catch(err => res.status(400).json({err}))
}

module.exports.addComment = async (req, res) => {
    const {_id} = req.params;
    const {comment_id} = req.body;

    await postModel.findByIdAndUpdate(
        {_id},
        {$addToSet: {comments: comment_id}},
        {new: true}
    )
        .then(response => res.status(201).json(response))
        .catch(err => res.status(400).json({err}))
}

module.exports.addLike = async (req, res) => {
    const {_id} = req.params;
    const {uid} = req.body;

    await postModel.findByIdAndUpdate(
        {_id},
        {$addToSet: {likes: uid}},
        {new: true}
    ).then(response => res.status(201).json(response))
        .catch(err => res.status(400).json({err}))
}

//********************** DELETE **********************************************//

module.exports.delete = async (req, res) => {
    const {_id, username} = req.params;

    if (username !== req.session.username) res.status(400).send("Impossible de supprimer")

    await postModel.findByIdAndDelete(_id)
        .then(response => res.status(201).json(response))
        .catch(err => res.status(400).json({err}))
}

module.exports.deleteComment = async (req, res) => {
    const {_id} = req.params;
    const {comment_id} = req.body;

    await postModel.findByIdAndUpdate(
        {_id},
        {$pull: {comments: comment_id}},
        {new: true}
    )
        .then(response => res.status(201).json(response))
        .catch(err => res.status(400).json({err}))
}

module.exports.deleteLike = async (req, res) => {
    const {_id} = req.params;
    const {uid} = req.body;

    console.log(req.body)

    await postModel.findByIdAndUpdate(
        {_id},
        {$pull: {likes: uid}},
        {new: true}
    )
        .then(response => res.status(201).json(response))
        .catch(err => res.status(400).json({err}))
}