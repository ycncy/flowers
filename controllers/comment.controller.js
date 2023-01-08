const commentModel = require('../models/comment.model');

//********************** CREATE **********************************************//

module.exports.create = async (req, res) => {
    const {content, post, author} = req.body;

    try {
        const comment = await commentModel.create({content, post, author});
        res.status(201).json({comment});
    } catch (err) {
        res.status(400).send({err});
    }
}

//********************** READ ************************************************//

module.exports.commentById = async (req, res) => {
    const {_id} = req.params;

    try {
        const comment = await commentModel.findById(_id);
        res.status(201).json({comment});
    } catch (err) {
        res.status(400).send({err});
    }
}

module.exports.userComments = async (req, res) => {
    const {author} = req.params;

    try {
        const comments = await commentModel.find({author: author});
        res.status(201).json({comments});
    } catch (err) {
        res.status(400).send({err});
    }
}

//********************** UPDATE **********************************************//

module.exports.update = async (req, res) => {
    const {content, post, author} = req.body;
    const {_id} = req.params;

    try {
        const comment = await commentModel.findByIdAndUpdate(
            {_id},
            {content, post, author},
            {new: true}
        );
        res.status(201).json({comment});
    } catch (err) {
        res.status(400).send({err});
    }
}

module.exports.like = async (req, res) => {
    const {liker} = req.body;
    const {_id} = req.params;

    try {
        const comment = await commentModel.findByIdAndUpdate(
            {_id},
            {$addToSet: {likes: liker}},
            {new: true}
        );
        res.status(201).json({comment});
    } catch (err) {
        res.status(400).send({err});
    }
}

module.exports.dislike = async (req, res) => {
    const {disliker} = req.body;
    const {_id} = req.params;

    try {
        const comment = await commentModel.findByIdAndUpdate(
            {_id},
            {$pull: {likes: disliker}},
            {new: true}
        );
        res.status(201).json({comment});
    } catch (err) {
        res.status(400).send({err});
    }
}

//********************** DELETE **********************************************//

module.exports.delete = async (req, res) => {
    const {_id} = req.params;

    try {
        const comment = await commentModel.findByIdAndDelete(_id);
        res.status(201).json({comment});
    } catch (err) {
        res.status(400).send({err});
    }
}