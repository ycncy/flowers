const userModel = require('../models/user.model');
const {genSalt} = require("bcrypt");
const bcrypt = require("bcrypt");
require("dotenv").config({path: "./config/.env"});

//**************** AUTHENTIFICATION (CREATE) *********************************//

module.exports.register = async (req, res) => {
    const {username, password, email} = req.body;
    try {
        const hashedPwd = await bcrypt.hash(password, 15);
        const user = await userModel.create({
            username: username,
            password: hashedPwd,
            email: email
        });
        req.session.loggedin = true;
        req.session.username = username;
        res.status(201).json({user: user._id});
    } catch (err) {
        res.status(400).json("error :" + err)
    }
}

module.exports.logIn = async (req, res) => {
    const {username, password} = req.body;
    const user = await userModel.findOne({username});
    try {
        const pwd = await bcrypt.compare(password, user.password);
        if (pwd) {
            req.session.loggedin = true;
            req.session.username = username;
            req.session.save();
            res.json({user});
        }
    } catch (err) {
        res.status(400).send("error : " + err);
    }
}

module.exports.logout = async (req, res) => {
    req.session.destroy(() => {
        res.clearCookie(process.env.SESSION_NAME);
        res.send("Logged Out");
    });
}

module.exports.authCheck = async (req, res) => {
    const username = req.session.username;
    if (username) {
        return res.json({username});
    }
    return res.status(401).send("Aucun utilisateur connecté");
}

//****************** DELETE **************************************************//

module.exports.delete = async (req, res) => {
    const {_id, username} = req.params;

    if (username !== req.session.username) res.status(400).send("Impossible" +
        " de supprimer")

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
    const {_id, original_username} = req.params;
    const {username, email, password, profil_pic_url} = req.body;

    if (original_username !== req.session.username) res.status(400).send("Impossible" +
        " de supprimer")

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

module.exports.getAllUsers = async (req, res, next) => {
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

//Renvoie les abonnés et les abonnements d'un utilisateur
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