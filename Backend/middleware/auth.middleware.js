const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
require("dotenv").config({path: "./config/.env"});


//Vérifie si l'utilisateur est connecté grâce au token
module.exports.is_authenticated = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.cookie('jwt', '', {maxAge: 1})
            } else {
                let user = await userModel.findById(decodedToken);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

//Bloque l'accès si le token n'est pas valide
module.exports.restrain_access = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err);
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        console.log("Pas de token :(")
    }
}