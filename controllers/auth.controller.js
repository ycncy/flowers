const userModel = require('../models/user.model');

const jwt = require('jsonwebtoken');

//**************** AUTHENTIFICATION (CREATE) *********************************//

module.exports.register = async (req, res) => {
    const {username, password, email} = req.body;
    try {
        const user = await userModel.create({username, password, email});
        res.status(201).json({user: user._id});
    } catch (err) {
        res.status(400).send({err})
    }
}

module.exports.logIn = async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await userModel.login(username, password);
        res.status(201).json({user: user._id})
    } catch (err) {
        res.status(400).json({err});
    }
}

module.exports.logout = async (req, res) => {

}