const mongoose = require('mongoose');
const {ObjectId} = require("mongodb");
const {isEmail} = require("validator");
const bcrypt = require("bcrypt");

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
            lowercase: true
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
            type: ObjectId,
        }],
        following: [{
            type: ObjectId,
        }]
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", async (next) => {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.statics.login = async function (username, password) {
    const user = await this.findOne({username});
    if (user) {
        if (user.password === password) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email')
};

const Users = mongoose.model("Users", userSchema);
module.exports = Users;