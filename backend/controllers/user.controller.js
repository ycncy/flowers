const userModel = require('../models/user.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config({path: "./config/.env"});

//**************** AUTHENTIFICATION (CREATE) *********************************//

module.exports.register = async (req, res) => {
    const {username, password, email} = req.body;
    try {
        const hashedPwd = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            username: username,
            password: hashedPwd,
            email: email
        });

        res.status(201).send({
            accessToken: token,
            user: user._id
        });

    } catch (err) {
        res.status(400).json("error :" + err)
    }
}

module.exports.logIn = async (req, res) => {
    userModel.findOne({username: req.body.username})
        .then(user => {
            if (!user) {
                return res.status(401).json({error: 'Utilisateur non trouvé !'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(async (valid) => {
                    if (!valid) {
                        return res.status(401).json({error: 'Mot de passe incorrect !'});
                    }
                    const token = jwt.sign(
                        {userId: user._id},
                        process.env.ACCESS_TOKEN_SECRET,
                        {expiresIn: '24h'});
                    await user.update({
                        $set: {
                            token: token
                        }
                    });
                    await user.save();
                    res.status(200).json({
                        userId: user._id,
                        token: token
                    });
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
}

module.exports.logout = async (req, res) => {
    const authHeader = req.headers.authorization.split(' ')[1];
    jwt.sign(authHeader, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 1}, (logout, err) => {
        if (logout) {
            res.send({msg: 'You have been Logged Out'});
        } else {
            if (err) {
                res.send({msg: 'Error'});
            }
        }
    });
}
//****************** DELETE **************************************************//

module.exports.delete = async (req, res) => {
    const {token} = req.params;

    try {
        const user = await userModel.find({token: token});

        const followed = await userModel.find({
            followers: {$in: [user._id]}
        });
        const following = await userModel.find({
            following: {$in: [user._id]}
        });
        for (let i = 0; i < followed.length; i++) {
            await userModel.findByIdAndUpdate(
                {_id: followed[i]._id},
                {$pull: {followers: user._id}}
            );
        }
        for (let i = 0; i < following.length; i++) {
            await userModel.findByIdAndUpdate(
                {_id: following[i]._id},
                {$pull: {following: user._id}}
            );
        }
        await userModel.findOneAndDelete({token});
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

module.exports.getUserByToken = async (req, res) => {
    const {token} = req.params;
    try {
        const user = await userModel.findOne({token: token});
        res.status(201).json({user});
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