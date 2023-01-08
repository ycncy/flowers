const userModel = require('../models/user.model');

//****************** DELETE **************************************************//

module.exports.delete = async (req, res) => {
    const {_id} = req.params;
    try {
        await userModel.findById(_id);
        const followed = await userModel.find({
            followers: {$in: [_id]}
        });
        const following = await userModel.find({
            following: {$in: [_id]}
        });
        for (let i = 0; i < followed.length; i++) {
            await userModel.findByIdAndUpdate(
                {_id: followed[i]._id},
                {$pull: {followers: _id}}
            );
        }
        for (let i = 0; i < following.length; i++) {
            await userModel.findByIdAndUpdate(
                {_id: following[i]._id},
                {$pull: {following: _id}}
            );
        }
        await userModel.findByIdAndDelete({_id});
        res.status(201).send("L'utilisateur a été supprimé");
    } catch (err) {
        res.status(400).send("Il n'existe pas de profils pour ce nom" + " d'utilisateur");
    }
}

//****************** UPDATE **************************************************//

module.exports.updateData = async (req, res) => {
    const {_id} = req.params;
    const {username, email, password, profil_pic_url} = req.body;

    try {
        const user = await userModel.findByIdAndUpdate(
            {_id},
            {
                username: username,
                email: email,
                password: password,
                profil_pic_url: profil_pic_url
            },
            {new: true});
        res.status(201).send({user: user._id});
    } catch (err) {
        return res.status(400).send({err});
    }
}

//****************** READ ****************************************************//

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(201).json(users);
    } catch (err) {
        res.status(400).json({err: err.message});
    }
}

module.exports.getUserById = async (req, res) => {
    const {_id} = req.params;
    try {
        const user = await userModel.findById({_id});
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({err: err.message});
    }
}

//*********** FOLLOWERS/FOLLOWING ********************************************//

module.exports.addFollower = async (req, res) => {
    const {follower_id, followed_id} = req.body;

    try {
        await userModel.findByIdAndUpdate(
            {_id: follower_id},
            {$addToSet: {following: followed_id}}
        );
        await userModel.findByIdAndUpdate(
            {_id: followed_id},
            {$addToSet: {followers: follower_id}}
        );
        res.status(201).send("+1");
    } catch (err) {
        res.status(400).send("Impossible : " + err);
    }
}

module.exports.removeFollower = async (req, res) => {
    const {unfollower_id, unfollowed_id} = req.body;

    try {
        await userModel.findByIdAndUpdate(
            {_id: unfollower_id},
            {$pull: {following: unfollowed_id}}
        );
        await userModel.findByIdAndUpdate(
            {_id: unfollowed_id},
            {$pull: {followers: unfollower_id}}
        );
        res.status(201).send("-1");
    } catch (err) {
        res.status(400).send("Impossible : " + err);
    }
}

module.exports.getFollow = async (req, res) => {
    const {_id} = req.params;

    try {
        const user = await userModel.findById({_id});
        res.status(201).send({
            followers: user.followers,
            following: user.following
        });
    } catch (err) {
        res.status(400).send(err);
    }
}