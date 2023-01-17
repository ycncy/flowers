const mongoose = require('mongoose');
const {ObjectId} = require("mongodb");
const {isEmail} = require("validator");
require("dotenv").config({path: "./config/.env"});

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Veuillez entrer un nom d'utilisateur"],
            minLength: 3,
            unique: true
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            unique: true
        },
        password: {
            type: String,
            required: [true, "Veuillez entrer un mot de passe"],
            minLength: 8,
        },
        profil_pic_url: {
            type: String,
            default: '../public/flower.png'
        },
        followers: [{
            type: String,
        }],
        following: [{
            type: String,
        }],
        token: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);

const Users = mongoose.model("Users", userSchema);
module.exports = Users;