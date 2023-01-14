const postModel = require('../models/post.model');

//********************** CREATE **********************************************//

module.exports.create = async (req, res) => {
    const {image_url, author, description} = req.body;

    try {
        const post = await postModel.create({image_url, author, description});
        res.status(201).json({post: post._id});
    } catch (err) {
        res.status(400).send({err});
    }
}

//********************** READ ************************************************//

module.exports.postDetail = async (req, res) => {
    const {_id} = req.params;

    try {
        const post = await postModel.findById({_id});
        res.status(201).json({post});
    } catch (err) {
        res.status(400).send({err});
    }
}

//Renvoie tous les posts d'un utilisateur
module.exports.postsByUserId = async (req, res) => {
    const {user_id} = req.params;

    try {
        const posts = await postModel.find({author: user_id});
        res.status(201).json({posts});
    } catch (err) {
        res.status(400).send({err});
    }
}

//Renvoie les commentaires d'un post
module.exports.postComments = async (req, res) => {
    const {_id} = req.params;

    try {
        const post = await postModel.findById({_id});
        res.status(201).json(post.comments);
    } catch (err) {
        res.status(400).send({err});
    }
}

//Renvoie les likes d'un post
module.exports.postLikes = async (req, res) => {
    const {_id} = req.params;

    try {
        const post = await postModel.findById({_id});
        res.status(201).json(post.likes);
    } catch (err) {
        res.status(400).send({err});
    }
}

//********************** UPDATE **********************************************//

module.exports.update = async (req, res) => {
    const {_id, username} = req.params;
    const {image_url, description, author} = req.body;

    if (username !== req.session.username) res.status(400).send("Impossible" +
        " de modifier")

    try {
        const post = await postModel.findByIdAndUpdate(
            {_id},
            {image_url, description, author},
            {new: true}
        );
        res.status(201).json({post});
    } catch (err) {
        res.status(400).send({err});
    }
}

module.exports.addComment = async (req, res) => {
    const {_id} = req.params;
    const {comment_id} = req.body;

    try {
        const post = await postModel.findByIdAndUpdate(
            {_id},
            {$addToSet: {comments: comment_id}},
            {new: true}
        );
        res.status(201).json({post});
    } catch (err) {
        res.status(400).send({err});
    }
}

module.exports.addLike = async (req, res) => {
    const {_id} = req.params;
    const {liker_id} = req.body;

    try {
        const post = await postModel.findByIdAndUpdate(
            {_id},
            {$addToSet: {likes: liker_id}},
            {new: true}
        );
        res.status(201).json({post});
    } catch (err) {
        res.status(400).send({err});
    }
}

//********************** DELETE **********************************************//

module.exports.delete = async (req, res) => {
    const {_id, username} = req.params;

    if (username !== req.session.username) res.status(400).send("Impossible" +
        " de supprimer")

    try {
        await postModel.findByIdAndDelete(_id);
        res.status(201).json("Post supprimé");
    } catch (err) {
        res.status(400).send({err});
    }
}

module.exports.deleteComment = async (req, res) => {
    const {_id} = req.params;
    const {comment_id} = req.body;

    try {
        const post = await postModel.findByIdAndUpdate(
            {_id},
            {$pull: {comments: comment_id}},
            {new: true}
        );
        res.status(201).json({post});
    } catch (err) {
        res.status(400).send({err});
    }
}

module.exports.deleteLike = async (req, res) => {
    const {_id} = req.params;
    const {liker_id} = req.body;

    try {
        const post = await postModel.findByIdAndUpdate(
            {_id},
            {$pull: {likes: liker_id}},
            {new: true}
        );
        res.status(201).json({post});
    } catch (err) {
        res.status(400).send({err});
    }
}