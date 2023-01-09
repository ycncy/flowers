const jwt = require("jsonwebtoken");
const userModel = require('../models/user.model');
require("dotenv").config({path: "./config/.env"});

module.exports.isAdmin = (req, res, next) => {
    if (req.session.username !== "admin") {
        res.sendStatus(401);
    } else {
        next();
    }
}

module.exports.restrain_access = (req, res, next) => {
    if (req.session.username === undefined) {
        res.sendStatus(401);
    } else {
        next();
    }
}

module.exports.isAuthenticated = (req, res, next) => {
    res.locals.authenticated = req.session.username !== undefined;
    res.locals.user = req.session.username;
    next();
}