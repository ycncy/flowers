const userModel = require('../models/user.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config({path: "./config/.env"});

//**************** AUTHENTIFICATION (CREATE) *********************************//

module.exports.register = async (req, res) => {
    const {username, password, email} = req.body;

    const hashedPwd = await bcrypt.hash(password, 10);

    if (!hashedPwd) res.status(400).send("Mauvais mot de passe");

    await userModel.create({
        username: username,
        password: hashedPwd,
        email: email
    })
        .then(response => res.send({response}))
        .catch(err => res.status(400).send({err}))
}

module.exports.logIn = async (req, res) => {

    userModel.findOne({username: req.body.username})
        .then(user => {
            if (!user) {
                return res.status(400).json({
                    error: 'Utilisateur non trouvé' +
                        ' !'
                });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(async (valid) => {
                    if (!valid) {
                        return res.status(400).json({
                            error: 'Mot de passe' +
                                ' incorrect !'
                        });
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
                    res.status(201).json({
                        userId: user._id,
                        token: token
                    });
                })
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(400).json({error}));
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

    await userModel.find({token: token})
        .then(async (user) => {
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
            await userModel.findOneAndDelete({token})
                .then(response => res.send({response}))
                .catch(err => res.status(400).send({err}))
        })
        .catch(err => res.status(400).send({err}));
}

//****************** UPDATE **************************************************//

module.exports.updateData = async (req, res) => {
    const {_id} = req.params;
    const {username, email, password, profil_pic_url} = req.body;

    await userModel.findByIdAndUpdate(
        {_id},
        {
            username: username,
            email: email,
            password: password,
            profil_pic_url: profil_pic_url
        },
        {new: true})
        .then(response => res.send({response}))
        .catch(err => res.status(400).send({err}))
}

//****************** READ ****************************************************//

module.exports.getAllUsers = async (req, res) => {
    await userModel.find()
        .then(response => res.send({response}))
        .catch(err => res.status(400).send({err}))
}

module.exports.getUserByUsername = async (req, res) => {
    const {username} = req.params;

    await userModel.findOne({username: username})
        .then(response => res.send({response}))
        .catch(err => res.status(400).send({err}))
}

module.exports.getUserByToken = async (req, res) => {
    const {token} = req.params;

    await userModel.findOne({token: token})
        .then(response => res.send({response}))
        .catch(err => res.status(400).send({err}))
}

//*********** FOLLOWERS/FOLLOWING ********************************************//

module.exports.addFollower = async (req, res) => {
    const {follower_username, followed_username} = req.body;

    try {
        const user1 = await userModel.findOneAndUpdate(
            {username: follower_username},
            {$addToSet: {following: followed_username}}
        );
        const user2 = await userModel.findOneAndUpdate(
            {username: followed_username},
            {$addToSet: {followers: follower_username}}
        );
        res.status(201).send({user1, user2});
    } catch (err) {
        res.status(400).send("Impossible : " + err);
    }
}

module.exports.removeFollower = async (req, res) => {
    const {unfollower_username, unfollowed_username} = req.body;

    try {
        await userModel.updateOne(
            {username: unfollower_username},
            {$pull: {following: unfollowed_username}}
        );
        await userModel.updateOne(
            {username: unfollowed_username},
            {$pull: {followers: unfollower_username}}
        );
        res.status(201).send("-1");
    } catch (err) {
        res.status(400).send("Impossible : " + err);
    }
}

//Renvoie les abonnés et les abonnements d'un utilisateur
module.exports.getFollow = async (req, res) => {
    const {username} = req.params;

    try {
        const user = await userModel.findOne({username: username});
        res.status(201).send({
            followers: user.followers,
            following: user.following
        });
    } catch (err) {
        res.status(400).send(err);
    }
}